import { useEffect, useState } from "react";

export const ComponentPromise = () => {
  const [user, setUser] = useState("userData");

  // useEffect(() => {
  //   fetch("/api/data")
  //     .then((res) => res.json())
  //     .then((data) => setUser(data.data));
  // }, []);
  const GetData = () => {
    fetch("/api/data")
      .then((res) => res.json())
      .then((data) => setUser(data.data));
  };
  return (
    <div>
      <h1>{user}</h1>
      <button
        onClick={() => {
          GetData();
        }}
      ></button>
    </div>
  );
};
