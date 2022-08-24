import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSlice } from "@reduxjs/toolkit";

export const verdeApiSlice = createApi({
  reducerPath: "verdeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  tagTypes: ["Post"],
  endpoints(builder) {
    return {
      getPosts: builder.query({
        query: () => "users/1/posts",
        providesTags: ["Post"],
      }),
      getPostsByUser: builder.query({
        query: (id) => `users/${id}/posts`,
        providesTags: ["Post"],
      }),
      getPostsById: builder.query({
        query: (id) => `/posts/${id}`,
        providesTags: ["Post"],
      }),
      addPost: builder.mutation({
        query: (post) => ({
          url: `/posts`,
          method: "POST",
          body: post,
        }),
        invalidatesTags: ["Post"],
      }),
      updatePost: builder.mutation({
        query: ({ id, ...post }) => ({
          url: `/posts/${id}`,
          method: "PUT",
          body: post,
        }),
        invalidatesTags: (result, error, { id }) => [{ type: "Post", id }],
      }),
      deletePost: builder.mutation({
        query(id) {
          return {
            url: `/posts/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Post"],
      }),
    };
  },
});

export const verdeSlice = createSlice({
  name: "verde",
  initialState: {
    newPost: { title: "", body: "", userId: 1 },
    posts: [],
    postById: {},
    postCount: 0,
    isModalOpen: false,
  },
  reducers: {
    setAddedPost: (state, action) => {
      const { data } = action.payload[0];
      const id = state.posts.length + 1;
      state.posts = [
        ...state.posts,
        {
          ...data,
          id: id,
        },
      ];
    },
    setNewPostTitle: (state, action) => {
      state.newPost.title = action.payload;
    },
    setNewPostBody: (state, action) => {
      state.newPost.body = action.payload;
    },
    setIsModalOpen: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
    setPostById: (state, action) => {
      state.postById = action.payload;
    },
    setBody: (state, action) => {
      state.postById.body = action.payload;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setPostCount: (state, action) => {
      state.postCount = action.payload;
    },
    setTitle: (state, action) => {
      state.postById.title = action.payload;
    },
    setUpdatedPost: (state, action) => {
      const data = action.payload[0];
      const posts = action.payload[1];
      const selectedPost = posts.find((post) => post.id === data.id);
      const id = posts.indexOf(selectedPost);
      state.posts = posts.filter((post) => post.id !== data.id);
      state.posts.splice(id, 0, data);
    },
    setDeletedPost: (state, action) => {
      const { id } = action.payload;
      state.posts = state.posts.filter((post) => post.id != id);
    },
  },
});

export const {
  useGetPostsQuery,
  useGetPostsByUserQuery,
  useAddPostMutation,
  useGetPostsByIdQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
} = verdeApiSlice;

export const {
  setPosts,
  setIsModalOpen,
  setUpdatedPost,
  setTitle,
  setBody,
  setPostById,
  setDeletedPost,
  setPostCount,
  setNewPostBody,
  setNewPostTitle,
  setAddedPost,
} = verdeSlice.actions;

export default verdeSlice.reducer;
