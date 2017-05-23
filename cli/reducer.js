#!/usr/bin/env node

const { argv } = require('optimist');
const { template } = require('lodash');
const config = require('./../utility/getConfig')();
require('./../utility/generateUtilities')();

const {
    path,
    templates,
    folderNames
} = config;

const reducerTemplate = templates.reducer;
const reducerFolderName = folderNames['reducers'];

const name = argv._[0];
const defaultValue = argv._[1] || 0;
if (!name) {
    throw new Error("No name is specified for this reducer. Specify one like so: redux-tool-reducer taxAmount");
}

const { camel } = require('./../utility/toMultipleCases')(name);
const reducerName = `${camel}`;
const filename = `${reducerName}.js`;
const folderPath = `${path}${reducerFolderName}/`;
const newFilePath = folderPath + filename;
const fileHTML = template(reducerTemplate)({name:camel,defaultValue});
const writeFiles = require('./../utility/writeFiles');

writeFiles({
    folderPath,
    newFilePath,
    fileHTML,
    name:reducerName
});