import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import pool from "@/config/db";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("imageFile");

    if (!file) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to Cloudinary
    const uploadRes = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "schoolImages" }, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        })
        .end(buffer);
    });

    // Get other fields
    const name = formData.get("name");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const contact = formData.get("contact");
    const email_id = formData.get("email_id");

    if (!name || !address || !city || !state || !contact || !email_id) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Save into MySQL
    const query = `
      INSERT INTO schools (name, address, city, state, contact, image, email_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      name,
      address,
      city,
      state,
      contact,
      uploadRes.secure_url, // ✅ Cloudinary URL
      email_id,
    ];

    const [result] = await pool.execute(query, values);

    return NextResponse.json(
      {
        message: "School added successfully",
        id: result.insertId,
        imageUrl: uploadRes.secure_url,
      },
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
