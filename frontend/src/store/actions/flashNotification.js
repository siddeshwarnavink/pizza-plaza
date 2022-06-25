import * as actionType from './actionTypes';

const pushNotifaction = (newMessage) => ({
    type: actionType.PUSH_NOTIFICATION,
    newMessage
});

const editNotificaction = (id, changes) => ({
    type: actionType.EDIT_NOTIFICATION,
    id,
    changes
})

export const removeNotification = id => dispatch => {
    dispatch(editNotificaction(id, { visible: false }));
    setTimeout(() => {
        dispatch({
            type: actionType.REMOVE_NOTIFICATION,
            id
        });
    }, 2000);
};

export const pushNewFlashMessage = (newMessage) => (dispatch, getState) => {
    const newMessageIndex = getState().flashNotification.messages.length;
    dispatch(pushNotifaction({
        ...newMessage,
        visible: true
    }));
    const newMessageId = getState().flashNotification.messages[newMessageIndex].id;

    setTimeout(() => {
        dispatch(removeNotification(newMessageId));
    }, 2000);
}