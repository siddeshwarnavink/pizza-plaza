import { render, screen } from '@testing-library/react';

import MobileSwipeBar from './MobileSwipeBar';

describe('<MobileSwipeBar />', () => {
    test('should render the swipe bar', () => {
        render(<MobileSwipeBar />);
        const swipeBarEl = screen.getByTestId('mobile-swipebar');

        expect(swipeBarEl).toBeInTheDocument();
    });
});