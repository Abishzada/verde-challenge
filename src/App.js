import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import {
  useGetPostsQuery,
  setPostCount,
  setPosts,
} from "./features/verde/verde-slice";
import Posts from "./routes/posts/posts";
import Post from "./routes/post/post";
import Home from "./routes/home/home";
import "./App.css";

function App() {
  const { data: somePosts } = useGetPostsQuery();
  const { posts } = useAppSelector((state) => state.verde);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/users/1/posts`);
  }, []);

  useEffect(() => {
    if (somePosts) {
      dispatch(setPosts(somePosts));
      dispatch(setPostCount(somePosts.length));
    }
  }, [somePosts]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/users/1/posts" element={<Posts posts={posts} />}></Route>
        <Route path="/posts/:id" element={<Post />}></Route>
      </Routes>
    </>
  );
}

export default App;
