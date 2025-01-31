import { toastr } from "react-redux-toastr";
import { auth, firestore, serverTimestamp } from "src/Firebase/Firebase";
import history from "src/history/history";
import { REMOVE_USER, SET_USER } from "./authConstants";
import { cleanPins, getApiPins } from 'src/Redux/pins/pinsActions';

export const setUser = (user) => ({
  type: SET_USER,
  payload: {
    user,
  },
});

export const removeUser = () => ({
  type: REMOVE_USER,
});

export const signup = (email, password, name) => async (dispatch) => {
  try {
    var {
      user: { uid },
    } = await auth.createUserWithEmailAndPassword(email, password);
    console.log(uid);

    var userInfo = {
      name,
      email,
      createdAt: serverTimestamp(),
    };
    await firestore.collection("users").doc(uid).set(userInfo);
    history.push("/");
    toastr.success("Sign up Complete");
  } catch (error) {
    console.log(error);
    toastr.error("Error", error.message);
  }
};

export const signin = (email, password) => async (dispatch) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    toastr.success("Sign in Complete");
    history.push("/");
  } catch (error) {
    console.log(error);
    toastr.error("Error", error.message);
  }
};

export const signout = () => async (dispatch) => {
  try {
    await auth.signOut();
    toastr.success("Signed Out...");
  } catch (error) {
    console.log(error);
    toastr.error("Error", error.message);
  }
};

export const authListener = () => async (dispatch) => {
  try {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        var { uid } = user;
        //fetch data from firestore
        var query = await firestore.collection("users").doc(uid).get();
        var { name, email } = query.data();

        var userData = {
          email,
          name,
          uid,
        };
        dispatch(setUser(userData));
        dispatch(getApiPins())
      } else {
        dispatch(removeUser());
        dispatch(cleanPins())
      }
    });
  } catch (error) {
    console.log(error);
  }
};
