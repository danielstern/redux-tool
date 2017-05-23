module.exports = `import { createReducer } from './../utility';
export const <%=name %> = createReducer(<%=defaultValue%>, {
    ["ACTION_NAME"](state,action) {
        return state;
    }
});`;