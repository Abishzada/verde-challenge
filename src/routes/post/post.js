import { useLocation, useParams } from "react-router-dom";
import {
  setTitle,
  setBody,
  useGetPostsByIdQuery,
  setPostById,
  useUpdatePostMutation,
  useDeletePostMutation,
  setUpdatedPost,
  setDeletedPost,
  setIsModalOpen,
} from "../../features/verde/verde-slice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import "./post.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import NewPostModal from "../../components/new-post-modal/new-post-modal";
import Button from "../../components/button/button";
import { ButtonType } from "../../components/button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import FormInput from "../../components/form-input/form-input";

const Post = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { postById, isModalOpen, posts, postCount } = useAppSelector(
    (state) => state.verde
  );
  const { data: post } = useGetPostsByIdQuery(id);
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();

  useEffect(() => {
    dispatch(setPostById(state));
  }, []);

  const handleUpdateClick = () => {
    updatePost(postById).then(() =>
      dispatch(setUpdatedPost([postById, posts]))
    );
    navigate("/users/1/posts");
  };

  const handleDeleteClick = async () => {
    await deletePost(id).then((res) => {
      dispatch(setDeletedPost(postById));
      navigate("/users/1/posts");
    });
  };

  const handleNewPostClick = () => {
    dispatch(setIsModalOpen());
  };

  const handleChangeTitle = (e) => {
    dispatch(setTitle(e.target.value));
  };

  const handleChangeBody = (e) => {
    dispatch(setBody(e.target.value));
  };

  const handleBackOnclick = () => {
    navigate("/users/1/posts");
  };

  return (
    <>
      <div className="bg-slate-100 h-screen">
        <div className="mx-auto p-5 bg-slate-100">
          <Navbar />
          <section className="bg-white h-full p-6 mt-6 flex flex-row justify-start items-baseline">
            <span
              onClick={handleBackOnclick}
              className="w-16 h-16 bg-slate-100 cursor-pointer rounded-full mr-4 flex justify-center items-center"
            >
              <FontAwesomeIcon className="w-6 h-6" icon={faArrowLeft} />
            </span>
            <div className="w-1/2 flex flex-col gap-10">
              <div className="flex flex-row justify-between items-center gap-8">
                <span className="text-3xl font-bold">Posts</span>
                <Button
                  onClickEvent={handleNewPostClick}
                  buttonType={ButtonType.new}
                  svg={<FontAwesomeIcon icon={faPlus} />}
                >
                  New Post
                </Button>
              </div>
              {isModalOpen ? <NewPostModal /> : null}
              <div className="mb-12">
                {postById && (
                  <>
                    <FormInput
                      title={postById.title}
                      body={postById.body}
                      onChangeTitle={handleChangeTitle}
                      onChangeBody={handleChangeBody}
                    />
                  </>
                )}
              </div>
              <div className="flex justify-end gap-24">
                <Button
                  onClickEvent={handleDeleteClick}
                  buttonType={ButtonType.delete}
                  svg={<FontAwesomeIcon icon={faTrashCan} />}
                >
                  Delete
                </Button>
                <Button
                  buttonType={ButtonType.update}
                  onClickEvent={handleUpdateClick}
                  svg={<FontAwesomeIcon icon={faPencil} />}
                >
                  Update
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Post;
