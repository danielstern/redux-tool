const fs = require('fs');
const mkdirp = require('mkdirp');
const writeFiles = require('./writeFiles');
const {
    path,
} = require('./getConfig')();

const generateUtilities = ()=>{
    const folderPath = `${path}utility/`;
    const indexPath = `${folderPath}index.js`;
    const macPath = `${folderPath}makeActionCreator.js`;
    const reducerPath = `${folderPath}createReducer.js`;

    fs.readFile(indexPath, "utf8", (err,data)=>{
        if (err) {
            console.log("Creating utilities directory.");
            mkdirp(`${path}utility`,(err)=> {
                fs.writeFile(indexPath, "", () => {
                    generateUtilities();
                });
            });
        } else {
            const writeCreateReducer = ()=>{
                fs.readFile(reducerPath, "utf8", (err,data)=>{
                    if (err || data === "") {
                        writeFiles({
                            folderPath,
                            newFilePath:reducerPath,
                            fileHTML:createReducer,
                            name:`createReducer`
                        });
                    } else {
                        console.log("Not creating create reducer",data);
                    }
                });
            };
            fs.readFile(macPath, "utf8", (err,data)=>{
                if (err || data == "") {
                    writeFiles({
                        folderPath,
                        newFilePath:macPath,
                        fileHTML:makeActionCreator,
                        name:`makeActionCreator`
                    },writeCreateReducer);
                }
            });
        }
    });
};
module.exports = generateUtilities;

const makeActionCreator = `export const makeActionCreator = (type, ...argNames) => {
    return function(...args) {
        let action = { type };
        argNames.forEach((arg, index) => {
            action[argNames[index]] = args[index]
        });
        return action
    }
};`;

const createReducer = `export const createReducer = (initialState, handlers)=>{
    return function reducer(state = initialState, action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action)
        } else {
            return state
        }
    }
};`;