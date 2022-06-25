import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Modal from './Modal';

describe('<Modal />', () => {
    test('should render the children content', () => {
        render(
            <Modal isOpen>
                <p>hello world!</p>
            </Modal>
        );
        const textEl = screen.getByText('hello world!');

        expect(textEl).toBeInTheDocument();
    });

    test('should render <Backdrop /> if the modal is open', () => {
        render(
            <Modal isOpen>
                <p>hello world!</p>
            </Modal>
        );
        const backdropEl = screen.getByTestId('app-backdrop');

        expect(backdropEl).toBeInTheDocument();
    });

    test('should trigger onClose if the close button is clicked', () => {
        let isTriggered = false;

        render(
            <Modal isOpen onClose={() => { isTriggered = true; }}>
                <p>hello world!</p>
            </Modal>
        );
        const closeButtonEl = screen.getByText('X');

        userEvent.click(closeButtonEl);

        expect(isTriggered).toBe(true);
    });
});