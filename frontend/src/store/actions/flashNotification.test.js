import * as actionTypes from './actionTypes';
import { pushNewFlashMessage, removeNotification } from './flashNotification';

describe('flashNotification actions', () => {
    test('removeNotification should trigger both EDIT_NOTIFICATION and REMOVE_NOTIFICATION', () => {
        let actionTypeDispatched = [];

        const mockDispatch = (action) => {
            actionTypeDispatched.push(action.type);
        }

        window.setTimeout = (callback, _) => callback();

        removeNotification(0)(mockDispatch);

        expect(actionTypeDispatched[0]).toBe(actionTypes.EDIT_NOTIFICATION);
        expect(actionTypeDispatched[1]).toBe(actionTypes.REMOVE_NOTIFICATION);
    });


    test('pushNewFlashMessage should trigger PUSH_NOTIFICATION and trigger removeNotification', () => {
        let actionTypeDispatched = [];
        let notificationMessages = [
            { id: 'abc', text: 'my message!' },
        ]

        const mockDispatch = (action) => {

            if (typeof action === "function") {
                actionTypeDispatched.push(true);
            } else {
                if (action.type === actionTypes.PUSH_NOTIFICATION) {
                    notificationMessages.push({ id: 'def' })
                }
                actionTypeDispatched.push(action.type);
            }
        }
        const mockGetState = () => ({
            flashNotification: {
                messages: notificationMessages
            }
        })

        window.setTimeout = (callback, _) => callback();

        pushNewFlashMessage({ id: 'def' })(mockDispatch, mockGetState);

        expect(actionTypeDispatched[0]).toBe(actionTypes.PUSH_NOTIFICATION);
        expect(actionTypeDispatched[1]).toBe(true);
    });
});