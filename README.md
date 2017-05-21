# Redux Tool
## Problem
Redux apps are great, but often creating just one new part of the state requires touching 8, 9, even 10 or more files. I wish I was kidding.

## Solution
Redux-Tool, an *unopinionated* helper to create your Redux files for you, handling all the boilerplate (so prone to troublesome human error) and letting you write your app in peace.

## Installation
`npm install -g redux-tool`

## Usage
Redux tool is run from the command line.
It creates necessary files for a React-Redux application and updates the index. 
It assumes you are using ES6 with `import` statements.

Example:
`redux-tool-selector taxAmount`
 
 Description: Create a file `./src/selectors/taxAmountSelector.js` and updates the index of the `./src/selectors/` directory. 
 