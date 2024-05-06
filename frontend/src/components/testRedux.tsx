import { useDispatch, useSelector } from "react-redux";
import { useActions } from "./hooks/useActions";
import { RootStore } from "@src/redux/store";
import { useAppDispatch, useAppSelector } from "./hooks/redux";

function Likes() {
  const firstName = useAppSelector((state) => state.user.firstName);
  const { setFirstName } = useActions();

  // const dispatch = useDispatch();
  return (
    <div>
      {/* <button>
        {"<3"} {props.likes}
      </button>
      <button>Dislike</button> */}
      {firstName}
      <input
        type="text"
        onChange={(e) => {
          // dispatch(setFirstName(e.target.value));
          setFirstName(e.target.value);
        }}
      />
    </div>
  );
}

export default Likes;
