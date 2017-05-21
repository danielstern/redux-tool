#!/usr/bin/env node

const { argv } = require('optimist');
const { template, assign } = require('lodash');
let config = require('./../redux.tool.config');
const fs = require('fs');

const mkdirp = require('mkdirp');
const s = require('underscore.string');
const selectorTemplate = require('../templates/selector');
const exportStatementTemplate = require('./../templates/exportStatement');

// const dir = process.cwd;
try {
    const path = require('path');
    // const config = require(`${dir}/redux.tool.config.js`);
    console.log("Located local configuration.");
    const configPath = path.join(path.dirname(fs.realpathSync(__filename)), '../redux.tool.config.js');
    let externalConfig = require(configPath);
    config = assign(config,externalConfig);
    console.log(configPath, config);
} catch (e) {
    console.log("Could not find config file, using defaults.",e);

}
const {
    path
} = config;
// fs.readFile(dir/, "utf8", (err,data)=>{
// console.log(process.cwd());
// return;

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

