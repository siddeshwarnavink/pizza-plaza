import * as actionTypes from '../actions/actionTypes';
import cartReducer from './cart';

const myState = {
    foo: 'bar',
    totalPrice: 1206,
    cartList: [
        {
            item: 'a',
            price: 2,
            crust: 0,
            size: 0,
            quantity: 1
        }, {
            item: 'b',
            price: 2,
            crust: 0,
            size: 0,
            quantity: 1
        }, {
            item: 'c',
            price: 2,
            crust: 0,
            size: 0,
            quantity: 1
        }
    ]
};

describe('Cart reducer', () => {
    test('should add new item when ADD_CART_ITEM action is dispatched', () => {
        const newState = cartReducer(myState, {
            type: actionTypes.ADD_CART_ITEM,
            pizzaDetails: {
                item: 'd',
                price: 2,
                size: 2,
                crust: 0
            }
        });

        expect(newState.cartList.length).toBe(4);
        expect(newState.totalPrice).toBe(1808);
        expect(newState.cartList[3].item).toBe('d');
        expect(newState.foo).toBe('bar');
    });

    test('should remove item when REMOVE_CART_ITEM action is dispatched', () => {
        const newState = cartReducer(myState, {
            type: actionTypes.REMOVE_CART_ITEM,
            index: 1
        });

        expect(newState.cartList.length).toBe(2);
        expect(newState.totalPrice).toBe(804);
        expect(newState.cartList[1].item).toBe('c');
        expect(newState.foo).toBe('bar');
    });

    test('should update item when UPDATE_CART_ITEM action is dispatched', () => {
        const newState = cartReducer(myState, {
            type: actionTypes.UPDATE_CART_ITEM,
            index: 1,
            update: { quantity: 3, isUpdated: true }
        });

        expect(newState.cartList.length).toBe(3);
        expect(newState.totalPrice).toBe(2010);
        expect(newState.cartList[1].isUpdated).toBe(true);
        expect(newState.foo).toBe('bar');
    });

    test('should empty cart when CLEAR_CART_ITEMS action is dispatched', () => {
        const newState = cartReducer(myState, {
            type: actionTypes.CLEAR_CART_ITEMS,
        });

        expect(newState.cartList.length).toBe(0);
        expect(newState.totalPrice).toBe(0);
    });
});