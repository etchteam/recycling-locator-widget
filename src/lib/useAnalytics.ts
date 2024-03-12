import * as Sentry from '@sentry/browser';

import config from '@/config';

import { useAppState } from './AppState';

interface AnalyticsEvent {
  /** Document Title (title for the event) */
  dt: string;
  /** Document Path i.e. /EX327RB/places?materialId=1&materialName=Aluminium */
  dp: string;
  /** Document Hostname */
  dh: string;
  /** Viewport in the format `${width}x${height()}` */
  vp: string;
  /** Session id */
  cid: string;
  /** Type for Google Analytics */
  t: 'pageview' | 'event';
  /** Users Locale */
  ul: 'cy-GB' | 'en-GB';
  /** Event Category for Google Analytics */
  ec?: string;
  /** Event Action for Google Analytics */
  ea?: string;
}

interface AnalyticsResponse {
  status: 'ok' | 'error';
  details: string;
}

async function sendAnalyticsRequest(event: AnalyticsEvent) {
  if (!config.enableAnalytics) {
    return;
  }

  try {
    const query = new URLSearchParams(event as any);
    const response = await fetch(`${config.locatorAnalyticsPath}?${query}`, {
      method: 'GET',
      headers: {
        'X-Requested-With': config.packageVersion,
      },
    });

    const data: AnalyticsResponse = await response.json();

    if (data?.status === 'error') {
      throw new Error(data.details);
    }
  } catch (error) {
    Sentry.captureException(error, {
      tags: { analytics: 'sendHit' },
      extra: { event },
    });
  }
}

export default function useAnalytics() {
  const { locale, sessionId } = useAppState();

  function createEvent(event: Partial<AnalyticsEvent>): AnalyticsEvent {
    return {
      ...event,
      cid: sessionId,
      ul: locale === 'cy' ? 'cy-GB' : 'en-GB',
      dh: config.hostname,
      vp: `${window.innerWidth}x${window.innerHeight}`,
    } as AnalyticsEvent;
  }

  function recordView({ path, title }: { path: string; title: string }) {
    const event = createEvent({
      dt: title,
      dp: path,
      t: 'pageview',
    });
    console.log(event);
    sendAnalyticsRequest(event);
  }

  function recordEvent({
    category,
    action,
    path,
  }: {
    category: string;
    action: string;
    path: string;
  }) {
    const event = createEvent({
      ec: category,
      ea: action,
      dp: path,
      t: 'event',
    });

    sendAnalyticsRequest(event);
  }

  return { recordView, recordEvent };
}
