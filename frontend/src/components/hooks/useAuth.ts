export type AuthData = {
  login: string;
  password: string;
};
export type SignupData = {
  login: string;
  password: string;
  email: string;
  firstName: string;
  secondName: string;
  surname: string;
  phone: string;
  isAdmin: boolean;
};
var token: string = "";

export const Signin = async (authData: AuthData): Promise<any> => {
  GetToken(authData);
};
export const Signup = async (): Promise<any> => {};
export const Logout = async (): Promise<any> => {};

export const GetToken = async (authData: AuthData): Promise<string> => {
  const res = await fetch("http://localhost:3000/auth/login", {
    method: "post",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(authData),
  });
  if (res.status == 401) {
    console.log("401 Unauthorized");
    return "401 Unauthorized";
  }
  const data = await res.json();
  return data.token;
};

export const useAuthJwt = async (): Promise<any> => {
  const res = await fetch("http://localhost:3000/auth/jwt", {
    method: "get",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }),
  });
  if (res.status == 401) {
    console.log("401 Unauthorized");
    return;
  }
  const data = await res.json();
  return `${data.login} - ${data.id}`;
};
