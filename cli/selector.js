#!/usr/bin/env node

const { argv } = require('optimist');
const { template, assign, merge } = require('lodash');
let config = require('./../redux.tool.config');
const fs = require('fs');

const mkdirp = require('mkdirp');
const s = require('underscore.string');
const selectorTemplate = require('../templates/selector');
const exportStatementTemplate = require('./../templates/exportStatement');

// const dir = process.cwd;
try {
    const path = require('path');
    const configPath = path.join(process.cwd(), '/redux.tool.config.js');
    let externalConfig = require(configPath);
    config = merge(config,externalConfig);
    console.log("Located local configuration.");

} catch (e) {
    console.log("Could not find config file, using defaults.",e);

}

const {
    path
} = config;

const name = argv._[0];
if (!name) {
    throw new Error("No name is specified for this selector. Specify one like so: redux-tool-selector taxAmount");
}

const camel = s.camelcase(name);
const filename = `${camel}Selector.js`;
const folderPath = `${path}selectors/`;
const joined = folderPath + filename;
const indexPath = `${folderPath}index.js`;
const selectorName = `${camel}Selector`;
const fileHTML = template(selectorTemplate)({camel});
const exportStatement = template(exportStatementTemplate)({name:selectorName});

mkdirp(folderPath,(err)=>{
    if (err) throw err;
    fs.writeFile(joined,fileHTML,()=>{
        console.log(`File "${joined}" created.`);

        fs.readFile(indexPath, "utf8", (err,data)=>{
            if (data === undefined) {
                data = "";
            }
            if (data.includes(camel)){
                console.log(`Not modifying index.file for ${selectorName}. We detected the string "${camel}" inside the index file so we assumed a reference already existed.`)
                return;
            }
            const newHTML = `${data}${exportStatement}`;
            fs.writeFile(indexPath,newHTML,()=>{
                console.log("Index file updated. Thank you!");
            });
        })
    });
});

