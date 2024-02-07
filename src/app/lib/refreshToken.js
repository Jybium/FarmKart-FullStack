import api, { privateRequest } from "../../../axios";
import {getCookie} from "cookies-next"

const useRefreshToken = () => {
    const token = getCookie('refresh')
  const refresh = async () => {
    const response = await privateRequest.post("/refresh", {
      withCredentials: true,
      Headers:{
        "refresh" : token,
      }
    });

    return response.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
