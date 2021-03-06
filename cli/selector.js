#!/usr/bin/env node

const { argv } = require('optimist');
const { template } = require('lodash');
const config = require('./../utility/getConfig')();

const {
    path,
    templates,
    folderNames
} = config;

const selectorTemplate = templates.selector;
const selectorFolderName = folderNames['selectors'];

const name = argv._[0];
if (!name) {
    throw new Error("No name is specified for this selector. Specify one like so: redux-tool-selector taxAmount");
}

const { camel } = require('./../utility/toMultipleCases')(name);
const selectorName = `${camel}Selector`;
const filename = `${selectorName}.js`;
const folderPath = `${path}${selectorFolderName}/`;
const newFilePath = folderPath + filename;
const fileHTML = template(selectorTemplate)({name:camel});
const writeFiles = require('./../utility/writeFiles');

writeFiles({
    folderPath,
    newFilePath,
    fileHTML,
    name:selectorName
});
