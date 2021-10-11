import Axios from "axios";
import { URL_API } from "../../helper";

// export const authLogin = (data) => {
//   console.log("Data masuk Action dari component :", data);
//   return {
//     type: "USER_LOGIN",
//     payload: data,
//   };
// };

export const forgotUser = () => {};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    Axios.post(URL_API + `/users/login`, {
      email,
      password,
    })
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          if (res.password === res.data.password) {
            //delete res.data.password;
            localStorage.setItem("userDataEmmerce", res.data.dataLogin);
            // menjalankan fungsi action
            // this.authLogin(res.data.dataLogin);
            // this.setState({ redirect: true });
            console.log("Login Suksess ✔");
            // this.inUsername.value = "";
            // this.inPass.value = "";
            /* localStorage.setItem(
              "userDataEmmerce",
              JSON.stringify(result.data[0])
            );*/

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

export const userKeepLogin = (userData) => {
  return (dispatch) => {
    Axios.get(`${URL_API}/users/get`, {
      params: {
        id: userData.id,
      },
    })
      .then((result) => {
        delete result.data[0].password;
        localStorage.setItem("userDataEmmerce", JSON.stringify(result.data[0]));
        dispatch({
          type: "USER_LOGIN",
          payload: result.data[0],
        });
      })
      .catch(() => {
        alert(`Terjadi kesalahan di server`);
      });
  };
};

export const checkStorage = () => {
  return {
    type: "CHECK_STORAGE",
  };
};
