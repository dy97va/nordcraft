import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import '../styles/Home.css';
import { Link } from 'react-router-dom';

export const Home = ({ user }) => {
  return (
    <>
      <Navbar />
      <section className='homePageBody'>
        <div className='mainText'>
          <p className='mainTitle'>
            Quality goods to&nbsp;last a&nbsp;lifetime
          </p>
          <p className='mainDescription'>
            Made from locally sourced materials, our products are hand crafted
            to&nbsp;suit you needs
          </p>
          <div className='exploreButtonWrapper'>
            <Link to='products' className='exploreButton'>
              {' '}
              Explore{' '}
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
