import { useEffect, useState } from "react";

export const ComponentPromise = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/data")
      .then((res) => res.json())
      .then((data) => setUser(data.data));
  }, []);
  return (
    <div>
      <h1>{user}</h1>
    </div>
  );
};
