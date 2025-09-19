import React, { useState } from "react";
import axios from "axios";
import useFetch from "./hooks/useFetch";
import EmployeeTable from "./components/tables/EmployeeTable";
import SimulateButton from "./components/buttons/SimulateButton";
import SimulationTable from "./components/tables/SimulationTable";

const App = () => {
  const [simulatedData, setSimulatedData] = useState([]);
  const [simulatedLoading, setSimulatedLoading] = useState(false);
  const [simulatedError, setSimulatedError] = useState(null);

  const { data, loading, error } = useFetch("employees");

  async function handleSimulateAccess() {
    try {
      setSimulatedLoading(true);
      setSimulatedError(null);

      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/simulate`
      );

      setSimulatedData(data.results || []);
    } catch (err) {
      console.error("Simulation failed:", err.message);
      setSimulatedError("Failed to simulate access. Please try again.");
    } finally {
      setSimulatedLoading(false);
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col gap-8 justify-center items-center bg-gray-50 py-10">
      <h1 className="text-2xl font-extrabold text-blue-600">
        Innovaxel Access Simulator
      </h1>

      {/* Employees Table */}
      <div className="w-11/12 md:w-4/5">
        {loading ? (
          <p className="text-gray-500 text-center">Loading employees...</p>
        ) : error ? (
          <p className="text-red-500 text-center">
            Failed to load employees. Try again.
          </p>
        ) : (
          <EmployeeTable employees={data} />
        )}
      </div>

      {/* Simulate Button */}
      <SimulateButton
        onClick={handleSimulateAccess}
        loading={simulatedLoading}
      />

      {/* Simulation Results */}
      <div className="w-11/12 md:w-4/5">
        {simulatedLoading && (
          <p className="text-blue-500 text-center">Simulating access...</p>
        )}

        {simulatedError && (
          <p className="text-red-500 text-center">{simulatedError}</p>
        )}

        {simulatedData.length > 0 && (
          <SimulationTable employees={simulatedData} />
        )}
      </div>
    </div>
  );
};

export default App;
