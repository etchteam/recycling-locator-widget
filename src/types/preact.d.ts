import 'preact';
import { SectionAttributes } from '@etchteam/diamond-ui/canvas/Section/Section';
import { FormGroupAttributes } from '@etchteam/diamond-ui/composition/FormGroup/FormGroup';
import { GridAttributes } from '@etchteam/diamond-ui/composition/Grid/Grid';
import { GridItemAttributes } from '@etchteam/diamond-ui/composition/Grid/GridItem';
import { WrapAttributes } from '@etchteam/diamond-ui/composition/Wrap/Wrap';
import { ButtonAttributes } from '@etchteam/diamond-ui/control/Button/Button';
import { InputAttributes } from '@etchteam/diamond-ui/control/Input/Input';

import { CustomElement } from './custom-element';

/**
 * Tell Preact to stop complaining about unknown elements.
 * Diamond components should be added in here for typing.
 */
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      // composition
      'diamond-wrap': CustomElement<Partial<WrapAttributes>>;
      'diamond-grid': CustomElement<GridAttributes>;
      'diamond-grid-item': CustomElement<GridItemAttributes>;
      'diamond-form-group': CustomElement<FormGroupAttributes>;
      'diamond-section': CustomElement<SectionAttributes>;
      // control
      'diamond-input': CustomElement<InputAttributes>;
      'diamond-button': CustomElement<ButtonAttributes>;

      [key: string]: CustomElement<{ [key: string]: unknown }>;
    }
  }
}
