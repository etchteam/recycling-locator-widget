import { Signal, signal } from '@preact/signals';
import * as Sentry from '@sentry/browser';
import uniq from 'lodash/uniq';
import { Component, createRef } from 'preact';
import register from 'preact-custom-element';
import '@etchteam/diamond-ui/control/Input/Input';

import config from '@/config';
import { CustomElement } from '@/types/customElement';

import '@/components/content/Icon/Icon';

interface HereMapsAutosuggestResult {
  items: {
    title: string;
  }[];
}

interface LocationInputProps {
  readonly inputId?: string;
  readonly placeholder?: string;
}

/**
 * An autosuggest input for locations.
 * The autosuggest list will appear after > 3 characters are entered.
 */
export default class LocationInput extends Component<LocationInputProps> {
  apiKey = config.mapsPlacesKey;
  autosuggestEndpoint = 'https://autosuggest.search.hereapi.com/v1/autosuggest';
  boundingBox = '-7.57216793459,49.959999905,1.68153079591,58.6350001085';
  resultTypes = 'address,place';
  locationSuggestions: Signal<string[]>;
  inputRef = createRef<HTMLInputElement>();

  constructor(props: LocationInputProps) {
    super(props);
    this.locationSuggestions = signal<string[]>([]);
  }

  autosuggest = async (query: string): Promise<HereMapsAutosuggestResult> => {
    try {
      const apiKey = `apiKey=${this.apiKey}`;
      const bbox = `in=bbox:${this.boundingBox}`;
      const resultTypes = `result_types=${this.resultTypes}`;
      const response = await fetch(
        `${this.autosuggestEndpoint}?q=${query}&${apiKey}&${bbox}&${resultTypes}`,
      );
      return response.json();
    } catch (error) {
      Sentry.captureException(error, {
        tags: { component: 'LocationInput' },
      });
      return Promise.resolve({ items: [] });
    }
  };

  handleInput = async (event: preact.JSX.TargetedEvent<HTMLInputElement>) => {
    const query = event.currentTarget.value;

    if (query.length <= 3) {
      return;
    }

    const result = await this.autosuggest(query);
    const locations = result.items.map((item) => item.title);
    this.locationSuggestions.value = locations;
  };

  render() {
    const locations = this.locationSuggestions.value;
    const inputId = this.props.inputId ?? 'locator-location-input';
    const listId = `locator-${inputId}-locations`;

    return (
      <>
        <diamond-input>
          <locator-icon icon="pin" color="primary" />
          <input
            type="text"
            name="location"
            placeholder={this.props.placeholder}
            id={inputId}
            list={listId}
            onInput={this.handleInput}
            ref={this.inputRef}
          />
        </diamond-input>
        <datalist id={listId}>
          {uniq(locations).map((location) => {
            if (location === this.inputRef?.current?.value) {
              return null;
            }

            return (
              <option value={location} key={location}>
                {location}
              </option>
            );
          })}
        </datalist>
      </>
    );
  }
}

register(LocationInput, 'locator-location-input', ['inputId', 'placeholder']);

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'locator-location-input': CustomElement<LocationInputProps>;
    }
  }
}
