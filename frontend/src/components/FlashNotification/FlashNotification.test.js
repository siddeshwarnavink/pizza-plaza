import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FlashNotification from './FlashNotification';

describe('<FlashNotification />', () => {
    test('should render the notification text', () => {
        render(<FlashNotification visible message="my message" />);
        const FlashNotificationEl = screen.getByText('my message');
        
        expect(FlashNotificationEl).toBeInTheDocument();
    });

    test('should render action button', () => {
        render(<FlashNotification visible action={{ text: 'button text' }} />);
        const actionButtonEl = screen.queryByTestId('flashnotification-action-button');

        expect(actionButtonEl).toHaveTextContent('button text');
    });

    test('should not render action button if there is no action', () => {
        render(<FlashNotification visible />);
        const actionButtonEl = screen.queryByTestId('flashnotification-action-button');

        expect(actionButtonEl).toBeNull();
    });

    test('should render action button text "View" as default', () => {
        render(<FlashNotification action={{ onClick: () => { isActionTriggered = true; } }} />);
        const actionButtonEl = screen.queryByTestId('flashnotification-action-button');

        expect(actionButtonEl).toHaveTextContent('View');
    });

    test('should dismiss the message, trigger the action if the action button is clicked', () => {
        let isActionTriggered = false;
        let isMessageDismissed = false;

        render(
            <FlashNotification
                visible
                action={{ text: 'button text', onClick: () => { isActionTriggered = true; } }}
                dismissMessage={() => { isMessageDismissed = true; }}
            />
        );
        const actionButtonEl = screen.queryByTestId('flashnotification-action-button');

        userEvent.click(actionButtonEl);

        expect(isActionTriggered && isMessageDismissed).toBe(true);
    });
});