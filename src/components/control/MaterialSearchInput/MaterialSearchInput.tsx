import { Signal, signal } from '@preact/signals';
import uniq from 'lodash/uniq';
import { Component, createRef } from 'preact';
import register from 'preact-custom-element';
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
    const body = new FormData();
    body.append('search', query);
    return LocatorApi.post('materials', body);
  };

  handleInput = async (event: preact.JSX.TargetedEvent<HTMLInputElement>) => {
    const query = event.currentTarget.value;

    if (query.length <= 3) {
      return;
    }

    const materials = await this.autosuggest(query);
    this.materialSuggestions.value = materials;
  };

  render() {
    const materials = this.materialSuggestions.value;
    const inputId = this.props.inputId ?? 'locator-material-input';
    const listId = `locator-${inputId}-locations`;
    const submitting = this.props.submitting ?? false;

    return (
      <>
        <diamond-input>
          <input
            type="text"
            name="search"
            aria-labelledby={this.props.inputLabelledBy}
            placeholder={this.props.placeholder}
            id={inputId}
            list={listId}
            onInput={this.handleInput}
            ref={this.inputRef}
          />
        </diamond-input>
        <diamond-button width="square" variant="primary">
          <button type="submit" disabled={submitting && submitting !== 'false'}>
            <locator-icon
              icon="search"
              label={i18n.t('actions.search')}
            ></locator-icon>
          </button>
        </diamond-button>
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

register(MaterialSearchInput, 'locator-material-search-input', [
  'inputId',
  'inputLabelledBy',
  'placeholder',
  'submitting',
]);

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'locator-material-search-input': CustomElement<MaterialSearchInputProps>;
    }
  }
}
