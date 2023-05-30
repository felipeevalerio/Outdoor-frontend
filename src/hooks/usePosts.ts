import { useContext, useState } from "react";
import { CommentRequestModel, PostDetailsModel, PostModel } from "../api/services/models/PostModel";
import { PostsContext } from "../contexts/PostsContext";
import { LoadingContext } from "../contexts/LoadingContext";
import { GetAllCitiesFromUF } from "../api/geolocation/geolocation-api";
import { CreatePostFormInputs } from "../pages/Services/components/CreatePostModal";
import { CreatePost, DeletePost, EditPost, GetPostById, GetPostsFromUser, InsertCommentInPost } from "../api/services/post-api";
import { EditPostFormInputs } from "../pages/MyServices/components/EditPostModal";

export interface EditPostRequest extends EditPostFormInputs {
  id: string;
  userId: string;
}

interface MyPostsResponse extends PostModel {
  mobileNumber: string;
}

export function usePosts() {
    const { posts, categories, states, insertNewPost} = useContext(PostsContext);
    const [userPosts, setUserPosts] = useState<PostModel[]>([]);
    const [currentPost, setCurrentPost] = useState<PostDetailsModel | null>(null);

    function sendMessageToProvider(post: PostModel) {
      if (post.user) {
        const message = `Olá ${post.user.name}, vi seu post no Outdoor e gostaria de realizar um orçamento do serviço ${post.title}`
        window.open(`https://wa.me/${post.contactNumber}?text=${message}`, '_blank')
      }
    }

    function filterPosts(categoryId: string | null, city: string | null, state: string | null) {
        return posts.reduce((filtered: PostModel[], post) => {
            if (categoryId && post.categoryId !== categoryId) {
              return filtered;
            }
            if (city && post.city !== city) {
              return filtered;
            }
            if (state && post.state !== state) {
              return filtered;
            }
            return [...filtered, post];
          }, []);
    }
    
    async function getCitiesByUF(uf: string | null) {
        if (!uf) {
            return;
        }

        const cities = await GetAllCitiesFromUF(uf);
        return cities;
    }

    async function createPost(data: CreatePostFormInputs) {
      const post = await CreatePost(data);
      insertNewPost(post);
    }

    async function getPostsFromUser(userId: string) {
      const userPostsResponse: MyPostsResponse[] = await GetPostsFromUser(userId) ?? [];
      const formatedResponse = userPostsResponse.map((post) => {
          return {...post, contactNumber: post.mobileNumber}
      })
      
      setUserPosts(formatedResponse);
    }

    async function insertComment(request: CommentRequestModel) {
      const response = await InsertCommentInPost(request);
      setCurrentPost(response);
    }

    async function getPostById(postId: string) {
      const response = await GetPostById(postId);
      setCurrentPost(response);
    }

    async function deletePost(postId: string) {
      await DeletePost(postId);
    }

    
    async function editPost(data: EditPostRequest) {
      await EditPost(data);
    }

    return {
        posts,
        editPost,
        getPostById,
        states,
        insertComment,
        deletePost,
        categories,
        insertNewPost,
        getPostsFromUser,
        currentPost,
        createPost,
        userPosts,
        sendMessageToProvider,
        filterPosts,
        getCitiesByUF
    }
}