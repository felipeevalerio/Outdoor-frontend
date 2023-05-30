import { expect, it, describe, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { EditPostRequest, usePosts } from './usePosts';
import { CreatePostFormInputs } from '../pages/Services/components/CreatePostModal';
import { PostsProvider } from '../contexts/PostsContext';
import { CommentRequestModel, PostModel } from '../api/services/models/PostModel';

import * as postApi from '../api/services/post-api';
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
    }),

    describe('sendMessageToProvider', () => {
        it('should send a message to the provider', () => {
            const post: PostModel = {
                categoryId: '123',
                city: 'Belo Horizonte',
                contactNumber: '5537999048651',
                description: 'Teste',
                district: 'Centro',
                state: 'MG',
                title: 'Conserto',
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

            global.open = vi.fn();
            const { result } = renderHook(() => usePosts());
            result.current.sendMessageToProvider(post)
            
            expect(global.open).toHaveBeenCalledOnce();
        })
    })

    describe('deletePost', () => {
        it('should delete a post', () => {
            const { result } = renderHook(() => usePosts());
            postApiMocked.DeletePost.mockResolvedValue('123')
            result.current.deletePost('123');
            
            expect(postApiMocked.DeletePost).toHaveBeenCalledOnce();
        })
    })

    describe('editPost', () => {
        it('should edit a post', () => {
            const post: PostModel = {
                categoryId: '123',
                city: 'Belo Horizonte',
                contactNumber: '5537999048651',
                description: 'Teste',
                district: 'Centro',
                state: 'MG',
                title: 'Conserto',
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

            const request: EditPostRequest = {
                ...post,
                userId: ''
            }

            const { result } = renderHook(() => usePosts());
            postApiMocked.EditPost.mockResolvedValue(post)
            result.current.editPost(request);
            
            expect(postApiMocked.EditPost).toHaveBeenCalledOnce();
        })
    })

    describe('getPostById', () => {
        it('should get a post by id', async () => {
            const post: PostModel = {
                categoryId: '123',
                city: 'Belo Horizonte',
                contactNumber: '5537999048651',
                description: 'Teste',
                district: 'Centro',
                state: 'MG',
                title: 'Conserto',
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

            const { result } = renderHook(() => usePosts());
            postApiMocked.GetPostById.mockResolvedValue(post)
            result.current.getPostById('123');
            
            expect(postApiMocked.GetPostById).toHaveBeenCalledOnce();
            await waitFor(() => expect(result.current.currentPost).toEqual(post));
        })
    })

    describe('insertComment', () => {
        it('should insert a comment inside the post', async () => {
            const post: PostModel = {
                categoryId: '123',
                city: 'Belo Horizonte',
                contactNumber: '5537999048651',
                description: 'Teste',
                district: 'Centro',
                state: 'MG',
                title: 'Conserto',
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

            const request: CommentRequestModel = {
                image: '',
                postId: '213',
                rating: 2,
                review: 'este',
                userId: '123'
            } 

            const { result } = renderHook(() => usePosts());
            postApiMocked.InsertCommentInPost.mockResolvedValue(post)
            result.current.insertComment(request);
            
            expect(postApiMocked.InsertCommentInPost).toHaveBeenCalledOnce();
            await waitFor(() => expect(result.current.currentPost).toEqual(post));
        })
    })
})