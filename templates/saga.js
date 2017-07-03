module.exports = `import { takeEvery, put, select } from 'redux-saga/effects'

import {
    <%=actionName %>,
} from '../actions'

function* <%=name%>() {

}

export function* <%=sagaName%>() {
    yield takeEvery(<%=actionName%>, <%=name%>);
}`;
