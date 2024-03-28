import { useEffect, useState } from "react";

export const ComponentPromise = () => {
  const [user, setUser] = useState("userData");

  // useEffect(() => {
  //   fetch("/api/data")
  //     .then((res) => res.json())
  //     .then((data) => setUser(data.data));
  // }, []);
  const GetData = () => {
    fetch("http://localhost:3000/auth/login", {
      method: "post",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        login: "lo",
        password: "pass",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => setUser(data.token));
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
