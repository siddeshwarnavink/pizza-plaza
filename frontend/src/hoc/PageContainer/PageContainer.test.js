import { render, screen } from '@testing-library/react';

import PageContainer from './PageContainer';

describe('<PageContainer />', () => {
    test('should render the children content', () => {
        render(
            <PageContainer>
                <p>hello world!</p>
            </PageContainer>
        );
        const textEl = screen.getByText('hello world!');


        expect(textEl).toBeInTheDocument();
    });
});