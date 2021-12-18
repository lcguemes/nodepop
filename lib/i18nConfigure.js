const i18n = require('i18n');
const path = require('path');
//const { syncIndexes } = require('../models/Anuncio');

i18n.configure({
    locales:['es','en'],
    directory: path.join(__dirname, '..','locales'),
    defaultLocale: 'en',
    autoReload: true, // watch cfor chages in JSON files to reload locale on update - defaults to false
    syncFiles: true, // sync locale information across all files - defaults to false
    cookie:'nodepop-locale'
});

// para utilizar i18n en scripts
i18n.setLocale('en');

module.exports = i18n;