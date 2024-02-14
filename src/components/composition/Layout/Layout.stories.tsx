import type { Meta, StoryObj } from '@storybook/preact';

import LayoutComponent from './Layout';

const meta: Meta = {
  component: LayoutComponent,
};

export default meta;

export const Layout: StoryObj = {
  render: () => (
    <locator-layout>
      <header slot="header">Header</header>
      <div slot="main">
        <h2>Main</h2>
        <p>This is the main content part of the layout</p>
        <p>
          Don&apos;t use a &lt;h1&gt; tag for titles because the widget might be
          included on a page that already has a h1.
        </p>
        <p>
          Don&apos;t use a &lt;main&gt; tag, because there&apos;s only supposed
          to be one main tag per html document, the widget might be put on a
          page that already has a main.
        </p>
        <p>
          The header can use a &lt;header&gt; tag though, because the widget
          renders inside an &lt;article&gt;
        </p>
        <p>
          If this content gets too long, it will scroll, but the header is
          sticky so it’ll stay in place.
        </p>
        <p>Scroll to see.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>See?</p>
      </div>
      <aside slot="aside">
        <p>This is an optional aside for hints and stuff</p>
      </aside>
    </locator-layout>
  ),
};
