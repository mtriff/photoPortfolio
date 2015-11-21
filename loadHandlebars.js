Handlebars.registerHelper('toFolder', function toFolder(folderName) {
  return folderName.replace(' ', '_');
});

Handlebars.registerHelper('concatPath', function concatPath(parentFolder, childFolder) {
  return parentFolder + '/' + childFolder;
});

Handlebars.registerPartial('listSubfolders', '' +
  '{{#if submenu}}' +
    '<ul data-menu=\"submenu-{{submenu}}\" class=\"menu__level\">' +
    '{{#each subdirs}}' +
      '<li class=\"menu__item\">' +
        '<a class=\"menu__link\" {{#if submenu}}data-submenu=\"submenu-{{submenu}}\"{{/if}} href=\"#\">{{name}}</a>' +
      '</li>' + 
    '{{/each}}' +
    '</ul>' +
    '{{#each subdirs}}' +
      '{{> listSubfolders this}}' +
    '{{/each}}' +
  '{{/if}}');

Handlebars.registerPartial('listImages', '' +
  '{{#if submenu}}' +
    '{{#each subdirs}}' +
      '"{{name}}": "{{#each photos}}<div class=\\\"photo\\\"><a href=\\\"{{../pathTo}}{{toFolder ../name}}/{{file}}\\\" title=\\\"{{title}}\\\"><img src=\\\"{{../thumbnailPathTo}}{{toFolder ../name}}/{{file}}\\\"></a></div>{{/each}}",\n' +
    '{{/each}}' +
  '{{/if}}' +
  '{{#each subdirs}}' +
    '{{> listImages this}}' +
  '{{/each}}');

indexTemplate = fs.readFileSync('handlebars/index.hbs', 'UTF8');
index = Handlebars.compile(indexTemplate);

dataTemplate = fs.readFileSync('handlebars/imageData.hbs', 'UTF8')
data = Handlebars.compile(dataTemplate);