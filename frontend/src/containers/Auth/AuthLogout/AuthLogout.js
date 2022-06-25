import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { useEffect } from 'react';

import * as actions from '../../../store/actions';

const AuthLogout = props => {
    useEffect(() => {
        props.onLogout();

        props.pushNewFlashMessage({
            text: "Logout successfully",
            type: 'info'
        });
    });

    return (
        <Navigate to="/" replace />
    );
};

const mapDispatchToProps = dispatch => ({
    onLogout: () => dispatch(actions.logout()),
    pushNewFlashMessage: (newMessage) => dispatch(actions.pushNewFlashMessage(newMessage)),
});

export default connect(
    null,
    mapDispatchToProps
)(AuthLogout);