import { useLocation, useNavigate } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import FlightList from "../components/FlightList";

export default function Book() {
  const location = useLocation();
  const navigate = useNavigate();
  const flight = location.state?.flight || null;

  if (!flight) {
    // No flight in state? Show flight list and redirect user back if needed
    return <FlightList />;
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate(-1)} // go back
        className="text-blue-600 underline"
      >
        ← Back to Flights
      </button>
      <h2 className="text-2xl font-bold mb-2">
        Booking for {flight.airline} — {flight.flight_number}
      </h2>
      <BookingForm flight={flight} />
    </div>
  );
}
