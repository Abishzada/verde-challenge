import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import "./post-card.css";

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/posts/${id}`, { state: post });
  };
  return (
    <>
      {post && (
        <>
          <div
            onClick={() => handleClick(post.id)}
            className="w-96 h-50 flex flex-col justify-center mt-3 p-3 border-2 border-solid border-transparent hover:border-blue-400"
          >
            <div className="border border-dotted border-transparent hover:border-blue-400">
              <p className="h-20 text-lg font-semibold overflow-hidden">
                {post.title}
              </p>
              <p className="h-20 tracking-normal text-sm leading-5 overflow-hidden">
                {post.body}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PostCard;
