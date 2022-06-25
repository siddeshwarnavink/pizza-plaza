import { createContext } from 'react';

const CartOpenContext = createContext({
    isCartOpen: false,
    toggleCartOpen: () => { }
});

export default CartOpenContext;