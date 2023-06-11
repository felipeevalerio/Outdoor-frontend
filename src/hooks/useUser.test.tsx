import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UserProvider } from '../contexts/UserContext';

import * as userApi from '../api/user/user-api';
import { useUser } from './useUser';
import { act, renderHook, waitFor } from '@testing-library/react';
import { LoginResponse } from '../api/user/models/LoginModel';
import { UserModel } from '../api/user/models/UserModel';
vi.mock('../api/user/user-api');
const userApiMock = vi.mocked(userApi);

describe('useUser', () => {
    describe('loginUser', () => {
        it('should login the user in the app', async () => {
            const wrapper = ({ children }: any) => <UserProvider>{children}</UserProvider>
            const { result } = renderHook(() => useUser(), {
                wrapper: wrapper
            })

            const response: LoginResponse = {
                avatar: '',
                createdAt: '',
                email: 'felipe@email.com',
                id: '',
                name: 'a',
                password: '123456',
                userType: 'client'
            }

            global.localStorage.setItem = vi.fn();
            
            userApiMock.Login.mockResolvedValue(response)
            result.current.loginUser({
                email: 'felipe@email.com',
                password: '123456'
            });

            await waitFor(() => expect(result.current.user?.email).toEqual('felipe@email.com'));
        }),

        it('should stay as null, because a failed login request', async () => {
            const wrapper = ({ children }: any) => <UserProvider>{children}</UserProvider>
            const { result } = renderHook(() => useUser(), {
                wrapper: wrapper
            })

            act(() => {
                result.current.logoutUser()
            })
            
            userApiMock.Login.mockResolvedValue(null);
            result.current.loginUser({
                email: 'felipe@email.com',
                password: '123456'
            });
            
            await waitFor(() => expect(result.current.user).toBeNull());
        })
    }),
    
    describe('registerUser', () => {
        it('should register a user', async () => {
            const wrapper = ({ children }: any) => <UserProvider>{children}</UserProvider>
            const { result } = renderHook(() => useUser(), {
                wrapper: wrapper
            })

            const expectedResult: UserModel = {
                email: 'felipe@email.com',
                name: 'felipe',
                password: '123',
                userType: 'client',
                avatar: '',
                createdAt: '',
                id: ''
            };

            global.localStorage.setItem = vi.fn();
            userApiMock.Register.mockResolvedValue(expectedResult);
            result.current.registerUser({
                email: 'felipe@email.com',
                name: 'felipe',
                password: '123',
                userType: 'client'
            });
            
            await waitFor(() => expect(result.current.user).toEqual(expectedResult));
        }),
        it('should stay as null, because a failed request to register a user', async () => {
            const wrapper = ({ children }: any) => <UserProvider>{children}</UserProvider>
            const { result } = renderHook(() => useUser(), {
                wrapper: wrapper
            })
            
            act(() => {
                result.current.logoutUser();
            })

            userApiMock.Register.mockResolvedValue(null);
            result.current.registerUser({
                email: 'felipe@email.com',
                name: 'felipe',
                password: '123',
                userType: 'client'
            });
            
            await waitFor(() => expect(result.current.user).toBeNull());
        })
    }), 

    describe('editUser', () => {
        it('should register a user', async () => {
            const wrapper = ({ children }: any) => <UserProvider>{children}</UserProvider>
            const { result } = renderHook(() => useUser(), {
                wrapper: wrapper
            })

            const expectedResult: UserModel = {
                email: 'felipe@email.com',
                name: 'felipe123',
                password: '123',
                userType: 'client',
                avatar: '',
                createdAt: '',
                id: ''
            };

            global.localStorage.setItem = vi.fn();
            userApiMock.EditUser.mockResolvedValue(expectedResult);
            
            result.current.editUser({
                email: 'felipe@email.com',
                name: 'felipe123',
                avatar: '',
                id: ''
            });
            
            await waitFor(() => expect(result.current.user).toEqual(expectedResult));
        }),
        it('should stay as the previous value, because a failed request to edit a user', async () => {
            const wrapper = ({ children }: any) => <UserProvider>{children}</UserProvider>
            const { result } = renderHook(() => useUser(), {
                wrapper: wrapper
            })

            const expectedResult: UserModel = {
                email: 'felipe@email.com',
                name: 'felipe',
                password: '123',
                userType: 'client',
                avatar: '',
                createdAt: '',
                id: ''
            };

            userApiMock.EditUser.mockResolvedValue(expectedResult);
            result.current.editUser({
                email: 'felipe@email.com',
                name: 'felipe123',
                avatar: '',
                id: ''
            });
            
            await waitFor(() => expect(result.current.user).toEqual(expectedResult));
        })
    })
})