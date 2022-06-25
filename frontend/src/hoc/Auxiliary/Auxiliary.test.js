import { render, screen } from '@testing-library/react';

import Auxiliary from './Auxiliary';

describe('<Auxiliary />', () => {
    test('should render the children content', () => {
        render(
            <Auxiliary>
                <p>hello world!</p>
            </Auxiliary>
        );
        const textEl = screen.getByText('hello world!');


        expect(textEl).toBeInTheDocument();
    });
});