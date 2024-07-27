import React from "react";
import "./home.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import light from "../../../assets/architecture-wood-villa-mansion-house-chair-1590901-pxhere.com-removebg-preview.png";
import { NavLink } from "react-router-dom";

const NextArrow = (props) => {
  const { style, onClick } = props;
  return (
    <div
      className="slick-arrow slick-arrow-right"
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <i className="fa-solid fa-arrow-right"></i>{" "}
    </div>
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className="slick-arrow slick-arrow-left"
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <i className="fa-solid fa-arrow-left"></i>{" "}
    </div>
  );
};
export default function Home() {
  const products = [
    {
      id: 1,
      image: require("../../../assets/Procuct_light1.webp"),
      name: "Originals Kaval Windbreaker Winter Jacket",
      price: 19.12,
      originalPrice: 23.9,
      discount: "-20%",
      rating: 5,
      isNew: false,
    },
    {
      id: 2,
      image: require("../../../assets/Procuct_light2.jpg"),
      name: "Juicy Couture Juicy Quilted Terry Track Jacket",
      price: 11.9,
      originalPrice: 35.9,
      discount: "-20%",
      rating: 5,
      isNew: false,
    },
    {
      id: 3,
      image: require("../../../assets/architecture-wood-villa-mansion-house-chair-1590901-pxhere.com.jpg"),
      name: "Madden By Steve Madden Cale 6",
      price: 11.9,
      rating: 4,
      isNew: true,
    },
    {
      id: 4,
      image: require("../../../assets/light-wall-ceiling-lamp-room-lighting-666706-pxhere.com.jpg"),
      name: "Brixton Patrol All Terrain Anorak Jacket",
      price: 29.0,
      rating: 5,
      isNew: false,
    },
  ];
  const testimonials = [
    {
      name: "John Doe",
      image: require("../../../assets/0a4ad9c59f345735e520dc6118ccd447.jpg"),
      text: "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril.",
      email: "demo@posthemes.com",
    },
    // Add more testimonials as needed
    {
      name: "Jane Doe",
      image: require("../../../assets/0a4ad9c59f345735e520dc6118ccd447.jpg"),
      text: "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril.",
      email: "test@gmail.com",
    },
    {
      name: "John Smith",
      image: require("../../../assets/0a4ad9c59f345735e520dc6118ccd447.jpg"),
      text: "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril.",
      email: "smith@gmail.com",
    },
  ];
  const offers = [
    {
      title: "Black Friday",
      description: "Save Up To 50% Off",
      image: require("../../../assets/light-wall-ceiling-lamp-room-lighting-666706-pxhere.com-removebg-preview.png"),
      link: "/product",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "60px",
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const testimonialslider = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "60px",
    autoplay: true,
    autoplaySpeed: 3000,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div>
        <div className="">
          <div className="hero-banner-design">
            <div className="w-full">
              <div
                className="container"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div>
                  <h1>Illuminate Your World with Image Light</h1>
                  <p>Discover the best LED lights for every need</p>
                  <div className="button-outline">
                    <button>Contact Us</button>
                  </div>
                </div>
                <div>
                  <img src={light} style={{ height: "500px" }}></img>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="policy-layout">
            <div className="item">
              <div className="icon-outer">
                <div className="icon">
                  <i className="fas fa-truck"></i>
                </div>
              </div>
              <div className="text">
                <h3>Free Shipping</h3>
                <p>On all orders over $75.00</p>
              </div>
            </div>
            <div className="item">
              <div className="icon-outer">
                <div className="icon">
                  <i className="fas fa-undo"></i>
                </div>
              </div>

              <div className="text">
                <h3>30 Days Return</h3>
                <p>Money back guarantee</p>
              </div>
            </div>
            <div className="item">
              <div className="icon-outer">
                <div className="icon">
                  <i className="fas fa-headphones"></i>
                </div>
              </div>

              <div className="text">
                <h3>24/7 Support</h3>
                <p>Customer support</p>
              </div>
            </div>
            <div className="item">
              <div className="icon-outer">
                <div className="icon">
                  <i className="fas fa-lock"></i>
                </div>
              </div>

              <div className="text">
                <h3>Secure Payment</h3>
                <p>100% secure payment</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="section-title">Top Products</div>
          <div className="product-slider">
            <Slider {...settings}>
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-details">
                    <h3 className="product-name">{product.name}</h3>
                    <div className="product-price">
                      {/* {product.originalPrice && (
                        <span className="original-price">
                          ${product.originalPrice}
                        </span>
                      )} */}
                      <span className="price">${product.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
            <div className="all-product-btn-outer">
              <NavLink to="/product" className="all-product-btn">View All Products</NavLink>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="testimonials-section">
            <Slider {...testimonialslider}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="testimonial">
                  <div className="cenetr-image">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="testimonial-image"
                    />
                  </div>
                  <p className="testimonial-text">{testimonial.text}</p>
                  <h3 className="testimonial-name">{testimonial.name}</h3>
                  <p className="testimonial-email">{testimonial.email}</p>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className="container">
          <div className="special-offers-section">
            <div className="offer-card">
              <div className="offer-content">
                <h3 className="offer-title">{offers[0].title}</h3>
                <p className="offer-description">{offers[0].description}</p>
                <a href={offers[0].link} className="offer-link">
                  View Collection
                </a>
              </div>
                <img
                  src={offers[0].image}
                  alt={offers[0].title}
                  className="offer-image"
                />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
