#!/usr/bin/env node

const argv = require('optimist').argv;
const fs = require('fs');
const { template } = require('lodash');
const selectorTemplate = require('../templates/selector');

const s = require('underscore.string');
const name = argv._[0];
if (!name) {
    throw new Error("No name is specified for this selector. Specify one like so: redux-tool-selector taxAmount");
}

const camel = s.camelcase(name);
const filename = `${camel}Selector.js`;
const path = './src/selectors/';
const joined = path + filename;
const indexPath = `${path}index.js`;
const selectorName = `${camel}Selector`;
const fileHTML = template(selectorTemplate)({camel});
console.log(fileHTML);
return;
const exportStatement = `export { ${selectorName} } from './${selectorName}'
`
console.log(exportStatement);
console.log(fileHTML);
console.log(`File contents:`);
fs.writeFile(joined,fileHTML,(cb)=>{
    console.log(`File "${joined}" created. Thank you for being cool!`);

});

fs.readFile(indexPath, "utf8", (err,data)=>{
    if (data.includes(camel)){
        console.log(`Not modifying index, string ${camel} detected inside index file.`)
        return;
    };
    const newHTML = `${data}${exportStatement}
`;

    console.log("Generated new index.js...",newHTML);
    fs.writeFile(indexPath,newHTML,()=>{

        console.log("Thank you!");
    });
})