#!/usr/bin/env node

const { argv } = require('optimist');
const { template } = require('lodash');
const config = require('./../utility/getConfig')();
const writeIndex = require('./../utility/writeIndex');

const {
    path,
    templates,
    folderNames
} = config;

const componentDisplayTemplate = templates.componentDisplay;
const componentContainerTemplate = templates.componentContainer;
const componentFolderName = folderNames['components'];

const name = argv._[0];
const variable = argv._[1];

if (!name) {
    throw new Error("No name is specified for this component. Specify one like so: redux-tool-component taxAmount");
}

const { capitalized } = require('./../utility/toMultipleCases')(name);
const indexPath = `${path}${componentFolderName}/`;
const folderPath = `${indexPath}${capitalized}/`;

const createComponentFile = (context,componentTemplate, ext, cb) =>{

    const componentName = `${capitalized}${context}`;
    const filename = `${componentName}.${ext}`;

    const newFilePath = folderPath + filename;
    const fileHTML = template(componentTemplate)({name:capitalized});
    const writeFiles = require('./../utility/writeFiles');

    writeFiles({
        folderPath,
        newFilePath,
        fileHTML,
        name:componentName
    },cb);

};

createComponentFile("Display",componentDisplayTemplate,'jsx',()=>{
    createComponentFile("Container",componentContainerTemplate,'js',()=>{
        console.log(indexPath);
        writeIndex(indexPath,`${capitalized}Container`,()=>{
            console.log("Index file updated. Thank you!");
        },`${capitalized}/`);
        console.log("Created component");
    });
});

