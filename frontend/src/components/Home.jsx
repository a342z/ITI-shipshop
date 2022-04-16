import React, { Component } from "react";
import Slider from "react-slick";
import CategoryCard from "./CategoryCard";
import Carousel from "react-bootstrap/Carousel";
import { Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { addCart } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getCategoriesList } from "../redux/action/Products";
import axios from "axios";
import Products_Card from "./Products_Card";
import PasswordButton from "./PasswordButton";
const Home = () => {

  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 4,
    swipeToSlide: true,
    afterChange: function(index) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  const settingsTwo = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    swipeToSlide: true,
    afterChange: function(index) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  const cartState = useSelector((state) => state.handleCart);
  const CategoriesList = useSelector(
    (state) => state.ProductsReducer.categories
  );
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    dispatch(getCategoriesList());
    axios
      .get(`http://localhost:8080/random`)
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => console.log(err));
    console.log(products);
  }, []);
  return (
    <div className="hero ">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/assets/1.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h4>NEW SEASON ARRIVALS</h4>
            <p className="card-text lead fs-2">CHECK OUT ALL THE TRENDS</p>
            <NavLink
              to="/products"
              className="btn btn-outline-dark  ms-2 px-3 py-2"
            >
              Shop Now
            </NavLink>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/assets/2.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h4>NEW SEASON ARRIVALS</h4>
            <p className="card-text lead fs-2">CHECK OUT ALL THE TRENDS</p>
            <NavLink
              to="/products"
              className="btn btn-outline-dark  ms-2 px-3 py-2"
            >
              Shop Now
            </NavLink>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/assets/3.jpg"
            alt="third slide"
          />
          <Carousel.Caption>
            <h4>NEW SEASON ARRIVALS</h4>
            <p className="card-text lead fs-2">CHECK OUT ALL THE TRENDS</p>
            <NavLink
              to="/products"
              className="btn btn-outline-dark  ms-2 px-3 py-2"
            >
              Shop Now
            </NavLink>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="/assets/4.jpg" alt="four slide" />

          <Carousel.Caption>
            <h4>NEW SEASON ARRIVALS</h4>
            <p className="card-text lead fs-2">CHECK OUT ALL THE TRENDS</p>
            <NavLink
              to="/products"
              className="btn btn-outline-dark  ms-2 px-3 py-2"
            >
              Shop Now
            </NavLink>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="/assets/5.jpg" alt="five slide" />

          <Carousel.Caption>
            <h4>NEW SEASON ARRIVALS</h4>
            <p className="card-text lead fs-2">CHECK OUT ALL THE TRENDS</p>
            <NavLink
              to="/products"
              className="btn btn-outline-dark  ms-2 px-3 py-2"
            >
              Shop Now
            </NavLink>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Container
        className="d-flex flex-wrap justify-content-around"
        style={{ marginTop: "70px" }}
      >
        {CategoriesList.map((category) => {
          return <CategoryCard category={category}></CategoryCard>;
        })}
      </Container>
      <Container
        fluid="true"
        className="d-flex flex-wrap justify-content-around"
        style={{
          marginTop: "70px",
          backgroundColor: "#F7F7F7",
          paddingTop: "40px",
        }}
      >
        <div
          style={{ width: "100%" }}
          fluid="true"
          className="d-flex flex-wrap justify-content-center"
        >
          <h1 style={{ width: "80%", textAlign: "center", color: "#999" }}>
            Latest Products
          </h1>
          <span
            style={{
              backgroundColor: "#999",
              height: "2px",
              width: "50%",
              marginBottom: "30px",
            }}
          ></span>
        </div>

        {products.map((product) => {
          return <Products_Card product={product}></Products_Card>;
        })}
      </Container>

      <div className="vh-25 my-5 mx-5  px-5 border border-2 bg-secondary p-2  bg-opacity-10">
      <h2 className="pt-3">Labtops</h2>
        <Slider {...settings} className="text-black">
          {products.map((product)=>{
            return(
              <div >
                <Products_Card product={product} >
              
            </Products_Card>
              </div>
            )
          })}
        </Slider>
      </div>

      <div className="vh-25 my-5 mx-5 px-5 border border-2 bg-secondary p-2  bg-opacity-10">
      <h2 className="pt-3">Mobile</h2>
        <Slider {...settingsTwo} className="text-black">
          {products.map((product)=>{
            return(
              <div >
                <Products_Card product={product} >
              
            </Products_Card>
              </div>
            )
          })}
        </Slider>
      </div>

      <div className="vh-25 my-5 mx-5 px-5 border border-2 bg-secondary p-2  bg-opacity-10">
      <h2 className="pt-3">Clothing</h2>
        <Slider {...settingsTwo} >
          {products.map((product)=>{
            return(
              <div >
                <Products_Card product={product} >
              
            </Products_Card>
              </div>
            )
          })}
        </Slider>
      </div>
    </div>
  );
};

export default Home;
