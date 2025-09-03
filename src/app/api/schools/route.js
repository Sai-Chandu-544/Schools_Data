import { NextResponse } from "next/server";
import pool from "@/config/db";   // corrected import
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const contact = formData.get("contact");
    const email_id = formData.get("email_id");
    const imageFile = formData.get("imageFile");

    if (!name || !address || !city || !state || !contact || !email_id || !imageFile) {
      return NextResponse.json(
        { error: "All fields are required including image." },
        { status: 400 }
      );
    }

    // ✅ Ensure upload folder exists
    const uploadDir = path.join(process.cwd(), "public", "schoolImages");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // ✅ Save uploaded image
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const filename = `${Date.now()}-${imageFile.name}`;
    const filepath = path.join(uploadDir, filename);
    fs.writeFileSync(filepath, buffer);
    const imagePath = `/schoolImages/${filename}`;

    // ✅ Insert into DB
    const query = `
      INSERT INTO schools (name, address, city, state, contact, image, email_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [name, address, city, state, contact, imagePath, email_id];

    const [result] = await pool.execute(query, values);

    return NextResponse.json(
      { message: "School added successfully", id: result.insertId },
      { status: 201 }
    );
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: "Upload failed", details: err.message },
      { status: 500 }
    );
  }
}
