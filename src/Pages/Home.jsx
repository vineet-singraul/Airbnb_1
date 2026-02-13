// import UserCommanLayout from "./User/UserCommanLayout";
// import "../styles/UserCss/filtercss.css";
// import PropertyCards from "./User/PropertyCards";
// import { useContext, useEffect } from "react";
// import { ColorContext } from "./User/UserBlackWight";

// const Home = () => {
//   const changeColor = useContext(ColorContext)

//   return (
//     <UserCommanLayout>
//       <div className="my-0 p-0">

//         <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
//           <div className="carousel-indicators">
//             <button type="button" data-bs-target="#carouselExampleControls" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
//             <button type="button" data-bs-target="#carouselExampleControls" data-bs-slide-to="1" aria-label="Slide 2"></button>
//             <button type="button" data-bs-target="#carouselExampleControls" data-bs-slide-to="2" aria-label="Slide 3"></button>
//             <button type="button" data-bs-target="#carouselExampleControls" data-bs-slide-to="3" aria-label="Slide 4"></button>
//           </div>

//           <div className="carousel-inner">
//             <div className="carousel-item active">
//               <img
//                 src="../../public/slider/s1.avif"
//                 className="d-block w-100"
//                 alt="Modern Laptop Setup"
//               />
//               <div id="sliderid" className="carousel-caption d-none d-md-block">
//                 <h5>Entire apartment in Indore, India</h5>
//                 <p>Welcome to our charming Studio apartment nestled within a beautifully renovated old bungalow! </p>
//               </div>
//             </div>

//             <div className="carousel-item">
//               <img
//                 src="../../public/slider/s2.avif"
//                 className="d-block w-100"
//                 alt="Mobile App Development"
//               />
//               <div id="sliderid"  className="carousel-caption d-none d-md-block">
//                 <h5>Entire rental unit in Indore, India</h5>
//                 <p>Experience tranquility of a premium independent space on terrace nestled in a posh area-scheme no 54 Vijay nagar.</p>
//               </div>
//             </div>

//             <div className="carousel-item">
//               <img
//                 src="../../public/slider/s3.avif"
//                 className="d-block w-100"
//                 alt="Productive Workspace"
//               />
//               <div id="sliderid"  className="carousel-caption d-none d-md-block">
//                 <h5>Room in Agonda, India</h5>
//                 <p>Discover your ideal goan escape at Que Sera Sera Coliving! Perfect for solo travellers</p>
//               </div>
//             </div>

//             <div className="carousel-item">
//               <img
//                 src="../../public/slider/s4.avif"
//                 className="d-block w-100"
//                 alt="Gaming Setup"
//               />
//               <div id="sliderid"  className="carousel-caption d-none d-md-block">
//                 <h5>Entire rental unit in North Goa, India</h5>
//                 <p>Located in the heart of NGoa,  this cozy studio offers a king bed, AC, WiFi, kitchenette, and modern bath.</p>
//               </div>
//             </div>
//           </div>

//           <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
//             <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//             <span className="visually-hidden">Previous</span>
//           </button>

//           <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
//             <span className="carousel-control-next-icon" aria-hidden="true"></span>
//             <span className="visually-hidden">Next</span>
//           </button>
//         </div>
//       </div>
//       <PropertyCards/>
//     </UserCommanLayout>
//   );
// };

// export default Home;






import UserCommanLayout from "./User/UserCommanLayout";
import "../styles/UserCss/filtercss.css";
import PropertyCards from "./User/PropertyCards";
import { useContext, useEffect } from "react";
import { ColorContext } from "./User/UserBlackWight";

const Home = () => {
  const changeColor = useContext(ColorContext)

  return (
    <UserCommanLayout>
      <div className="my-0 p-0">

        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleControls" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleControls" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleControls" data-bs-slide-to="2" aria-label="Slide 3"></button>
            <button type="button" data-bs-target="#carouselExampleControls" data-bs-slide-to="3" aria-label="Slide 4"></button>
          </div>

          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg"
                className="d-block w-100"
                alt="Modern Laptop Setup"
              />
              <div id="sliderid" className="carousel-caption d-none d-md-block">
                <h5>Entire apartment in Indore, India</h5>
                <p>Welcome to our charming Studio apartment nestled within a beautifully renovated old bungalow! </p>
              </div>
            </div>

            <div className="carousel-item">
              <img
                src="https://images.pexels.com/photos/7598378/pexels-photo-7598378.jpeg"
                className="d-block w-100"
                alt="Mobile App Development"
              />
              <div id="sliderid"  className="carousel-caption d-none d-md-block">
                <h5>Entire rental unit in Indore, India</h5>
                <p>Experience tranquility of a premium independent space on terrace nestled in a posh area-scheme no 54 Vijay nagar.</p>
              </div>
            </div>

            <div className="carousel-item">
              <img
                src="https://images.pexels.com/photos/534151/pexels-photo-534151.jpeg"
                className="d-block w-100"
                alt="Productive Workspace"
              />
              <div id="sliderid"  className="carousel-caption d-none d-md-block">
                <h5>Room in Agonda, India</h5>
                <p>Discover your ideal goan escape at Que Sera Sera Coliving! Perfect for solo travellers</p>
              </div>
            </div>

            <div className="carousel-item">
              <img
                src="https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg"
                className="d-block w-100"
                alt="Gaming Setup"
              />
              <div id="sliderid"  className="carousel-caption d-none d-md-block">
                <h5>Entire rental unit in North Goa, India</h5>
                <p>Located in the heart of NGoa,  this cozy studio offers a king bed, AC, WiFi, kitchenette, and modern bath.</p>
              </div>
            </div>


            <div className="carousel-item">
              <img
                src="https://images.pexels.com/photos/14972053/pexels-photo-14972053.jpeg"
                className="d-block w-100"
                alt="Gaming Setup"
              />
              <div id="sliderid"  className="carousel-caption d-none d-md-block">
                <h5>Entire rental unit in North Goa, India</h5>
                <p>Located in the heart of NGoa,  this cozy studio offers a king bed, AC, WiFi, kitchenette, and modern bath.</p>
              </div>
            </div>
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>

          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <PropertyCards/>
    </UserCommanLayout>
  );
};

export default Home;
