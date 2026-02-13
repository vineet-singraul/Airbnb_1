import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import '../../styles/UserCss/PropertyCards.css';
import { LuIndianRupee } from "react-icons/lu";
import { FaHeart } from 'react-icons/fa';
import { useNavigate,useLocation } from "react-router-dom";
import "../../styles/UserCss/ani.css"
import { FaDirections } from "react-icons/fa";



const PropertyCards = () => {

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUserLogin , setIsUserLogin] = useState(false)
  const userId = localStorage.getItem('userActualID')
  const location = useLocation();
  const data = location.state?.data || [];


  useEffect(()=>{
   if (data.length > 0) {
    setIsUserLogin(true)
    setCards(data)
   }
  },[data])



  const navigate = useNavigate();
  useEffect(()=>{
    if (userId) {
      setIsUserLogin(true)
    }
  },[userId])


  const loadAllCards = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8000/airbnb/Users-allPropertyCards");
      const data = await response.json();
      setCards(data);
    } catch (error) {
      console.error("Error fetching property cards:", error);
    } finally {
      setLoading(false);
    }
  };
   
  useEffect(() => {
    loadAllCards();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US').format(price);
  };

  const calculateRating = (reviews) => {
    if (!reviews || reviews.length === 0) return '0.0';
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };


  const addWishlist = (id) => {
    navigate(`/User-Wishlist/${id}`);
  };


  return (
    <div className="property-cards-container bgColorHai">


      {loading ? (
        <div className="loading-container bgColorHai">
          <div className="loading-spinner bgColorHai"></div>
          <p>Loading properties...</p>
        </div>
      ) : cards.length > 0 ? (
        <div  className="property-grid-compact bgColorHai">
          {cards.map((card) => (
            <div style={{textDecoration:'none'}} data-aos="zoom-in" key={card.id} className="property-card-compact bgColorHai">
              <Link  to={`/User-Show-All-Cards-Detail-Diff-Page/${card.id}/`} target="_blank"   id='moredetails'>More details....</Link>
              <div className="property-image-compact bgColorHai">
                {card.images && card.images.length > 0 ? (
                  <img src={card.images[0]}alt={card.title}className="property-main-image-compact"/>
                    ) : (
                  <div className="property-image-placeholder-compact bgColorHai">
                    <span>No Image</span>
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="property-content-compact bgColorHai">
                {isUserLogin ?
                   <div className='bgColorHai' id="heartDiv" onClick={()=>{addWishlist(card.id)}}> 
                     <FaHeart id='HeartIcon'/>
                   </div>
                  :
                    <div className='bgColorHai' id="heartDiv">
                      <Link to="/User-Login"><FaHeart id='HeartIcon'/></Link>
                    </div>
                }

                <div className="property-header-compact bgColorHai">
                  <p className="property-title-compact">
                    {card.title.split(' ').slice(0, 8).join(' ')}
                    {card.title.split(' ').length > 8 ? '...' : ''}
                  </p>
                  <div className="rating-compact bgColorHai">
                      {new Date(card.available_from).toLocaleDateString()} - {new Date(card.available_to).toLocaleDateString()}
                  </div>
                </div>

                <div className="property-location-compact bgColorHai">
                  <svg viewBox="0 0 24 24" className="location-icon-compact">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
                  </svg>
                  <span>{card.location || 'Unknown Location'}</span>
                </div>

                <div className='bgColorHai' style={{display:'flex'}}>
                  <div className="property-price-compact bgColorHai">
                    <div className="rating-compact bgColorHai">
                      <span><LuIndianRupee />{formatPrice(card.price_per_night || 120)}</span>
                    </div>
                  </div>

                  <div className="property-price-compact bgColorHai">
                    <div className="rating-compact bgColorHai">
                       <span>{Math.ceil((new Date(card.available_to) - new Date(card.available_from)) /(1000 * 60 * 60 * 24))} Nights</span>
                    </div>
                  </div>

                  <div className="property-price-compact bgColorHai">
                    <div className="rating-compact bgColorHai">
                      <span>{calculateRating(card.reviews)} ★</span>
                    </div>
                  </div>

                  <div className="property-price-compact bgColorHai">
                    <div className="rating-compact bgColorHai">
                      <a id="MapLiveDairection" href={`https://www.google.com/maps?q=${card.location}`} target="_blank" rel="noopener noreferrer" > <FaDirections style={{ fontSize: '20px', color: '#ff4d6d' }} /></a>
                    </div>
                  </div>

                  


                </div>
                

              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-properties">
          <h3>No properties found</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default PropertyCards;
