module.exports = `import { createSelector } from 'reselect'
export const <%= name %>Selector = createSelector(
   state=>state.<%= name %>,
   <%= name %>=><%= name %>
)`;