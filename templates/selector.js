module.exports = `import { createSelector } from 'reselect'
export const <%= camel %>Name = createSelector(
   state=>state.<%= camel %>,
   <%= camel %>=><%= camel %>
)`;