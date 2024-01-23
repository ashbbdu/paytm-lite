import { toast } from "react-hot-toast";
import { setBalance } from "../../store/slices/bankSlice";
import { setLoading } from "../../store/slices/userSlice";
import { BALANCE_API, FUNDTRANSFER_API, GETUSERS_API } from "../api";
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

export const transferBalance = (userId , amount , setAmount , setShowModal , getUserBalance , token) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            if (amount > 0) {
              const sendMoney = await apiConnector("POST" , FUNDTRANSFER_API,
                {
                  recieversId: userId,
                  amount: parseInt(amount),
                },
               { Authorization: `Bearer ${token}` } 
              );
              if (sendMoney.status === 200) {
                setShowModal(false);
                setAmount(0)
                getUserBalance()
                toast.success(sendMoney.data.message);
              }
            } else {
              toast.error("Amount should be greater than 0");
            }
          } catch (error) {
            toast.error(error.response.data.message);
          }
          dispatch(setLoading(false));
    }
}