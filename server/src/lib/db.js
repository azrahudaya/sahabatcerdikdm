import pg from "pg";

const { Pool } = pg;

const ssl =
  process.env.DATABASE_SSL === "true"
    ? {
        rejectUnauthorized: false
      }
    : false;
const connectionString =
  process.env.DATABASE_URL ||
  "postgres://sahabat:sahabat_dev_password@localhost:5432/sahabat_cerdik_dm";

export const pool = new Pool({
  connectionString,
  ssl
});

export async function initializeDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id uuid PRIMARY KEY,
      name varchar(120) NOT NULL,
      email varchar(254),
      phone varchar(32),
      preferred_phase_slug varchar(80),
      email_verified_at timestamptz,
      auth_version integer NOT NULL DEFAULT 0,
      password_hash text NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now()
    );

    ALTER TABLE users
      ADD COLUMN IF NOT EXISTS preferred_phase_slug varchar(80);

    ALTER TABLE users
      ADD COLUMN IF NOT EXISTS email_verified_at timestamptz;

    ALTER TABLE users
      ADD COLUMN IF NOT EXISTS auth_version integer NOT NULL DEFAULT 0;

    CREATE UNIQUE INDEX IF NOT EXISTS users_email_unique
      ON users (lower(email))
      WHERE email IS NOT NULL;

    CREATE UNIQUE INDEX IF NOT EXISTS users_phone_unique
      ON users (phone)
      WHERE phone IS NOT NULL;

    CREATE TABLE IF NOT EXISTS account_action_tokens (
      id uuid PRIMARY KEY,
      user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      type varchar(40) NOT NULL,
      token_hash char(64) NOT NULL UNIQUE,
      target_email varchar(254),
      expires_at timestamptz NOT NULL,
      used_at timestamptz,
      created_at timestamptz NOT NULL DEFAULT now()
    );

    CREATE INDEX IF NOT EXISTS account_action_tokens_lookup_idx
      ON account_action_tokens (token_hash, type, expires_at)
      WHERE used_at IS NULL;

    CREATE TABLE IF NOT EXISTS screening_results (
      id uuid PRIMARY KEY,
      user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      idempotency_key uuid,
      payload jsonb NOT NULL,
      risk_score integer NOT NULL,
      result_title varchar(120) NOT NULL,
      result_tone varchar(40) NOT NULL,
      result_estimate varchar(120),
      bmi numeric(5, 2),
      waist numeric(5, 2),
      created_at timestamptz NOT NULL DEFAULT now()
    );

    ALTER TABLE screening_results
      ADD COLUMN IF NOT EXISTS idempotency_key uuid;

    CREATE INDEX IF NOT EXISTS screening_results_user_created_idx
      ON screening_results (user_id, created_at DESC);

    CREATE UNIQUE INDEX IF NOT EXISTS screening_results_user_idempotency_unique
      ON screening_results (user_id, idempotency_key);

    CREATE TABLE IF NOT EXISTS evaluation_results (
      id uuid PRIMARY KEY,
      user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      type varchar(40) NOT NULL,
      answers jsonb NOT NULL,
      score integer NOT NULL,
      total integer NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now()
    );

    CREATE INDEX IF NOT EXISTS evaluation_results_user_created_idx
      ON evaluation_results (user_id, created_at DESC);

    CREATE TABLE IF NOT EXISTS whatsapp_reminders (
      id uuid PRIMARY KEY,
      user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      name varchar(80),
      phone varchar(32) NOT NULL,
      time char(5) NOT NULL,
      focus varchar(180) NOT NULL,
      days jsonb NOT NULL DEFAULT '[]'::jsonb,
      enabled boolean NOT NULL DEFAULT true,
      last_sent_date varchar(10),
      last_sent_at timestamptz,
      last_error text,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now()
    );

    CREATE INDEX IF NOT EXISTS whatsapp_reminders_user_created_idx
      ON whatsapp_reminders (user_id, created_at DESC);

    CREATE INDEX IF NOT EXISTS whatsapp_reminders_due_idx
      ON whatsapp_reminders (enabled, time);

    CREATE TABLE IF NOT EXISTS feedback_entries (
      id uuid PRIMARY KEY,
      user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      topics jsonb NOT NULL DEFAULT '[]'::jsonb,
      satisfaction varchar(80) NOT NULL,
      message text,
      created_at timestamptz NOT NULL DEFAULT now()
    );

    CREATE INDEX IF NOT EXISTS feedback_entries_user_created_idx
      ON feedback_entries (user_id, created_at DESC);
  `);
}

export function query(text, params) {
  return pool.query(text, params);
}
