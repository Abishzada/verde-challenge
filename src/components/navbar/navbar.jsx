import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setPostCount } from "../../features/verde/verde-slice";
import "./navbar.css";

const Navbar = () => {
  const { postCount, posts } = useAppSelector((state) => state.verde);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPostCount(posts.length));
  }, [posts]);

  return (
    <>
      <header className="h-20 flex flex-row justify-between items-center bg-white px-4">
        <Link to={"/users/1/posts"}>
          <FontAwesomeIcon
            className="text-blue-700 text-3xl"
            icon={faCirclePlay}
          />
          <span className="ml-2 text-3xl font-semibold">Arbit blog</span>
        </Link>
        <div className="flex flex-row justify-center items-center space-x-9 relative">
          <p className="relative">
            <span className="font-medium text-xl text-slate-700">Posts</span>
            <span className="absolute bottom-5 left-9 text-xs text-slate-500 p-1 rounded-full bg-green-200">
              {postCount}
            </span>
          </p>
          <div>
            <FontAwesomeIcon
              className="text-slate-600 text-3xl h-5"
              icon={faBell}
            />
          </div>
          <div>
            <FontAwesomeIcon icon={faBars} className="text-slate-600 h-5" />
          </div>
          <div>
            <FontAwesomeIcon icon={faUser} className="text-slate-600 h-5" />
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
