
import { setLoading, setUser } from "../../store/slices/userSlice";
import { GETUSERS_API } from "../api";
import { apiConnector } from "../apiConnector";

export const users = (query , token) => {
    return async (dispatch) => {
      dispatch(setLoading(true));
      try {
        const users = await apiConnector("GET", `${GETUSERS_API}${query}`, null, {
          Authorization: `Bearer ${token}`,
        });
        if (users.status === 200) {
          dispatch(setUser(users.data.users));
        }
      } catch (error) {
        console.log(error, "error");
      }
      dispatch(setLoading(false));
    };
  };
  