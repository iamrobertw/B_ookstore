import React, { useState } from "react";
import styles from "./CartItem.module.css";

import { connect } from "react-redux";
import {
  fitItemQty,
  removeFromCart,
} from "../../../redux/Bookstore/bookstore-actions";

const CartItem = ({ item, fitQty, removeFromCart }) => {
  const [input, setInput] = useState(item.quantity);

  const onChangeHandler = (e) => {
    setInput(e.target.value);
    fitQty(item.id, e.target.value);
  };

  return (
    <>
      <div className={styles.cartItem}>
        <div className={styles.cartItem__content}>
          <img
            className={styles.cartItem__image}
            src={item.cover_url}
            alt={item.title}
          />
          <div className={styles.cartItem__portion}>
            <p className={styles.portion__title}>{item.title}</p>
            <p className={styles.portion__desc}>{item.author}</p>
            <p className={styles.portion__desc}>Ilość stron: {item.pages}</p>
            <p className={styles.portion__price}>
              {item.price} {item.currency}
            </p>
          </div>
        </div>
        <div className={styles.cartItem__actions}>
        <p className={styles.portion__price_downsize}> 
              {item.price} {item.currency}
            </p>
          <div className={styles.cartItem__qty}>
            <label htmlFor="qty">ILOŚĆ: </label>
            <p className={styles.downsize}> {input}</p>
            <input  className={styles.upsize}
              min="1"
              type="number"
              id="quantity"
              name="quantity"
              value={input}
              onChange={onChangeHandler}
            />
          </div>
          <button
            onClick={() => removeFromCart(item.id)}
            className={styles.actions__button}
          >
             Usuń
          </button>
        </div>
      </div>
      <div className={styles.portion__divider}></div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fitQty: (id, value) => dispatch(fitItemQty(id, value)),
    removeFromCart: (id) => dispatch(removeFromCart(id)),
  };
};

export default connect(null, mapDispatchToProps)(CartItem);
