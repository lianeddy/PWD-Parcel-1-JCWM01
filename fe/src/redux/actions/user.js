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
            console.log("userDataEmmerce", res.data);
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

// mentoring external
//  export const userKeepLogin = () => {
//   let userData = {};
//   return (dispatch) => {
//     userData["id"] = 2;
//     Axios.get(`${URL_API}/users/get`, {
//       params: {
//         id: userData.id,
//       },
//     })
//       .then((result) => {
//         delete result.data[0].password;
//         console.log("resul.data[0]", result.data);
//         let user = result.data.filter((e) => e.id === userData.id)[0];
//         console.log("user", user);
//         console.log("user.data.id", userData.id);

//         localStorage.setItem("userDataEmmerce", JSON.stringify(user));
//         dispatch({
//           type: "USER_LOGIN",
//           payload: user,
//         });
//       })
//       .catch(() => {
//         alert(`Terjadi kesalahan di server`);
//       });
//   };
// };

export const userKeepLogin = (userData) => {
  console.log("cekuser", userData);
  return (dispatch) => {
    Axios.get(`${URL_API}/users/get`, {
      params: {
        id: userData.id,
      },
    })
      .then((result) => {
        console.log("result", result);
        delete result.data[0].password;
        localStorage.setItem("userDataEmmerce", JSON.stringify(result.data[0]));
        console.log("userData", result.data[0]);
        dispatch({
          type: "USER_LOGIN",
          payload: result.data[0],
        });
        console.log("user_login", result.data[0]);
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
