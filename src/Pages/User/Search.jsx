import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserCommanLayout from "./UserCommanLayout";
import { LuIndianRupee } from "react-icons/lu";
import { FaHeart } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import '../../styles/UserCss/PropertyCards.css';
import { toast,ToastContainer } from 'react-toastify';

const Search = () => {
  // -------------------------------
  // Get query params from URL
  // -------------------------------
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const locationQuery = queryParams.get("location");
  const populesQuery = queryParams.get("popules");
  const navigate = useNavigate();
  // -------------------------------
  // React state
  // -------------------------------
  const [cards, setCards] = useState([]);      
  const [loading, setLoading] = useState(true);

  // -------------------------------
  // Fetch properties based on search
  // -------------------------------
  const sendRequestOfSearch = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({location: locationQuery,popules: populesQuery}).toString();
      const response = await fetch(`http://127.0.0.1:8000/airbnb/User-Search-Value/?${query}`);
      const data = await response.json();

      setCards(data);

    } catch (error) {
      console.error("Error fetching search properties:", error);
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // Fetch all cards if no query exists
  // -------------------------------
  const loadAllCards = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8000/airbnb/Users-allPropertyCards");
      const data = await response.json();

      if (response.status === 400) {
        toast.error("Please make sure both fields in the search box are filled");
      } else if (response.status === 401) {
        toast.error("Please enter an integer value for guests");
      } else if (response.status === 200) {
        toast.success("Search data found successfully");
        setCards(data);
      }

    } catch (error) {
      console.error("Error fetching all property cards:", error);
    } finally {
      setLoading(false);
    }
  };


  // ----------------------------
  // Formet Me Back Button Ki Hai
  const handleBackbtn = (e) => {
    e.preventDefault();
    navigate("/");            
  };

  // -------------------------------
  // Format price nic   ely
  // -------------------------------
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US').format(price);
  };

  // -------------------------------
  // Calculate average rating
  // -------------------------------
  const calculateRating = (reviews) => {
    if (!reviews || reviews.length === 0) return '0.0';
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  // -------------------------------
  // useEffect to load properties
  // Run search only if query exists, else load all
  // -------------------------------
  useEffect(() => {
    if (locationQuery || populesQuery) {
      sendRequestOfSearch(); 
    } else {
      loadAllCards();        
    }
  }, [locationQuery, populesQuery]);

  // -------------------------------
  // Render component
  // -------------------------------
  return (
    <UserCommanLayout>
      {/* Show current search */}
      <button type='submit' onClick={handleBackbtn} className='buttonss'>Back</button>
      <div className="property-cards-container">

        {/* Loading spinner */}
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading properties...</p>
          </div>
        ) : cards.length > 0 ? (
          // Property cards grid
          <div className="property-grid-compact">
            {cards.map((card) => (
              <Link
                target="_blank"
                to={`/User-Show-All-Cards-Detail-Diff-Page/${card.id}/`}
                style={{ textDecoration: 'none' }}
                key={card.id}
                className="property-card-compact"
              >
                {/* Image section */}
                <div className="property-image-compact">
                  {card.images && card.images.length > 0 ? (
                    <img
                      src={card.images[0]}
                      alt={card.title}
                      className="property-main-image-compact"
                    />
                  ) : (
                    <div className="property-image-placeholder-compact">
                      <span>No Image</span>
                    </div>
                  )}
                </div>

                {/* Content section */}
                <div className="property-content-compact">
                  <div id="heartDiv">
                    <FaHeart id='HeartIcon'/>
                  </div>
                  <div className="property-header-compact">
                    <p className="property-title-compact">
                      {card.title.split(' ').slice(0, 8).join(' ')}
                      {card.title.split(' ').length > 8 ? '...' : ''}
                    </p>
                    <div className="rating-compact">
                      {new Date(card.available_from).toLocaleDateString()} - {new Date(card.available_to).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="property-location-compact">
                    <svg viewBox="0 0 24 24" className="location-icon-compact">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
                    </svg>
                    <span>{card.location || 'Unknown Location'}</span>
                  </div>

                  <div style={{ display: 'flex' }}>
                    <div className="property-price-compact">
                      <div className="rating-compact">
                        <span><LuIndianRupee />{formatPrice(card.price_per_night || 120)}</span>
                      </div>
                    </div>

                    <div className="property-price-compact">
                      <div className="rating-compact">
                        <span>
                          {Math.ceil((new Date(card.available_to) - new Date(card.available_from)) / (1000 * 60 * 60 * 24))} Nights
                        </span>
                      </div>
                    </div>

                    <div className="property-price-compact">
                      <div className="rating-compact">
                        <span>{calculateRating(card.reviews)} ★</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          // No properties found
          <div className="no-properties">
            <h3>No properties found</h3>
            <p>Try adjusting your search criteria</p>
          </div>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </UserCommanLayout>
  );
};

export default Search;
