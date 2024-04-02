import { useEffect, useState } from "react";

export const ComponentPromise = () => {
  const [user, setUser] = useState("userData");

  // useEffect(() => {
  //   fetch("/api/data")
  //     .then((res) => res.json())
  //     .then((data) => setUser(data.data));
  // }, []);
  const GetToken = async () => {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "post",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        login: "log",
        password: "pass",
      }),
    });
    if (res.status == 401) {
      setUser("401 Unauthorized");
      return;
    }
    const data = await res.json();
    return data.token;
  };
  const getUser = async () => {
    const res = await fetch("http://localhost:3000/auth/jwt", {
      method: "get",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${await GetToken()}`,
      }),
    });
    if (res.status == 401) {
      setUser("401 Unauthorized");
      return;
    }
    const data = await res.json();
    setUser(`${data.login} - ${data.id}`);
  };

  getUser();

  return (
    <div>
      <h1>{user}</h1>
      <button
        onClick={() => {
          getUser();
        }}
      ></button>
    </div>
  );
};
