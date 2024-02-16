import { useSignal } from '@preact/signals';
import { ComponentChildren } from 'preact';
import '@etchteam/diamond-ui/control/Button/Button';

import '@/components/composition/Layout/Layout';
import '@/components/composition/Header/Header';
import '@/components/content/Logo/Logo';
import '@/components/content/Icon/Icon';

import About from './about';

export default function StartLayout({
  children,
  aside,
}: {
  readonly children: ComponentChildren;
  readonly aside: ComponentChildren;
}) {
  const open = useSignal(false);

  return (
    <locator-layout>
      <locator-header slot="header">
        <locator-logo></locator-logo>
        <diamond-button variant="text">
          <button type="button" onClick={() => (open.value = !open.value)}>
            <locator-icon
              icon={open.value ? 'close' : 'info'}
              color="primary"
            ></locator-icon>
          </button>
        </diamond-button>
      </locator-header>
      <div slot="main">{open.value ? <About /> : children}</div>
      <div slot="aside" className="display-contents">
        {aside}
      </div>
    </locator-layout>
  );
}
