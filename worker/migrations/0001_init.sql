CREATE TABLE IF NOT EXISTS candidates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  alt_phone TEXT,
  resume_key TEXT,
  resume_filename TEXT,
  experience_range TEXT NOT NULL,
  category TEXT NOT NULL,        -- 'IT' | 'Non-IT'
  role TEXT NOT NULL,            -- selected role within category (or free-text if "Other")
  description TEXT,
  current_compensation TEXT,
  expected_compensation TEXT,
  notice_period TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS recruiters (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company_name TEXT NOT NULL,
  job_title TEXT NOT NULL,
  category TEXT NOT NULL,        -- 'IT' | 'Non-IT'
  role TEXT NOT NULL,            -- selected role within category (or free-text if "Other")
  compensation_range TEXT,
  additional_info TEXT,
  jd_keys TEXT,                  -- JSON array of {key, filename} for uploaded JDs
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_candidates_created_at ON candidates(created_at);
CREATE INDEX IF NOT EXISTS idx_recruiters_created_at ON recruiters(created_at);
