import register from 'preact-custom-element';

import config from '../../config';

async function locationAutosuggest(query: string) {
  const apiKey = config.mapsPlacesKey;
  const bbox = '-7.57216793459,49.959999905,1.68153079591,58.6350001085';
  const resultTypes = 'address,place';
  const url = 'https://autosuggest.search.hereapi.com/v1/autosuggest';

  const response = await fetch(
    `${url}?apiKey=${apiKey}&in=bbox:${bbox}&q=${query}&result_types=${resultTypes}`,
  );
  return response.json();
}

export default function Logo() {
  async function handleInput(event) {
    const query = event.target.value;

    if (query.length <= 3) {
      return;
    }

    const results = await locationAutosuggest(query);
    console.log(results);
  }

  return <input type="text" id="location-input" onInput={handleInput} />;
}

register(Logo, 'locator-location-input');

declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      'locator-location-input': preact.JSX.HTMLAttributes;
    }
  }
}
