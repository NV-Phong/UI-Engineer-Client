import axios from "axios";
import Cookies from "js-cookie";

const SERVER_PORT = process.env.NEXT_PUBLIC_API_URL;

export const login = async (username: string, password: string) => {
   const data = { username, password };
   const response = await axios.post(`${SERVER_PORT}/auth/login`, data, {
      withCredentials: true,
   });
   return response;
};

export const register = async (
   username: string,
   password: string,
   email: string,
   displayname: string
) => {
   const data = { username, password, email, displayname };
   const response = await axios.post(`${SERVER_PORT}/auth/register`, data, {
      withCredentials: true,
   });
   return response;
};

export const checkTokenAndRedirect = (router: any) => {
   const token = Cookies.get("access_token");
   if (token) {
      router.push("/");
   }
};
