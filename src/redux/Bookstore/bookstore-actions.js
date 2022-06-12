import storeApi from "../../apis/storeApi";
import * as actionTypes from "./bookstore-types";

export const fetchProducts = (id) => async (dispatch) => {
  const response = await storeApi.get(`/api/books?page=${id}`);
  dispatch({
    type: actionTypes.FETCH_PRODUCTS,
    payload: { products: response.data.data },
  });
};
// export const fetchProducts = () => async (dispatch) => {
//   const response = await storeApi.get("/api/books?page=1");
//   dispatch({
//     type: actionTypes.FETCH_PRODUCTS,
//     payload: { products: response.data.data },
//   });
// };

export const addToCart = (itemID) => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: {
      id: itemID,
    },
  };
};

export const removeFromCart = (itemID) => {
  return {
    type: actionTypes.REMOVE_FROM_CART,
    payload: {
      id: itemID,
    },
  };
};

export const fitItemQty = (itemID, quantity) => {
  return {
    type: actionTypes.FIT_ITEM_QTY,
    payload: {
      id: itemID,
      quantity,
    },
  };
};

export const showCurrentItem = (item) => {
  return {
    type: actionTypes.SHOW_CURRENT_ITEM,
    payload: item,
  };
};
