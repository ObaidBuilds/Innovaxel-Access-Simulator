import React from "react";
import { simulateTableHead } from "../../constants";

const SimulationTable = ({ employees }) => {
  return (
    <div id="overflow" className="overflow-x-auto">
      <table className="sm:min-w-[80vw] text-left table-auto border-collapse text-sm whitespace-nowrap rounded-md">
        <thead>
          <tr className="bg-[#2C4A77] text-white">
            {simulateTableHead.map((header, i) => (
              <th key={i} className="py-3 px-4 border-b border-[#6b7280]">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className="odd:bg-gray-200 hover:bg-gray-300">
              <td className="py-3 px-4 border-b border-secondary">
                {employee.id}
              </td>
              <td className="py-3 px-10 border-b border-secondary">
                {employee.access_level}
              </td>
              <td className="py-3 px-4 border-b border-secondary">
                {employee.request_time}
              </td>
              <td className="py-3 px-4 border-b border-secondary">
                {employee.room}
              </td>
              <td className="py-3 px-4 border-b border-secondary">
                {employee.status}
              </td>
              <td className="text-center py-3 px-4 border-b border-secondary">
                {employee.reason}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SimulationTable;
