import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link untuk navigasi
import axios from "axios";

const HeroHeader = () => {
  const [hotels, setHotels] = useState([]); 
  const token = sessionStorage.getItem('jwtToken');
  const fetchHotels = () => {
    axios
      .get("http://localhost:3000/api/hotel" , {
		 headers: {
          "Authorization": `${token}` 
        }
	  })
      .then((result) => {
        setHotels(result.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <>
      <div className="relative bg-hero py-5 mb-5 min-h-[70vh]">
        <div className="py-3">
          <div className="container py-3">
            <div className="row justify-center py-3">
              <div className="col-lg-10 pt-8 mt-3 text-center">
                <h1 className="text-5xl text-white mb-3 pt-6 pb-4 animate-slideInDown">
                  Nikmati perjalanan anda dengan BOBO
                </h1>
                <p className="text-lg text-white mb-3 animate-slideInDown">
                  Cari tempat yang anda inginkan
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      

      {/* Container Rekomendasi */}
      <div className="bg-white py-5">
        <div className="container">
          <h2 className="text-center text-2xl md:text-[35px] font-bold mb-5">
            Rekomendasi hari ini
          </h2>
          <div className="row">
            {/* Card for Each Hotel */}
            {hotels.map((hotel) => (
              <div className="col-md-3 mb-4" key={hotel.hotelID}>
                <div className="card">
                  <img
                    src={`backend/Images/${hotel.photo}`}// Replace with `hotel.image` if available dynamically
                    className="card-img-top"
                    alt={hotel.namaHotel}
                  />
                  <div className="card-body text-center font-bold">
                    <h5 className="card-title">{hotel.namaHotel}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Button "Cari lebih lanjut yuk!" */}
          <div className="text-center mt-5">
            <Link
              to="/signup" // Tombol menuju halaman Register
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full"
            >
              Cari lebih lanjut yuk!
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroHeader;
