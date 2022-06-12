import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import styles from "./Navbar.module.css";

import { connect } from "react-redux";

const Navbar = ({ cart }) => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    let count = 0;
    cart.forEach((item) => {
      count += item.quantity;
    });

    setCartCount(count);
  }, [cart, cartCount]);

  return (
    <div className={styles.navbar}>
      <Link to="/">
        <h2 className={styles.navbar__company}>Księgarnia</h2>
      </Link>
      <div></div>
      <Link to="/cart">
        <div className={styles.navbar__cart}>
          <FaShoppingCart className={styles.cart__icon} />
          <div className={styles.cart__counter}>{cartCount}</div>
          <div className={styles.cart__title}>KOSZYK</div>
        </div>
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
  };
};

export default connect(mapStateToProps)(Navbar);
