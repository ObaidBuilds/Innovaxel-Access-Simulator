import axios from "axios";
import React, { useState } from "react";
import useFetch from "./hooks/useFetch";
import EmployeeTable from "./components/tables/EmployeeTable";
import SimulateButton from "./components/buttons/SimulateButton";
import SimulationTable from "./components/tables/SimulationTable";

const App = () => {
  const [simulatedData, setSimulatedData] = useState([]);
  const [simulatedError, setSimulatedError] = useState(null);
  const [simulatedLoading, setSimulatedLoading] = useState(false);

  const { data, loading, error } = useFetch("employees");

  const handleSimulateAccess = async () => {
    setSimulatedLoading(true);
    setSimulatedError(null);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/simulate`
      );
      setSimulatedData(response.data.results);
    } catch (err) {
      setSimulatedError(err.message);
    } finally {
      setSimulatedLoading(false);
    }
  };

  const renderEmployeesTable = () => {
    if (loading)
      return <p className="text-gray-500 text-center">Loading employees...</p>;
    if (error)
      return (
        <p className="text-red-500 text-center">
          Failed to load employees. Try again.
        </p>
      );
    return <EmployeeTable employees={data} />;
  };

  const renderSimulationTable = () => {
    if (simulatedLoading)
      return <p className="text-blue-500 text-center">Simulating access...</p>;
    if (simulatedError)
      return <p className="text-red-500 text-center">{simulatedError}</p>;
    if (simulatedData.length > 0)
      return <SimulationTable employees={simulatedData} />;
    return null;
  };

  return (
    <div className="w-full min-h-screen flex flex-col gap-8 justify-center items-center bg-gray-50 py-10">
      {/* Header */}
      <div className="w-[80%] flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-xl font-extrabold text-blue-600">
          Employee Access Simulator
        </h1>
        <SimulateButton
          onClick={handleSimulateAccess}
          loading={simulatedLoading}
        />
      </div>

      {/* Employees Table */}
      <div className="w-11/12 md:w-4/5">
        {simulatedData.length === 0 && renderEmployeesTable()}
      </div>

      {/* Simulation Results */}
      <div className="w-11/12 md:w-4/5">{renderSimulationTable()}</div>
    </div>
  );
};

export default App;
