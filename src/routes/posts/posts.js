import PostCard from "../../components/post-card/post-card";
import Navbar from "../../components/navbar/navbar";
import { v4 as uuidv4 } from "uuid";
import "./posts.css";

const Posts = ({ posts }) => {
  return (
    <>
      <div className="bg-slate-100">
        <div className="container mx-auto p-5 bg-slate-100">
          <Navbar />
          <hr className="p-5" />
          <section className="h-auto p-5 container grid grid-cols-3 items-baseline justify-items-center gap-11 bg-white">
            {posts &&
              posts.map((post) => {
                return <PostCard key={uuidv4()} post={post} />;
              })}
          </section>
        </div>
      </div>
    </>
  );
};

export default Posts;
