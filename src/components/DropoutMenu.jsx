import React from 'react';
import { Link } from 'react-router-dom';
import './DropoutMenu.css';

export const DropoutMenu = () => {
  return (
    <div className='dropdown-menu'>
      <ul>
        <li>
          <Link
            className='navigationlink'
            to='/products'>
            All Products
          </Link>
        </li>
        <li>
          <Link
            className='navigationlink'
            to='/products'>
            Knitwear
          </Link>
        </li>
        <li>
          <Link
            className='navigationlink'
            to='/products'>
            Leather Goods
          </Link>
        </li>
      </ul>
    </div>
  );
};
