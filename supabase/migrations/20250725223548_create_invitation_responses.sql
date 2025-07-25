-- Create invitation_responses table
CREATE TABLE invitation_responses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  attendance VARCHAR(20) NOT NULL CHECK (attendance IN ('attending', 'not_attending')),
  guest_count INTEGER DEFAULT 1,
  dietary_restrictions TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better query performance
CREATE INDEX idx_invitation_responses_email ON invitation_responses(email);
CREATE INDEX idx_invitation_responses_attendance ON invitation_responses(attendance);
CREATE INDEX idx_invitation_responses_created_at ON invitation_responses(created_at);

-- Add comment to table
COMMENT ON TABLE invitation_responses IS 'Wedding invitation responses table';