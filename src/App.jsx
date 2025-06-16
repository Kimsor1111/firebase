import { useEffect, useState } from "react";
import { db, ref, onValue, set } from "./firebase";

function App() {
  const [temperature, setTemperature] = useState("--");
  const [humidity, setHumidity] = useState("--");
  const [ledStatus, setLedStatus] = useState("--");

  const ledRef = ref(db, "led/status");

  const toggleLed = () => {
    const newStatus = ledStatus === "on" ? "off" : "on";
    set(ledRef, newStatus);
  };

  useEffect(() => {
    const tempRef = ref(db, "temp");
    const humRef = ref(db, "hum");

    onValue(tempRef, (snapshot) => {
      setTemperature(snapshot.val());
    });

    onValue(humRef, (snapshot) => {
      setHumidity(snapshot.val());
    });

    onValue(ledRef, (snapshot) => {
      setLedStatus(snapshot.val());
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-md p-8 max-w-sm w-full text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-700">
          🌡️ IoT Dashboard
        </h1>

        <div className="mb-6">
          <p className="text-lg font-semibold">Temperature:</p>
          <p className="text-3xl text-blue-500">{temperature} °C</p>
        </div>

        <div className="mb-6">
          <p className="text-lg font-semibold">Humidity:</p>
          <p className="text-3xl text-green-500">{humidity} %</p>
        </div>

        <div className="mb-6">
          <p className="text-lg font-semibold">LED Status:</p>
          <p
            className={`text-2xl ${
              ledStatus === "on" ? "text-yellow-500" : "text-gray-500"
            }`}
          >
            {ledStatus === "on" ? "On 💡" : "Off 🔌"}
          </p>
        </div>

        <button
          onClick={toggleLed}
          className={`px-6 py-2 rounded-xl text-white font-semibold shadow transition ${
            ledStatus === "on"
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          Turn {ledStatus === "on" ? "Off" : "On"} LED
        </button>
      </div>
    </div>
  );
}

export default App;
