import { toastr } from "react-redux-toastr";
import { firestore } from "src/Firebase/Firebase";
import { SET_ALL_PINS, CLEAN_ALL_PINS } from "./pinsConstants";
import store from "./../store";

/////////////////Store Management////////////

export const setAllPins = (allPins) => ({
  type: SET_ALL_PINS,
  payload: allPins,
});

export const cleanPins = () => ({
  type: CLEAN_ALL_PINS,
});

////////////////////API CALLLS//////////////////

export const getApiPins = () => async (dispatch) => {
  try {
    let uid = store.getState().auth.uid;
    let arr = [];
    let query = await firestore
      .collection(`users`)
      .doc(uid)
      .collection("pins")
      .get();
    query.docs.forEach(async (doc) => {
      arr.push(doc.data());
    });
    dispatch(setAllPins(arr));
  } catch (error) {
    toastr.error("Error", error.message);
  }
};

export const sendApiPin = async (pin) => {
  try {
    let uid = store.getState().auth?.uid;
    pin.draggable = false;
    pin.selected = false;
    if (uid) {
      await firestore
        .collection("users")
        .doc(uid)
        .collection("pins")
        .doc(pin.id)
        .set(pin);
      toastr.success("Done", "Pin saved to database.");
    } else {
      toastr.error("Auth", "Please login to save pins.");
    }
  } catch (error) {
    toastr.error("Error", error.message);
  }
};

export const deletePin = (id) => async (dispatch) => {
  try {
    let uid = store.getState().auth?.uid;
    await firestore
      .collection("users")
      .doc(uid)
      .collection("pins")
      .doc(id)
      .delete();

    let allPins = store.getState().pins.allPins;
    allPins = allPins.filter((item) => item.id !== id);
    dispatch(setAllPins([...allPins]));

    toastr.success("Done", "Pin deleted.");
  } catch (error) {
    toastr.error("Error", error.message);
  }
};
