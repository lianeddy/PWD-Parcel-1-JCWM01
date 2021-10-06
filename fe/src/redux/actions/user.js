import Axios from 'axios';
import { URL_API } from '../../helper';


export const loginUser = ({ username, password }) => {
    return (dispatch) => {
        Axios.get(URL_API + `/user/login`, {
            params: {
                username,

            }
        })
            .then((result) => {

                if (result.data.length) {
                    if (password === result.data[0].password) {
                        delete result.data[0].password
                        localStorage.setItem('userDataEmmerce', JSON.stringify(result.data[0]))

                        dispatch({
                            type: "USER_LOGIN",
                            payload: result.data[0]
                        })

                    } else {
                        dispatch({
                            type: "USER_ERROR",
                            payload: "Wrong password!"
                        })
                    }
                } else {
                    dispatch({
                        type: "USER_ERROR",
                        payload: "User not found!"
                    })

                }
            })
            .catch((err) => {
                alert("Terjadi kesalahan server!")
            })
    }
}

export const logoutUser = () => {
    localStorage.removeItem("userDataEmmerce");

    return {
        type: "USER_LOGOUT"
    }
}

export const userKeepLogin = (userData) => {
    return (dispatch) => {
        Axios.get(`${URL_API}/users`, {
            params: {
                id: userData.id
            }
        })
            .then((result) => {
                delete result.data[0].password
                localStorage.setItem('userDataEmmerce', JSON.stringify(result.data[0]))

                dispatch({
                    type: "USER_LOGIN",
                    payload: result.data[0]
                })
            })
            .catch(() => {
                alert("Terjadi kesalahan server")
            })
    }
}

export const checkStorage = () => {
    return {
        type: "CHECK_STORAGE",
    }
}