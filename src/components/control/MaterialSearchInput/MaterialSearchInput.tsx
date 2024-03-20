import { Signal, signal } from '@preact/signals';
import * as Sentry from '@sentry/browser';
import uniq from 'lodash/uniq';
import { Component, createRef } from 'preact';
import '@etchteam/diamond-ui/control/Input/Input';
import '@etchteam/diamond-ui/control/Button/Button';

import LocatorApi from '@/lib/LocatorApi';
import i18n from '@/lib/i18n';
import { CustomElement } from '@/types/customElement';
import { Material } from '@/types/locatorApi';

import '@/components/content/Icon/Icon';

interface MaterialSearchInputProps {
  readonly inputId?: string;
  readonly inputLabelledBy?: string;
  readonly placeholder?: string;
  readonly submitting?: boolean | string;
  readonly defaultValue?: string;
  readonly valid?: boolean;
  readonly autofocus?: boolean;
  readonly handleBlur?: (value: string) => void;
  readonly handleInput?: (value: string) => void;
}

/**
 * An autosuggest input for materials.
 * The autosuggest list will appear after > 3 characters are entered.
 */
export default class MaterialSearchInput extends Component<MaterialSearchInputProps> {
  materialSuggestions: Signal<Material[]>;
  inputRef = createRef<HTMLInputElement>();

  constructor(props: MaterialSearchInputProps) {
    super(props);
    this.materialSuggestions = signal([]);
  }

  autosuggest = async (query: string): Promise<Material[]> => {
    try {
      const body = new FormData();
      body.append('search', query);
      return LocatorApi.post('materials', body);
    } catch (error) {
      Sentry.captureException(error, {
        tags: { component: 'MaterialSearchInput' },
      });
      return Promise.resolve([]);
    }
  };

  handleInput = async (event: preact.JSX.TargetedEvent<HTMLInputElement>) => {
    const query = event.currentTarget.value;

    if (query.length <= 3) {
      return;
    }

    const materials = await this.autosuggest(query);
    this.materialSuggestions.value = materials;
    this.props.handleInput?.(query);
  };

  handleBlur = (event: preact.JSX.TargetedEvent<HTMLInputElement>) => {
    this.props.handleBlur?.(event.currentTarget.value);
  };

  componentDidUpdate(previousProps): void {
    if (
      previousProps.value !== this.props.defaultValue &&
      !this.inputRef?.current?.value
    ) {
      this.inputRef.current.value = this.props.defaultValue ?? '';
    }
  }

  render() {
    const materials = this.materialSuggestions.value;
    const inputId = this.props.inputId ?? 'locator-material-input';
    const listId = `locator-${inputId}-locations`;
    const submitting = this.props.submitting ?? false;
    const valid = this.props.valid ?? true;
    const placeholder =
      this.props.placeholder ??
      i18n.t('components.materialSearchInput.placeholder');

    return (
      <>
        <locator-material-search-input>
          <diamond-input state={valid ? undefined : 'invalid'}>
            <input
              type="text"
              name="search"
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus={this.props.autofocus}
              aria-labelledby={this.props.inputLabelledBy}
              placeholder={placeholder}
              id={inputId}
              list={listId}
              onInput={this.handleInput}
              onBlur={this.handleBlur}
              ref={this.inputRef}
              aria-invalid={!valid}
              aria-errormessage={
                !valid ? 'material-search-input-error' : undefined
              }
            />
          </diamond-input>
          <diamond-button width="square" variant="primary">
            <button
              type="submit"
              disabled={submitting && submitting !== 'false'}
            >
              <locator-icon
                icon="search"
                label={i18n.t('actions.search')}
              ></locator-icon>
            </button>
          </diamond-button>
        </locator-material-search-input>
        {!valid && (
          <p
            id="material-search-input-error"
            className="text-color-negative diamond-text-size-sm diamond-spacing-top-sm"
            aria-live="polite"
          >
            {i18n.t('components.materialSearchInput.error')}
          </p>
        )}
        <datalist id={listId}>
          {uniq(materials).map((material) => {
            if (material.name === this.inputRef?.current?.value) {
              return null;
            }

            return (
              <option value={material.name} key={material.id}>
                {material.name}
              </option>
            );
          })}
        </datalist>
      </>
    );
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'locator-material-search-input': CustomElement;
    }
  }
}
