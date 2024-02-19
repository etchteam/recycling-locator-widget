export function getHostElement() {
  return document.body.querySelector('recycling-locator')?.shadowRoot;
}

export async function setup() {
  document.body.innerHTML = '<recycling-locator></recycling-locator>';
  const locator = document.querySelector('recycling-locator');

  return new Promise((resolve) => {
    const listener = () => {
      locator.removeEventListener('ready', listener);
      resolve(true);
    };
    locator.addEventListener('ready', listener);
  });
}
