import { useSignal } from '@preact/signals';
import * as Sentry from '@sentry/browser';
import { useCallback, useEffect } from 'preact/hooks';
import '@etchteam/diamond-ui/composition/Collapse/Collapse';
import '@etchteam/diamond-ui/composition/FormGroup/FormGroup';
import '@etchteam/diamond-ui/control/Button/Button';
import '@etchteam/diamond-ui/control/Input/Input';

import '@/components/canvas/IconCircle/IconCircle';
import '@/components/composition/IconText/IconText';
import '@/components/content/Icon/Icon';

import LocatorApi from '@/lib/LocatorApi';
import { CustomElement } from '@/types/customElement';
import { MaterialCategory } from '@/types/locatorApi';

export default function ReportMissingMaterial({
  missingMaterial,
}: {
  readonly missingMaterial: string;
}) {
  const feedbackFormOpen = useSignal(false);
  const materialCategories = useSignal<string[]>([]);
  const selectedCategory = useSignal<string | null>(null);
  const showCategoryError = useSignal(false);
  const hasSubmittedFeedback = useSignal(false);

  useEffect(() => {
    // Reset the form state when the missing material changes
    feedbackFormOpen.value = false;
    selectedCategory.value = null;
    hasSubmittedFeedback.value = false;
  }, [missingMaterial]);

  const toggleFeedbackForm = useCallback(async () => {
    feedbackFormOpen.value = !feedbackFormOpen.value;

    if (materialCategories.value.length > 0) {
      return;
    }

    try {
      const materialCategoriesResponse = await LocatorApi.get<
        MaterialCategory[]
      >('material-categories');

      materialCategories.value = materialCategoriesResponse.map(
        (category) => category.name,
      );
    } catch (error) {
      Sentry.captureException(error, {
        tags: { component: 'ReportMissingMaterial' },
      });
    }
  }, []);

  const sendFeedback = useCallback(() => {
    if (!selectedCategory.value) {
      showCategoryError.value = true;
      return;
    }

    // @TODO: Need somewhere to send this feedback to
    console.log(missingMaterial, selectedCategory.value);
    hasSubmittedFeedback.value = true;
    feedbackFormOpen.value = false;
  }, []);

  function handleCategoryChange(event: Event) {
    selectedCategory.value = (event.target as HTMLSelectElement).value;
    showCategoryError.value = false;
  }

  if (!missingMaterial) {
    return null;
  }

  return (
    <locator-report-missing-material>
      <locator-icon-text>
        <locator-icon-circle
          variant={hasSubmittedFeedback.value ? 'positive' : undefined}
        >
          <locator-icon
            icon={hasSubmittedFeedback.value ? 'list-tick' : 'list-add'}
            color={hasSubmittedFeedback.value ? undefined : 'primary'}
          ></locator-icon>
        </locator-icon-circle>
        {!hasSubmittedFeedback.value && (
          <p>
            If you think it should be added to this tool, please{' '}
            <button
              type="button"
              className="locator-report-missing-material__toggle"
              onClick={toggleFeedbackForm}
              aria-controls="report-missing-material-collapse"
              aria-expanded={feedbackFormOpen.value}
            >
              select which material it is
            </button>
            .
          </p>
        )}
        <output htmlFor="suggested-category">
          {hasSubmittedFeedback.value
            ? 'You’ve reported this missing item'
            : ''}
        </output>
      </locator-icon-text>
      <diamond-collapse
        id="report-missing-material-collapse"
        open={feedbackFormOpen.value}
      >
        <diamond-form-group className="diamond-spacing-bottom-md">
          <label
            htmlFor="report-missing-material-category"
            className="diamond-sr-only"
          >
            Select a material
          </label>
          <diamond-input
            state={showCategoryError.value ? 'invalid' : undefined}
          >
            <select
              id="report-missing-material-category"
              name="suggested-category"
              disabled={!feedbackFormOpen.value}
              onChange={handleCategoryChange}
              aria-invalid={showCategoryError.value}
              aria-errormessage={
                !showCategoryError.value
                  ? 'report-missing-material-category-error'
                  : undefined
              }
            >
              <option value="">Select a material...</option>
              {materialCategories.value.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <locator-icon icon="expand"></locator-icon>
          </diamond-input>
          {showCategoryError.value && (
            <p
              id="report-missing-material-category-error"
              className="text-color-negative diamond-text-size-sm diamond-spacing-top-xs"
              aria-live="polite"
            >
              Please select a material
            </p>
          )}
        </diamond-form-group>
        <diamond-button width="full-width">
          <button type="button" onClick={sendFeedback}>
            Report missing item
          </button>
        </diamond-button>
      </diamond-collapse>
    </locator-report-missing-material>
  );
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'locator-report-missing-material': CustomElement;
    }
  }
}
