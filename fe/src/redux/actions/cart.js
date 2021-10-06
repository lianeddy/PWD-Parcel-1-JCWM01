import Axios from 'axios';
export const URL_API = 'http://localhost:3302'

export const getCartData = (userId) => {
    return (dispatch) => {
        Axios.get(`${URL_API}/carts`, {
            params: {
                userId,
            }
        })
            .then((result) => {
                dispatch({
                    type: "FILL_CART",
                    payload: result.data,
                })
            })
            .catch(() => {
                alert('Terjadi kesalahan di server!')
            })
    }
}
