import { expect, it, describe, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { EditPostRequest, usePosts } from './usePosts';
import { CreatePostFormInputs } from '../pages/Services/components/CreatePostModal';
import { PostsProvider } from '../contexts/PostsContext';
import { CommentRequestModel, PostModel } from '../api/services/models/PostModel';

import * as postApi from '../api/services/post-api';
vi.mock('../api/services/post-api');
const postApiMocked = vi.mocked(postApi)

import * as geoLocationApi from '../api/geolocation/geolocation-api';
import { CityModel } from '../api/geolocation/models/CityModel';
vi.mock('../api/geolocation/geolocation-api');
const geoLocationApiMocked = vi.mocked(geoLocationApi)

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

            expect(postApiMocked.CreatePost).toHaveBeenCalledOnce()
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

    describe('getPostsFromUser', () => {
        it('should get all posts from a user', async () => {
            const posts: PostModel[] = [{
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
            }]

            const { result } = renderHook(() => usePosts());
            postApiMocked.GetPostsFromUser.mockResolvedValue(posts);
            result.current.getPostsFromUser('123');
        
            expect(postApiMocked.GetPostsFromUser).toHaveBeenCalledOnce();
            await waitFor(() => expect(result.current.userPosts).toHaveLength(1));
        }),

        it('should return a empty array when occured a error in the request',async () => {
            const { result } = renderHook(() => usePosts());
            postApiMocked.GetPostsFromUser.mockResolvedValue(null);
            result.current.getPostsFromUser('0');

            await waitFor(() => expect(result.current.userPosts).toHaveLength(0));
        })
    });

    describe('getCitiesByUF', () => {
        it('should get all cities from a uf', async () => {
            const cities: CityModel[] = [
                {
                    id: '1',
                    name: 'BH'
                },
                {
                    id: '2',
                    name: 'Lagoa santa'
                }
            ]

            const { result } = renderHook(() => usePosts());
            geoLocationApiMocked.GetAllCitiesFromUF.mockResolvedValue(cities);
            result.current.getCitiesByUF('mg');

            expect(geoLocationApiMocked.GetAllCitiesFromUF).toHaveBeenCalledOnce();
            await waitFor(() => expect(result.current.citiesState).toEqual(cities));
        }),

        it("should end the function because doesn't received a uf", () => {
            const { result } = renderHook(() => usePosts());
            result.current.getCitiesByUF('');

            expect(result.current.citiesState).toHaveLength(0);
        })
    }),

    describe('filterPosts', () => {
        it('should filter based on the category', () => {
            const posts: PostModel[] = [
                {
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
                },
                {
                    categoryId: '456',
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
                
            ]
            const { result } = renderHook(() => usePosts());

            const filteredPosts = result.current.filterPosts('123', '', '', posts);

            expect(filteredPosts).toHaveLength(1);
        }),
        it('should filter based on the category and city', () => {
            const posts: PostModel[] = [
                {
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
                },
                {
                    categoryId: '456',
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
                
            ]
            const { result } = renderHook(() => usePosts());

            const filteredPosts = result.current.filterPosts('123', 'Belo Horizonte', '', posts);

            expect(filteredPosts).toHaveLength(1);
        }),
        it('should filter based on the city', () => {
            const posts: PostModel[] = [
                {
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
                },
                {
                    categoryId: '456',
                    city: 'Itauna',
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
                
            ]
            const { result } = renderHook(() => usePosts());

            const filteredPosts = result.current.filterPosts('', 'Belo Horizonte', '', posts);

            expect(filteredPosts).toHaveLength(1);
        }),
        it('should filter based on the state', () => {
            const posts: PostModel[] = [
                {
                categoryId: '123',
                city: 'Belo Horizonte',
                contactNumber: '5537999048651',
                description: 'Teste',
                district: 'Centro',
                state: 'ES',
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
                },
                {
                    categoryId: '456',
                    city: 'Itauna',
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
                
            ]
            const { result } = renderHook(() => usePosts());

            const filteredPosts = result.current.filterPosts('', '', 'MG', posts);

            expect(filteredPosts).toHaveLength(1);
        })
    });
})