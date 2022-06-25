import * as actionTypes from '../actions/actionTypes';
import flashNotificationReducer from './flashNotification';

const myState = {
    foo: 'bar',
    messages: [{ id: 'a' }, { id: 'b' }, { id: 'c' }]
};

describe('flashNotification reducer', () => {
    test('should add new item when PUSH_NOTIFICATION action is dispatched', () => {
        const newState = flashNotificationReducer(myState, {
            type: actionTypes.PUSH_NOTIFICATION,
            newMessage: { id: 'd' }
        });

        expect(newState.messages.length).toBe(4);
        expect(newState.messages[3].id).toBe('d');
        expect(newState.foo).toBe('bar');
    });

    test('should remove item when REMOVE_NOTIFICATION action is dispatched', () => {
        const newState = flashNotificationReducer(myState, {
            type: actionTypes.REMOVE_NOTIFICATION,
            id: 'b'
        });

        expect(newState.messages.length).toBe(2);
        expect(newState.messages[1].id).toBe('c');
        expect(newState.foo).toBe('bar');
    });

    test('should update item when EDIT_NOTIFICATION action is dispatched', () => {
        const newState = flashNotificationReducer(myState, {
            type: actionTypes.EDIT_NOTIFICATION,
            id: 'b',
            changes: { isUpdated: true }
        });

        expect(newState.messages.length).toBe(3);
        expect(newState.messages[1].isUpdated).toBe(true);
        expect(newState.foo).toBe('bar');
    });
});