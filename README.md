<h1>Redux Tool
<img src="https://cloud.githubusercontent.com/assets/4268152/26364385/2af2943c-3fb2-11e7-84ce-ff3d792ea273.png" height="48">
</h1>
![promo-full](https://cloud.githubusercontent.com/assets/4268152/26363752/fecc6b14-3faf-11e7-9e93-a22c2a0ce73c.gif)

## About

Redux-Tool, an *unopinionated* helper to create your Redux files for you, handling all the boilerplate. Redux apps are great, but often creating just one new user interaction requires touching 8, 9, even 10 or more files. This tool lets you automate that process easily.

Redux-Tool does all the repetitive tasks necessary to create your app,
- Creates all necessary new folders and up-to-date index files for those folders
- Creates new files using customizable boilerplate
- Uses all latest ES6 syntax
- Automatically creates utilities as required

## Installation
`npm install -g redux-tool`

This makes the following commands available in the command line,

```
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
To change the templates, create a `redux-tool-config.js` file and indicate the templates there. See the [`redux-tool-config.js`](redux-tool-config.js) of this repository for a full example.

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
#### `redux-tool-selector [propertyName]`
Creates a new selector in the selectors folder that selects `propertyName`. Also updates the index. The basic generated selector is meant to be modified but sometimes is enough on its own.
##### Example
```
redux-tool-selector tax
```
###### selectors/taxSelector.js
```javascript
import { createSelector } from 'reselect'
export const taxSelector = createSelector(
   state=>state.tax,
   tax=>tax
)
```

#### `redux-tool-component [componentName]`
Creates a new directory `componentName` in the components folder. Creates display and container React-Redux components and updates the index.
##### Example
 ```
redux-tool-component TaxWidget
```
###### components/TaxWidget/TaxWidgetContainer.js

```javascript
import { connect } from 'react-redux'
import {
    TaxWidgetDisplay
} from './TaxWidgetDisplay';
   
[...]

export const TaxWidgetContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TaxWidgetDisplay);
```

###### components/TaxWidget/TaxWidgetDisplay.jsx
```jsx harmony
import React from 'react'
export const TaxWidgetDisplay = ({})=>(
    <div>
        
    </div>
);
```

#### `redux-tool-action [actionName] [argumentName]`
Creates a new action creator and constant based on `actionName`. The action and the constant are both exported. A property name can be added to the action with `argumentName` (optional).
##### Example
 ```shell
redux-tool-action changeTax rate
```
###### actions/changeTax.js
```javascript
import { makeActionCreator } from '../utility';
export const CHANGE_TAX = "CHANGE_TAX";
export const changeTax = makeActionCreator(CHANGE_TAX,"rate");
```

###### actions/index.js
```javascript
export { changeTax , CHANGE_TAX } from './changeTax';
```

#### `redux-tool-reducer [propertyName] [defaultValue=0]`
Creates a new reducer for the state property `propertyName`. A `defaultValue` can be defined, or it is automatically set to 0.
##### Example
 ```
redux-tool-reducer taxRate
```
###### reducers/taxRate.js
```javascript
import { createReducer } from './../utility';
export const taxRate = createReducer(0, {
    ["ACTION_NAME"](state,action) {
        return state;
    }
});
```

#### `redux-tool-saga [sagaName] [actionName="ACTION_NAME"]`
Creates a saga called `sagaName`, importing an optional action name.
##### Example
```
redux-tool-saga updateTaxRates changeLocale
```

###### sagas/updateTaxRatesSaga.js
```javascript
import { takeEvery } from 'redux-saga/effects'

import {
    CHANGE_LOCALE,
} from './../actions'

function* updateTaxRates() {

}

export function* updateTaxRatesSaga() {
    yield takeEvery(CHANGE_LOCALE, updateTaxRates);
}
```


### Contributing
All contributions are warmly encouraged! If you already have something to contribute, just go ahead and open a PR.
If you're not sure what to contribute, open an issue and let us know you're here to help.
