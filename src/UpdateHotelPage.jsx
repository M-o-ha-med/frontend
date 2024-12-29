import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateHotelPage = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState({
    namaHotel: "",
    deskripsi: "",
    regionID: "",
    alamatHotel: "",
    photo: null,
  });
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/hotel/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setHotel((prev) => ({
          ...prev,
          namaHotel: result.data[0].namaHotel || "",
          deskripsi: result.data[0].deskripsi || "",
          regionID: result.data[0].regionID || "",
          alamatHotel: result.data[0].alamatHotel || "",
		  photo: result.data[0].photo || ""
        }));
        console.log(result.data);
      })
      .catch((err) => console.error(err));
  }, [id, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHotel((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setHotel((prev) => ({ ...prev, photo: file }));
  };

  const updateHotel = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("namaHotel", hotel.namaHotel);
    formData.append("deskripsi", hotel.deskripsi);
    formData.append("regionID", hotel.regionID);
    formData.append("alamatHotel", hotel.alamatHotel);
    if (hotel.photo) {
      formData.append("photo", hotel.photo);
    }

    axios
      .patch(`http://localhost:3000/api/admin/hotels/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("Hotel updated successfully");
        navigate("/Admin");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full mx-auto py-10 px-5">
        <h1 className="text-4xl font-bold text-center mb-10 text-blue-600">Update Hotel</h1>
        <form onSubmit={updateHotel} className="space-y-6">
          <div>
            <label className="block font-medium mb-1">Select Image:</label>
            <input
              type="file"
              name="photo"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Hotel Name</label>
            <input
              type="text"
              name="namaHotel"
              value={hotel.namaHotel}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="deskripsi"
              value={hotel.deskripsi}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
              rows="3"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Region</label>
            <select
              name="regionID"
              value={hotel.regionID}
              onChange={handleInputChange}
              required
              className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a region</option>
              <option value="1">Jakarta</option>
              <option value="4">Bandung</option>
              <option value="5">Yogyakarta</option>
              <option value="2">Surabaya</option>
              <option value="3">Bali</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Address</label>
            <input
              type="text"
              name="alamatHotel"
              value={hotel.alamatHotel}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 w-full"
          >
            Update Hotel
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateHotelPage;
