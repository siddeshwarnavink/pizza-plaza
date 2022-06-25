import randomIdGenerator from '../../utils/randomIdGenerator';
import * as actionType from '../actions/actionTypes';

const initialState = {
    messages: []
};

const pushNotification = (state, action) => ({
    ...state,
    messages: [
        ...state.messages,
        {
            id: randomIdGenerator(),
            ...action.newMessage
        }
    ]
});

const removeNotification = (state, action) => ({
    ...state,
    messages: state.messages.filter(messageItem => messageItem.id !== action.id)
});

const editNotificaction = (state, action) => ({
    ...state,
    messages: state.messages.map(messageItem => {
        if (messageItem.id !== action.id) return messageItem;

        return {
            ...messageItem,
            ...action.changes
        }
    })
})

const flashNotificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.PUSH_NOTIFICATION:
            return pushNotification(state, action);

        case actionType.REMOVE_NOTIFICATION:
            return removeNotification(state, action);

        case actionType.EDIT_NOTIFICATION:
            return editNotificaction(state, action);

        default:
            return state;
    }
};

export default flashNotificationReducer;