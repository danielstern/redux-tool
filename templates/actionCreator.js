module.exports = `import { makeActionCreator } from '../utility';
export const <%= upper %> = "<%= upper %>";
export const <%= camel %> = makeActionCreator(<%= upper %>,"<%= variable %>");
`;