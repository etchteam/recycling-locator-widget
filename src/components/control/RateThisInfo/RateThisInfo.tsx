/* eslint-disable jsx-a11y/label-has-associated-control */
import { useSignal } from '@preact/signals';
import { useTranslation } from 'react-i18next';
import '@etchteam/diamond-ui/control/Input/Input';
import '@etchteam/diamond-ui/control/Button/Button';
import '@etchteam/diamond-ui/composition/Collapse/Collapse';

import '@/components/content/Icon/Icon';

import useAnalytics from '@/lib/useAnalytics';
import useFormValidation from '@/lib/useFormValidation';
import { CustomElement } from '@/types/customElement';

export default function RateThisInfo() {
  const { t } = useTranslation();
  const tContext = 'components.rateThisInfo';
  const rating = useSignal<'positive' | 'negative' | undefined>(undefined);
  const hasSubmittedFeedback = useSignal(false);
  const commentField = useFormValidation('comment');
  const commentOpen = !!rating.value && !hasSubmittedFeedback.value;
  const { recordEvent } = useAnalytics();

  function handleRatingChange(value: 'positive' | 'negative') {
    rating.value = value;

    // Record rating changes in standard analytics for users that never submit an explanation
    recordEvent({
      category: 'Rating',
      action: value,
    });
  }

  function handleSubmit(event: Event) {
    event.preventDefault();
    const feedback = new FormData(event.target as HTMLFormElement);

    if (!feedback.get('comment')) {
      commentField.valid.value = false;
      return;
    }

    // Need somewhere to send this feedback to
    console.log(feedback.get('rating'), feedback.get('comment'));
    hasSubmittedFeedback.value = true;
  }

  return (
    <locator-rate-this-info>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>
            <h2>
              {hasSubmittedFeedback.value
                ? t(`${tContext}.result.${rating.value}`)
                : t(`${tContext}.title`)}
            </h2>
          </legend>
          <div className="locator-rate-this-info__rating">
            <label>
              <input
                type="radio"
                id="rating-thumb-up"
                name="rating"
                value="1"
                disabled={hasSubmittedFeedback.value}
                onChange={() => handleRatingChange('positive')}
              />
              <locator-icon icon="thumb-up" label={t(`${tContext}.thumbUp`)} />
            </label>
            <label>
              <input
                type="radio"
                id="rating-thumb-down"
                name="rating"
                value="-1"
                disabled={hasSubmittedFeedback.value}
                onChange={() => handleRatingChange('negative')}
              />
              <locator-icon
                icon="thumb-down"
                label={t(`${tContext}.thumbDown`)}
              />
            </label>
          </div>
        </fieldset>
        {!rating.value && (
          <p className="text-color-muted diamond-text-size-sm">
            {t(`${tContext}.help`)}
          </p>
        )}
        <diamond-collapse open={!!rating.value && !hasSubmittedFeedback.value}>
          <diamond-form-group className="locator-rate-this-info__comment diamond-spacing-bottom-md">
            <label htmlFor="rating-comment">
              {t(`${tContext}.comment.label`)}
            </label>
            <diamond-input
              state={commentField.valid.value ? undefined : 'invalid'}
            >
              <textarea
                id="rating-comment"
                name="comment"
                placeholder={t(`${tContext}.comment.placeholder`)}
                onBlur={(event) =>
                  commentField.handleInput(event.currentTarget?.value)
                }
                onInput={(event) =>
                  commentField.handleBlur(event.currentTarget?.value)
                }
                disabled={!commentOpen}
                aria-invalid={!commentField.valid.value}
                aria-errormessage={
                  !commentField.valid.value ? 'rating-comment-error' : undefined
                }
              ></textarea>
            </diamond-input>
            {!commentField.valid.value && (
              <p
                id="rating-comment-error"
                className="text-color-negative diamond-text-size-sm diamond-spacing-top-xs"
                aria-live="polite"
              >
                {t(`${tContext}.comment.error`)}
              </p>
            )}
          </diamond-form-group>
          <diamond-button width="full-width">
            <button type="submit">{t(`${tContext}.cta`)}</button>
          </diamond-button>
        </diamond-collapse>
        <output
          name="result"
          className="text-color-positive diamond-text-size-sm"
          htmlFor="rating-thumb-up rating-thumb-down rating-comment"
        >
          {hasSubmittedFeedback.value
            ? t(`${tContext}.result.confirmation`)
            : ''}
        </output>
      </form>
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
