DROP TABLE IF EXISTS recruiter_files;
DROP TABLE IF EXISTS recruiters;
DROP TABLE IF EXISTS candidates;

CREATE TABLE candidates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  alt_phone TEXT,
  resume_filename TEXT,
  resume_content_type TEXT,
  resume_blob BLOB,
  experience_range TEXT NOT NULL,
  category TEXT NOT NULL,        -- 'IT' | 'Non-IT'
  role TEXT NOT NULL,            -- selected role within category (or free-text if "Other")
  description TEXT,
  current_compensation TEXT,
  expected_compensation TEXT,
  notice_period TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE recruiters (
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
  created_at TEXT NOT NULL
);

-- One row per uploaded JD (a recruiter submission can have up to 5)
CREATE TABLE recruiter_files (
  id TEXT PRIMARY KEY,
  recruiter_id TEXT NOT NULL REFERENCES recruiters(id),
  filename TEXT NOT NULL,
  content_type TEXT,
  blob BLOB NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX idx_candidates_created_at ON candidates(created_at);
CREATE INDEX idx_recruiters_created_at ON recruiters(created_at);
CREATE INDEX idx_recruiter_files_recruiter_id ON recruiter_files(recruiter_id);
