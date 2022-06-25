import * as actionTypes from './actionTypes';
import { addPizzaToCart, clearCart, modifyCartItemQuantity } from './cart';

describe('Cart actions', () => {
    test('modifyCartItemQuantity should dispatch REMOVE_CART_ITEM if the updated quantity is less than 1', () => {
        let actionTypeDispatched;

        const mockDispatch = (action) => {
            actionTypeDispatched = action.type;
        }

        modifyCartItemQuantity(0, 0)(mockDispatch);

        expect(actionTypeDispatched).toBe(actionTypes.REMOVE_CART_ITEM);
    });

    test('modifyCartItemQuantity should dispatch UPDATE_CART_ITEM if the updated quantity is more than 1', () => {
        let actionTypeDispatched;

        const mockDispatch = (action) => {
            actionTypeDispatched = action.type;
        }

        modifyCartItemQuantity(0, 5)(mockDispatch);

        expect(actionTypeDispatched).toBe(actionTypes.UPDATE_CART_ITEM);
    });

    test('clearCart should dispatch CLEAR_CART_ITEMS', () => {
        let actionTypeDispatched;

        const mockDispatch = (action) => {
            actionTypeDispatched = action.type;
        }

        clearCart()(mockDispatch);

        expect(actionTypeDispatched).toBe(actionTypes.CLEAR_CART_ITEMS);
    });

    test('addPizzaToCart should dispatch ADD_CART_ITEM if that item is not already on cart', () => {
        let actionTypeDispatched;

        const mockDispatch = (action) => {
            actionTypeDispatched = action.type;
        }
        const mockGetState = () => ({
            cart: {
                cartList: [
                    { id: 1, name: 'old pizza', quantity: 1 }
                ]
            }
        })

        addPizzaToCart({ id: 2, name: 'my new pizza' })(mockDispatch, mockGetState);

        expect(actionTypeDispatched).toBe(actionTypes.ADD_CART_ITEM);
    });

    test('addPizzaToCart should dispatch UPDATE_CART_ITEM if that item is is already on cart', () => {
        let actionTypeDispatched;

        const mockDispatch = (action) => {
            actionTypeDispatched = action.type;
        }
        const mockGetState = () => ({
            cart: {
                cartList: [
                    { id: 1, name: 'old pizza', quantity: 1 }
                ]
            }
        })

        addPizzaToCart({ id: 1, name: 'old pizza' })(mockDispatch, mockGetState);

        expect(actionTypeDispatched).toBe(actionTypes.UPDATE_CART_ITEM);
    });
});