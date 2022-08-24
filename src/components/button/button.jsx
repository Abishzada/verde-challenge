import "./button.css";

export const ButtonType = {
  new: "bg-blue-500 w-32 h-10 text-white rounded-md flex flex-row items-center justify-evenly",
  update:
    "bg-blue-500 w-32 h-10 text-white rounded-md flex flex-row items-center justify-evenly",
  delete:
    "bg-red-500 w-32 h-10 text-white rounded-md flex flex-row items-center justify-evenly",
};

const Button = ({ children, buttonType, svg, onClickEvent }) => {
  //   const classNames = staticTypes + buttonType;
  return (
    <button onClick={onClickEvent} className={buttonType}>
      <span>{svg}</span>
      {children}
    </button>
  );
};

export default Button;
