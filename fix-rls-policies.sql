-- Fix RLS Policies for Todos App
-- Run this in Supabase SQL Editor to resolve the "row-level security policy" error

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow all operations on todos" ON todos;
DROP POLICY IF EXISTS "Allow all operations on users" ON users;
DROP POLICY IF EXISTS "Users can view their own todos" ON todos;
DROP POLICY IF EXISTS "Users can insert their own todos" ON todos;
DROP POLICY IF EXISTS "Users can update their own todos" ON todos;
DROP POLICY IF EXISTS "Users can delete their own todos" ON todos;

-- Create new policies that allow all operations (for development/testing)
CREATE POLICY "Allow all operations on todos" ON todos
  FOR ALL USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations on users" ON users
  FOR ALL USING (true)
  WITH CHECK (true);

-- Verify the policies were created
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename IN ('todos', 'users')
ORDER BY tablename, policyname;
