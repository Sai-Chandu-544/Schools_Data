"use client";
import React, { useState } from "react";

export default function AddSchool() {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    // Create FormData
    const formData = new FormData(form);

    // Basic check for required fields
    const requiredFields = ["name", "address", "city", "state", "contact", "email_id", "imageFile"];
    for (const field of requiredFields) {
      if (!formData.get(field)) {
        setMessage(`Please fill the ${field} field`);
        return;
      }
    }

    try {
      const res = await fetch("/api/schools", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      setMessage(result.message || result.error || "Something went wrong");

      if (res.ok) form.reset(); // Clear form on success
    } catch (err) {
      console.error(err);
      setMessage("Upload failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Add School</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="School Name" required className="w-full border p-2 rounded" />
        <input name="address" placeholder="Address" required className="w-full border p-2 rounded" />
        <input name="city" placeholder="City" required className="w-full border p-2 rounded" />
        <input name="state" placeholder="State" required className="w-full border p-2 rounded" />
        <input name="contact" type="number" placeholder="Contact" required className="w-full border p-2 rounded" />
        <input name="email_id" type="email" placeholder="Email" required className="w-full border p-2 rounded" />
        <input name="imageFile" type="file" accept="image/*" required className="w-full border p-2 rounded" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
      </form>
      {message && <p className="mt-3 text-green-600">{message}</p>}
    </div>
  );
}
