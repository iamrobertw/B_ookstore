import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import storeApi from "../../apis/storeApi";
import styles from "./Checkout.module.css";

const Checkout = ({ cart }) => {
  const initialValues = {
    first_name: "",
    last_name: "",
    city: "",
    zip_code: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [toSendOrder, setToSendOrder] = useState([]);
  const [toSubmit, setToSubmit] = useState([{}]);
  const [serverResponse, setServerResponse] = useState();
  const [errors, setErrors] = useState();

  function sendOrder() {
    storeApi
      .post("/api/order", toSubmit)
      .then((response) => {
        console.log("\x1b[36m%s\x1b[0m", "Server response:", response.status);

        setServerResponse(response.status);
      })
      .catch((err) => {
        if (err.response) {
          setErrors(err.response.status);
          console.log(`Error: ${err.message}`);
          // console.log(err);
        }
      });
  }

  useEffect(() => {
    let items = 0;
    let price = 0;
    let toOrder = [];
    let temp = {};

    cart.forEach((item) => {
      items += item.quantity;
      price += item.quantity * item.price;
    });

    temp = cart.forEach((item) => {
      temp.id = item.id;
      temp.quantity = item.quantity;
      toOrder.push({ ...temp });
    });
    setToSendOrder({ order: toOrder });

    setTotalItems(items);
    setTotalPrice(price);
  }, [
    cart,
    totalPrice,
    totalItems,
    formValues,
    setTotalPrice,
    setTotalItems,
    setFormValues,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  if (formValues.zip_code !== "") {
    setTimeout(() => {
      setToSubmit({ ...toSendOrder, ...formValues });
    }, 50);
  }

  useEffect(() => {
    // console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^\d{2}-\d{3}$/i;
    if (!values.first_name) {
      errors.first_name = "Podanie imienia jest wymagane!";
    }
    if (!values.last_name) {
      errors.last_name = "Podanie nazwiska jest wymagane!";
    }
    if (!values.city) {
      errors.city = "Podanie nazwy miasta jest wymagane!";
    } else if (values.city.length < 2) {
      errors.city = "Nazwa miasta musi mie?? przynajmniej 2-ie litery!";
    } else if (values.city.length > 30) {
      errors.city = "Nazwa miasta nie mo??e mie?? wi??cej ni?? 30-ci liter";
    }
    if (!values.zip_code) {
      errors.zip_code = "Podanie kodu pocztowego jest wymagane!";
    } else if (!regex.test(values.zip_code)) {
      errors.zip_code = "To nie jest poprawny zapis kodu pocztowego!";
    }
    return errors;
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* <pre>{JSON.stringify(toSubmit, undefined, 2)}</pre> */}
        {/* <pre>{JSON.stringify(formValues, undefined, 2)}</pre> */}
        <h1>Wprowad?? dane do zam??wienia</h1>
        {(Object.keys(formErrors).length === 0) & isSubmit ? (
          <div className="ui message success">
            Twoje dane zosta??y pomy??lnie wys??ane!
          </div>
        ) : (
          ""
        )}
        {serverResponse === 201 && (
          <div className="ui message success">
            Twoje zam??wienie i Twoje dane zosta??y pomy??lnie zarejestrowane!
          </div>
        )}
        {serverResponse !== 201 && isSubmit && (
          <div className="ui message error">
           Co?? posz??o nie tak! Serwer odrzuci?? ????danie. Sprawd?? prosz?? Twoje dane i po????czenie, a nast??pnie spr??buj ponownie!
          </div>
        )}
        <form onSubmit={handleSubmit} method="POST" target="_blank">
          <div className="ui divider"></div>
          <div className="ui form">
            <div className="field">
              <input
                type="text"
                name="first_name"
                placeholder="Imi??"
                value={formValues.first_name}
                onChange={handleChange}
              />
            </div>
            <p className={styles.error}>{formErrors.first_name}</p>
            <div className="field">
              <input
                type="text"
                name="last_name"
                placeholder="Nazwisko"
                value={formValues.last_name}
                onChange={handleChange}
              />
            </div>
            <p className={styles.error}>{formErrors.last_name}</p>
            <div className="field">
              <input
                type="text"
                name="city"
                placeholder="Miasto"
                value={formValues.city}
                onChange={handleChange}
              />
            </div>
            <p className={styles.error}>{formErrors.city}</p>
            <div className="field">
              <input
                type="text"
                name="zip_code"
                placeholder="Kod pocztowy"
                value={formValues.zip_code}
                onChange={handleChange}
              />
            </div>
            <p className={styles.error}>{formErrors.zip_code}</p>
            <button
              disabled={totalItems === 0}
              onClick={sendOrder}
              className={
                totalItems !== 0
                  ? styles.checkout__button
                  : styles.checkout__button_nonactive
              }
            >
               ZAMAWIAM I P??AC??
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
  };
};

export default connect(mapStateToProps)(Checkout);
