import { PaperButtonElement } from '@polymer/paper-button/paper-button.js';
import { Button } from '@material/mwc-button'
import { Icon } from '@material/mwc-icon'
import '@polymer/iron-icon/iron-icon.js';
import { For } from 'solid-js/dom'

type Partial<T> = {
  [P in keyof T]?: T[P];
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "mwc-button": HTMLAttributes<Button> & Partial<Button>,
      "mwc-icon": HTMLAttributes<Icon>
    }
  }
}

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}