import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import styles from "./Navbar.module.css";
import menuItems from "./MenuItems";
import "./Navbar.css";

const Navbar = ({ cart }) => {
  const [cartCount, setCartCount] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    let count = 0;
    cart.forEach((item) => {
      count += item.quantity;
    });

    setCartCount(count);
  }, [cart, cartCount]);

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <h2 className={styles.navbar__company}>Księgarnia</h2>
      </Link>

      <div className={styles.menu__icon} onClick={handleClick}>
        <i className={active ? "fas fa-times" : "fas fa-bars"}></i>
      </div>

      <ul className={active ? "nav-menu active" : "nav-menu"}>
        {menuItems.map((item, index) => {
          return (
            <li key={index}>
              <Link onClick={handleClick} to={item.url} className={item.class__name}>
                {item.title}
              </Link>
            </li>
          );
        })}
        <div className={styles.downsize}>
          <Link to="/cart" onClick={handleClick}>
            <div className={styles.navbar__cart}>
              <FaShoppingCart className={styles.cart__icon} />
              <div className={styles.cart__counter}>{cartCount}</div>
              <div className={styles.cart__title}>KOSZYK</div>
            </div>
          </Link>
        </div>
      </ul>
      <div className={styles.upsize}>
        <Link to="/cart" onClick={handleClick}>
          <div className={styles.navbar__cart}>
            <FaShoppingCart className={styles.cart__icon} />
            <div className={styles.cart__counter}>{cartCount}</div>
            <div className={styles.cart__title}>KOSZYK</div>
          </div>
        </Link>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
  };
};

export default connect(mapStateToProps)(Navbar);
