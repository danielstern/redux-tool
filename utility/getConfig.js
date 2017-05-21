module.exports = ()=>{
    const { merge } = require('lodash');
    let config = require('./../redux.tool.config');
    try {
        const path = require('path');
        const configPath = path.join(process.cwd(), '/redux.tool.config.js');
        let externalConfig = require(configPath);
        config = merge(config,externalConfig);
    } catch (e) {

    }
    return config;
};
