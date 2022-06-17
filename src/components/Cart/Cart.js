import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styles from "./Cart.module.css";
import CartItem from "./CartItem/CartItem";

const Cart = ({ cart }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    let items = 0;
    let price = 0;

    cart.forEach((item) => {
      items += item.quantity;
      price += item.quantity * item.price;
    });

    setTotalItems(items);
    setTotalPrice(price);
  }, [cart, totalPrice, totalItems, setTotalPrice, setTotalItems]);

  return (
    <div className={styles.cart}>
      <div className={styles.cart__items}>
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <div className={styles.cart__recap}>
        <h4 className={styles.recap__title}>PODSUMOWANIE KOSZYKA</h4>
        <div className={styles.recap__price}>
          <span className={styles.recap__price_desc}>
            RAZEM: ( {totalItems} {totalItems === 1 && "książka"}{" "}
            {totalItems > 4 && "książek"}{" "}
            {(totalItems === 2) | (totalItems === 3) | (totalItems === 4)
              ? "książki"
              : ""}
            )
          </span>
          <span> {totalPrice} PLN</span>
        </div>

        <Link to="/checkout" className={styles.recap__checkout_button}>
          <h3 className={styles.navbar__company}>DALEJ</h3>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
  };
};

export default connect(mapStateToProps)(Cart);
