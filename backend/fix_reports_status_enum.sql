-- MySQL/MariaDB syntax for modifying ENUM column
ALTER TABLE reports
ALTER COLUMN status VARCHAR(20) NOT NULL;
ALTER TABLE reports
ADD CONSTRAINT DF_reports_status DEFAULT 'new' FOR status;

ALTER TABLE reports
ADD CONSTRAINT chk_status CHECK (status IN ('new','analyzing','pending','reviewed','actioned'));
