import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Register from './index';
import '@testing-library/jest-dom/extend-expect';
import { UserProvider } from '../../Context/UserContext';

const mockAxios = new MockAdapter(axios);

// describe('Register Component', () => {
//     beforeEach(() => {
//         mockAxios.reset();
//     });

    test('renders register form correctly (Happy Case)', () => {
        render(
            <Router>
                <UserProvider>
                    <Register />
                </UserProvider>
            </Router>
        );

        expect(screen.getByText('REGISTER')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('FullName')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    });

    test('shows validation errors for empty required fields (Unhappy Case)', async () => {
        render(
            <Router>
                <UserProvider>
                    <Register />
                </UserProvider>
            </Router>
        );

        fireEvent.click(screen.getByText('Register'));

        await waitFor(() => {
            expect(screen.getByText('Please input your username!')).toBeInTheDocument();
            expect(screen.getByText('Please input your phone number!')).toBeInTheDocument();
            expect(screen.getByText('Please input your password!')).toBeInTheDocument();
            expect(screen.getByText('Please confirm your password!')).toBeInTheDocument();
            expect(screen.getByText('Please input your email!')).toBeInTheDocument();
        });
    });

    test('submits register form successfully with valid data (Happy Case)', async () => {
        mockAxios.onPost('register').reply(200, {
            token: 'mockToken',
            fullName: 'Test User'
        });

        render(
            <Router>
                <UserProvider>
                    <Register />
                </UserProvider>
            </Router>
        );

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText('FullName'), { target: { value: 'Test User' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
        fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'password123' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });

        fireEvent.click(screen.getByText('Register'));

        await waitFor(() => {
            expect(screen.getByText('Register Successfully!')).toBeInTheDocument();
        });
    });

    test('shows error message on failed registration (Unhappy Case)', async () => {
        mockAxios.onPost('register').reply(400);

        render(
            <Router>
                <UserProvider>
                    <Register />
                </UserProvider>
            </Router>
        );

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText('FullName'), { target: { value: 'Test User' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
        fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'password123' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });

        fireEvent.click(screen.getByText('Register'));

        await waitFor(() => {
            expect(screen.getByText('Register Failed! Please check information again.')).toBeInTheDocument();
        });
    });
// });