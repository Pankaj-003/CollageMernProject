 import React from 'react'
        // import { Link } from 'react-router-dom'
        // import { Link } from 'react-router-dom'
        const Footer = () => {
          return (
        <>
        <section id="subs">
        
                <div className="container px-lg-0">
                    <div className="row">
                        <div className="col-lg-5 align-self-center">
                            <div className="subs_content d-flex">
                                <div className="subs_icon">
                                    <i className="far fa-envelope"></i>
                                </div>
                                <div className="subs_text">
                                    <h5>Subscribe To Our Newsletter</h5>
                                    <p>Get all the latest information on Events, Sales and Offers. </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="subs_form subscriber-input">
                                <form action="" >
                                    <input type="text" name="text" className="subscriber-input-main" placeholder="Your Email Address"/>
                                    <button className="subscriber-btn">Subscribe <i className="fas fa-long-arrow-alt-right "></i></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        
            <footer id="footer">
                <div className="container px-lg-0">
           
                    <div className="footer_top">
                        <div className="row">
                            <div className="col-lg-3">
                                <div className="footer_cntct">
            {/* <img className="img-fluid" src="images/deal hunter logo.png" alt="logo_footer"/> */}
        
        
        {/* <img src="images/main_logo.png" alt="footerlogo" /> */}
        <img src="images/deal_hunter_logo.png" alt="footerlogo" />
        
        
        
        
            {/* <img src="images/deal hunter logo.png" alt="logo_footer"/> */}
                                    <h5>Got Question? Call us 24/7 </h5>
                                    <a href="callto:1-800-570-7777">1-800-570-7777</a>
                                    <p>Register now to get updates on pronot get up icons & coupons ster now toon. </p>
                                    <ul className="d-flex">
                                        <li><a href="/"><i className="fab fa-facebook-f"></i></a></li>
                                        <li><a href="/"><i className="fab fa-twitter"></i></a></li>
                                        <li><a href="/"><i className="fab fa-instagram"></i></a></li>
                                        <li><a href="/"><i className="fab fa-linkedin-in"></i></a></li>
                                        <li><a href="/"><i className="fab fa-youtube"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="footer_top_menu">
                                    <h2>Company</h2>
                                    <ul>
                                        <li><a href="/About">About Us </a></li>
                                        <li><a href="/About">Team Member</a></li>
                                        <li><a href="/">Career</a></li>
                                        {/* <Link to="/Contact">Contact us</Link> */}
                                        <li><a href="/Contact">Contact us</a></li>
                                        <li><a href="/">Affilate</a></li>
                                        <li><a href="/">Order History</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="footer_top_menu">
                                    <h2>My Account</h2>
                                    <ul>
                                        <li><a href="/">Track My Order</a></li>
                                        <li><a href="/">View Cart</a></li>
                                        <li><a href="/">Sign In</a></li>
                                        <li><a href="/">Help</a></li>
                                        <li><a href="/">My Wishlist</a></li>
                                        <li><a href="/">Privacy Policy</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="footer_top_menu">
                                    <h2>Customer Service</h2>
                                    <ul>
                                        <li><a href="/">Payment Methods</a></li>
                                        <li><a href="/">Money-back guarantee!</a></li>
                                        <li><a href="/">Product Returns</a></li>
                                        <li><a href="/">Support Center</a></li>
                                        <li><a href="/">Shipping</a></li>
                                        <li><a href="/">Term and Conditions</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                 
                 
               
                    <div className="footer_bottom">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="copy_text">
                                    <p>Copyright © 2021 Pankaj Store. All Rights Reserved.</p>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="copy_payment text-end">
                                    <p>We're using safe payment for</p>
                                    <img src="images/payment.png" alt="pyment"/>
        
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </footer>
        </>
          )
        }
        
        export default Footer;
        