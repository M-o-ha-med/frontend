import { useState, useEffect } from "react";
import { Navigate , useNavigate} from "react-router-dom";
import axios from "axios";



const AdminLandingPage = () => {
  const [orders, setOrders] = useState([]);
  const [hotels, setHotels] = useState([]); // State to hold fetched hotels
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const sss = sessionStorage.getItem("role");  


  const [newHotel, setNewHotel] = useState({
    namaHotel: "",
    deskripsi: "",
    regionID: "1", // Default region ID
    photo: null,
    alamatHotel: "",
  });

  // Fetch orders from API
const fetchOrders = () => {
  axios
    .get("http://localhost:3000/api/bookings", {
      headers: { Authorization: `Bearer ${token}` }, 
    })
    .then((result) => {
      console.log(result.data);
      setOrders(result.data);
    })
    .catch((err) => console.error(err));
};


  // Fetch hotels from API
  const fetchHotels = () => {
    axios
      .get("http://localhost:3000/api/hotel")
      .then((result) => {
        console.log(result.data);
		console.log(token);
		console.log(sss);
        setHotels(result.data); // Update hotels state
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchOrders();
    fetchHotels();
  }, []);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHotel((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewHotel((prev) => ({ ...prev, photo: e.target.files[0] }));
  };

  const addHotel = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(newHotel).forEach((key) => {
      formData.append(key, newHotel[key]);
    });

    axios
      .post("http://localhost:3000/api/admin/hotels", formData, {
        headers: { Authorization: `Bearer ${token}` ,  "Content-Type": "multipart/form-data" },
      })
      .then((result) => {
        console.log("Hotel added successfully:", result.data);
        setNewHotel({ namaHotel: "", deskripsi: "", regionID: "1", photo: null, address: "" });
        fetchHotels(); // Refresh hotels list
      })
      .catch((err) => console.error(err));
  };

  const confirmOrder = (id) => {
    axios
      .patch(`http://localhost:3000/api/bookings/${id}/confirm`)
      .then((result) => {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.bookingID === id ? { ...order, isConfirmed: true } : order
          )
        );
      })
      .catch((err) => console.error(err));
  };
  
  const updateHotel = (id) => {
    navigate(`update-hotel/${id}`);
  };

  const deleteOrder = (id) => {
    axios
      .delete(`http://localhost:3000/api/bookings/${id}/delete`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => fetchOrders())
      .catch((err) => console.error(err));
  };
  
  const deleteHotel = (id) => {
    axios
      .delete(`http://localhost:3000/api/admin/hotels/${id}`  , {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => fetchHotels())
      .catch((err) => console.error(err));
  };

  return (
    <div className="container py-5">
      <h1 className="text-3xl font-bold mb-5">Welcome to the Administration Portal</h1>
      <p className="text-lg mb-4">Here you can manage your products, customers, and orders.</p>

      {/* Order Management Table */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Order Management</h2>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">User</th>
              <th className="border border-gray-300 px-4 py-2">Hotel Ordered</th>
              <th className="border border-gray-300 px-4 py-2">Confirmed</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
			<tbody>
			  {orders.length === 0 ? (
				<tr>
				  <td colSpan="4" className="text-center py-4">
					No orders available.
				  </td>
				</tr>
			  ) : (
				orders.map((order) => (
				  <tr key={order.bookingID}>
					<td className="border border-gray-300 px-4 py-2">{order.userID}</td>
					<td className="border border-gray-300 px-4 py-2">{order.namaHotel}</td>
					<td className="border border-gray-300 px-4 py-2">
					  {order.isConfirmed ? "Yes" : "No"}
					</td>
					<td className="border border-gray-300 px-4 py-2 space-x-2">
					  {!order.isConfirmed && (
						<button
						  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
						  onClick={() => confirmOrder(order.bookingID)}
						>
						  Confirm
						</button>
					  )}
					  <button
						className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
						onClick={() => deleteOrder(order.bookingID)}
					  >
						Delete
					  </button>
					</td>
				  </tr>
				))
			  )}
			</tbody>
        </table>
      </div>

      {/* Hotels Table */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">List Of Hotels</h2>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">HotelID</th>
              <th className="border border-gray-300 px-4 py-2">Hotel Name</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Address</th>
			  <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {hotels.length === 0 ? (
				<tr>
				  <td colSpan="5" className="text-center py-4">
					No Hotels available.
				  </td>
				</tr>
			  ) : (hotels.map((hotel) => (
              <tr key={hotel.hotelID}>
                <td className="border border-gray-300 px-4 py-2">{hotel.hotelID}</td>
                <td className="border border-gray-300 px-4 py-2">{hotel.namaHotel}</td>
                <td className="border border-gray-300 px-4 py-2">{hotel.deskripsi}</td>
                <td className="border border-gray-300 px-4 py-2">{hotel.alamatHotel}</td>
                <td className="px-4 py-2 border flex space-x-2">
                   <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => updateHotel(hotel.hotelID)} // Panggil navigate di sini
                    >Update</button>
                    <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => deleteHotel(hotel.hotelID)}
                    >Delete</button>      
                </td>      
              </tr>
            )))}
          </tbody>
        </table>
      </div>

      {/* Add New Hotel Form */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Add New Hotel</h2>
        <form onSubmit={addHotel} className="space-y-4" encType="multipart/form-data">
          <div>
            <label className="block font-medium mb-1">Select Image:</label>
            <input
              type="file"
              name="photo"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Hotel Name</label>
            <input
              type="text"
              name="namaHotel"
              value={newHotel.namaHotel}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
              placeholder="Enter hotel name"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Hotel Description</label>
            <input
              type="text"
              name="deskripsi"
              value={newHotel.deskripsi}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
              placeholder="Enter hotel description"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Region</label>
            <select
              id="regionID"
              name="regionID"
              value={newHotel.regionID}
              onChange={handleInputChange}
              className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1">Jakarta</option>
              <option value="2">Bandung</option>
              <option value="3">Yogyakarta</option>
              <option value="4">Surabaya</option>
              <option value="5">Bali</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Address</label>
            <input
              type="text"
			  id = "alamatHotel"
              name="alamatHotel"
              value={newHotel.alamatHotel}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
              placeholder="Enter hotel address"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Add Hotel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLandingPage;
