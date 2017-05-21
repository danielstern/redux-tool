module.exports = `import { makeActionCreator } from '../utility';
export const <%= upper %> = "<%= upper %>";
export const <%= name %> = makeActionCreator(<%= upper %>,"<%= variable %>");
`;