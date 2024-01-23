import { toast } from "react-hot-toast";
import { setLoading, setUser } from "../../store/slices/userSlice";
import { SIGNIN_API, SIGNUP_API } from "../api";
import { apiConnector } from "../apiConnector";


export const signup = (data, navigate) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const repsonse = await apiConnector("POST", SIGNUP_API, data);
      if (repsonse.status === 200) {
        dispatch(setUser(repsonse.data.user));
        toast.success(repsonse.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
};

export const login = (data , navigate) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const repsonse = await apiConnector("POST", SIGNIN_API, data);
      if (repsonse.status === 200) {
        localStorage.setItem("token", repsonse.data.token);
        localStorage.setItem("userDetails", JSON.stringify(repsonse.data.user));
        dispatch(setUser(repsonse.data.user));
        toast.success(repsonse.data.message);
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
};

