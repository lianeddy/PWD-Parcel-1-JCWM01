import Axios from "axios";
import { URL_API } from "../../helper";

export const forgotUser = () => {};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    console.log("masuk axios");
    Axios.post(URL_API + `/users/login`, {
      email,
      password,
    })
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          if (res.password === res.data.password) {
            //delete res.data.password;
            console.log("userDataEmmerce", res.data);
            // localStorage.setItem("userDataEmmerce", res.data.dataLogin);
            // menjalankan fungsi action
            // this.authLogin(res.data.dataLogin);
            // this.setState({ redirect: true });
            console.log("Login Suksess ✔");
            // this.inUsername.value = "";
            // this.inPass.value = "";
            // localStorage.setItem(
            //   "userDataEmmerce",
            //   JSON.stringify(result.data[0])
            // );
            localStorage.setItem("token", res.data.token);

            dispatch({
              type: "USER_LOGIN",
              payload: res.data.dataLogin,
            });
          } else {
            dispatch({
              type: "USER_ERROR",
              payload: "Wrong password!",
            });
          }
        } else {
          dispatch({
            type: "USER_ERROR",
            payload: "User not found!",
          });
        }
      })
      .catch((err) => {
        alert("Terjadi kesalahan server!");
      });
  };
};

export const logoutUser = () => {
  localStorage.removeItem("userDataEmmerce");

  return {
    type: "USER_LOGOUT",
  };
};

export const keepLogin = (token) => {
  return (dispatch) => {
    Axios.get(`${URL_API}/users/keeplogin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch({
          type: "USER_LOGIN",
          payload: res.data[0],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const checkStorage = () => {
  return {
    type: "CHECK_STORAGE",
  };
};

export const editPasswordUser = ({ password }) => {
  return (dispatch) => {
    Axios.post(URL_API + `/users/editpassword`, {
      password,
    })
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          if (res.password === res.data.password) {
            //delete res.data.password;
            console.log("userDataEmmerce", res.data);
            // localStorage.setItem("userDataEmmerce", res.data.dataLogin);
            // menjalankan fungsi action
            // this.authLogin(res.data.dataLogin);
            // this.setState({ redirect: true });
            console.log("Login Suksess ✔");
            // this.inUsername.value = "";
            // this.inPass.value = "";
            // localStorage.setItem(
            //   "userDataEmmerce",
            //   JSON.stringify(result.data[0])
            // );
            localStorage.setItem("token", res.data.token);

            dispatch({
              type: "USER_LOGIN",
              payload: res.data.dataLogin,
            });
          } else {
            dispatch({
              type: "USER_ERROR",
              payload: "Wrong password!",
            });
          }
        } else {
          dispatch({
            type: "USER_ERROR",
            payload: "User not found!",
          });
        }
      })
      .catch((err) => {
        alert("Terjadi kesalahan server!");
      });
  };
};
