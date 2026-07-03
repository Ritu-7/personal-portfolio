/*
# Portfolio backend schema (Ritika's portfolio)

1. Overview
This migration creates the full backend for a personal portfolio + admin dashboard.
- Public visitors can read published content (projects, skills, experience, certifications) and submit contact messages.
- An authenticated admin (Supabase email/password auth) can manage all content via CRUD.
- Analytics track visits, contact requests, and resume downloads.

2. New Tables
- `contacts` — messages submitted via the contact form (name, email, subject, message, read flag, created_at).
- `projects` — portfolio projects (title, category, description, image, features[], tech[], github, demo, featured, published, sort_order).
- `skills` — skill groups (category, icon, color, items jsonb, published, sort_order).
- `experience` — career timeline entries (role, company, period, location, description, achievements[], tags[], published, sort_order).
- `certifications` — certificates (title, org, date, credential_id, verify_url, published, sort_order).
- `analytics` — event tracking (event_type, path, metadata jsonb, created_at).

3. Security (RLS)
- `contacts`: public INSERT (anyone can submit), admin SELECT/UPDATE/DELETE only.
- `projects`, `skills`, `experience`, `certifications`: public SELECT on published rows; admin full CRUD.
- `analytics`: public INSERT (log events), admin SELECT only.
- Admin = authenticated Supabase user. No per-user ownership needed (single admin portfolio).

4. Notes
- Uses `auth.uid()` for admin checks (authenticated role).
- `published` boolean defaults to true so seeded content is visible immediately.
- `sort_order` integer for manual ordering in the admin dashboard.
*/

-- Contacts
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL DEFAULT 'General Inquiry',
  message text NOT NULL,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_contacts" ON contacts;
CREATE POLICY "public_insert_contacts" ON contacts FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_select_contacts" ON contacts;
CREATE POLICY "admin_select_contacts" ON contacts FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "admin_update_contacts" ON contacts;
CREATE POLICY "admin_update_contacts" ON contacts FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_contacts" ON contacts;
CREATE POLICY "admin_delete_contacts" ON contacts FOR DELETE
  TO authenticated USING (true);

-- Projects
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL DEFAULT 'Full Stack',
  description text NOT NULL,
  image text,
  features text[] DEFAULT '{}',
  tech text[] DEFAULT '{}',
  github text,
  demo text,
  featured boolean NOT NULL DEFAULT false,
  published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_projects" ON projects;
CREATE POLICY "public_select_projects" ON projects FOR SELECT
  TO anon, authenticated USING (published = true);

DROP POLICY IF EXISTS "admin_insert_projects" ON projects;
CREATE POLICY "admin_insert_projects" ON projects FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_projects" ON projects;
CREATE POLICY "admin_update_projects" ON projects FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_projects" ON projects;
CREATE POLICY "admin_delete_projects" ON projects FOR DELETE
  TO authenticated USING (true);

-- Skills
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  icon text NOT NULL DEFAULT 'wrench',
  color text NOT NULL DEFAULT 'from-brand-400 to-accent-400',
  items jsonb NOT NULL DEFAULT '[]',
  published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_skills" ON skills;
CREATE POLICY "public_select_skills" ON skills FOR SELECT
  TO anon, authenticated USING (published = true);

DROP POLICY IF EXISTS "admin_insert_skills" ON skills;
CREATE POLICY "admin_insert_skills" ON skills FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_skills" ON skills;
CREATE POLICY "admin_update_skills" ON skills FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_skills" ON skills;
CREATE POLICY "admin_delete_skills" ON skills FOR DELETE
  TO authenticated USING (true);

-- Experience
CREATE TABLE IF NOT EXISTS experience (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role text NOT NULL,
  company text NOT NULL,
  period text NOT NULL,
  location text NOT NULL DEFAULT 'Remote',
  description text NOT NULL,
  achievements text[] DEFAULT '{}',
  tags text[] DEFAULT '{}',
  published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_experience" ON experience;
CREATE POLICY "public_select_experience" ON experience FOR SELECT
  TO anon, authenticated USING (published = true);

DROP POLICY IF EXISTS "admin_insert_experience" ON experience;
CREATE POLICY "admin_insert_experience" ON experience FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_experience" ON experience;
CREATE POLICY "admin_update_experience" ON experience FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_experience" ON experience;
CREATE POLICY "admin_delete_experience" ON experience FOR DELETE
  TO authenticated USING (true);

-- Certifications
CREATE TABLE IF NOT EXISTS certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  org text NOT NULL,
  date text NOT NULL,
  credential_id text,
  verify_url text,
  published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_certifications" ON certifications;
CREATE POLICY "public_select_certifications" ON certifications FOR SELECT
  TO anon, authenticated USING (published = true);

DROP POLICY IF EXISTS "admin_insert_certifications" ON certifications;
CREATE POLICY "admin_insert_certifications" ON certifications FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_certifications" ON certifications;
CREATE POLICY "admin_update_certifications" ON certifications FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_certifications" ON certifications;
CREATE POLICY "admin_delete_certifications" ON certifications FOR DELETE
  TO authenticated USING (true);

-- Analytics
CREATE TABLE IF NOT EXISTS analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  path text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_analytics" ON analytics;
CREATE POLICY "public_insert_analytics" ON analytics FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_select_analytics" ON analytics;
CREATE POLICY "admin_select_analytics" ON analytics FOR SELECT
  TO authenticated USING (true);

-- Indexes for dashboard queries
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics (event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_sort_order ON projects (sort_order);
