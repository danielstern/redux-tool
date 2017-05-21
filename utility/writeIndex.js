const fs = require('fs');
const { template } = require('lodash');
const config = require('./../utility/getConfig')();
const {
    templates,
} = config;
const exportStatementTemplate = templates.exportStatement;

module.exports = (directory,name,cb)=>{
    const indexPath = `${directory}index.js`;
    fs.readFile(indexPath, "utf8", (err,data)=>{
        if (data === undefined) {
            data = "";
        }
        if (data.includes(name)){
            console.log(`Not modifying index.file for ${name}. We detected the string "${name}" inside the index file so we assumed a reference already existed.`)
            return;
        }

        const exportStatement = template(exportStatementTemplate)({name});
        // console.log(exportStatement,name,exportStatementTemplate);
        // return;
        const newHTML = `${data}${exportStatement}`;
        fs.writeFile(indexPath,newHTML,()=>{
            cb();
        });
    })
};