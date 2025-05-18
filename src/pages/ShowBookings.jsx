import React, { useEffect, useState } from "react";
import axios from "axios";

function ShowBookings() {
  const [bookings, setBookings] = useState([]);
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    fetchBookings();
    fetchFlights();

    // Set interval to refresh data every 10 seconds
    const interval = setInterval(() => {
      fetchBookings();
      fetchFlights();
    }, 10000); // 10,000 ms = 10 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get("https://aumne-ai-4.onrender.com/bookings");
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const fetchFlights = async () => {
    try {
      const response = await axios.get("https://aumne-ai-4.onrender.com/flights");
      setFlights(response.data);
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };

  const cancelBooking = async (bookingId, flightId) => {
    const status = getStatus(flightId);
    if (status === "Completed") {
      alert("Cannot cancel booking for a completed flight.");
      return;
    }

    try {
      await axios.delete(`https://aumne-ai-4.onrender.com/bookings/${bookingId}`);
      alert("Booking cancelled");
      fetchBookings();
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("Failed to cancel booking");
    }
  };

  const getFlightDeparture = (flightId) => {
    const flight = flights.find((f) => f.id === flightId);
    return flight ? new Date(flight.departure_time) : null;
  };

  const getStatus = (flightId) => {
    const departureTime = getFlightDeparture(flightId);
    if (!departureTime) return "Unknown";
    const now = new Date();
    if (now > departureTime) return "Completed";

    const diffMs = departureTime - now;
    const diffMins = Math.floor(diffMs / 60000);
    const hours = Math.floor(diffMins / 60);
    const mins = diffMins % 60;
    return `${hours}h ${mins}m left`;
  };

  const activeBookings = bookings.filter((b) => !b.is_cancelled);
  const cancelledBookings = bookings.filter((b) => b.is_cancelled);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">🟢 Active Bookings</h2>
      <table className="table-auto w-full border mb-8">
        <thead>
          <tr>
            <th className="border px-4 py-2">Passenger Name</th>
            <th className="border px-4 py-2">Passport Number</th>
            <th className="border px-4 py-2">Flight ID</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {activeBookings.map((booking) => {
            const status = getStatus(booking.flight_id);
            return (
              <tr key={booking.id}>
                <td className="border px-4 py-2">{booking.passenger_name}</td>
                <td className="border px-4 py-2">{booking.passport_number}</td>
                <td className="border px-4 py-2">{booking.flight_id}</td>
                <td className="border px-4 py-2">{status}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => cancelBooking(booking.id, booking.flight_id)}
                    className="bg-red-500 text-white px-2 py-1 rounded disabled:opacity-50"
                    disabled={status === "Completed"}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h2 className="text-xl font-bold mb-4 text-gray-600">🔴 Cancelled Bookings</h2>
      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Passenger Name</th>
            <th className="border px-4 py-2">Passport Number</th>
            <th className="border px-4 py-2">Flight ID</th>
            <th className="border px-4 py-2">Cancelled</th>
          </tr>
        </thead>
        <tbody>
          {cancelledBookings.map((booking) => (
            <tr key={booking.id}>
              <td className="border px-4 py-2">{booking.passenger_name}</td>
              <td className="border px-4 py-2">{booking.passport_number}</td>
              <td className="border px-4 py-2">{booking.flight_id}</td>
              <td className="border px-4 py-2">Yes</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShowBookings;
