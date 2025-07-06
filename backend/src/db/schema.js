import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const devicesList = pgTable("devices", {
    deviceId: serial("device_id").primaryKey(),
    title: text("title").notNull(),
    spareParts: text("spare_parts"),
    maintenance: text("maintenance"),
    image: text("image"),
    repairs: text("repairs"),
    createdAt: timestamp("created_at").defaultNow(),
});

export const maintenanceList = pgTable("maintenances", {
    maintenanceId: serial("maintenance_id").primaryKey(),
    title: text("title").notNull(),
    toDo: text("to_do"),
    text: text("text"),
    createdAt: timestamp("created_at").defaultNow(),
});

export const repairList = pgTable("repairs", {
    repairId: serial("repair_id").primaryKey(),
    title: text("title").notNull(),
    image: text("image"),
    text: text("text"),
    createdAt: timestamp("created_at").defaultNow(),
});