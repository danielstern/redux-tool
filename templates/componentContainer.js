module.exports = `import { connect } from 'react-redux'
import {
    <%=name %>Display
} from './<%=name%>Display';

import {
    
} from './../../actions'

import {
    
} from './../../selectors'

const mapStateToProps = (state) => {
    return {
        
    }
};
const mapDispatchToProps = (dispatch) => ({
    
});

export const <%=name%>Container = connect(
    mapStateToProps,
    mapDispatchToProps
)(<%=name%>Display);`;