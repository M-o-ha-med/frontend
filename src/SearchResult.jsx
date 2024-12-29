import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchResultsPage = ({ query }) => {
  const [hotels, setHotels] = useState([]);
  const [resultCount, setResultCount] = useState(0);
  const token = sessionStorage.getItem('jwtToken');
  
  // Fetch search results from the backend
  useEffect(() => {
	  const query = "Swissotel Jakarta PIK Avenue Golf Course";
	  console.log('Searching for:', query); 
    axios
      .get(`http://localhost:3000/api/hotel/search`,{params : {query:query},headers: {"Authorization": `${token}`}})
      .then((response) => {
		 console.log(response.data);
        setHotels(response.data);
        setResultCount(1);
      })
      .catch((error) => console.error("Error fetching hotel data:", error));
  }, []);

  return (
    <div className="bg-white min-h-screen p-6">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          {resultCount} Results Found for "{query}"
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <div
              className="border shadow-lg rounded-lg overflow-hidden"
              key={hotel.id}
            >
              <img
                src={`http://localhost:3000/images/${hotel.photo}`}
                alt={hotel.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{hotel.name}</h3>
                <p className="text-gray-600">
                  {hotel.location} • {hotel.reviews} reviews
                </p>
                <div className="text-sm my-2">
                  {hotel.offers.map((offer, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full mr-2"
                    >
                      {offer}
                    </span>
                  ))}
                </div>
                <div className="text-right">
                  <p className="text-red-500 line-through">{`Rp ${hotel.price}`}</p>
                  <p className="text-green-600 font-bold">{`Rp ${hotel.discountedPrice}`}</p>
                </div>
              </div>
              <div className="p-4 bg-blue-50 text-center">
                <p className="text-sm text-green-600">
                  + Free Cancellation & Breakfast
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
