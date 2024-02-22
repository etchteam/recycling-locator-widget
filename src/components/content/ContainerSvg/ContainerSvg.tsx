import { Suspense, lazy } from 'preact/compat';
import register from 'preact-custom-element';

import { CustomElement } from '@/types/customElement';
import { ContainerName } from '@/types/locatorApi';

// The blank svg takes up the same space as a wheeled bin would whilst the icon is loading
import BlankSvg from './svg/blank.svg?react';

export interface ContainerSvgAttributes {
  readonly name: ContainerName;
  readonly lidColour?: string;
  readonly bodyColour?: string;
  readonly label?: string;
}

const containerNameToSvgName: { [key in ContainerName]: string } = {
  Box: 'box',
  'Communal Wheeled Bin': 'communal-bin',
  'Householder Provided Carrier Bag': 'carrier-bag',
  'Inner Caddy': 'inner-caddy',
  'Kerbside Caddy': 'kerbside-caddy',
  'Kitchen Caddy': 'kitchen-caddy',
  'Reusable Sack': 'sack',
  'Non-Reusable Sack': 'sack',
  'Wheeled Bin': 'wheeled-bin',
  Trollibox: 'trollibox',
};

function ContainerSvg({
  name,
  lidColour = '#2d9cdb',
  bodyColour = '#2d9cdb',
  label,
}: ContainerSvgAttributes) {
  const cssVariables = {
    '--lid-colour': lidColour ? lidColour : 'transparent',
    '--body-colour': bodyColour,
  };

  const ContainerIconSvg = lazy(
    () => import(`./svg/${containerNameToSvgName[name]}.svg?react`),
  );

  return (
    <Suspense fallback={BlankSvg}>
      <ContainerIconSvg
        className="container-svg"
        aria-label={label}
        aria-hidden={!label}
        style={cssVariables}
      />
    </Suspense>
  );
}

register(ContainerSvg, 'locator-container-svg', [
  'name',
  'displayName',
  'lid-colour',
  'body-colour',
  'label',
]);

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'locator-container-svg': CustomElement<ContainerSvgAttributes>;
    }
  }
}
