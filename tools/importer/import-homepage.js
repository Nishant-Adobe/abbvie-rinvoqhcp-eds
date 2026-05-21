/**
 * Import script for the RINVOQ HCP homepage template.
 * Combines transformers and parsers to convert the source page into EDS content.
 */
import cleanup from './transformers/cleanup.js';
import sections from './transformers/sections.js';
import { matches as heroHomepage } from './parsers/hero-homepage.js';
import columnsIndication from './parsers/columns-indication.js';
import cardsSupport from './parsers/cards-support.js';

export default {
  transformers: [cleanup, sections],
  parsers: [
    { parse: heroHomepage.default, matches: heroHomepage.matches },
    { parse: columnsIndication.default, matches: columnsIndication.matches },
    { parse: cardsSupport.default, matches: cardsSupport.matches },
  ],
  template: 'homepage',
  urls: ['https://www.rinvoqhcp.com/'],
};
