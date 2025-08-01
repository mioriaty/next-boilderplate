-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create todos table
CREATE TABLE IF NOT EXISTS todos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(100) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for users table
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can insert their own data" ON users
  FOR INSERT WITH CHECK (auth.uid()::text = id::text);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid()::text = id::text);

-- Create RLS policies for todos table
CREATE POLICY "Users can view their own todos" ON todos
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert their own todos" ON todos
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update their own todos" ON todos
  FOR UPDATE USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can delete their own todos" ON todos
  FOR DELETE USING (auth.uid()::text = user_id::text);

-- Insert sample data (optional)
INSERT INTO users (email, name, password) VALUES
  ('john@example.com', 'John Doe', 'hashed_password_here'),
  ('jane@example.com', 'Jane Smith', 'hashed_password_here')
ON CONFLICT (email) DO NOTHING;

INSERT INTO todos (title, description, user_id) VALUES
  ('Learn Supabase', 'Study the Supabase documentation', (SELECT id FROM users WHERE email = 'john@example.com')),
  ('Build Todo App', 'Create a todo application with Next.js', (SELECT id FROM users WHERE email = 'john@example.com')),
  ('Deploy to Production', 'Deploy the application to production', (SELECT id FROM users WHERE email = 'jane@example.com'))
ON CONFLICT DO NOTHING;
