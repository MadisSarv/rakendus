import { eq } from 'drizzle-orm';
import express from "express";
import { db } from "./config/db.js";
import { ENV } from "./config/env.js";
import { devicesList } from "./db/schema.js";

const app = express();
const PORT = ENV.PORT || 5001;

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true });
});

app.post("/api/devices", async (req, res) => {
  try {
    const { title, spareParts, maintenance, image, repairs } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newDevice = await db
      .insert(devicesList)
      .values({
        title,
        spareParts,
        maintenance,
        image,
        repairs,
      })
      .returning();

    res.status(201).json(newDevice[0]);
  } catch (error) {
    console.log("Error adding favorite", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/api/devices/:title", async (req, res) => {
  try {
    const { title } = req.params;

    const deviceTitles = await db
      .select()
      .from(devicesList)
      .where(eq(devicesList.title, title));

    res.status(200).json(deviceTitles);
  } catch (error) {
    console.log("Error fetching the devices", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.delete("/api/devices/:title", async (req, res) => {
  try {
    const { title } = req.params;

    await db
      .delete(devicesList)
      .where(eq(devicesList.title, title));

    res.status(200).json({ message: "Device removed successfully" });
  } catch (error) {
    console.log("Error removing a device", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});


app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});