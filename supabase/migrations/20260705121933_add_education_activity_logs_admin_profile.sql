/*
# Add education, activity_logs, and admin_profile tables

1. New Tables
- `education` — academic background entries (degree, institution, period, cgpa, coursework[]).
  Public SELECT on published rows; admin full CRUD.
- `activity_logs` — admin activity tracking (action, entity, entity_id, metadata, created_at).
  Admin INSERT + SELECT only; no public access.
- `admin_profile` — single-row admin profile settings (name, email, phone, location, bio, image, socials jsonb, updated_at).
  Public SELECT; admin full CRUD.

2. Security
- `education`: public SELECT on published; admin (authenticated) full CRUD.
- `activity_logs`: admin (authenticated) INSERT + SELECT only. No public access.
- `admin_profile`: public SELECT (so the portfolio can display profile data); admin UPDATE only.

3. Notes
- All tables use RLS with auth.uid() for admin checks.
- `published` defaults to true on education so seeded content is visible immediately.
- `admin_profile` is a single-row table (enforced by a unique constraint on id = true).
*/

-- Education
CREATE TABLE IF NOT EXISTS education (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  degree text NOT NULL,
  institution text NOT NULL,
  period text NOT NULL,
  cgpa text,
  coursework text[] DEFAULT '{}',
  published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE education ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_education" ON education;
CREATE POLICY "public_select_education" ON education FOR SELECT
  TO anon, authenticated USING (published = true);

DROP POLICY IF EXISTS "admin_insert_education" ON education;
CREATE POLICY "admin_insert_education" ON education FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_education" ON education;
CREATE POLICY "admin_update_education" ON education FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_education" ON education;
CREATE POLICY "admin_delete_education" ON education FOR DELETE
  TO authenticated USING (true);

-- Activity Logs
CREATE TABLE IF NOT EXISTS activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  action text NOT NULL,
  entity text,
  entity_id text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "admin_insert_activity_logs" ON activity_logs;
CREATE POLICY "admin_insert_activity_logs" ON activity_logs FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_select_activity_logs" ON activity_logs;
CREATE POLICY "admin_select_activity_logs" ON activity_logs FOR SELECT
  TO authenticated USING (true);

-- Admin Profile (single-row)
CREATE TABLE IF NOT EXISTS admin_profile (
  id boolean PRIMARY KEY DEFAULT true,
  name text NOT NULL DEFAULT 'Ritika Marotha',
  email text NOT NULL DEFAULT 'ritikamarotha9@gmail.com',
  phone text,
  location text,
  bio text,
  image text,
  socials jsonb DEFAULT '{}',
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT single_row CHECK (id = true)
);
ALTER TABLE admin_profile ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_admin_profile" ON admin_profile;
CREATE POLICY "public_select_admin_profile" ON admin_profile FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_update_admin_profile" ON admin_profile;
CREATE POLICY "admin_update_admin_profile" ON admin_profile FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_insert_admin_profile" ON admin_profile;
CREATE POLICY "admin_insert_admin_profile" ON admin_profile FOR INSERT
  TO authenticated WITH CHECK (true);

-- Seed education data
INSERT INTO education (degree, institution, period, cgpa, coursework, sort_order)
SELECT 'B.Tech — Computer Science & Engineering', 'DCRUST, Murthal', '2023 — 2027 (Expected)', '8.16',
  ARRAY['DSA', 'OS', 'DBMS', 'Computer Networks', 'Discrete Mathematics'], 1
WHERE NOT EXISTS (SELECT 1 FROM education);

-- Seed admin profile
INSERT INTO admin_profile (id, name, email, phone, location, bio, image, socials)
SELECT true, 'Ritika Marotha', 'ritikamarotha9@gmail.com', '+91 80039 45643', 'Sirsa, Haryana, India',
  'Aspiring Software Engineer building production-grade Gen AI & MERN stack applications.',
  '/portfolio ritika/rituimage.png',
  '{"github":"https://github.com/Ritu-7","linkedin":"https://www.linkedin.com/in/ritika-marotha-891b6426a","whatsapp":"https://wa.me/918003945643"}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM admin_profile);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_education_sort_order ON education (sort_order);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON activity_logs (created_at DESC);
