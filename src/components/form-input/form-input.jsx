import "./form-input.css";

const FormInput = ({ title, onChangeTitle, body, onChangeBody }) => {
  return (
    <>
      <form className="h-36 flex flex-col items-start border-2 border-solid border-transparent hover:border-2 hover:border-solid hover:border-purple-500">
        <label
          className="w-full text-lg font-medium border-b-2 border-solid border-transparent hover:border-b-2 hover:border-dotted hover:border-purple-500 "
          htmlFor=""
        >
          Title
        </label>
        <textarea
          className="bg-slate-100 w-full h-full mt-2 p-6 text-slate-400 focus:text-black font-bold text-2xl rounded-lg resize-none focus:outline-none border-t-2 border-solid border-transparent focus:border-t-2 focus:border-dotted focus:border-purple-500"
          cols="50"
          rows="10"
          value={title}
          onChange={onChangeTitle}
        ></textarea>
      </form>
      <form className="h-40 mt-6 flex flex-col items-start border-2 border-solid border-transparent hover:border-2 hover:border-solid hover:border-purple-500">
        <label
          className="w-full text-lg font-medium border-b-2 border-solid border-transparent hover:border-b-2 hover:border-dotted hover:border-purple-500"
          htmlFor=""
        >
          Detail
        </label>
        <textarea
          className="bg-slate-100 w-full h-full mt-2 p-6 text-slate-400 focus:text-black font-bold text-lg rounded-lg resize-none focus:outline-none border-t-2 border-solid border-transparent focus:border-t-2 focus:border-dotted focus:border-purple-500"
          cols="50"
          rows="10"
          value={body}
          onChange={onChangeBody}
        ></textarea>
      </form>
    </>
  );
};

export default FormInput;
