import { jsonb, pgEnum, pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const matchStatusEnum = pgEnum('match_status', ['schedule', 'finished', 'live']);

export const matches = pgTable('matches', {
    id: serial('id').primaryKey(),
    sport: text('sport').notNull(),
    homeTeam: text('homeTeam').notNull(),
    awayTeam: text('awayTeam').notNull(),
    status: matchStatusEnum('status').notNull().default('schedule'),
    startTime: timestamp('startTime'),
    endTime: timestamp('endTime'),
    homeScore: integer('homeScore').notNull().default(0),
    awayScore: integer('awayScore').notNull().default(0),
    createdAt: timestamp('createdAt').notNull().defaultNow()
})

export const commentary = pgTable('commentary', {
    id: serial('id').primaryKey(),
    matchId: integer('matchId').notNull().references(() => matches.id),
    minute: integer('minute'),
    sequence: integer('sequence'),
    period: text('period'),
    eventType: text('eventType'),
    actor: text('actor'),
    team: text('team'),
    message: text('message').notNull(),
    metaData: jsonb('metaData'),
    tags: text('tags').array(),
    createdAt: timestamp('createdAt').notNull().defaultNow()
})