import CancelBookingForm from "../components/CancelBookingForm";

export default function Cancel() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Cancel a Ticket</h2>
      <CancelBookingForm />
    </div>
  );
}
