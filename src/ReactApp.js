import * as Helpers from './helpers';

const textEle = {
  type: 'TEXT_ELEMENT',
  props: { nodeValue: 'Hello world'}
}

const container = document.getElementById('root');

Helpers.render(textEle, container);
