const mkdirp = require('mkdirp');
const fs = require('fs');
const writeIndex = require('./writeIndex');

module.exports = ({
    folderPath,
    newFilePath,
    fileHTML,
    name,
    secondaryStatement
},cb) =>{
    mkdirp(folderPath,(err)=>{
        if (err) throw err;
        fs.writeFile(newFilePath,fileHTML,()=>{
            console.log(`Created ${newFilePath}`);
            writeIndex(folderPath,name,()=>{
                console.log("Index file updated. Thank you!");
                if (cb) {
                    cb();
                }
            }, undefined, secondaryStatement);
        });
    });
};
