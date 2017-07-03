module.exports = `import { createReducer } from '../utility';
import { ACTION_NAME } from '../actions'

export const <%=name %> = createReducer(<%=defaultValue%>, {
    [ACTION_NAME](state,{value}) {
        return state;
    }
});`;