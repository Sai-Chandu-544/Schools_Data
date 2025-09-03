"use client";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-3xl font-bold mb-6">Welcome to School Management Portal</h1>
      <p className="text-gray-600 mb-10">
        Manage schools by adding and viewing their details.
      </p>
      <div className="flex gap-6">
        <Link
          href="/add_schools"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          ➕ Add School
        </Link>
        <Link
          href="/get_schools"
          className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          📚 Show Schools
        </Link>
      </div>
    </div>
  );
}
