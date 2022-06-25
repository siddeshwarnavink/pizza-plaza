import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PizzaListItem from './PizzaListItem';

describe('<PizzaListItem />', () => {
    test('should render the pizza name', () => {
        render(
            <PizzaListItem
                pizzaDetail={{
                    name: "my pizza name",
                    image: ""
                }}
                size={0}
                crust={0}
            />
        );
        const pizzaItemEl = screen.getByText('my pizza name');

        expect(pizzaItemEl).toBeInTheDocument();
    });

    test('should render the pizza size', () => {
        render(
            <PizzaListItem
                pizzaDetail={{
                    name: "my pizza name",
                    image: ""
                }}
                size={0}
                crust={0}
            />
        );
        const textEl = screen.getByText('Regular');

        expect(textEl).toBeInTheDocument();
    });

    test('should render the pizza price', () => {
        const randomNumber = Math.random();
        render(
            <PizzaListItem
                pizzaDetail={{
                    name: "my pizza name",
                    image: "",
                    price: randomNumber
                }}
                size={0}
                crust={0}
            />
        );
        const textEl = screen.getByText(`$${randomNumber}`);

        expect(textEl).toBeInTheDocument();
    });

    test('should have a "Add to cart" button', () => {
        render(
            <PizzaListItem
                pizzaDetail={{
                    name: "my pizza name",
                    image: ""
                }}
                size={0}
                crust={0}
            />
        );
        const textEl = screen.getByText('Add to cart');

        expect(textEl).toBeInTheDocument();
    });

    test('should add item to cart and trigger a flash notification if the "Add to cart" button is clicked', () => {
        let isPizzaAddedToCart = false;
        let isFlashMessagedSent = false;

        render(
            <PizzaListItem
                name="my pizza name"
                pizzaDetail={{
                    name: "my pizza name",
                    image: ""
                }}
                size={0}
                crust={0}
                addPizzaToCart={() => { isPizzaAddedToCart = true; }}
                pushNewFlashMessage={() => { isFlashMessagedSent = true; }}
            />
        );
        const addToCartBtnEl = screen.getByTestId('add-to-cart').children[0];

        userEvent.click(addToCartBtnEl);

        expect(isPizzaAddedToCart && isFlashMessagedSent).toBe(true);
    });

});