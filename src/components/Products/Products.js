import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/Bookstore/bookstore-actions";
import styles from "./Products.module.css";
import Product from "./Product/Product";

const Products = (state) => {
  const dispatch = useDispatch();

  //--
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts(pageNumber));
  }, [pageNumber]);

  const nextPage = () => {
    pageNumber === 1 && setPageNumber(2);
  };

  const prevPage = () => {
    pageNumber === 2 && setPageNumber(1);
  };

  return (
    <>
      <div className={styles.products}>
        {state.products &&
          state.products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
      </div>
      <div className={styles.pagination}>
        <button
          style={{
            background: pageNumber === 1 && "#eeeeee",
            color: pageNumber === 1 && "#c7c7c7",
          }}
          disabled={pageNumber === 1 ? true : false}
          className={styles.products__button_prev}
          onClick={prevPage}
        >
          POPRZEDNIA
        </button>
        <button
          style={{
            background: pageNumber === 2 && "#eeeeee",
            color: pageNumber === 2 && "#c7c7c7",
          }}
          disabled={pageNumber === 2 ? true : false}
          className={styles.products__button_next}
          onClick={nextPage}
        >
          NASTĘPNA
        </button>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.shop.products.products,
  };
};

export default connect(mapStateToProps)(Products);
