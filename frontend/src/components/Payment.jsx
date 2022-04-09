import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const PaymentScreen = ({ history }) => {

  const state = useSelector((state) => state.handleCart);
  console.log(state)
  if(state.length==0)
  {
    history.push("/"); 
  }
  window.scrollTo(0, 0);


  const [paymentMethod, setPaymentMethod] = useState("card");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    history.push("/placeorder");
  };
  return (
    <>
      <div
        style={{ marginTop: "100px" }}
        className="container d-flex justify-content-center align-items-center login-center"
      >
        <form
          className="Login2 col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>SELECT PAYMENT METHOD</h6>
          <div className="payment-container">
            <input
              type="radio"
              value="card"
              name="gender"
              checked="true"
              onChange={() => setPaymentMethod("card")}
            />{" "}
            pay with credit card <br></br>
            <input
              type="radio"
              value="cod"
              name="gender"
              onChange={() => setPaymentMethod("cod")}
            />{" "}
            cash on delievery<br></br>
          </div>
          <NavLink
          className="btn btn-outline-dark mb-5 w-25 mx-auto "
           to={{
            pathname:'/checkout',
            state: { paymentMethod:paymentMethod
          }  
          }}>
          Continue
         </NavLink>

        </form>
      </div>
    </>
  );
};

export default PaymentScreen;