import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFlights } from "../api/api";

export default function FlightList() {
  const [flights, setFlights] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getFlights()
      .then((res) => setFlights(res.data))
      .catch((err) => console.error("Failed to fetch flights", err));
  }, []);

  const handleBook = (flight) => {
    navigate("/booking", { state: { flight } });
  };

  const now = new Date();

  const upcomingFlights = flights.filter(
    (flight) => new Date(flight.departure_time) > now
  );
  const departedFlights = flights.filter(
    (flight) => new Date(flight.departure_time) <= now
  );

  const renderFlight = (flight, isDeparted = false) => (
    <li key={flight.id} className="border p-4 my-3 rounded shadow-md">
      <div>
        <strong>{flight.airline}</strong> - {flight.flight_number}
      </div>
      <div>
        <span className="font-medium">Flight ID:</span> {flight.id}
      </div>
      <div>
        <span className="font-medium">Route:</span> {flight.departure} ➡️ {flight.destination}
      </div>
      <div>
        <span className="font-medium">Departure Time:</span>{" "}
        {new Date(flight.departure_time).toLocaleString()}
      </div>
      <div>
        <span className="font-medium">Available Seats:</span>{" "}
        {flight.available_seats}
      </div>
      {!isDeparted && (
        <button
          className={`mt-3 px-4 py-2 text-white rounded ${
            flight.available_seats > 0
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={flight.available_seats <= 0}
          onClick={() => handleBook(flight)}
        >
          Book
        </button>
      )}
    </li>
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">🛫 Upcoming Flights</h2>
      {upcomingFlights.length > 0 ? (
        <ul>{upcomingFlights.map((flight) => renderFlight(flight))}</ul>
      ) : (
        <p>No upcoming flights available.</p>
      )}

      <h2 className="text-xl font-bold mt-8 mb-4 text-gray-600">🛬 Departed Flights</h2>
      {departedFlights.length > 0 ? (
        <ul>{departedFlights.map((flight) => renderFlight(flight, true))}</ul>
      ) : (
        <p>No departed flights yet.</p>
      )}
    </div>
  );
}
