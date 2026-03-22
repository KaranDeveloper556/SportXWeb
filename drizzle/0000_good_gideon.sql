CREATE TYPE "public"."match_status" AS ENUM('schedule', 'finished', 'live');--> statement-breakpoint
CREATE TABLE "commentary" (
	"id" serial PRIMARY KEY NOT NULL,
	"matchId" integer NOT NULL,
	"minute" integer,
	"sequence" integer,
	"period" text,
	"eventType" text,
	"actor" text,
	"team" text,
	"message" text NOT NULL,
	"metaData" jsonb,
	"tags" text[],
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "matches" (
	"id" serial PRIMARY KEY NOT NULL,
	"sport" text NOT NULL,
	"homeTeam" text NOT NULL,
	"awayTeam" text NOT NULL,
	"status" "match_status" DEFAULT 'schedule' NOT NULL,
	"startTime" timestamp,
	"endTime" timestamp,
	"homeScore" integer DEFAULT 0 NOT NULL,
	"awayScore" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "commentary" ADD CONSTRAINT "commentary_matchId_matches_id_fk" FOREIGN KEY ("matchId") REFERENCES "public"."matches"("id") ON DELETE no action ON UPDATE no action;