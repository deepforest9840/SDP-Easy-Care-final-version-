import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HospitalStats = () => {
  const [hospitalStats, setHospitalStats] = useState([]);
  const [chartData, setChartData] = useState({});
  const [searchName, setSearchName] = useState("");
  const [searchArea, setSearchArea] = useState("");
  const [hospitalSuggestions, setHospitalSuggestions] = useState(["popular", "ibnsina", "square", "labaid"]); // Example suggestions
  const [areaSuggestions, setAreaSuggestions] = useState(["mirpur", "dhanmondi", "uttara", "savar", "gazipur", "chankarpul", "mohakhali"]); // Example area suggestions
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHospitalStats = async () => {
    try {
      const response = await fetch("http://localhost:9191/api/hospitalsstat/getHospitalStats");
      const data = await response.json();
      setHospitalStats(data);
      setChartData(formatChartData(data, "name", "totalPatients"));
    } catch (error) {
      setError("Failed to fetch hospital stats.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAreaStats = async (name) => {
    try {
      const response = await fetch(`http://localhost:9191/api/hospitalsstat/getAreaStats?name=${name}`);
      const data = await response.json();
      setChartData(formatChartData(data, "area", "totalPatients"));
    } catch (error) {
      setError("Failed to fetch area stats.");
    }
  };

  const fetchHospitalStatsByArea = async (area) => {
    try {
      const response = await fetch(`http://localhost:9191/api/hospitalsstat/getHospitalStatsByArea?area=${area}`);
      const data = await response.json();
      setChartData(formatChartData(data, "name", "totalPatients"));
    } catch (error) {
      setError("Failed to fetch hospital stats by area.");
    }
  };

  const formatChartData = (data, labelKey, valueKey) => {
    const total = data.reduce((sum, item) => sum + item[valueKey], 0);
    return {
      labels: data.map((item) => item[labelKey]),
      datasets: [
        {
          label: "Relative Percentage of Patients",
          data: data.map((item) => ((item[valueKey] / total) * 100).toFixed(2)),
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  useEffect(() => {
    fetchHospitalStats();
  }, []);

  const handleSearchByName = () => {
    if (searchName) {
      fetchAreaStats(searchName);
    }
  };

  const handleSearchByArea = () => {
    if (searchArea) {
      fetchHospitalStatsByArea(searchArea);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gradient-to-r from-teal-50 via-teal-50 to-teal-100 min-h-screen flex items-center justify-center p-6">
      <div className="container mx-auto">
        <h1 className="text-center text-2xl font-bold mb-6">Hospital Statistics</h1>

        {/* Search by Hospital Name */}
        <div className="mb-6 flex items-center justify-center">
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Search for a hospital (e.g., popular)"
            className="border border-gray-300 rounded-lg p-2 w-1/2"
            list="hospital-suggestions"
          />
          <datalist id="hospital-suggestions">
            {hospitalSuggestions.map((suggestion, index) => (
              <option key={index} value={suggestion} />
            ))}
          </datalist>
          <button
            onClick={handleSearchByName}
            className="ml-4 bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
          >
            Search by Hospital
          </button>
        </div>

        {/* Search by Area */}
        <div className="mb-6 flex items-center justify-center">
          <input
            type="text"
            value={searchArea}
            onChange={(e) => setSearchArea(e.target.value)}
            placeholder="Search for an area (e.g., mirpur)"
            className="border border-gray-300 rounded-lg p-2 w-1/2"
            list="area-suggestions"
          />
          <datalist id="area-suggestions">
            {areaSuggestions.map((suggestion, index) => (
              <option key={index} value={suggestion} />
            ))}
          </datalist>
          <button
            onClick={handleSearchByArea}
            className="ml-4 bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600"
          >
            Search by Area
          </button>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: { display: true, text: "Hospital Statistics Chart" },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HospitalStats;
