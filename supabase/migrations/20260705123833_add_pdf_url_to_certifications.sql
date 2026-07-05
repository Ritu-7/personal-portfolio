/*
# Add pdf_url column to certifications

1. Changes
- Add `pdf_url` (text, nullable) to `certifications` to store the path to a PDF certificate file in /public.
- Backfill existing rows with NULL (no PDF for the AI Azure cert yet).

2. Security
- No policy changes. The column is covered by existing public SELECT (published) and admin CRUD policies.

3. Notes
- `pdf_url` is nullable so certificates without a PDF still render normally.
- The frontend uses this to show "View Certificate" (open PDF in new tab) and "Download Certificate" buttons.
*/

ALTER TABLE certifications ADD COLUMN IF NOT EXISTS pdf_url text;

-- Insert the 4 PDF certificates found in /public
INSERT INTO certifications (title, org, date, pdf_url, published, sort_order)
SELECT 'Certificate of Completion', 'Unknown', 'Unknown', '/certificate_(3).pdf', true, 2
WHERE NOT EXISTS (SELECT 1 FROM certifications WHERE pdf_url = '/certificate_(3).pdf');

INSERT INTO certifications (title, org, date, pdf_url, published, sort_order)
SELECT 'Future Bytes', 'Unknown', 'Unknown', '/Future_Bytes.pdf', true, 3
WHERE NOT EXISTS (SELECT 1 FROM certifications WHERE pdf_url = '/Future_Bytes.pdf');

INSERT INTO certifications (title, org, date, pdf_url, published, sort_order)
SELECT 'Student Certificate', 'Unknown', 'Unknown', '/STU67ebf5261fc411743516966_(1).pdf', true, 4
WHERE NOT EXISTS (SELECT 1 FROM certifications WHERE pdf_url = '/STU67ebf5261fc411743516966_(1).pdf');

INSERT INTO certifications (title, org, date, pdf_url, published, sort_order)
SELECT 'Tata Crucible Prelims — Level 1', 'Tata Group', 'Unknown', '/Tata_Cruible_Prelims_Level1.pdf', true, 5
WHERE NOT EXISTS (SELECT 1 FROM certifications WHERE pdf_url = '/Tata_Cruible_Prelims_Level1.pdf');
