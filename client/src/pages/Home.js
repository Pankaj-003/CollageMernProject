import React, { useEffect, useState, useMemo } from 'react';
import Layout from '../components/Layout/Layout'
import 'jquery-ui-dist/jquery-ui';
import $ from 'jquery';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/cart";
// import { toast } from "react-hot-toast";
// import { FiCompare } from 'react-icons/fi';

const Home = () => {
  
    const [mapVisible, setMapVisible] = useState(false);
  
    const toggleMap = () => {
      setMapVisible(!mapVisible);
    };
  
    const closeMap = () => {
      setMapVisible(false);
    };
  
    const mapContainerStyle = {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 9999,
      display: mapVisible ? 'block' : 'none',
      backdropFilter: 'blur(5px)',
    };
  
    const mapOverlayStyle = {
      position: 'relative',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };
  
    const mapIframeStyle = {
      width: '80%',
      height: '80%',
    };
  
    const closeButtonStyle = {
      position: 'absolute',
      top: '10px',
      right: '10px',
      fontSize: '20px',
      color: 'white',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: '5px',
      borderRadius: '50%',
      cursor: 'pointer',
    };
  
      
 
    // categorey
   
    // button
    const [price, setPrice] = useState(null);

    const handleClick = (value) => {
      setPrice(value);
    };
    // ====== 
    const navigate = useNavigate();
    const [cart, setCart] = useCart()
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    //get all cat
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/get-category");
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCategory();
        getTotal();
    }, []);
    //get products
    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts(data.products);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    //getTOtal COunt
    const getTotal = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/product-count");
            setTotal(data?.total);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page]);
    //load more
    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts([...products, ...data?.products]);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    // filter by cat
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);
    };
    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts();
    }, [checked.length, radio.length]);

    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
    }, [checked, radio]);

    //get filterd product
    const filterProduct = async () => {
        try {
            const { data } = await axios.post("/api/v1/product/product-filters", {
                checked,
                radio,
            });
            setProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };
    const SlideShow = ({ divs, slideDuration, currentIndex }) => {
        return (
          <div className="slide-container">
            {divs.map((div, index) => (
              <div
                key={index}
                className={`slide ${index === currentIndex ? 'active' : ''}`}
              >
                {div}
              </div>
            ))}
          </div>
        );
      };
      
 
        const slideDuration = 2000;
        const [currentIndex, setCurrentIndex] = useState(0);
      
        const divs = useMemo(
          () => [
            // Your div elements here
            <div className="top_product">
            <div className="row">
                <div className="col-lg-6">
                    <div className="product_img">
                        <img src="images/index/pd_right1.jpg" className="img-fluid w-100"
                            alt="pd_right1" />
                    </div>
                </div>
                <div className="col-lg-6 align-self-center">
                    <div className="product_text">
                        <a href="/" className="c">T-Shirt</a>
                        <div className="review">
                            <a href="/"><i className="fas fa-star"></i></a>
                            <a href="/"><i className="fas fa-star"></i></a>
                            <a href="/"><i className="fas fa-star"></i></a>
                            <a href="/"><i className="far fa-star"></i></a>
                            <a href="/"><i className="far fa-star"></i></a>
                        </div>
                        <h5>&#8377;100</h5>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <div className="product_img">
                        <img src="images/index/pd_right2.jpg" className="img-fluid w-100"
                            alt="pd_right1" />
                    </div>
                </div>
                <div className="col-lg-6 align-self-center">
                    <div className="product_text">
                        <a href="/" className="c">Ladies Top</a>
                        <div className="review">
                            <a href="/"><i className="fas fa-star"></i></a>
                            <a href="/"><i className="fas fa-star"></i></a>
                            <a href="/"><i className="fas fa-star"></i></a>
                            <a href="/"><i className="far fa-star"></i></a>
                            <a href="/"><i className="far fa-star"></i></a>
                        </div>
                        <h5>&#8377;250</h5>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <div className="product_img">
                        <img src="images/index/pd_right3.jpg" className="img-fluid w-100"
                            alt="pd_right1" />
                    </div>
                </div>
                <div className="col-lg-6 align-self-center">
                    <div className="product_text">
                        <a href="/" className="c">Boat Headphone</a>
                        <div className="review">
                            <a href="/"><i className="fas fa-star"></i></a>
                            <a href="/"><i className="fas fa-star"></i></a>
                            <a href="/"><i className="fas fa-star"></i></a>
                            <a href="/"><i className="far fa-star"></i></a>
                            <a href="/"><i className="far fa-star"></i></a>
                        </div>
                        <h5>&#8377;2500</h5>
                    </div>
                </div>
            </div>
        </div>,
            <div className="top_product">
            <div className="row">
                <div className="col-lg-6">
                    <div className="product_img">
                        <img src="images/index/pd_right4.jpg" className="img-fluid w-100"
                            alt="pd_right1" />
                    </div>
                </div>
                <div className="col-lg-6 align-self-center">
                    <div className="product_text">
                        <a href="/" className="c">Bracelets</a> 
                        <div className="review">
                            <a href="/"><i className="fas fa-star"></i></a>
                            <a href="/"><i className="fas fa-star"></i></a>
                            <a href="/"><i className="fas fa-star"></i></a>
                            <a href="/"><i className="far fa-star"></i></a>
                            <a href="/"><i className="far fa-star"></i></a>
                        </div>
                        <h5>&#8377;150</h5>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <div className="product_img">
                        <img src="images/index/pd_right5.jpg" className="img-fluid w-100"
                            alt="pd_right1" />
                    </div>
                </div>
                <div className="col-lg-6 align-self-center">
                    <div className="product_text">
                        <a href="/" className="c">Lether Watch</a>
                        <div className="review">
                            <a href="/"><i className="fas fa-star"></i></a>
                            <a href="/"><i className="fas fa-star"></i></a>
                            <a href="/"><i className="fas fa-star"></i></a>
                            <a href="/"><i className="far fa-star"></i></a>
                            <a href="/"><i className="far fa-star"></i></a>
                        </div>
                        <h5>&#8377;1999</h5>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <div className="product_img">
                        <img src="images/index/pd_right6.jpg" className="img-fluid w-100"
                            alt="pd_right1" />
                    </div>
                </div>
                <div className="col-lg-6 align-self-center">
                    <div className="product_text">
                        <a href="/" className="c">Red Shoes</a>
                        <div className="review">
                            <a href="/"><i className="fas fa-star"></i></a>
                            <a href="/"><i className="fas fa-star"></i></a>
                            <a href="/"><i className="fas fa-star"></i></a>
                            <a href="/"><i className="far fa-star"></i></a>
                            <a href="/"><i className="far fa-star"></i></a>
                        </div>
                        <h5>&#8377;5000</h5>
                    </div>
                </div>
            </div>
        </div>,
        <div className="top_product">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="product_img">
                                <img src="images/index/pd_right7.jpg" className="img-fluid w-100"
                                    alt="pd_right1" />
                            </div>
                        </div>
                        <div className="col-lg-6 align-self-center">
                            <div className="product_text">
                                <a href="/" className="c">Black Boot</a>
                                <div className="review">
                                    <a href="/"><i className="fas fa-star"></i></a>
                                    <a href="/"><i className="fas fa-star"></i></a>
                                    <a href="/"><i className="fas fa-star"></i></a>
                                    <a href="/"><i className="far fa-star"></i></a>
                                    <a href="/"><i className="far fa-star"></i></a>
                                </div>
                                <h5>&#8377;2500</h5>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="product_img">
                                <img src="images/index/pd_right8.jpg" className="img-fluid w-100"
                                    alt="pd_right1" />
                            </div>
                        </div>
                        <div className="col-lg-6 align-self-center">
                            <div className="product_text">
                                <a href="/" className="c">Cap</a>
                                <div className="review">
                                    <a href="/"><i className="fas fa-star"></i></a>
                                    <a href="/"><i className="fas fa-star"></i></a>
                                    <a href="/"><i className="fas fa-star"></i></a>
                                    <a href="/"><i className="far fa-star"></i></a>
                                    <a href="/"><i className="far fa-star"></i></a>
                                </div>
                                <h5>&#8377;250</h5>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="product_img">
                                <img src="images/index/pd_right9.jpg" className="img-fluid w-100"
                                    alt="pd_right1" />
                            </div>
                        </div>
                        <div className="col-lg-6 align-self-center">
                            <div className="product_text">
                                <a href="/" className="c">Black Lether Watch</a>
                                <div className="review">
                                    <a href="/"><i className="fas fa-star"></i></a>
                                    <a href="/"><i className="fas fa-star"></i></a>
                                    <a href="/"><i className="fas fa-star"></i></a>
                                    <a href="/"><i className="far fa-star"></i></a>
                                    <a href="/"><i className="far fa-star"></i></a>
                                </div>
                                <h5>&#8377;999</h5>
                            </div>
                        </div>
                    </div>
                </div>,

          ],
          []
        );
      
        useEffect(() => {
          const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % divs.length);
          }, slideDuration);
      
          return () => {
            clearInterval(interval);
          };
        }, [divs, slideDuration]);
      
        const goToNextSlide = () => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % divs.length);
        };
      
        const goToPreviousSlide = () => {
          setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? divs.length - 1 : prevIndex - 1
          );
        };
    const [selectedPrice, setSelectedPrice] = useState(null);

    const handleButtonClick = (price) => {
        setSelectedPrice(price);
    };
    // slider start
    const images = [

        '/images/slide-4.png',
        '/images/slide-5.png',
        '/images/slide-6.png',

    ];
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const previousImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };
    //   slider end

    // zoom
    useEffect(() => {
        $(document).ready(function () {
            var jony = document.querySelectorAll("#NZoomImg");
            var arr = Array.from(jony);
            arr.map((item, index) => {
                console.log(item.parentElement.classList[1]);
                let t = item,
                    e = t.getAttribute("data-NZoomscale") <= 0 ? 1 : t.getAttribute("data-NZoomscale");
                    // s = t.clientWidth,
                    // o = t.clientHeight;
                item.parentElement.classList.add(`NZoomContainer${index}`);
                let i = $(`.NZoomContainer${index}`);
                    // n = item;
                i.mouseenter(function () {
                    item.style.cursor = "crosshair";
                    item.style.transition = "0.2s";
                    item.style.transform = `scale(${e})`;
                });
                i.mousemove(function (t) {
                    let e = $(this).offset(),
                        x = (t.pageX - e.left) / 380 * 100 <= 100 ? (t.pageX - e.left) / 380 * 100 : 100,
                        c = (t.pageY - e.top) / 380 * 100 <= 100 ? (t.pageY - e.top) / 380 * 100 : 100;
                    item.style.transformOrigin = `${x}% ${c}%`;
                });
                i.mouseleave(function () {
                    item.style.transition = "0.2s";
                    item.style.transform = "scale(1)";
                });
            });
        });
        // 
    }, []);
    // 
    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            }
          }
        ]
      };
      const sliderSettings2 = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 5.8,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            }
          }
        ]
      };
      const sliderSettings3 = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
         arrows: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 5.8,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            }
          }
        ]
      };
    return (
        <>
 <Layout title={'Home'}>



            <div className='slider_main_div'>
                <button onClick={previousImage} className='btn1'>&#60;</button>
                <a href="/">      <img src={images[currentImageIndex]} alt="Slider"
                    style={{ width: '100%', }}

                /></a>

                {/* <img src="images/slider-1.png" alt="s" /> */}
                {/* <img src="images/slide-1.jpg" alt=""/> */}

                <button onClick={nextImage} className='btn1 nxt'>&#62;</button>
            </div>
            {/* <!-- ========== Banner Part End ========== -->

<!-- ========== Service Part Start ========== --> */}
  <section id="service">
      <Slider {...sliderSettings}>
        <div className="slider-item">
          <div className="col-lg-3 slider-item-col">
            <div className="service_item d-flex">
              <div className="service_icon align-self-center ">
                <i className="fas fa-truck"></i>
              </div>
              <div className="service_text">
                <h5>Free Shipping & Returns</h5>
                <p>For all orders over $99</p>
              </div>
            </div>
          </div>
        </div>
        <div className="slider-item">
          <div className="col-lg-3 slider-item-col">
            <div className="service_item d-flex">
              <div className="service_icon align-self-center">
                <i className="fas fa-briefcase"></i>
              </div>
              <div className="service_text">
                <h5>Secure Payment</h5>
                <p>We ensure secure payment</p>
              </div>
            </div>
          </div>
        </div>
        <div className="slider-item">
          <div className="col-lg-3 slider-item-col">
            <div className="service_item d-flex">
              <div className="service_icon align-self-center">
                <i className="fas fa-hand-holding-usd"></i>
              </div>
              <div className="service_text">
                <h5>Money Back Guarantee</h5>
                <p>Any back within 30 days</p>
              </div>
            </div>
          </div>
        </div>
        <div className="slider-item">
          <div className="col-lg-3 slider-item-col">
            <div className="service_item d-flex">
              <div className="service_icon align-self-center">
                <i className="far fa-comment-dots"></i>
              </div>
              <div className="service_text">
                <h5>Customer Support</h5>
                <p>Call or email us 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </section>
            {/* <!-- ========== Service Part End ========== -->

<!-- ========== Category Banner Part Start ========== --> */}
            <section id="category_banner">
                <div className="container px-lg-0">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="category_banner_img category_banner_img_one">
                                <img className="img-fluid w-100" src="images/index/Category_Banner_img1.jpg"
                                    alt="Category_Banner_img1" />
                                <div className="ovrly">
                                    <h4>Get up to <span>20% Off</span> </h4>
                                    <h2>Sports Outfits</h2>
                                    <h3>Collection</h3>
                                    <p>Starting at <span>&#8377;170</span></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="category_banner_img category_banner_img_two">
                                <img className="img-fluid w-100" src="images/index/Category_Banner_img2.jpg"
                                    alt="Category_Banner_img2" />
                                <div className="ovrly">
                                    <h4>New Arrivals</h4>
                                    <h2>Accessories</h2>
                                    <h3>Collection</h3>
                                    <p>Only From <span>&#8377;90</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- ========== Category Banner Part End ========== -->

<!-- ========== Product detail Part Start ========== --> */}     
    <section id="product_detail">
        <div class="container px-lg-0">
            <div class="row">
                {/* <!-- Product left start --> */}
                <div class="col-lg-9">
                    <div class="zoom_part">
                        <div class="col-lg-12">
                            <div class="zoom_head">
                                <h2>Deals Hot Of The Day</h2>
                            </div>
                        </div>
                        <div class="row zoom_row">
                            <div class="col-lg-6">
                                <div id="carouselExampleIndicators" class="carousel carousel-fade zoom_img_part"
                                    data-bs-ride="carousel">
                                    <div class="row">
                                        <div class="col-lg-3">
                                            <div class="carousel-indicators small_img">
                                                <button type="button" data-bs-target="#carouselExampleIndicators"
                                                    data-bs-slide-to="0" class="active" aria-current="true"
                                                    aria-label="Slide 1">
                                                    <img src="images/index/pd1.jpg" class="img-fluid w-100" alt="pd1.jpg"/>
                                                </button>
                                                <button type="button" data-bs-target="#carouselExampleIndicators"
                                                    data-bs-slide-to="1" aria-label="Slide 2">
                                                    <img src="images/index/pd2.jpg" class="img-fluid w-100" alt="pd2.jpg"/>
                                                </button>
                                                <button type="button" data-bs-target="#carouselExampleIndicators"
                                                    data-bs-slide-to="2" aria-label="Slide 3">
                                                    <img src="images/index/pd3.jpg" class="img-fluid w-100" alt="pd3.jpg"/>
                                                </button>
                                                <button type="button" data-bs-target="#carouselExampleIndicators"
                                                    data-bs-slide-to="3" aria-label="Slide 3">
                                                    <img src="images/index/pd4.jpg" class="img-fluid w-100" alt="pd4.jpg"/>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="col-lg-9">
                                            <div class="carousel-inner zoom_body">
                                                <div class="carousel-item active">
                                                    <img id="NZoomImg" data-NZoomscale="2"
                                                         style={{width: "100%", height: "100%"}}  src="images/index/pd1.jpg"
                                                        alt="pd1.jpg"/>
                                                </div>
                                                <div class="carousel-item">
                                                    <img id="NZoomImg" data-NZoomscale="2"
                                                        style={{width: "100%", height: "100%"}} src="images/index/pd2.jpg"
                                                        alt="pd1.jpg"/>
                                                </div>
                                                <div class="carousel-item">
                                                    <img id="NZoomImg" data-NZoomscale="2"
                                                        style={{width: "100%",height: "100%"}} src="images/index/pd3.jpg"
                                                        alt="pd1.jpg"/>
                                                </div>
                                                <div class="carousel-item">
                                                    <img id="NZoomImg" data-NZoomscale="2"
                                                        style={{ width: "100%", height: "100%" }} src="images/index/pd4.jpg"
                                                        alt="pd1.jpg"/>
                                                       

                                                </div>
                                            </div>
                                            <button class="carousel-control-prev" type="button"
                                                data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                                <i class="fas fa-chevron-left" aria-hidden="true"></i>
                                                <span class="visually-hidden">Previous</span>
                                            </button>
                                            <button class="carousel-control-next" type="button"
                                                data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                                <i class="fas fa-chevron-right" aria-hidden="true"></i>
                                                <span class="visually-hidden">Next</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="zoom_right">
                                    <div class="zoom_text_head">
                                        <a href="#">Beyond OTP Shirt</a>
                                    </div>
                                    <div class="zoom_text">
                                   
                                       
                                     
                                        <div class="review">
                                            <a href="#"><i class="fas fa-star"></i></a>
                                            <a href="#"><i class="fas fa-star"></i></a>
                                            <a href="#"><i class="fas fa-star"></i></a>
                                            <a href="#"><i class="fas fa-star"></i></a>
                                            <a href="#"><i class="far fa-star"></i></a>
                                            <a href="#">(3 Review)</a>
                                        </div>
                                    </div>
                                    <div class="product_size">
                                        <ul class="d-flex justify-content-center">
                                            <li>
                                                <p>Size:</p>
                                            </li>
                                            <li>
                                                <a data-bs-toggle="collapse" href="#collapseExample4" role="button"
                                                    aria-expanded="false" aria-controls="collapseExample">
                                                    Extra Large
                                                </a>
                                            </li>
                                            <li>
                                                <a data-bs-toggle="collapse" href="#collapseExample3" role="button"
                                                    aria-expanded="false" aria-controls="collapseExample">
                                                    Large
                                                </a>
                                            </li>
                                            <li>
                                                <a data-bs-toggle="collapse" href="#collapseExample2" role="button"
                                                    aria-expanded="false" aria-controls="collapseExample">
                                                    Medium
                                                </a>
                                            </li>
                                            <li>
                                                <a data-bs-toggle="collapse" href="#collapseExample1" role="button"
                                                    aria-expanded="false" aria-controls="collapseExample">
                                                    Small
                                                </a>
                                            </li>
                                        </ul>
                                        <div class="collapse" id="collapseExample1">
                                            <h2>&#8377;236</h2>
                                        </div>
                                        <div class="collapse" id="collapseExample2">
                                            <h2>&#8377;240</h2>
                                        </div>
                                        <div class="collapse" id="collapseExample3">
                                            <h2>&#8377;246</h2>
                                        </div>
                                        <div class="collapse" id="collapseExample4">
                                            <h2>&#8377;250</h2>
                                        </div>
                                    
                                       
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Product left end --> */}
                        {/* <!-- Product left end --> */}
                        <div className='Hotdeals'>
                            <h3 className='fw-bolder pt-4 ms-1'>Hot Deals</h3>
      <SlideShow
        divs={divs}
        slideDuration={slideDuration}
        currentIndex={currentIndex}
      />
      <div className="top-main-btn position-absolute top-0">
      <button class="fw-bolder fs-2 btn-top" onClick={goToPreviousSlide}>&#60;</button>
      <button class="fw-bolder fs-2 btn-top ms-1" onClick={goToNextSlide}>&#62;</button>
      </div>
    </div>
{/* ========================== */}
            </div>
        </div>
    </section>
   

 {/* <!-- ========== Categories Part Start ========== -->   */}


            <section id="categories">
                <div className="container px-lg-0">
                    <div className="col-lg-12">
                        <div className="categoreis_header text-center common_header">
                            <h4>Top Categories Of The Month</h4>
                        </div>
                    </div>
                    <div className="row categories_slider slider">
                    <Slider {...sliderSettings2}>
                        <div className=" cat-slide">
                            <div className="categories_content">
                                <img className="img-fluid w-100" src="images/index/C-1.jpg" alt="C-1" />
                                <div className="cat_text text-center">
                                    <p style={{ marginTop: 0, marginBottom: '0em' }}>Fasion</p>
                                    <a href="/">Shop Now</a>
                                </div>
                            </div>
                        </div>
                        <div className=" cat-slide">
                            <div className="categories_content">
                                <img className="img-fluid w-100" src="images/index/C-2.jpg" alt="C-2" />
                                <div className="cat_text text-center">
                                    <p style={{ marginTop: 0, marginBottom: '0em' }}>Furniture</p>
                                    <a href="/">Shop Now</a>
                                </div>
                            </div>
                        </div>
                        <div className=" cat-slide">
                            <div className="categories_content">
                                <img className="img-fluid w-100" src="images/index/C-3.jpg" alt="C-3" />
                                <div className="cat_text text-center">
                                    <p style={{ marginTop: 0, marginBottom: '0em' }}>Shoes</p>
                                    <a href="/">Shop Now</a>
                                </div>
                            </div>
                        </div>
                        <div className="cat-slide">
                            <div className="categories_content">
                                <img className="img-fluid w-100" src="images/index/C-4.jpg" alt="C-5" />
                                <div className="cat_text text-center">
                                    <p style={{ marginTop: 0, marginBottom: '0em' }}>Sports</p>
                                    <a href="/">Shop Now</a>
                                </div>
                            </div>
                        </div>
                        <div className=" cat-slide">
                            <div className="categories_content">
                                <img className="img-fluid w-100" src="images/index/C-5.jpg" alt="C-5" />
                                <div className="cat_text text-center">
                                    <p style={{ marginTop: 0, marginBottom: '0em' }}>Games</p>
                                    <a href="/">Shop Now</a>
                                </div>
                            </div>
                        </div>
                        <div className=" cat-slide">
                            <div className="categories_content">
                                <img className="img-fluid w-100" src="images/index/C-6.jpg" alt="C-6" />
                                <div className="cat_text text-center">
                                    <p style={{ marginTop: 0, marginBottom: '0em' }}>Computers</p>
                                    <a href="/">Shop Now</a>
                                </div>
                            </div>
                        </div>
                        </Slider>
                    </div>



                </div>
            </section>
            {/* <!-- ========== Categories Part End ========== -->

<!-- ========== Departments Part Start ========== --> */}
    <section id="department">
        <div class="container px-lg-0">
            <div class="row">
                <div class="col-lg-12">
                    <div class="department_header common_header">
                        <h4>Popular Departments</h4>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="department_content">
                        <div class="department_menu">
                            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link active" id="pills-arrivals-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-arrivals" type="button" role="tab"
                                        aria-controls="pills-arrivals" aria-selected="true">New arrivals</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="pills-seller-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-seller" type="button" role="tab"
                                        aria-controls="pills-seller" aria-selected="false">Best seller</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="pills-popular-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-popular" type="button" role="tab"
                                        aria-controls="pills-popular" aria-selected="false">most popular</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="pills-featured-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-featured" type="button" role="tab"
                                        aria-controls="pills-featured" aria-selected="false">Featured</button>
                                </li>
                            </ul>
                        </div>
                        <div class="department_item">
                            <div class="tab-content" id="pills-tabContent">
                                {/* <!-- Department Item New Arrivals --> */}
                                <div class="tab-pane fade show active" id="pills-arrivals" role="tabpanel"
                                    aria-labelledby="pills-arrivals-tab">
                                    <ul class="d-flex">
                                        <li class="order-lg-0 c">
                                            <div class="d-item_img">
                                                <img class="img-fluid w-100" src="images/index/D-1.jpg" alt="D-1"/>
                                                <img class="img-fluid w-100 d_item_hover_img"
                                                    src="images/index/D-1.1.jpg" alt="D-1.1"/>
                                               
                                            </div>
                                            <div class="d-item_text ">
                                                <a href="#">Classic Hat</a>
                                                <div class="review">
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#">(1 Review)</a>
                                                </div>
                                                <p>&#8377;53.00</p>
                                                {/* ///////////////////////////// */}
                                                <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                            </div>
                                        </li>
                                        <li class="order-lg-1 c">
                                            <div class="d-item_img">
                                                <img class="img-fluid w-100" src="images/index/D-2.jpg" alt="D-2"/>
                                                
                                            </div>
                                            <div class="d-item_text">
                                                <a href="#">Women’s White Handbag</a>
                                                <div class="review">
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#">(3 Review)</a>
                                                </div>
                                                <p>&#8377;26.62</p>
                                                                                                {/* ///////////////////////////// */}
                                                                                                <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                            </div>
                                        </li>
                                        <li class="order-lg-2 c">
                                            <div class="d-item_img">
                                                <img class="img-fluid w-100" src="images/index/D-3.jpg" alt="D-3"/>
                                                
                                                <span>7% OFF</span>
                                            </div>
                                            <div class="d-item_text">
                                                <a href="#">Multi Funtional Apple iPhone</a>
                                                <div class="review">
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#">(5 Review)</a>
                                                </div>
                                                <p>&#8377;136.26 <del>&#8377;145.90</del></p>
                                                                                                {/* ///////////////////////////// */}
                                                                                                <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                            </div>
                                        </li>
                                        <li class="order-lg-3 c">
                                            <div class="d-item_img">
                                                <img class="img-fluid w-100" src="images/index/D-4.jpg" alt="D-4"/>
                                                <img class="img-fluid w-100 d_item_hover_img"
                                                    src="images/index/D-4.2.jpg" alt="D-4.1"/>
                                                
                                            </div>
                                            <div class="d-item_text">
                                                <a href="#">Fashion Blue Towel</a>
                                                <div class="review">
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#">(8 Review)</a>
                                                </div>
                                                <p>&#8377;26.55 - &#8377;29.99</p>
                                                                                                {/* ///////////////////////////// */}
                                                                                                <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                            </div>
                                        </li>
                                        <li class="order-lg-4 c">
                                            <div class="d-item_img">
                                                <img class="img-fluid w-100" src="images/index/D-5.jpg" alt="D-5"/>
                                                
                                                <span>4% OFF</span>
                                            </div>
                                            <div class="d-item_text">
                                                <a href="#">Apple Super Notecom</a>
                                                <div class="review">
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#">(4 Review)</a>
                                                </div>
                                                <p> &#8377;243.30 <del>&#8377;253.50 </del></p>
                                                                                                {/* ///////////////////////////// */}
                                                                                                <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                            </div>
                                        </li>
                                        <li class="order-lg-5 c">
                                            <div class="d-item_img">
                                                <img class="img-fluid w-100" src="images/index/D-6.jpg" alt="D-6"/>
                                                <img class="img-fluid w-100 d_item_hover_img"
                                                    src="images/index/D-6.2.jpg" alt="D-6.2"/>
                                                
                                            </div>
                                            <div class="d-item_text">
                                                <a href="#">Women’s Comforter</a>
                                                <div class="review">
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#">(10 Review)</a>
                                                </div>
                                                <p>&#8377;32.00 - &#8377;33.26</p>
                                                                                                {/* ///////////////////////////// */}
                                                                                                <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                            </div>
                                        </li>
                                        <li class="order-lg-6 c">
                                            <div class="d-item_img">
                                                <img class="img-fluid w-100" src="images/index/D-7.jpg" alt="D-7"/>
                                                
                                            </div>
                                            <div class="d-item_text">
                                                <a href="#">Multi-colorful Music</a>
                                                <div class="review">
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#">(3 Review)</a>
                                                </div>
                                                <p>&#8377;53.00</p>
                                                                                                {/* ///////////////////////////// */}
                                                                                                <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                            </div>
                                        </li>
                                        <li class="order-lg-7 c">
                                            <div class="d-item_img">
                                                <img class="img-fluid w-100" src="images/index/D-8.jpg" alt="D-8"/>
                                                <img class="img-fluid w-100 d_item_hover_img"
                                                    src="images/index/D-8.2.jpg" alt="D-8.1"/>
                                                
                                            </div>
                                            <div class="d-item_text">
                                                <a href="#">Comfortable Backpack</a>
                                                <div class="review">
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#">(3 Review)</a>
                                                </div>
                                                <p>&#8377;45.90</p>
                                                                                                {/* ///////////////////////////// */}
                                                                                                <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                            </div>
                                        </li>
                                        <li class="order-lg-8 c">
                                            <div class="d-item_img">
                                                <img class="img-fluid w-100" src="images/index/D-9.jpg" alt="D-9"/>
                                                
                                            </div>
                                            <div class="d-item_text">
                                                <a href="#">Data Transformer Tool</a>
                                                <div class="review">
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#">(3 Review)</a>
                                                </div>
                                                <p>&#8377;53.00</p>
                                                                                                {/* ///////////////////////////// */}
                                                                                                <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                            </div>
                                        </li>
                                        <li class="order-lg-9 c">
                                            <div class="d-item_img">
                                                <img class="img-fluid w-100" src="images/index/D-10.jpg" alt="D-10"/>
                                                
                                            </div>
                                            <div class="d-item_text">
                                                <a href="#">Women’s hairdye</a>
                                                <div class="review">
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#">(3 Review)</a>
                                                </div>
                                                <p>&#8377;173.84</p>
                                                                                                {/* ///////////////////////////// */}
                                                                                                <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                {/* <!-- Department Item Best Seller --> */}
                                <div class="tab-pane fade" id="pills-seller" role="tabpanel"
                                    aria-labelledby="pills-seller-tab">
                                    <ul class="d-flex">
                                        <li class="order-lg-0 c">
                                            <div class="d-item_img">
                                                <img class="img-fluid w-100" src="images/index/D-1.jpg" alt="D-1"/>
                                                <img class="img-fluid w-100 d_item_hover_img"
                                                    src="images/index/D-1.1.jpg" alt="D-1.1"/>
                                               
                                            </div>
                                            <div class="d-item_text">
                                                <a href="#">Classic Hat</a>
                                                <div class="review">
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#">(1 Review)</a>
                                                </div>
                                                <p>&#8377;53.00</p>
                                                                                                {/* ///////////////////////////// */}
                                                                                                <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                            </div>
                                        </li>
                                        <li class="order-lg-2 c">
                                            <div class="d-item_img">
                                                <img class="img-fluid w-100" src="images/index/D-2.jpg" alt="D-2"/>
                                               
                                            </div>
                                            <div class="d-item_text">
                                                <a href="#">Women’s White Handbag</a>
                                                <div class="review">
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#">(3 Review)</a>
                                                </div>
                                                <p>&#8377;26.62</p>
                                                                                                {/* ///////////////////////////// */}
                                                                                                <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                            </div>
                                        </li>
                                        <li class="order-lg-4 c">
                                            <div class="d-item_img">
                                                <img class="img-fluid w-100" src="images/index/D-3.jpg" alt="D-3"/>
                                                
                                                <span>7% OFF</span>
                                            </div>
                                            <div class="d-item_text">
                                                <a href="#">Multi Funtional Apple iPhone</a>
                                                <div class="review">
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#">(5 Review)</a>
                                                </div>
                                                <p>&#8377;136.26 <del>&#8377;145.90</del></p>
                                                                                                {/* ///////////////////////////// */}
                                                                                                <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                            </div>
                                        </li>
                                        <li class="order-lg-6 c">
                                            <div class="d-item_img">
                                                <img class="img-fluid w-100" src="images/index/D-4.jpg" alt="D-4"/>
                                                <img class="img-fluid w-100 d_item_hover_img"
                                                    src="images/index/D-4.2.jpg" alt="D-4.1"/>
                                              
                                            </div>
                                            <div class="d-item_text">
                                                <a href="#">Fashion Blue Towel</a>
                                                <div class="review">
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#">(8 Review)</a>
                                                </div>
                                                <p>&#8377;26.55 - &#8377;29.99</p>
                                                                                                {/* ///////////////////////////// */}
                                                                                                <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                            </div>
                                        </li>
                                        <li class="order-lg-8 c">
                                            <div class="d-item_img">
                                                <img class="img-fluid w-100" src="images/index/D-5.jpg" alt="D-5"/>
                                                
                                                <span>4% OFF</span>
                                            </div>
                                            <div class="d-item_text">
                                                <a href="#">Apple Super Notecom</a>
                                                <div class="review">
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#">(4 Review)</a>
                                                </div>
                                                <p> &#8377;243.30 <del>&#8377;253.50 </del></p>
                                                                                                {/* ///////////////////////////// */}
                                                                                                <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                            </div>
                                        </li>
                                        <li class="order-lg-1 c">
                                            <div class="d-item_img">
                                                <img class="img-fluid w-100" src="images/index/D-6.jpg" alt="D-6"/>
                                                <img class="img-fluid w-100 d_item_hover_img"
                                                    src="images/index/D-6.2.jpg" alt="D-6.2"/>
                                                
                                            </div>
                                            <div class="d-item_text">
                                                <a href="#">Women’s Comforter</a>
                                                <div class="review">
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#">(10 Review)</a>
                                                </div>
                                                <p>&#8377;32.00 - &#8377;33.26</p>
                                                                                                {/* ///////////////////////////// */}
                                                                                                <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                            </div>
                                        </li>
                                        <li class="order-lg-3 c">
                                            <div class="d-item_img">
                                                <img class="img-fluid w-100" src="images/index/D-7.jpg" alt="D-7"/>
                                               
                                            </div>
                                            <div class="d-item_text">
                                                <a href="#">Multi-colorful Music</a>
                                                <div class="review">
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#">(3 Review)</a>
                                                </div>
                                                <p>&#8377;53.00</p>
                                                                                                {/* ///////////////////////////// */}
                                                                                                <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                            </div>
                                        </li>
                                        <li class="order-lg-5 c">
                                            <div class="d-item_img">
                                                <img class="img-fluid w-100" src="images/index/D-8.jpg" alt="D-8"/>
                                                <img class="img-fluid w-100 d_item_hover_img"
                                                    src="images/index/D-8.2.jpg" alt="D-8.1"/>
                                              
                                            </div>
                                            <div class="d-item_text">
                                                <a href="#">Comfortable Backpack</a>
                                                <div class="review">
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#">(3 Review)</a>
                                                </div>
                                                <p>&#8377;45.90</p>
                                                                                                {/* ///////////////////////////// */}
                                                                                                <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                            </div>
                                        </li>
                                        <li class="order-lg-7 c">
                                            <div class="d-item_img">
                                                <img class="img-fluid w-100" src="images/index/D-9.jpg" alt="D-9"/>
                                               
                                            </div>
                                            <div class="d-item_text">
                                                <a href="#">Data Transformer Tool</a>
                                                <div class="review">
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#">(3 Review)</a>
                                                </div>
                                                <p>&#8377;53.00</p>
                                                                                                {/* ///////////////////////////// */}
                                                                                                <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                            </div>
                                        </li>
                                        <li class="order-lg-9 c">
                                            <div class="d-item_img">
                                                <img class="img-fluid w-100" src="images/index/D-10.jpg" alt="D-10"/>
                                               
                                            </div>
                                            <div class="d-item_text">
                                                <a href="#">Women’s hairdye</a>
                                                <div class="review">
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#">(3 Review)</a>
                                                </div>
                                                <p>&#8377;173.84</p>
                                                                                                {/* ///////////////////////////// */}
                                                                                                <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                {/* <!-- Department Item Most Popular  --> */}
                                <div class="tab-pane fade" id="pills-popular" role="tabpanel"
                                    aria-labelledby="pills-popular-tab">
                                    <ul class="d-flex">
                                        <li class="order-lg-1 c">
                                            <div class="d-item_img">
                                                <img class="img-fluid w-100" src="images/index/D-1.jpg" alt="D-1"/>
                                                <img class="img-fluid w-100 d_item_hover_img"
                                                    src="images/index/D-1.1.jpg" alt="D-1.1"/>
                                               
                                            </div>
                                            <div class="d-item_text">
                                                <a href="#">Classic Hat</a>
                                                <div class="review">
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#">(1 Review)</a>
                                                </div>
                                                <p>&#8377;53.00</p>
                                                                                                {/* ///////////////////////////// */}
                                                                                                <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                            </div>
                                        </li>
                                        <li class="order-lg-3 c">
                                            <div class="d-item_img">
                                                <img class="img-fluid w-100" src="images/index/D-2.jpg" alt="D-2"/>
                                              
                                            </div>
                                            <div class="d-item_text">
                                                <a href="#">Women’s White Handbag</a>
                                                <div class="review">
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#">(3 Review)</a>
                                                </div>
                                                <p>&#8377;26.62</p>
                                                                                                {/* ///////////////////////////// */}
                                                                                                <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                            </div>
                                        </li>
                                        <li class="order-lg-5 c">
                                            <div class="d-item_img">
                                                <img class="img-fluid w-100" src="images/index/D-3.jpg" alt="D-3"/>
                                               
                                                <span>7% OFF</span>
                                            </div>
                                            <div class="d-item_text">
                                                <a href="#">Multi Funtional Apple iPhone</a>
                                                <div class="review">
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#">(5 Review)</a>
                                                </div>
                                                <p>&#8377;136.26 <del>&#8377;145.90</del></p>
                                                                                                {/* ///////////////////////////// */}
                                                                                                <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                            </div>
                                        </li>
                                        <li class="order-lg-7 c">
                                            <div class="d-item_img">
                                                <img class="img-fluid w-100" src="images/index/D-4.jpg" alt="D-4"/>
                                                <img class="img-fluid w-100 d_item_hover_img"
                                                    src="images/index/D-4.2.jpg" alt="D-4.1"/>
                                               
                                            </div>
                                            <div class="d-item_text">
                                                <a href="#">Fashion Blue Towel</a>
                                                <div class="review">
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#">(8 Review)</a>
                                                </div>
                                                <p>&#8377;26.55 - &#8377;29.99</p>
                                                                                                {/* ///////////////////////////// */}
                                                                                                <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                            </div>
                                        </li>
                                        <li class="order-lg-9 c">
                                            <div class="d-item_img">
                                                <img class="img-fluid w-100" src="images/index/D-5.jpg" alt="D-5"/>
                                                
                                                <span>4% OFF</span>
                                            </div>
                                            <div class="d-item_text">
                                                <a href="#">Apple Super Notecom</a>
                                                <div class="review">
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#">(4 Review)</a>
                                                </div>
                                                <p> &#8377;243.30 <del>&#8377;253.50 </del></p>
                                                                                                {/* ///////////////////////////// */}
                                                                                                <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                            </div>
                                        </li>
                                        <li class="order-lg-0 c">
                                            <div class="d-item_img">
                                                <img class="img-fluid w-100" src="images/index/D-6.jpg" alt="D-6"/>
                                                <img class="img-fluid w-100 d_item_hover_img"
                                                    src="images/index/D-6.2.jpg" alt="D-6.2"/>
                                                
                                            </div>
                                            <div class="d-item_text">
                                                <a href="#">Women’s Comforter</a>
                                                <div class="review">
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#">(10 Review)</a>
                                                </div>
                                                <p>&#8377;32.00 - &#8377;33.26</p>
                                                                                                {/* ///////////////////////////// */}
                                                                                                <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                            </div>
                                        </li>
                                        <li class="order-lg-2 c">
                                            <div class="d-item_img">
                                                <img class="img-fluid w-100" src="images/index/D-7.jpg" alt="D-7"/>
                                                
                                            </div>
                                            <div class="d-item_text">
                                                <a href="#">Multi-colorful Music</a>
                                                <div class="review">
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#">(3 Review)</a>
                                                </div>
                                                <p>&#8377;53.00</p>
                                                                                                {/* ///////////////////////////// */}
                                                                                                <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                            </div>
                                        </li>
                                        <li class="order-lg-4 c">
                                            <div class="d-item_img">
                                                <img class="img-fluid w-100" src="images/index/D-8.jpg" alt="D-8"/>
                                                <img class="img-fluid w-100 d_item_hover_img"
                                                    src="images/index/D-8.2.jpg" alt="D-8.1"/>
                                              
                                            </div>
                                            <div class="d-item_text">
                                                <a href="#">Comfortable Backpack</a>
                                                <div class="review">
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#">(3 Review)</a>
                                                </div>
                                                <p>&#8377;45.90</p>
                                                                                                {/* ///////////////////////////// */}
                                                                                                <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                            </div>
                                        </li>
                                        <li class="order-lg-6 c">
                                            <div class="d-item_img">
                                                <img class="img-fluid w-100" src="images/index/D-9.jpg" alt="D-9"/>
                                                
                                            </div>
                                            <div class="d-item_text">
                                                <a href="#">Data Transformer Tool</a>
                                                <div class="review">
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#">(3 Review)</a>
                                                </div>
                                                <p>&#8377;53.00</p>
                                                                                                {/* ///////////////////////////// */}
                                                                                                <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                            </div>
                                        </li>
                                        <li class="order-lg-8 c">
                                            <div class="d-item_img">
                                                <img class="img-fluid w-100" src="images/index/D-10.jpg" alt="D-10"/>
                                               
                                            </div>
                                            <div class="d-item_text">
                                                <a href="#">Women’s hairdye</a>
                                                <div class="review">
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#">(3 Review)</a>
                                                </div>
                                                <p>&#8377;173.84</p>
                                                                                                {/* ///////////////////////////// */}
                                                                                                <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                {/* <!-- Department Item Featured  --> */}
                                <div class="tab-pane fade" id="pills-featured" role="tabpanel"
                                    aria-labelledby="pills-featured-tab">
                                    <ul class="d-flex">
                                        <li class="order-lg-9 c">
                                            <div class="d-item_img">
                                                <img class="img-fluid w-100" src="images/index/D-1.jpg" alt="D-1"/>
                                                <img class="img-fluid w-100 d_item_hover_img"
                                                    src="images/index/D-1.1.jpg" alt="D-1.1"/>
                                               
                                            </div>
                                            <div class="d-item_text">
                                                <a href="#">Classic Hat</a>
                                                <div class="review">
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#">(1 Review)</a>
                                                </div>
                                                <p>&#8377;53.00</p>
                                                                                                {/* ///////////////////////////// */}
                                                                                                <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                            </div>
                                        </li>
                                        <li class="order-lg-8 c">
                                            <div class="d-item_img">
                                                <img class="img-fluid w-100" src="images/index/D-2.jpg" alt="D-2"/>
                                                
                                            </div>
                                            <div class="d-item_text">
                                                <a href="#">Women’s White Handbag</a>
                                                <div class="review">
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#">(3 Review)</a>
                                                </div>
                                                <p>&#8377;26.62</p>
                                                                                                {/* ///////////////////////////// */}
                                                                                                <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                            </div>
                                        </li>
                                        <li class="order-lg-7 c">
                                            <div class="d-item_img">
                                                <img class="img-fluid w-100" src="images/index/D-3.jpg" alt="D-3"/>
                                                
                                                <span>7% OFF</span>
                                            </div>
                                            <div class="d-item_text">
                                                <a href="#">Multi Funtional Apple iPhone</a>
                                                <div class="review">
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#">(5 Review)</a>
                                                </div>
                                                <p>&#8377;136.26 <del>&#8377;145.90</del></p>
                                                                                                {/* ///////////////////////////// */}
                                                                                                <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                            </div>
                                        </li>
                                        <li class="order-lg-6 c">
                                            <div class="d-item_img">
                                                <img class="img-fluid w-100" src="images/index/D-4.jpg" alt="D-4"/>
                                                <img class="img-fluid w-100 d_item_hover_img"
                                                    src="images/index/D-4.2.jpg" alt="D-4.1"/>
                                               
                                            </div>
                                            <div class="d-item_text">
                                                <a href="#">Fashion Blue Towel</a>
                                                <div class="review">
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#">(8 Review)</a>
                                                </div>
                                                <p>&#8377;26.55 - &#8377;29.99</p>
                                                                                                {/* ///////////////////////////// */}
                                                                                                <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                            </div>
                                        </li>
                                        <li class="order-lg-5 c">
                                            <div class="d-item_img">
                                                <img class="img-fluid w-100" src="images/index/D-5.jpg" alt="D-5"/>
                                                
                                                <span>4% OFF</span>
                                            </div>
                                            <div class="d-item_text">
                                                <a href="#">Apple Super Notecom</a>
                                                <div class="review">
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#">(4 Review)</a>
                                                </div>
                                                <p> &#8377;243.30 <del>&#8377;253.50 </del></p>
                                                                                                {/* ///////////////////////////// */}
                                                                                                <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                            </div>
                                        </li>
                                        <li class="order-lg-4 c">
                                            <div class="d-item_img">
                                                <img class="img-fluid w-100" src="images/index/D-6.jpg" alt="D-6"/>
                                                <img class="img-fluid w-100 d_item_hover_img"
                                                    src="images/index/D-6.2.jpg" alt="D-6.2"/>
                                               
                                            </div>
                                            <div class="d-item_text">
                                                <a href="#">Women’s Comforter</a>
                                                <div class="review">
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#">(10 Review)</a>
                                                </div>
                                                <p>&#8377;32.00 - &#8377;33.26</p>
                                                                                                {/* ///////////////////////////// */}
                                                                                                <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                            </div>
                                        </li>
                                        <li class="order-lg-3 c">
                                            <div class="d-item_img">
                                                <img class="img-fluid w-100" src="images/index/D-7.jpg" alt="D-7"/>
                                               
                                            </div>
                                            <div class="d-item_text">
                                                <a href="#">Multi-colorful Music</a>
                                                <div class="review">
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#">(3 Review)</a>
                                                </div>
                                                <p>&#8377;53.00</p>
                                                                                                {/* ///////////////////////////// */}
                                                                                                <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                            </div>
                                        </li>
                                        <li class="order-lg-2 c">
                                            <div class="d-item_img">
                                                <img class="img-fluid w-100" src="images/index/D-8.jpg" alt="D-8"/>
                                                <img class="img-fluid w-100 d_item_hover_img"
                                                    src="images/index/D-8.2.jpg" alt="D-8.1"/>
                                               
                                            </div>
                                            <div class="d-item_text">
                                                <a href="#">Comfortable Backpack</a>
                                                <div class="review">
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#">(3 Review)</a>
                                                </div>
                                                <p>&#8377;45.90</p>
                                                                                                {/* ///////////////////////////// */}
                                                                                                <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                            </div>
                                        </li>
                                        <li class="order-lg-1 c">
                                            <div class="d-item_img">
                                                <img class="img-fluid w-100" src="images/index/D-9.jpg" alt="D-9"/>
                                               
                                            </div>
                                            <div class="d-item_text">
                                                <a href="#">Data Transformer Tool</a>
                                                <div class="review">
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#">(3 Review)</a>
                                                </div>
                                                <p>&#8377;53.00</p>
                                                                                                {/* ///////////////////////////// */}
                                                                                                <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                            </div>
                                        </li>
                                        <li class="order-lg-0 c">
                                            <div class="d-item_img">
                                                <img class="img-fluid w-100" src="images/index/D-10.jpg" alt="D-10"/>
                                               
                                            </div>
                                            <div class="d-item_text">
                                                <a href="#">Women’s hairdye</a>
                                                <div class="review">
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#"><i class="fas fa-star"></i></a>
                                                    <a href="#">(3 Review)</a>
                                                </div>
                                                <p>&#8377;173.84</p>
                                                                                                {/* ///////////////////////////// */}
                                                                                                <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
            {/* <!-- ========== Departments Part End ========== -->

<!-- ========== Category Banner Part Start ========== --> */}
            <section id="category_banner"> 
       
                <div className="container px-lg-0">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="category_banner_img category_banner_img_four">
                                <img className="img-fluid w-100" src="images/index/Category_Banner_img4.jpg"
                                    alt="Category_Banner_img4" />
                                <div className="ovrly">
                                    <p>Natural Process</p>
                                    <h6>Cosmetic Makeup Professional</h6>
                                    <a href="/">Shop Now <i className="fas fa-long-arrow-alt-right"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="category_banner_img category_banner_img_three">
                                <img className="img-fluid w-100" src="images/index/Category_Banner_img3.jpg"
                                    alt="Category_Banner_img3" />
                                <div className="ovrly">
                                    <p>Trending Now</p>
                                    <h6>Women's Lifestyle Collection</h6>
                                    <a href="/">Shop Now <i className="fas fa-long-arrow-alt-right"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- ========== Category Banner Part End ========== -->

<!-- ========== Product Wrapper Part Start ========== --> */}
    <section id="product_wrap">
        <div class="container px-lg-0">
            {/* <!-- wrap one --> */}
            <div class="product_wrap_part wrap_one">
            <div class="row">
                    <div class="col-lg-12">
                        <div class="wrap_common_head d-flex justify-content-between">
                            <h6>Clothing & Apparel</h6>
                            <a href="#">More Products <i class="fas fa-long-arrow-alt-right"></i></a>
                        </div>
                    </div>
                </div>
                  
                        {/* <div class="wrap_common_head ">
                            <h6>Clothing & Apparel</h6>
                            <a href="#">More Products <i class="fas fa-long-arrow-alt-right"></i></a>
                        </div>
                    */}
                
                {/* ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,, */}
                <div class="wrap_item_row">
                    
                        <div class="wrap_banner wrapbanner">
                            <img class="img-fluid w-100" src="images/index/product_banner1.jpg" alt="product_banner1" />
                            <div class="ovrly">
                                <p>Weekend Sale</p>
                                <h2>New Arrivals <span>Collection</span></h2>
                                <a href="#">Shop Now</a>
                            </div>
                        </div>
                    
                        <div class="wrap_content wrapmainbox">                              
                                    <div class="wrap_item wrabox c text-center"> 
                                        <div class="wrap-item_img">
                                            <img class="img-fluid w-100" src="images/index/pw1.jpg" alt="pw1"/>
                                           
                                        </div>
                                        <div class="wrap-item_text">
                                            <a href="#">Men's Clothing</a>
                                            <div class="review">
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#">(3 Review)</a>
                                            </div>
                                            <p>&#8377;20.62 <del>&#8377;25.68</del></p>
                                                                                                                                            {/* ///////////////////////////// */}
                                                                                                                                            <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>


        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}

                                        </div>
                                    </div>                  
                                    <div class="wrap_item wrabox c text-center">
                                        <div class="wrap-item_img">
                                            <img class="img-fluid w-100" src="images/index/pw2.jpg" alt="pw2"/>
                                            
                                        </div>
                                        <div class="wrap-item_text">
                                            <a href="#">Women’s Fashion Handbag</a>
                                            <div class="review">
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#">(3 Review)</a>
                                            </div>
                                            <p>&#8377;25.12 <del>&#8377;29.62</del></p>
                                                               {/* ///////////////////////////// */}
                                                               <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                        </div>
                                    </div>                                                             
                                    <div class="wrap_item wrabox c text-center">
                                        <div class="wrap-item_img">
                                            <img class="img-fluid w-100" src="images/index/pw3.jpg" alt="pw3"/>
                                         
                                        </div>
                                        <div class="wrap-item_text">
                                            <a href="#">Black Winter Skating</a>
                                            <div class="review">
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#">(3 Review)</a>
                                            </div>
                                            <p>&#8377;40.02</p>
                                                {/* ///////////////////////////// */}
                                                <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
   
        
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                        </div>
                                    </div>                                                           
                                    <div class="wrap_item wrabox c text-center">
                                        <div class="wrap-item_img">
                                            <img class="img-fluid w-100" src="images/index/pw4.jpg" alt="pw4"/>
                                            <img class="img-fluid w-100 wrap_item_hover_img"
                                                src="images/index/pw4.1.jpg" alt="pw4.1"/>
                                           
                                        </div>
                                        <div class="wrap-item_text">
                                            <a href="#">Sport Women's Wear</a>
                                            <div class="review">
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#">(3 Review)</a>
                                            </div>
                                            <p>&#8377;200.50 <del>&#8377;259.62</del></p>
                                                               {/* ///////////////////////////// */}
                                                               <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                        </div>
                                    </div>                                                           
                                    <div class="wrap_item wrabox c text-center">
                                        <div class="wrap-item_img">
                                            <img class="img-fluid w-100" src="images/index/pw5.jpg" alt="pw5"/>
                                            <img class="img-fluid w-100 wrap_item_hover_img"
                                                src="images/index/pw5.1.jpg" alt="pw5.1"/>
                                            
                                        </div>
                                        <div class="wrap-item_text">
                                            <a href="#">Best Travel Bag</a>
                                            <div class="review">
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#">(3 Review)</a>
                                            </div>
                                            <p>&#8377;25.68 <del>&#8377;29.62</del></p>
                                                               {/* ///////////////////////////// */}
                                                               <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                        </div>
                                    </div>                              
                                    <div class="wrap_item wrabox c text-center">
                                        <div class="wrap-item_img">
                                            <img class="img-fluid w-100" src="images/index/pw6.jpg" alt="pw6"/>
                                           
                                        </div>
                                        <div class="wrap-item_text">
                                            <a href="#">Gray Leather Shoes</a>
                                            <div class="review">
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#">(3 Review)</a>
                                            </div>
                                            <p>&#8377;26.68</p>
                                                               {/* ///////////////////////////// */}
                                                               <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                        </div>
                                    </div>                               
                                    <div class="wrap_item wrabox c text-center">
                                        <div class="wrap-item_img">
                                            <img class="img-fluid w-100" src="images/index/pw7.jpg" alt="pw7"/>
                                          
                                        </div>
                                        <div class="wrap-item_text">
                                            <a href="#">Men's Black Wrist Watch</a>
                                            <div class="review">
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#">(3 Review)</a>
                                            </div>
                                            <p>&#8377;150.00 <del>&#8377;200.62</del></p>
                                                               {/* ///////////////////////////// */}
                                                               <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                        </div>
                                    </div>                                                           
                                    <div class="wrap_item  wrabox c text-center">
                                        <div class="wrap-item_img">
                                            <img class="img-fluid w-100" src="images/index/pw8.jpg" alt="pw8"/>
                                           
                                        </div>
                                        <div class="wrap-item_text">
                                            <a href="#">Women’s Hiking Hat</a>
                                            <div class="review">
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#">(3 Review)</a>
                                            </div>
                                            <p>&#8377;53.62<del>&#8377;59.62</del></p>
                                                               {/* ///////////////////////////// */}
                                                               <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                        </div>
                                   
                               
                                    </div>
                        </div>
                 
                </div>
                   {/* ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,, */}
            </div>
            {/* <!-- wrap Two --> */}
            <div class="product_wrap_part wrap_two">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="wrap_common_head d-flex justify-content-between">
                            <h6>Consumer Electric</h6>
                            <a href="#">More Products <i class="fas fa-long-arrow-alt-right"></i></a>
                        </div>
                    </div>
                </div>
                <div class=" wrap_item_row">
                 
                        <div class="wrap_banner wrapbanner">
                            <img class="img-fluid w-100" src="images/index/product_banner2.jpg" alt="product_banner1"/>
                            <div class="ovrly">
                                <p>New Collection</p>
                                <h2>Top Camera<span> Mirrorless </span></h2>
                                <a href="#">Shop Now</a>
                            </div>
                      
                    </div>
                
                        <div class="wrap_content wrapmainbox">                                                       
                                    <div class="wrap_item wrabox c text-center">
                                        <div class="wrap-item_img">
                                            <img class="img-fluid w-100" src="images/index/pw9.jpg" alt="pw9"/>
                                            <img class="img-fluid w-100 wrap_item_hover_img"
                                                src="images/index/pw9.1.jpg" alt="pw9.1"/>
                                           
                                            <span>9%OFF</span>
                                        </div>
                                        <div class="wrap-item_text">
                                            <a href="#">Cemara</a>
                                            <div class="review">
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#">(3 Review)</a>
                                            </div>
                                            <p>&#8377;250.62 <del>&#8377;280.68</del></p>
                                                               {/* ///////////////////////////// */}
                                                               <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                        </div>
                                    </div>                                                    
                                    <div class="wrap_item wrabox c text-center">
                                        <div class="wrap-item_img">
                                            <img class="img-fluid w-100" src="images/index/pw10.jpg" alt="pw10"/>
                                            <img class="img-fluid w-100 wrap_item_hover_img"
                                                src="images/index/pw10.1.jpg" alt="pw10.1"/>
                                           
                                            <span>10%OFF</span>
                                        </div>
                                        <div class="wrap-item_text">
                                            <a href="#">Washing Machine</a>
                                            <div class="review">
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#">(3 Review)</a>
                                            </div>
                                            <p>&#8377;150.12 <del>&#8377;190.62</del></p>
                                                               {/* ///////////////////////////// */}
                                                               <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                        </div>
                                 
                                </div>                             
                                    <div class="wrap_item wrabox c text-center">
                                        <div class="wrap-item_img">
                                            <img class="img-fluid w-100" src="images/index/pw11.jpg" alt="pw11"/>
                                          
                                        </div>
                                        <div class="wrap-item_text">
                                            <a href="#">HD TV</a>
                                            <div class="review">
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#">(3 Review)</a>
                                            </div>
                                            <p>&#8377;160.02</p>
                                                               {/* ///////////////////////////// */}
                                                               <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                        </div>
                                    </div>                                                          
                                    <div class="wrap_item wrabox c text-center">
                                        <div class="wrap-item_img">
                                            <img class="img-fluid w-100" src="images/index/pw12.jpg" alt="pw12"/>
                                           
                                        </div>
                                        <div class="wrap-item_text">
                                            <a href="#">Laptop</a>
                                            <div class="review">
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#">(3 Review)</a>
                                            </div>
                                            <p>&#8377;200.50</p>
                                                               {/* ///////////////////////////// */}
                                                               <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                        </div>
                                    </div>                                                            
                                    <div class="wrap_item wrabox c text-center">
                                        <div class="wrap-item_img">
                                            <img class="img-fluid w-100" src="images/index/pw13.jpg" alt="pw13"/>
                                  
                                        </div>
                                        <div class="wrap-item_text">
                                            <a href="#">Watch-Android</a>
                                            <div class="review">
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#">(3 Review)</a>
                                            </div>
                                            <p>&#8377;25.68 <del>&#8377;29.62</del></p>
                                                               {/* ///////////////////////////// */}
                                                               <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                        </div>
                                    </div>                                                      
                                    <div class="wrap_item wrabox c text-center">
                                        <div class="wrap-item_img">
                                            <img class="img-fluid w-100" src="images/index/pw14.jpg" alt="pw14"/>
                                           
                                        </div>
                                        <div class="wrap-item_text">
                                            <a href="#">CCTV-Camera</a>
                                            <div class="review">
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#">(3 Review)</a>
                                            </div>
                                            <p>&#8377;256.68</p>
                                                               {/* ///////////////////////////// */}
                                                               <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                        </div>
                                    </div>                                                   
                                    <div class="wrap_item wrabox c text-center">
                                        <div class="wrap-item_img">
                                            <img class="img-fluid w-100" src="images/index/pw15.jpg" alt="pw15"/>
                                           
                                        </div>
                                        <div class="wrap-item_text">
                                            <a href="#">Headphones</a>
                                            <div class="review">
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#">(3 Review)</a>
                                            </div>
                                            <p>&#8377;150.00 <del>&#8377;200.62</del></p>
                                                               {/* ///////////////////////////// */}
                                                               <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                        </div>
                                    </div>                                                        
                                    <div class="wrap_item wrabox c text-center">
                                        <div class="wrap-item_img">
                                            <img class="img-fluid w-100" src="images/index/pw16.jpg" alt="pw16"/>
                                            
                                            <span>7%OFF</span>
                                        </div>
                                        <div class="wrap-item_text">
                                            <a href="#">Harddisk</a>
                                            <div class="review">
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#">(3 Review)</a>
                                            </div>
                                            <p>&#8377;153.62<del>&#8377;159.62</del></p>
                                                               {/* ///////////////////////////// */}
                                                               <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                        </div>
                                    </div>
                             
                
                      
                    </div>
                </div>
            </div>
            {/* <!-- Wrap Banner --> */}
            <div className="product_wrap_banner" style={{ background: "url(images/index/product_wrap_banner.jpg)" }}>

                <div class="row">
                    <div class="col-lg-2">
                        <div class="wrap_banner_content text-start">
                            <h2>25<b>%</b><span>Off</span></h2>
                        </div>
                    </div>
                    <div class="col-lg-7">
                        <div class="wrap_banner_content text-start">
                            <h4>For Today's Fashion</h4>
                            <p>Use code <span>Black<b>12345</b></span> to get best offer.</p>
                        </div>
                    </div>
                    <div class="col-lg-3 align-self-center">
                        <div class="wrap_banner_content text-end">
                            <a href="#">Shop Now <i class="fas fa-long-arrow-alt-right"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Wrap Three --> */}
            <div class="product_wrap_part wrap_three">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="wrap_common_head d-flex justify-content-between">
                            <h6>Home Garden & Kitchen</h6>
                            <a href="#">More Products <i class="fas fa-long-arrow-alt-right"></i></a>
                        </div>
                    </div>
                </div>
                <div class="wrap_item_row">
                   
                        <div class="wrap_banner wrapbanner">
                            <img class="img-fluid w-100" src="images/index/product_banner3.jpg" alt="product_banner3"/>
                            <div class="ovrly">
                                <p>Weekend Sale</p>
                                <h2>New Arrivals <span>Collection</span></h2>
                                <a href="#">Shop Now</a>
                            </div>
                        </div>                   
                        <div class="wrap_content wrapmainbox">                              
                                    <div class="wrap_item wrabox c text-center">
                                        <div class="wrap-item_img">
                                            <img class="img-fluid w-100" src="images/index/pw17.jpg" alt="pw17"/>
                                          
                                        </div>
                                        <div class="wrap-item_text">
                                            <a href="#">Home Sofa</a>
                                            <div class="review">
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#">(3 Review)</a>
                                            </div>
                                            <p>&#8377;75.62</p>
                                                               {/* ///////////////////////////// */}
                                                               <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                        </div>
                                    </div>                                                            
                                    <div class="wrap_item wrabox c text-center">
                                        <div class="wrap-item_img">
                                            <img class="img-fluid w-100" src="images/index/pw18.jpg" alt="pw18"/>
                                            <img class="img-fluid w-100 wrap_item_hover_img"
                                                src="images/index/pw18.1.jpg" alt="pw18.1"/>
                                           
                                            <span>21%OFF</span>
                                        </div>
                                        <div class="wrap-item_text">
                                            <a href="#">Kitchen Table</a>
                                            <div class="review">
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#">(3 Review)</a>
                                            </div>
                                            <p>&#8377;75.12 <del>&#8377;95.62</del></p>
                                                               {/* ///////////////////////////// */}
                                                               <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                        </div>
                                    </div>                                                      
                                    <div class="wrap_item wrabox c text-center">
                                        <div class="wrap-item_img">
                                            <img class="img-fluid w-100" src="images/index/pw19.jpg" alt="pw19"/>
                                            <img class="img-fluid w-100 wrap_item_hover_img"
                                                src="images/index/pw19.1.jpg" alt="pw19.1"/>
                                         
                                        </div>
                                        <div class="wrap-item_text">
                                            <a href="#">Table Lamp</a>
                                            <div class="review">
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#">(3 Review)</a>
                                            </div>
                                            <p>&#8377;75.02</p>
                                                               {/* ///////////////////////////// */}
                                                               <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                        </div>
                                    </div>                                                        
                                    <div class="wrap_item wrabox c text-center">
                                        <div class="wrap-item_img">
                                            <img class="img-fluid w-100" src="images/index/pw20.jpg" alt="pw20"/>
                                           
                                            <span>19%OFF</span>
                                        </div>
                                        <div class="wrap-item_text">
                                            <a href="#">Sport Women's Wear</a>
                                            <div class="review">
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#">(3 Review)</a>
                                            </div>
                                            <p>&#8377;70.50 <del>&#8377;85.00</del></p>
                                                               {/* ///////////////////////////// */}
                                                               <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                        </div>
                                    </div>                                                   
                                    <div class="wrap_item wrabox c text-center">
                                        <div class="wrap-item_img">
                                            <img class="img-fluid w-100" src="images/index/pw21.jpg" alt="pw21"/>
                                            
                                        </div>
                                        <div class="wrap-item_text">
                                            <a href="#">Electric Rice Cooker</a>
                                            <div class="review">
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#">(3 Review)</a>
                                            </div>
                                            <p>&#8377;215.00</p>
                                                               {/* ///////////////////////////// */}
                                                               <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                        </div>
                                    </div>                                                        
                                    <div class="wrap_item wrabox c text-center">
                                        <div class="wrap-item_img">
                                            <img class="img-fluid w-100" src="images/index/pw22.jpg" alt="pw22"/>
                                            
                                        </div>
                                        <div class="wrap-item_text">
                                            <a href="#">Kitchen Cooker</a>
                                            <div class="review">
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#">(3 Review)</a>
                                            </div>
                                            <p>&#8377;150.68</p>
                                                               {/* ///////////////////////////// */}
                                                               <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                        </div>
                                    </div>                                                          
                                    <div class="wrap_item wrabox c text-center">
                                        <div class="wrap-item_img">
                                            <img class="img-fluid w-100" src="images/index/pw23.jpg" alt="pw23"/>
                                         
                                            <span>12%OFF</span>
                                        </div>
                                        <div class="wrap-item_text">
                                            <a href="#">Electric Flying Pen</a>
                                            <div class="review">
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#">(3 Review)</a>
                                            </div>
                                            <p>&#8377;150.00 <del>&#8377;200.62</del></p>
                                                               {/* ///////////////////////////// */}
                                                               <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                        </div>
                                    </div>                                                         
                                    <div class="wrap_item wrabox c text-center">
                                        <div class="wrap-item_img">
                                            <img class="img-fluid w-100" src="images/index/pw24.jpg" alt="pw24"/>
                                            <img class="img-fluid w-100 wrap_item_hover_img"
                                                src="images/index/pw24.1.jpg" alt="pw24.1"/>
                                            {/* <div class="ovrly">
                                                <ul>
                                                    <li><a href="#"><i class="fas fa-shopping-bag"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-heart"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-search"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-balance-scale"></i></a></li>
                                                </ul>
                                            </div> */}
                                        </div>
                                        <div class="wrap-item_text">
                                            <a href="#">Automatic Crusher</a>
                                            <div class="review">
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#"><i class="fas fa-star"></i></a>
                                                <a href="#">(3 Review)</a>
                                            </div>
                                            <p>&#8377;220.50</p>
                                                               {/* ///////////////////////////// */}
                                                               <div className='comparemainbuttonbox'>
        {/* <h1>Google Maps Button</h1> */}
        <button onClick={toggleMap} className='comparemainbutton'><i class="fas fa-balance-scale"></i></button>
        <div style={mapContainerStyle} className="map-container-com">
          <div style={mapOverlayStyle} className="map-overlay-com">
            <iframe
              style={mapIframeStyle}
              src="https://pricehistoryapp.com/embed/apple-iphone-12-64gb-white-bc26"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
            ></iframe>
            <span style={closeButtonStyle} onClick={closeMap}>
              &times;
            </span>
          </div>
        </div>
  
       
      </div>
 {/* //////////////////////////////////////////////////////////////// */}
                                        </div>
                                    </div>
                                
                          
                        </div>
                    
                </div>
            </div>
        </div>
    </section>
            {/* <!-- ========== Product Wrapper Part End ========== -->

<!-- ========== Client Part Start ========== --> */}
            <section id="client">
                <div className="container px-lg-0">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="client_head">
                                <h6>Our Clients</h6>
                            </div>
                        </div>
                    </div>
                    <div className="client_logo">
                        <ul className="d-flex client_slider">
                            <li className="client_img">
                                <img className="img-fluid w-100" src="images/index/client1.png" alt="client1" />
                            </li>
                            <li className="client_img">
                                <img className="img-fluid w-100" src="images/index/client2.png" alt="client2.png" />
                            </li>
                            <li className="client_img">
                                <img className="img-fluid w-100" src="images/index/client3.png" alt="client3" />
                            </li>
                            <li className="client_img">
                                <img className="img-fluid w-100" src="images/index/client4.png" alt="client4" />
                            </li>
                            <li className="client_img">
                                <img className="img-fluid w-100" src="images/index/client5.png" alt="client5" />
                            </li>
                            <li className="client_img">
                                <img className="img-fluid w-100" src="images/index/client6.png" alt="client6" />
                            </li>
                            <li className="client_img">
                                <img className="img-fluid w-100" src="images/index/client7.png" alt="client7" />
                            </li>
                            <li className="client_img">
                                <img className="img-fluid w-100" src="images/index/client8.png" alt="client8" />
                            </li>
                            <li className="client_img">
                                <img className="img-fluid w-100" src="images/index/client9.png" alt="client9" />
                            </li>
                            <li className="client_img">
                                <img className="img-fluid w-100" src="images/index/client10.png" alt="client10" />
                            </li>
                            <li className="client_img">
                                <img className="img-fluid w-100" src="images/index/client11.png" alt="client11" />
                            </li>
                            <li className="client_img">
                                <img className="img-fluid w-100" src="images/index/client2.png" alt="client12" />
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            {/* <!-- ========== Client Part End ========== -->

<!-- ========== Blog Part Start ========== --> */}
            <section id="our_blog">
                <div className="container px-lg-0">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="common_header blog_header">
                                <h6>From Our Blog</h6>
                                <a href="/">View All Articles</a>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="our_blog_content text-center">
                                <div className="our_blog_img">
                                    <img className="img-fluid w-100" src="images/index/ourblog1.jpg" alt="ourblog1" />
                                </div>
                                <div className="our_blog_text">
                                    <span>by<a href="/">John Doe</a>-<a href="/">03.05.2021</a></span>
                                    <a className="blog_name" href="/">Aliquam tincidunt mauris eurisus</a>
                                    <a className="blog_rm" href="/">Read More <i className="fas fa-long-arrow-alt-right"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="our_blog_content text-center">
                                <div className="our_blog_img">
                                    <img className="img-fluid w-100" src="images/index/ourblog2.jpg" alt="ourblog2" />
                                </div>
                                <div className="our_blog_text">
                                    <span>by<a href="/">John Doe</a>-<a href="/">03.05.2021</a></span>
                                    <a className="blog_name" href="/">Cras ornare tristique elit</a>
                                    <a className="blog_rm" href="/">Read More <i className="fas fa-long-arrow-alt-right"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="our_blog_content text-center">
                                <div className="our_blog_img">
                                    <img className="img-fluid w-100" src="images/index/ourblog3.jpg" alt="ourblog3" />
                                </div>
                                <div className="our_blog_text">
                                    <span>by<a href="/">John Doe</a>-<a href="/">03.05.2021</a></span>
                                    <a className="blog_name" href="/">Vivamus vestibulum ntulla nec ante</a>
                                    <a className="blog_rm" href="/">Read More <i className="fas fa-long-arrow-alt-right"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="our_blog_content text-center">
                                <div className="our_blog_img">
                                    <img className="img-fluid w-100" src="images/index/ourblog4.jpg" alt="ourblog4" />
                                </div>
                                <div className="our_blog_text">
                                    <span>by<a href="/">John Doe</a>-<a href="/">03.05.2021</a></span>
                                    <a className="blog_name" href="/">Fusce lacinia arcuet nulla</a>
                                    <a className="blog_rm" href="/">Read More <i className="fas fa-long-arrow-alt-right"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- ========== Blog Part End ========== -->

<!-- ========== Views Part Start ========== --> */}
            <section id="views">
                <div className="container px-lg-0">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="common_header blog_header">
                                <h6>Your Recent Views</h6>
                            </div>
                        </div>
                    </div>
                    <div className="row views_slider">
                    <Slider {...sliderSettings3}>
                        <div className="viewslide col">
                            <div className="view_item">
                                <img className="img-fluid w-100" src="images/index/views1.jpg" alt="views1" />
                                <div className="ovrly">
                                    <a href="/">Women's Fashion Handbag</a>
                                </div>
                            </div>
                        </div>
                        <div className="viewslide col">
                            <div className="view_item">
                                <img className="img-fluid w-100" src="images/index/views2.jpg" alt="views2" />
                                <div className="ovrly">
                                    <a href="/">Electric Frying Pen</a>
                                </div>
                            </div>
                        </div>
                        <div className="viewslide col">
                            <div className="view_item">
                                <img className="img-fluid w-100" src="images/index/views3.jpg" alt="views3" />
                                <div className="ovrly">
                                    <a href="/">Black Winter Skating</a>
                                </div>
                            </div>
                        </div>
                        <div className="viewslide col">
                            <div className="view_item">
                                <img className="img-fluid w-100" src="images/index/views4.jpg" alt="views4" />
                                <div className="ovrly">
                                    <a href="/">HD TV</a>
                                </div>
                            </div>
                        </div>
                        <div className="viewslide col">
                            <div className="view_item">
                                <img className="img-fluid w-100" src="images/index/views5.jpg" alt="views5" />
                                <div className="ovrly">
                                    <a href="/">Home Sofa</a>
                                </div>
                            </div>
                        </div>
                        <div className="viewslide col">
                            <div className="view_item">
                                <img className="img-fluid w-100" src="images/index/views6.jpg" alt="views6" />
                                <div className="ovrly">
                                    <a href="/">Headphones</a>
                                </div>
                            </div>
                        </div>
                        <div className="viewslide col">
                            <div className="view_item">
                                <img className="img-fluid w-100" src="images/index/views7.jpg" alt="views7" />
                                <div className="ovrly">
                                    <a href="/">Electric Rice-Cooker</a>
                                </div>
                            </div>
                        </div>
                        <div className="viewslide col">
                            <div className="view_item">
                                <img className="img-fluid w-100" src="images/index/views8.jpg" alt="views8" />
                                <div className="ovrly">
                                    <a href="/">Table Lamp</a>
                                </div>
                            </div>
                        </div>
                        </Slider>
                    </div>
                </div>
            </section>
            </Layout>
        </>
    );
}

export default Home;


