import Axios from "axios";
import { URL_API } from "../../helper";

export const getCartData = (userId) => {
  return (dispatch) => {
    Axios.get(`${URL_API}/carts`, {
      params: {
        userId,
      },
    })
      .then((result) => {
        dispatch({
          type: "FILL_CART",
          payload: result.data,
        });
      })
      .catch(() => {
        alert("Terjadi kesalahan di server!");
      });
  };
};
