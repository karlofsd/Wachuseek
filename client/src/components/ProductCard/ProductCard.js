import React, { useEffect } from 'react';
import './ProductCard.css';
import { Link } from 'react-router-dom'
import axios from 'axios'

const Card = ({ name, price, image, id }) => {


  const handleClick = async (e) => {
    const dataValue = {
      name: name,
      price: price,
      quantity: 1,
      status: "carrito"
    };

    const { data } = await axios.post(`http://localhost:3001/user/${2}/carrito`, dataValue);

  }
  
  return (
    <div className="wrapper">
      <div className="container">
        <div className="top">
          <Link to={`/catalogo/product/${id}`}>
            <img src={image} className='reloj-img' alt="reloj" />
          </Link>

        </div>
        <div className="bottom">
          <div className="left">
            <div className="details">
              <h1>{name = name.substring(0, 1).toUpperCase() + name.substring(1)}</h1>
              <p>$USD {price}</p>
            </div>
            <button onClick={() => handleClick()} className="buy"><i className="fas fa-shopping-cart"></i></button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Card;