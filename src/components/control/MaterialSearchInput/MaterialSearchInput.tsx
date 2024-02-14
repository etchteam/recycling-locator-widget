import { Signal, signal } from '@preact/signals';
import { Component } from 'preact';
import register from 'preact-custom-element';
import '@etchteam/diamond-ui/control/Input/Input';
import '@etchteam/diamond-ui/control/Button/Button';

import { CustomElement } from '@/types/custom-element';

import '@/components/content/Icon/Icon';

interface MaterialSearchInputProps {
  readonly inputId?: string;
  readonly inputLabelledBy?: string;
  readonly placeholder?: string;
}

/**
 * An autosuggest input for materials.
 * The autosuggest list will appear after > 3 characters are entered.
 */
export default class MaterialSearchInput extends Component<MaterialSearchInputProps> {
  materialSuggestions: Signal<string[]>;

  constructor(props: MaterialSearchInputProps) {
    super(props);
    this.materialSuggestions = signal<string[]>([]);
  }

  autosuggest = async (query: string): Promise<string[]> => {
    console.log(query);
    return [];
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
    const inputId = this.props.inputId ?? 'material-input';
    const listId = `${inputId}-locations`;

    return (
      <>
        <diamond-input>
          <input
            type="text"
            name="material"
            aria-labelledby={this.props.inputLabelledBy}
            placeholder={this.props.placeholder}
            id={inputId}
            list={listId}
            onInput={this.handleInput}
          />
        </diamond-input>
        <diamond-button width="square" variant="primary">
          <button>
            <locator-icon icon="search"></locator-icon>
          </button>
        </diamond-button>
        <datalist id={listId}>
          {materials.map((material) => (
            <option value={material} key={material}>
              {material}
            </option>
          ))}
        </datalist>
      </>
    );
  }
}

register(MaterialSearchInput, 'locator-material-search-input', [
  'inputId',
  'inputLabelledBy',
  'placeholder',
]);

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'locator-material-search-input': CustomElement<MaterialSearchInputProps>;
    }
  }
}
