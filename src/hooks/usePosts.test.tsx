import { expect, it, describe, vi } from 'vitest'
import * as postApi from '../api/services/post-api';
import { renderHook, waitFor } from '@testing-library/react'
import { usePosts } from './usePosts';
import { CreatePostFormInputs } from '../pages/Services/components/CreatePostModal';
import { PostsContext, PostsProvider } from '../contexts/PostsContext';
import { JSXElementConstructor, ReactElement } from 'react';

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
            }

            const { result } = renderHook(() => usePosts());
            
            const spy = vi.spyOn(postApi, 'CreatePost');
            expect(spy.getMockName()).toEqual('CreatePost');
            
            result.current.createPost(data);
            await waitFor(() => expect(spy).toHaveBeenCalledOnce());
        })
    })
})