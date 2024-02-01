import type { Preview } from '@storybook/preact';
import { render } from 'preact';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    // To mimic the behaviour of the widget, we need to tell Preact to render the story into
    // the host element's shadow root declared in preview-body.html
    (Story) => {
      render((
        <>
          <link rel="stylesheet" href="/styles.css" />
          <div style="container-type:inline-size;">
            {Story()}
          </div>
        </>
      ), document.getElementById('host')?.shadowRoot)

      return <></>;
    },
  ],
};

export default preview;
