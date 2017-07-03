module.exports = `import { takeEvery, put, select } from 'redux-saga/effects'

import {
    <%=actionName %>,
} from '../actions'

import {

} from '../selectors'

function* <%=name%>() {

}

export function* <%=sagaName%>() {
    yield takeEvery(<%=actionName%>, <%=name%>);
}`;
