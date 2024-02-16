import { useSignal } from '@preact/signals';
import { ComponentChildren } from 'preact';
import '@etchteam/diamond-ui/control/Button/Button';

import '@/components/composition/Layout/Layout';
import '@/components/composition/Header/Header';
import '@/components/content/Logo/Logo';
import '@/components/content/Icon/Icon';
import '@/components/canvas/Tip/Tip';
import '@/components/composition/Wrap/Wrap';

import About from './about';

export function DefaultAside() {
  return (
    <locator-tip slot="aside">
      <locator-wrap>
        <p>Use this service to:</p>
        <ul>
          <li>see your nearest places to recycle</li>
          <li>find out how to recycle a specific item</li>
          <li>check what you can recycle at home</li>
        </ul>
        <img src="/images/recycling-technology.webp" alt="" />
      </locator-wrap>
    </locator-tip>
  );
}

export default function StartLayout({
  children,
  aside,
}: {
  readonly children: ComponentChildren;
  readonly aside?: ComponentChildren;
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
        {aside ?? <DefaultAside />}
      </div>
    </locator-layout>
  );
}
