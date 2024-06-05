/* eslint-disable jsx-a11y/label-has-associated-control */
import { useSignal } from '@preact/signals';
import { Link } from 'react-router-dom';
import '@etchteam/diamond-ui/control/Input/Input';
import '@etchteam/diamond-ui/control/Button/Button';

import '@/components/content/Icon/Icon';
import useAnalytics from '@/lib/useAnalytics';
import { CustomElement } from '@/types/customElement';

export default function RateThisInfo({
  basePath,
}: {
  readonly basePath: string;
}) {
  const rating = useSignal<'positive' | 'negative' | undefined>(undefined);
  const { recordEvent } = useAnalytics();

  function handleRatingChange(value: 'positive' | 'negative') {
    rating.value = value;

    // Record rating changes in standard analytics for users that never submit an explanation
    recordEvent({
      category: 'Rating',
      action: value,
    });
  }

  return (
    <locator-rate-this-info>
      <fieldset>
        <legend>
          <h2>How would you rate this information?</h2>
        </legend>
        <div className="locator-rate-this-info__rating">
          <label>
            <input
              type="radio"
              id="rating-thumb-up"
              name="rating"
              value="1"
              onChange={() => handleRatingChange('positive')}
            />
            <locator-icon icon="thumb-up" label="Thumb up" />
          </label>
          <label>
            <input
              type="radio"
              id="rating-thumb-down"
              name="rating"
              value="-1"
              onChange={() => handleRatingChange('negative')}
            />
            <locator-icon icon="thumb-down" label="Thumb down" />
          </label>
        </div>
      </fieldset>
      <output htmlFor="rating-thumb-up rating-thumb-down">
        {rating.value && (
          <p>
            Please take a moment to{' '}
            <Link to={`${basePath}/rating-${rating.value}`}>explain why</Link>
          </p>
        )}
      </output>
      {!rating.value && <p>Your feedback will help to improve this service</p>}
    </locator-rate-this-info>
  );
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'locator-rate-this-info': CustomElement;
    }
  }
}
