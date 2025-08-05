import React, { useEffect } from 'react';
import front from '../assets/front.webp';
import './style/home.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Testimony from './home/testimony';
import UserLogin from './home/subscribe';
import Service from './home/service';
import Header from './home/header';
import Layout from './layout';

const Home = () => {
 

  return (
    <div className="min-vh-100 bg-light" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <Header />
      <Service />
      <Testimony />
      <UserLogin />
    </div>
  );
};

export default Home;
