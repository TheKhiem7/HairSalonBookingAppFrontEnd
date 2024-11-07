import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Profile from './index';
import '@testing-library/jest-dom/extend-expect';

// Mock the useSelector hook
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
}));

const mockStore = configureStore([]);
const mockUser = {
    email: 'test@example.com',
    fullName: 'Test User',
    role: 'User',
    username: 'testuser',
    image: 'https://example.com/profile.jpg'
};

describe('Profile Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            user: mockUser
        });

        const { useSelector } = require('react-redux');
        useSelector.mockImplementation(callback => callback({ user: mockUser }));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders profile information correctly (Happy Case)', () => {
        render(
            <Provider store={store}>
                <Profile />
            </Provider>
        );

        expect(screen.getByText('Test User')).toBeInTheDocument();
        expect(screen.getByText('User')).toBeInTheDocument();
        expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
        expect(screen.getByDisplayValue('testuser')).toBeInTheDocument();
    });

    test('shows validation errors for empty required fields (Unhappy Case)', () => {
        render(
            <Provider store={store}>
                <Profile />
            </Provider>
        );

        fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: '' } });
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: '' } });
        fireEvent.change(screen.getByLabelText(/fullname/i), { target: { value: '' } });

        fireEvent.click(screen.getByText(/update profile/i));

        expect(screen.getByText(/email address is required/i)).toBeInTheDocument();
        expect(screen.getByText(/username is required/i)).toBeInTheDocument();
        expect(screen.getByText(/fullname is required/i)).toBeInTheDocument();
    });

    test('submits profile form successfully with valid data (Happy Case)', () => {
        render(
            <Provider store={store}>
                <Profile />
            </Provider>
        );

        fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'new@example.com' } });
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'newuser' } });
        fireEvent.change(screen.getByLabelText(/fullname/i), { target: { value: 'New User' } });

        fireEvent.click(screen.getByText(/update profile/i));

        expect(screen.getByDisplayValue('new@example.com')).toBeInTheDocument();
        expect(screen.getByDisplayValue('newuser')).toBeInTheDocument();
        expect(screen.getByDisplayValue('New User')).toBeInTheDocument();
    });

    test('handles password change correctly (Happy Case)', () => {
        render(
            <Provider store={store}>
                <Profile />
            </Provider>
        );

        fireEvent.click(screen.getByText(/change password/i));

        fireEvent.change(screen.getByLabelText(/your password/i), { target: { value: 'oldpassword' } });
        fireEvent.change(screen.getByLabelText(/new password/i), { target: { value: 'newpassword' } });
        fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'newpassword' } });

        fireEvent.click(screen.getByText(/change password/i));

        expect(screen.getByDisplayValue('newpassword')).toBeInTheDocument();
    });

    test('shows validation errors for password mismatch (Unhappy Case)', () => {
        render(
            <Provider store={store}>
                <Profile />
            </Provider>
        );

        fireEvent.click(screen.getByText(/change password/i));

        fireEvent.change(screen.getByLabelText(/your password/i), { target: { value: 'oldpassword' } });
        fireEvent.change(screen.getByLabelText(/new password/i), { target: { value: 'newpassword' } });
        fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'differentpassword' } });

        fireEvent.click(screen.getByText(/change password/i));

        expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    });
});