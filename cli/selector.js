#!/usr/bin/env node

const { argv } = require('optimist');
const { template } = require('lodash');
const config = require('./../utility/getConfig')();
const fs = require('fs');

const mkdirp = require('mkdirp');
const s = require('underscore.string');

const {
    path,
    templates,
} = config;

const selectorTemplate = templates.selector;

const name = argv._[0];
if (!name) {
    throw new Error("No name is specified for this selector. Specify one like so: redux-tool-selector taxAmount");
}



const camel = s.camelcase(name);
const selectorName = `${camel}Selector`;
const filename = `${selectorName}.js`;
const folderPath = `${path}selectors/`;
const newFilePath = folderPath + filename;

const fileHTML = template(selectorTemplate)({name:camel});
const writeIndex = require('./../utility/writeIndex');

mkdirp(folderPath,(err)=>{
    if (err) throw err;
    fs.writeFile(newFilePath,fileHTML,()=>{
        console.log(`Created ${newFilePath}`);
        writeIndex(folderPath,selectorName,()=>{
            console.log("Index file updated. Thank you!");
        });
    });
});