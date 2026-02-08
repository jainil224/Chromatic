-- ============================================
-- CHROMATIC - COMMUNITY SUBMISSIONS SCHEMA
-- ============================================

-- 1. Create the Palette Submissions Table
-- 1. Create the Palette Submissions Table
CREATE TABLE IF NOT EXISTS palette_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  colors JSONB NOT NULL,
  likes INTEGER DEFAULT 0 CHECK (likes >= 0),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  category TEXT, -- Optional category field
  tags JSONB DEFAULT '[]'::jsonb -- Tags array (JSONB)
);

-- ... (Indexes and RLS remain the same) ...

-- Approve Submission Function
CREATE OR REPLACE FUNCTION approve_submission(submission_id UUID, target_category TEXT DEFAULT NULL, target_tags JSONB DEFAULT '[]'::jsonb)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    submission_record RECORD;
    new_palette_id UUID;
BEGIN
    -- Get the submission
    SELECT * INTO submission_record FROM palette_submissions WHERE id = submission_id;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Submission not found';
    END IF;

    -- Insert into main palettes table
    INSERT INTO palettes (name, colors, likes, category, tags)
    VALUES (submission_record.name, submission_record.colors, 0, target_category, target_tags)
    RETURNING id INTO new_palette_id;

    -- Update submission status
    UPDATE palette_submissions 
    SET status = 'approved', category = target_category, tags = target_tags
    WHERE id = submission_id;

    RETURN json_build_object('success', true, 'new_palette_id', new_palette_id);
END;
$$;

-- Reject Submission Function
CREATE OR REPLACE FUNCTION reject_submission(submission_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE palette_submissions 
    SET status = 'rejected' 
    WHERE id = submission_id;
    
    RETURN true;
END;
$$;

-- Grant EXECUTE to public (Again, should be authenticated admin only in prod)
GRANT EXECUTE ON FUNCTION approve_submission(UUID) TO public;
GRANT EXECUTE ON FUNCTION reject_submission(UUID) TO public;

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE palette_submissions;
