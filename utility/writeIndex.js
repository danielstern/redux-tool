const fs = require('fs');
const { template, trim } = require('lodash');
const config = require('./../utility/getConfig')();
const {
    templates,
} = config;
const exportStatementTemplate = templates.exportStatement;

module.exports = (directory,name,cb,folderPath,secondaryStatement)=>{
    const indexPath = `${directory}index.js`;
    fs.readFile(indexPath, "utf8", (err,data)=>{
        let exportStatement = template(exportStatementTemplate)({name,folderPath:folderPath || name,secondaryStatement:secondaryStatement || ""});
        if (data === undefined) {
            data = "";
            exportStatement = trim(exportStatement);
        }
        if (data.includes(name)){
            console.log(`Not modifying index.file for ${name}. We detected the string "${name}" inside the index file so we assumed a reference already existed.`)
            cb();
            return;
        }


        const newHTML = `${trim(data)}${exportStatement}`;
        fs.writeFile(indexPath,newHTML,()=>{
            cb();
        });
    })
};