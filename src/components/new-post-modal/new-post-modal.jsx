import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setIsModalOpen,
  setNewPostBody,
  setNewPostTitle,
  useAddPostMutation,
  setAddedPost,
} from "../../features/verde/verde-slice";
import Button from "../button/button";
import { ButtonType } from "../button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import FormInput from "../form-input/form-input";
import "./new-post-modal.css";

const NewPostModal = () => {
  const dispatch = useAppDispatch();
  const { newPost } = useAppSelector((state) => state.verde);

  const { id } = useParams();

  const { state } = useLocation();
  const navigate = useNavigate();

  const [addPost, { isLoading }] = useAddPostMutation();

  const handleChangeTitle = (e) => {
    dispatch(setNewPostTitle(e.target.value));
  };

  const handleChangeBody = (e) => {
    dispatch(setNewPostBody(e.target.value));
  };

  const handleAddPostClick = async () => {
    await addPost(newPost).then((res) => {
      dispatch(setAddedPost([res, id]));
    });

    dispatch(setNewPostTitle(""));
    dispatch(setNewPostBody(""));

    dispatch(setIsModalOpen());
    navigate(`/posts/${state && state.id}`);
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Modal Title</h3>
            </div>
            <div className="relative p-6 flex-auto">
              <FormInput
                title={newPost.title}
                body={newPost.body}
                onChangeTitle={handleChangeTitle}
                onChangeBody={handleChangeBody}
              />
            </div>
            <div className="flex items-center justify-end gap-5 p-6 border-t border-solid border-slate-200 rounded-b">
              <Button
                onClickEvent={() => dispatch(setIsModalOpen())}
                buttonType={ButtonType.delete}
                svg={<FontAwesomeIcon icon={faXmark} />}
              >
                Close
              </Button>
              <Button
                onClickEvent={handleAddPostClick}
                buttonType={ButtonType.new}
                svg={<FontAwesomeIcon icon={faPlus} />}
              >
                Add Post
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default NewPostModal;
