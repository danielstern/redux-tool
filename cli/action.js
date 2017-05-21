#!/usr/bin/env node

const { argv } = require('optimist');
const { template } = require('lodash');
const config = require('./../utility/getConfig')();

const {
    path,
    templates,
    folderNames
} = config;

const actionCreatorTemplate = templates.actionCreator;
const actionCreatorFolderName = folderNames['actionCreators'];

const name = argv._[0];
if (!name) {
    throw new Error("No name is specified for this actionCreator. Specify one like so: redux-tool-actionCreator taxAmount");
}

const { camel } = require('./../utility/toMultipleCases')(name);
const actionCreatorName = `${camel}`;
const filename = `${actionCreatorName}.js`;
const folderPath = `${path}${actionCreatorFolderName}/`;
const newFilePath = folderPath + filename;
const fileHTML = template(actionCreatorTemplate)({name:camel});
const writeFiles = require('./../utility/writeFiles');

writeFiles({
    folderPath,
    newFilePath,
    fileHTML,
    name:actionCreatorName
});
