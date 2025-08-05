import React from 'react';
import Footer from './home/footer';
import Navbar from './home/navbar';

const Layout = ({ children }) => {
    return (
        <div style={{ margin: '0 auto', maxWidth: "100wh" }}>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;