module.exports = {
    path:'./src/', // the path to the directory where folders and file will be created in, typically "path" but sometimes "app",
    templates:{
        selector:require('./templates/selector'),
        exportStatement: require('./templates/exportStatement'),
        actionCreator:require('./templates/actionCreator')
    },
    folderNames:{
        selectors:'selectors',
        actionCreators:'actions',
        reducers:'reducers'
    }
};