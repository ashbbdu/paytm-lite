import { setBalance } from "../../store/slices/bankSlice";
import { BALANCE_API, GETUSERS_API } from "../api";
import { apiConnector } from "../apiConnector";

export const bankBalance = (token) => {
    return async (dispatch) => {
        try {
            const balance = await apiConnector("GET", `${BALANCE_API}`, null, {
                Authorization: `Bearer ${token}`,
              });
              if (balance.status === 200) {
                dispatch(setBalance(balance.data.balance));
              }
        } catch (error) {
            console.log(error);
        }
    }
}