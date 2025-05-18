import FlightList from "../components/FlightList";

export default function Home() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Available Flights</h2>
      <FlightList onBook={() => {}} />
    </div>
  );
}
