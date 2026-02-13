import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import {Link} from 'react-router-dom'
import "../../styles/UserCss/Wishlist.css"
import "../../styles/global.css"

const Wishlist = () => {
  const { id } = useParams();
  const userId = localStorage.getItem("userActualID");
  const [added, setAdded] = useState(false);
  const [cout , setCout] = useState()
  const [wishList, setWishList] = useState([]);
  const FatchWishList = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/airbnb/User-Wishlist-fatch/${userId}/`,
      {
        method: "GET",
      }
    );

    const WishlistData = await response.json();
    console.log("Wish :L xxxxxxx : ",WishlistData)
    setWishList(WishlistData.wishlist || []);
    setCout(WishlistData.count || 5)
  };

  useEffect(() => {
    if (userId) {
      FatchWishList();
    }
    
  }, [userId]);

  
useEffect(() => {
  if (wishList.length > 0 || cout !== undefined) {
    localStorage.setItem("wishCount", wishList.length)
    console.log("Updated wishlist:", wishList.length)
    console.log("Updated count:", cout)
  }
}, [wishList, cout]);





  const addInWishlist = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/airbnb/User-Wishlist/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: userId, productId: id }),
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        toast.success(data.message);
      } else if (data.status === "exists") {
        toast.warning(data.message);
      } else {
        toast.error("Something went wrong!");
      }
      setAdded(true);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  useEffect(() => {
    if (id && userId && !added) {
      addInWishlist();
    }
  }, [id, userId, added]);

return (
  <div id="MainId" className="wishlist-container bgColorHai">
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      theme="colored"
    />
    {/* Header Section */}
    <div className="wishlist-header">
      <h1 className="wishlist-title">Wishlists</h1>
      <div className="wishlist-subheader">
        <span className="recently-viewed">Recently viewed</span>
        <span className="time-ago">3 weeks ago</span>
      </div>
    </div>
    {/* Main Content */}
    <div className="d-flex wishlist-content">

      <div className="wishlist-content">
        {wishList.length > 0 ? (
          <div className="wishlist-image-grid">
            {wishList.map((item) => (
              <Link target="_blank"  to={`/User-Show-All-Cards-Detail-Diff-Page/${item.property.id}/`}  
                key={item.id} 
                className="wishlist-image-item"
                onClick={() => handlePropertyClick(item.property.id)}
              >
                <div className="image-container">
                  {item.property.images && item.property.images.length > 0 ? (
                    <img 
                      src={item.property.images[0]} 
                      alt={item.property.title} 
                      className="property-image"
                    />
                  ) : (
                    <div className="no-image-placeholder">
                      <span>No Image</span>
                    </div>
                  )}
                  
                  {/* Hover Overlay with Price */}
                  <div className="image-overlay">
                    <div className="overlay-content">
                      <div className="property-price">
                        <span className="price-amount">${item.property.price_per_night || "0"}</span>
                        <span className="price-period"> night</span>
                        <span className="price-period"> {item.property.id || "0"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button 
                    className="remove-wishlist-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromWishlist(item.property.id);
                    }}
                    aria-label="Remove from wishlist"
                  >
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false">
                      <path d="m16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0 -7-7c-1.8 0-3.58.68-4.95 2.05l-2.05 2.05-2.05-2.05a6.98 6.98 0 0 0 -9.9 0 6.98 6.98 0 0 0 0 9.9c1.37 1.37 3.15 2.05 4.95 2.05 1.8 0 3.58-.68 4.95-2.05l2.05-2.05 2.05 2.05a6.98 6.98 0 0 0 9.9 0 6.98 6.98 0 0 0 0-9.9 6.98 6.98 0 0 0 -9.9 0l-2.05 2.05-2.05-2.05a6.98 6.98 0 0 0 -9.9 0 6.98 6.98 0 0 0 0 9.9c1.37 1.37 3.15 2.05 4.95 2.05 1.8 0 3.58-.68 4.95-2.05l2.05-2.05 2.05 2.05a6.98 6.98 0 0 0 9.9 0 6.98 6.98 0 0 0 0-9.9 6.98 6.98 0 0 0 -9.9 0l-2.05 2.05-2.05-2.05a6.98 6.98 0 0 0 -9.9 0 6.98 6.98 0 0 0 0 9.9z"></path>
                    </svg>
                  </button>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-wishlist">
            <div className="empty-state">
              <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false">
                <path d="m32 56.67a3.33 3.33 0 0 1 -3.33-3.34v-26.66a3.33 3.33 0 0 1 6.66 0v26.66a3.33 3.33 0 0 1 -3.33 3.34z"></path>
                <path d="m44 56.67a3.33 3.33 0 0 1 -3.33-3.34v-26.66a3.33 3.33 0 0 1 6.66 0v26.66a3.33 3.33 0 0 1 -3.33 3.34z"></path>
                <path d="m20 56.67a3.33 3.33 0 0 1 -3.33-3.34v-26.66a3.33 3.33 0 0 1 6.66 0v26.66a3.33 3.33 0 0 1 -3.33 3.34z"></path>
                <path d="m57.33 26.67h-50.66a3.33 3.33 0 0 1 0-6.66h50.66a3.33 3.33 0 0 1 0 6.66z"></path>
                <path d="m50.67 13.33h-37.34a3.33 3.33 0 0 1 0-6.66h37.34a3.33 3.33 0 0 1 0 6.66z"></path>
              </svg>
              <h2>No properties in your wishlist yet</h2>
              <p>Start exploring and save your favorite properties for later.</p>
              <button 
                className="explore-btn"
                onClick={() => navigate('/')}
              >
                Explore Properties
              </button>
            </div>
          </div>
        )}
      </div>


    </div>
  </div>
);




};

export default Wishlist;


