module.exports = `import { createSelector } from 'reselect'
export const <%= name %>Selector = createSelector(
   state=>state.get(`<%= name %>`),
   <%= name %>=><%= name %>
)`;
