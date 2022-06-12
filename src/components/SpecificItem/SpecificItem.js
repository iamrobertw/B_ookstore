import React from "react";
import { connect } from "react-redux";
import styles from "./SpecificItem.module.css";
import { addToCart } from "../../redux/Bookstore/bookstore-actions";

const SpecificItem = ({ current, addToCart }) => {
  return (
    <div className={styles.specificItem}>
      <img
        className={styles.specificItem__image}
        src={current.cover_url}
        alt={current.title}
      />
      <div className={styles.specificItem__portion}>
        <p className={styles.portion__title}>{current.title}</p>
        <p className={styles.portion__description}>{current.author}</p>
        <p className={styles.portion__description}>Ilość stron: {current.pages}</p>
        <p className={styles.portion__price}>
          {current.price} {current.currency}
        </p>

        <button
          onClick={() => addToCart(current.id)}
          className={styles.portion__button}
        >
          DODAJ DO KOSZYKA
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    current: state.shop.currentItem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => dispatch(addToCart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecificItem);
