"use client";
import { useEffect, useState } from "react";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
   const fetchSchools = async () => {
  try {
    const res = await fetch("/api/get_schools");

    const text = await res.text(); // Get raw response
    if (!text) throw new Error("No data returned from API");

    let data;
    try {
      data = JSON.parse(text); // Try parsing JSON
    } catch {
      throw new Error("Invalid JSON response from API");
    }

    if (!res.ok || data.error) {
      throw new Error(data.error || "Failed to fetch schools");
    }

    setSchools(data);
  } catch (err) {
    console.error(err);
    setError(err.message || "Something went wrong");
  }
};


    fetchSchools(); // Call inside useEffect
  }, []); // Empty dependency array = run only once on mount

  return (
    <div className="max-w-6xl mx-auto p-4">
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {schools.map((school) => (
          <div key={school.id} className="border rounded shadow p-4 bg-white">
            <img
              src={school.image}
              alt={school.name}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h3 className="text-lg font-bold">{school.name}</h3>
            <p className="text-gray-600">{school.address}, {school.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
