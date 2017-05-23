# Redux Tool
## Problem
Redux apps are great, but often creating just one new user interaction requires touching 8, 9, even 10 or more files.

## Solution
Redux-Tool, an *unopinionated* helper to create your Redux files for you, handling all the boilerplate .

Redux-Tool does all the repetitive tasks necessary to create your app,
- Creates all necessary new folders and up-to-date index files for those folders
- Creates new files using customizable boilerplate
- Uses all latest ES6 syntax
- Automatically creates utilities as required

## Installation
`npm install -g redux-tool`

This creates the following commands available in the command line,

```shell
redux-tool-selector [propertyName]
redux-tool-action [actionName] [argumentName]
redux-tool-reducer [propertyName] [defaultValue=0]
redux-tool-component [componentName]
redux-tool-saga [sagaName] [actionName="ACTION_NAME"]
```

Executing these commands will create boilerplate Redux code relative to the directory they are executed from.

## Usage
**Please note that you should always quickly commit your progress before using any CLI tool**

Redux tool is run from the command line.
It creates necessary files for a React-Redux application and updates the index. 
It assumes you are using ES6 with `import` statements.

Example:
`redux-tool-selector taxAmount`
 
Description: Create a file `./src/selectors/taxAmountSelector.js` and updates the index of the `./src/selectors/` directory.
  
###  Changing Templates
To change the templates, simply create a `redux-tool-config.js` file and indicate the templates there. See the `redux-tool-config.js` of this repository for a full example.

```javascript
module.exports = {
    templates:{
        selector:require('./templates/selector'),
    },
};
```
 
Templates are standard lodash-style templates. E.g,
 ```javascript
`export { <%= name %>} } from './<%= name %>';`
```

### Commands

