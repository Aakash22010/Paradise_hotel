import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Form from './form'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4 mb-md-0" data-aos="fade-up" data-aos-delay="100">
            <h5 className="fw-bold mb-3">Paradise Hotel</h5>
            <p className="text-light">
              123 Luxury Avenue<br />
              Tropical Island, Paradise 98765
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-white fs-4"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-white fs-4"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-white fs-4"><i className="bi bi-twitter"></i></a>
              <a href="#" className="text-white fs-4"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>
          
          <div className="col-md-4 mb-4 mb-md-0" data-aos="fade-up" data-aos-delay="200">
            <h5 className="fw-bold mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light text-decoration-none">Home</a></li>
              <li><a href="#" className="text-light text-decoration-none">Rooms & Suites</a></li>
              <li><a href="#" className="text-light text-decoration-none">Dining</a></li>
              <li><a href="#" className="text-light text-decoration-none">Spa</a></li>
            </ul>
          </div>
          <div className="col-md-4" data-aos="fade-up" data-aos-delay="300">
            <h5 className="fw-bold mb-3">Connect With Us</h5>
            <Form/>
            
          </div>
        </div>
        <hr className="my-4 bg-light" />
        <div className="text-center text-white">
          &copy; {new Date().getFullYear()} Paradise Hotel. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;