import React, { useState, useEffect } from "react";
import axios from "axios";

const Booking = () => {
  const [formData, setFormData] = useState({
    regionID: "1",
    hotelID: "",
    bookingDate: getCurrentDate(),
    dayOfreservation: "1"
  });
  
  const token = sessionStorage.getItem("token");
  const userID = sessionStorage.getItem("ID");


  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);

  function getCurrentDate() {
    const now = new Date();
    return now.toISOString().slice(0, 10);
  }

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "regionID") {
      // When region changes, reset hotelID and filter hotels
      setFormData(prev => ({
        ...prev,
        [name]: value,
        hotelID: "" // Reset hotel selection
      }));
      
      // Filter hotels for the selected region
      const filtered = hotels.filter(hotel => hotel.regionID.toString() === value);
      setFilteredHotels(filtered);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
	formData.userID = userID;
    console.log("Booking Data:", formData);
    axios
      .post("http://localhost:3000/api/bookings", formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        console.log("Booking added successfully:", result.data);
      })
      .catch((err) => console.error(err));
  };
  
  // Fetch hotels and set initial filtered hotels
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/hotel`);
        setHotels(response.data);
        console.log(token);
        // Set initial filtered hotels based on default regionID
        const filtered = response.data.filter(
          hotel => hotel.regionID.toString() === formData.regionID
        );
        setFilteredHotels(filtered);
      } catch (err) {
        console.error("Error fetching hotels:", err);
        setHotels([]);
        setFilteredHotels([]);
      }
    };

    fetchHotels();
  }, []); // Remove formData.regionID from dependency array

  return (
    <div className="container mx-auto py-10 px-5">
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white p-10 rounded-lg shadow-2xl">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left Column - Info Section */}
          <div>
            <h6 className="uppercase tracking-widest text-gray-300">Booking with BOBO</h6>

            <h1 className="text-3xl md:text-5xl font-extrabold mb-6">Simple, Fast, and Secure</h1>
            <p className="mb-4 leading-relaxed">
              At BOBO, we've made hotel booking as easy as dreaming about your next destination. 
              With just a few clicks, you'll secure the perfect place to stay—saving time, effort, and money!
            </p>
            <p className="mb-6 leading-relaxed">
              Wherever your travels take you, BOBO is here to make your booking process smooth, 
              reliable, and enjoyable. Start planning your next adventure today!

            <h5 className="text-3xl md:text-5xl font-extrabold mb-6">Simple, Fast, and Secure</h5>
            <p className="mb-4 leading-relaxed">
            At BOBO, we’ve made hotel booking as easy as dreaming about your next destination. With just a few clicks, you’ll secure the perfect place to stay—saving time, effort, and money!
            </p>
            <p className="mb-6 leading-relaxed">
            Wherever your travels take you, BOBO is here to make your booking process smooth, reliable, and enjoyable. Start planning your next adventure today!

            </p>
          </div>

          {/* Right Column - Booking Form */}
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-6">Book A Tour</h1>
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label
                    className="block text-sm font-medium text-gray-300 mb-2"
                    htmlFor="regionID"
                  >
                    Destination
                  </label>
                  <select
                    name="regionID"
                    value={formData.regionID}
                    onChange={handleInputChange}
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="1">Jakarta</option>
                    <option value="4">Bandung</option>
                    <option value="5">Yogyakarta</option>
                    <option value="2">Surabaya</option>
                    <option value="3">Bali</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label
                    className="block text-sm font-medium text-gray-300 mb-2"
                    htmlFor="hotelID"
                  >
                    Hotels
                  </label>
                  <select
                    name="hotelID"
                    value={formData.hotelID}
                    onChange={handleInputChange}
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a hotel</option>
                    {filteredHotels.map((hotel) => (
                      <option key={hotel.hotelID} value={hotel.hotelID}>
                        {hotel.namaHotel}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-300 mb-2"
                    htmlFor="bookingDate"
                  >
                    Booking Date
                  </label>
                  <input
                    type="date"
                    name="bookingDate"
                    value={formData.bookingDate}
                    onChange={handleInputChange}
                    min={getCurrentDate()}
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-300 mb-2"
                    htmlFor="dayOfreservation"
                  >
                    Number of Nights
                  </label>
                  <input
                    type="number"
                    name="dayOfreservation"
                    placeholder="Number of Nights"
                    value={formData.dayOfreservation}
                    onChange={handleInputChange}
                    min="1"
                    max="30"
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="col-span-2">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg shadow-lg transition duration-300"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;