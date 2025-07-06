CREATE TABLE "devices" (
	"device_id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"spare_parts" text,
	"maintenance" text,
	"image" text,
	"repairs" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "maintenances" (
	"maintenance_id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"to_do" text,
	"text" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "repairs" (
	"repair_id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"image" text,
	"text" text,
	"created_at" timestamp DEFAULT now()
);
