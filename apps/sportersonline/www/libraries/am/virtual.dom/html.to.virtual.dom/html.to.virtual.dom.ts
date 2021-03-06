// based on: https://raw.githubusercontent.com/andrejewski/himalaya

import { lexer}  from './lexer';
import { parser } from './parser';

/*
  Tags which contain arbitary non-parsed content
  For example: <script> JavaScript should not be parsed
*/
const childlessTags = ['style', 'script', 'template'];

/*
  Tags which auto-close because they cannot be nested
  For example: <p>Outer<p>Inner is <p>Outer</p><p>Inner</p>
*/
const closingTags = [
  'html', 'head', 'body', 'p', 'dt', 'dd', 'li', 'option',
  'thead', 'th', 'tbody', 'tr', 'td', 'tfoot', 'colgroup'
];

/*
  Tags which do not need the closing tag
  For example: <img> does not need </img>
*/
const voidTags = [
  '!doctype', 'area', 'base', 'br', 'col', 'command',
  'embed', 'hr', 'img', 'input', 'keygen', 'link',
  'meta', 'param', 'source', 'track', 'wbr'
];

const parseDefaults = {
  voidTags,
  closingTags,
  childlessTags
};

export function convertHtmlToVirtualDom (str: string, options = parseDefaults) {
  const tokens = lexer(str, options);
  const nodes = parser(tokens, options);
  return nodes;
}