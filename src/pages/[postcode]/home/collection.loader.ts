import * as Sentry from '@sentry/browser';
import { defer } from 'react-router-dom';

import LocatorApi from '@/lib/LocatorApi';
import getTip from '@/lib/getTip';
import { RecyclingMeta } from '@/types/locatorApi';

export interface HomeCollectionLoaderResponse {
  tip?: RecyclingMeta;
}

async function getData(): Promise<HomeCollectionLoaderResponse> {
  try {
    const meta = await LocatorApi.get<RecyclingMeta[]>(
      'recycling-meta?categories=HINT',
    );

    return {
      tip: getTip(meta, { path: '/:postcode/home/collection' }),
    };
  } catch (error) {
    Sentry.captureException(error, {
      tags: { route: 'Home collection loader' },
    });
    // Let the user carry on without the tip
    return Promise.resolve({ tip: null });
  }
}

export default function homeCollectionLoader() {
  return defer({ data: getData() });
}
