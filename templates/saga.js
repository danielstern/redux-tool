module.exports = `import { takeEvery } from 'redux-saga/effects'

import {
    <%=actionName %>,
} from './../actions'

function* <%=name%>() {

}

export function* <%=sagaName%>() {
    yield takeEvery(<%=actionName%>, <%=name%>);
}`;