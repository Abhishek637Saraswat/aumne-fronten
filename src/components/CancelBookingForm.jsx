import { useState } from "react";
import { cancelBooking } from "../api/api";

export default function CancelBookingForm() {
  const [bookingId, setBookingId] = useState("");
  const [message, setMessage] = useState("");

  const handleCancel = async () => {
    try {
      await cancelBooking(bookingId);
      setMessage("✅ Booking cancelled successfully.");
    } catch (err) {
      setMessage(`❌ Cancellation failed: ${err.response?.data?.detail || "Unknown error"}`);
    }
  };

  return (
    <div className="p-4 border rounded mt-4">
      <h3>Cancel Booking</h3>
      <input className="block my-2 border p-1" placeholder="Booking ID" onChange={e => setBookingId(e.target.value)} />
      <button className="bg-red-500 text-white px-4 py-1" onClick={handleCancel}>Cancel Booking</button>
      <div className="mt-2">{message}</div>
    </div>
  );
}
