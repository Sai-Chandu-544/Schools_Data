import pool from "@/config/db";

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM schools");
    return Response.json(rows);
  } catch (err) {
    console.error("DB Connection Error:", err);
    return Response.json({ error: "DB connection failed", details: err.message }, { status: 500 });
  }
}
