import { useState } from "react";
import { bookFlight } from "../api/api";

export default function BookingForm({ flight }) {
  const [passengerName, setPassengerName] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const validatePassport = (passport) => /^[A-Z][0-9]{7}$/.test(passport);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!validatePassport(passportNumber)) {
      setError("❌ Invalid passport format. Expected: A1234567");
      return;
    }

    try {
      const response = await bookFlight(flight.id, {
        passenger_name: passengerName,
        passport_number: passportNumber,
      });
      setMessage(`✅ Booking confirmed! Booking ID: ${response.data.id}`);
      setPassengerName("");
      setPassportNumber("");
    } catch (err) {
      console.error(err);
      const detail = err?.response?.data?.detail;
      setError(`❌ Booking failed: ${detail || "Unknown error occurred."}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-4 rounded shadow max-w-md"
    >
      {(message || error) && (
        <p
          className={`text-sm text-center ${
            error ? "text-red-600" : "text-green-600"
          }`}
        >
          {message || error}
        </p>
      )}

      <input
        type="text"
        placeholder="Passenger Name"
        value={passengerName}
        onChange={(e) => setPassengerName(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Passport Number (e.g., A1234567)"
        value={passportNumber}
        onChange={(e) => setPassportNumber(e.target.value.toUpperCase())}
        required
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Confirm Booking
      </button>
    </form>
  );
}
