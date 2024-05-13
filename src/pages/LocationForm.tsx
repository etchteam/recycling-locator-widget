import { useSignal } from '@preact/signals';
import { ComponentChildren } from 'preact';
import { useEffect } from 'preact/hooks';
import { useTranslation } from 'react-i18next';
import {
  Form,
  useLocation,
  useSearchParams,
  useSubmit,
} from 'react-router-dom';
import '@etchteam/diamond-ui/composition/FormGroup/FormGroup';
import '@etchteam/diamond-ui/composition/Grid/Grid';
import '@etchteam/diamond-ui/composition/Grid/GridItem';
import '@etchteam/diamond-ui/control/Button/Button';
import '@etchteam/diamond-ui/control/RadioCheckbox/RadioCheckbox';

import '@/components/canvas/Highlight/Highlight';
import LocationInput from '@/components/control/LocationInput/LocationInput';
import { useAppState } from '@/lib/AppState';
import useFormValidation from '@/lib/useFormValidation';

export default function LocationForm({
  label,
  cta,
  action = '/',
  children,
}: {
  readonly label?: string;
  readonly cta?: string;
  readonly action?: string;
  readonly children?: ComponentChildren;
}) {
  const { t } = useTranslation();
  const location = useLocation();
  const form = useFormValidation('location');
  const [searchParams] = useSearchParams();
  const autofocus = searchParams.get('autofocus') === 'true';
  const geolocation = useSignal(false);
  const geolocationError = useSignal(false);
  const submit = useSubmit();
  const app = useAppState();
  const isStandalone = app.variant === 'standalone';

  useEffect(() => {
    form.submitting.value = false;
  }, [location]);

  function handleSubmit(event) {
    geolocationError.value = false;

    if (!geolocation.value) {
      return form.handleSubmit(event);
    }

    event.preventDefault();
    form.submitting.value = true;
    const locationForm = event?.submitter?.form ?? undefined;
    const checkbox = locationForm?.querySelector('input[name="geolocation"]');
    const formData = new FormData(locationForm);

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        formData.set('lat', coords.latitude.toString());
        formData.set('lng', coords.longitude.toString());
        submit(formData, { method: 'post', action });
      },
      () => {
        geolocation.value = false;
        form.submitting.value = false;
        checkbox.checked = false;
        geolocationError.value = true;
      },
    );
  }

  return (
    <Form action={action} method="post" onSubmit={handleSubmit}>
      <diamond-form-group className="diamond-spacing-bottom-md">
        <label htmlFor="location-input">{label ?? t('start.label')}</label>
        <LocationInput
          autofocus={autofocus}
          handleBlur={form.handleBlur}
          handleInput={form.handleInput}
          disabled={geolocation.value}
          valid={form.valid.value || geolocation.value}
        ></LocationInput>
      </diamond-form-group>
      {isStandalone && (
        <diamond-grid
          align-items="center"
          className="diamond-spacing-bottom-md"
        >
          <diamond-grid-item grow shrink>
            <diamond-radio-checkbox
              state={geolocationError.value ? 'invalid' : undefined}
              className="diamond-text-size-sm"
            >
              <label>
                <input
                  type="checkbox"
                  name="geolocation"
                  value="yes"
                  onChange={(event) =>
                    (geolocation.value = (
                      event.target as HTMLInputElement
                    ).checked)
                  }
                  aria-invalid={geolocationError.value}
                  aria-errormessage={
                    geolocationError.value ? 'geolocation-error' : undefined
                  }
                />
                {t('start.geolocation.label')}
              </label>
            </diamond-radio-checkbox>
          </diamond-grid-item>
          <diamond-grid-item>
            <locator-highlight
              id="geolocation-error"
              className={`diamond-text-size-xs ${geolocationError.value ? 'theme-negative' : 'theme-info'}`}
            >
              {t('start.geolocation.permission')}
            </locator-highlight>
          </diamond-grid-item>
        </diamond-grid>
      )}
      {children}
      <diamond-button width="full-width" variant="primary">
        <button type="submit" disabled={form.submitting.value}>
          {cta ?? t('start.cta')}
        </button>
      </diamond-button>
    </Form>
  );
}
