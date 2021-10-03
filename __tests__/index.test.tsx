/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../src/pages/index';

describe('Home', () => {
    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
        jest.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('renders a Button', () => {
        render(<Home />);

        const button = screen.getByRole('button', {
            name: /Hello there/i,
        });
        expect(button).toBeInTheDocument();
    });
});
