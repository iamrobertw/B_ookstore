import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styles from "./Product.module.css";
import {
  showCurrentItem,
  addToCart,
} from "../../../redux/Bookstore/bookstore-actions";

const Product = ({ product, addToCart, showCurrentItem }) => {
  return (
    <>
      <div className={styles.product}>
        <div className={styles.product__section}>
          <img
            className={styles.product__image}
            src={product.cover_url}
            alt={product.title}
          />

          <div className={styles.product__portion}>
            <p className={styles.portion__title}>{product.title}</p>
            <p className={styles.portion__desc}>{product.author}</p>
            <p className={styles.portion__desc}>Ilość stron: {product.pages}</p>
            <p className={styles.portion__price}>
              {" "}
              {product.price} {product.currency}
            </p>
          </div>
        </div>

        <div className={styles.product__buttons}>
          <Link to={`/product/${product.id}`}>
            <button
              onClick={() => showCurrentItem(product)}
              className={`${styles.product__button} ${styles.product__button_view}`}
            >
             ZOBACZ KSIĄŻKĘ
            </button>
          </Link>
          <button
            onClick={() => addToCart(product.id)}
            className={`${styles.product__button} ${styles.product__button__add}`}
          >
            DODAJ DO KOSZYKA
          </button>
        </div>
      </div>
      <div className={styles.portion__divider}></div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => dispatch(addToCart(id)),
    showCurrentItem: (item) => dispatch(showCurrentItem(item)),
  };
};

export default connect(null, mapDispatchToProps)(Product);
