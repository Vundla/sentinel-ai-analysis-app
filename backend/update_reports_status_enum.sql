-- Add 'new' and 'analyzing' to the status enum in reports table
ALTER TABLE reports 
ALTER COLUMN status VARCHAR(20) NOT NULL;

ALTER TABLE reports
ADD CONSTRAINT chk_status CHECK (status IN ('new','analyzing','pending','reviewed','actioned'));

ALTER TABLE reports 
ADD CONSTRAINT df_status DEFAULT 'new' FOR status;
