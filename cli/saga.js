#!/usr/bin/env node

const { argv } = require('optimist');
const { template } = require('lodash');
const config = require('./../utility/getConfig')();

const {
    path,
    templates,
    folderNames
} = config;

const sagaTemplate = templates.saga;
const sagaFolderName = folderNames['sagas'];

const name = argv._[0];
const actionName = argv._[1] || "actionName";
if (!name) {
    throw new Error("No name is specified for this saga. Specify one like so: redux-tool-saga taxAmount");
}

const { camel } = require('./../utility/toMultipleCases')(name);
const actionNameUpper = require('./../utility/toMultipleCases')(actionName).upper;
const sagaName = `${camel}Saga`;
const filename = `${sagaName}.js`;
const folderPath = `${path}${sagaFolderName}/`;
const newFilePath = folderPath + filename;
const fileHTML = template(sagaTemplate)({sagaName,actionName:actionNameUpper,name:camel});
const writeFiles = require('./../utility/writeFiles');

writeFiles({
    folderPath,
    newFilePath,
    fileHTML,
    name:sagaName,
});