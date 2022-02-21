import { message } from "antd";
import axios from "axios";

export const getAllCars = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND}/api/cars/getallcars`);
   

    
    dispatch({ type: "GET_ALL_CARS", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: true });
  }
};
export const addcar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND}/api/cars/addcar`, reqObj);

    dispatch({ type: "GET_ALL_CARS", payload: response.data });
    dispatch({ type: "LOADING", payload: false });

    message.success("New car add successfully");
    setTimeout(() => {
      window.location.href = "./admin";
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: true });
  }
};

export const editcar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND}/api/cars/editcar`, reqObj);

    dispatch({ type: "GET_ALL_CARS", payload: response.data });
    dispatch({ type: "LOADING", payload: false });

    message.success("Car details  updated successfully");
    setTimeout(() => {
      window.location.href = "../admin";
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: true });
  }
};

export const deleteCar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND}/api/cars/deletecar`, reqObj);

    dispatch({ type: "GET_ALL_CARS", payload: response.data });
    dispatch({ type: "LOADING", payload: false });

    message.success("Car deleted successfully");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: true });
  }
};
