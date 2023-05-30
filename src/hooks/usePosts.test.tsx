import { expect, it, describe, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { usePosts } from './usePosts';
import { CreatePostFormInputs } from '../pages/Services/components/CreatePostModal';
import { PostsProvider } from '../contexts/PostsContext';

import * as postApi from '../api/services/post-api';
import { PostModel } from '../api/services/models/PostModel';
import { UserModel } from '../api/user/models/UserModel';
vi.mock('../api/services/post-api');
const postApiMocked = vi.mocked(postApi)

describe('usePosts', () => {
    describe('createNewPost', () => {
        it('should create a new post', async () => {
            const data: CreatePostFormInputs = {
                categoryId: '123',
                city: 'Belo Horizonte',
                contactNumber: '5537999048651',
                description: 'Teste',
                district: 'Centro',
                state: 'MG',
                title: 'Conserto',
                userId: '1234214',
                image: ''
            };

            const expectedResult: PostModel = {
                ...data,
                image: '',
                rating: 0,
                id: '1234124',
                createdAt: new Date(),
                user: {
                    avatar: '',
                    createdAt: '',
                    email: '',
                    id: '',
                    name: '',
                    password: '',
                    userType: 'client'
                } 
            } 

            const wrapper = ({children}: any) => <PostsProvider>{children}</PostsProvider>
            const { result } = renderHook(() => usePosts(), {
                wrapper: wrapper
            });
            
            result.current.createPost(data);
            postApiMocked.CreatePost.mockResolvedValue(expectedResult);
            await waitFor(() => expect(result.current.posts).toHaveLength(1))
        })
    })
})