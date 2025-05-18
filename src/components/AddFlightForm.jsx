import { useState } from "react";
import { addFlight } from "../api/api"; // Make sure the path is correct

export default function AddFlightForm() {
  const [formData, setFormData] = useState({
    flight_number: "",
    airline: "",
    departure: "",
    destination: "",
    departure_time: "",
    total_seats: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      const response = await addFlight({
        ...formData,
        total_seats: parseInt(formData.total_seats),
      });
      setSuccess(`Flight ${response.data.flight_number} added successfully!`);
      setFormData({
        flight_number: "",
        airline: "",
        departure: "",
        destination: "",
        departure_time: "",
        total_seats: "",
      });
    } catch (err) {
      console.error(err);
      setError("Failed to add flight. Please check the input.");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Add New Flight</h2>
      {success && <p className="text-green-600 mb-3">{success}</p>}
      {error && <p className="text-red-600 mb-3">{error}</p>}
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          name="flight_number"
          placeholder="Flight Number"
          value={formData.flight_number}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          name="airline"
          placeholder="Airline"
          value={formData.airline}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          name="departure"
          placeholder="Departure"
          value={formData.departure}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          name="destination"
          placeholder="Destination"
          value={formData.destination}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          name="departure_time"
          type="datetime-local"
          value={formData.departure_time}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          name="total_seats"
          type="number"
          min="1"
          placeholder="Total Seats"
          value={formData.total_seats}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Add Flight
        </button>
      </form>
    </div>
  );
}
