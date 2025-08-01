# Supabase Connection Guide

## Step-by-Step Setup for Your Todos App

### 🎯 **Step 1: Create Supabase Project**

1. **Go to Supabase Dashboard**
   - Visit [supabase.com](https://supabase.com)
   - Sign in to your account (or create one)

2. **Create New Project**
   - Click **"New Project"** button
   - Choose your organization
   - Fill in project details:
     - **Name**: `next-core-todos` (or your preferred name)
     - **Database Password**: Create a strong password (save this!)
     - **Region**: Choose closest to you
   - Click **"Create new project"**
   - Wait 1-2 minutes for setup

### 🗄️ **Step 2: Get Your Project Credentials**

1. **Navigate to API Settings**
   - In your Supabase dashboard, go to **Settings** → **API**
   - You'll see two important sections: **Project URL** and **API Keys**

2. **Copy Project URL**
   - Look for **Project URL** (format: `https://your-project-id.supabase.co`)
   - Copy this URL

3. **Copy Anon Key**
   - Look for **anon public** key (starts with `eyJ...`)
   - Copy this key

4. **Get Database URL**
   - Go to **Settings** → **Database**
   - Find **Connection string** section
   - Copy the **URI** (format: `postgresql://postgres:[password]@db.[project-id].supabase.co:5432/postgres`)
   - Replace `[password]` with your database password

### 🔧 **Step 3: Set Up Environment Variables**

1. **Create Environment File**
   - In your project root, create `.env.local` file
   - Add these variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Database URL (replace with your actual values)
DATABASE_URL=postgresql://postgres:your-password@db.your-project-id.supabase.co:5432/postgres
```

2. **Replace Placeholder Values**
   - Replace `your-project-id` with your actual project ID
   - Replace `your-anon-key-here` with your actual anon key
   - Replace `your-password` with your database password

### 🗃️ **Step 4: Create Database Tables**

1. **Open SQL Editor**
   - In Supabase dashboard, go to **SQL Editor**
   - Click **"New query"**

2. **Run This SQL Script**
   - Copy and paste this SQL:

```sql
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

-- Create RLS policies for todos table (allow all operations for now)
CREATE POLICY "Allow all operations on todos" ON todos
  FOR ALL USING (true)
  WITH CHECK (true);

-- Create RLS policies for users table (allow all operations for now)
CREATE POLICY "Allow all operations on users" ON users
  FOR ALL USING (true)
  WITH CHECK (true);

-- Insert some sample data for testing
INSERT INTO todos (title, description) VALUES
  ('Learn Supabase', 'Study the Supabase documentation'),
  ('Build Todo App', 'Create a todo application with Next.js'),
  ('Deploy to Production', 'Deploy the application to production')
ON CONFLICT DO NOTHING;
```

3. **Execute the Script**
   - Click **"Run"** button
   - You should see "Success" message

### 🧪 **Step 5: Test the Connection**

1. **Start Your Development Server**

   ```bash
   pnpm dev
   ```

2. **Test the App**
   - Go to `http://localhost:3000`
   - Try creating a todo
   - Check if it appears in Supabase

3. **Verify in Supabase Dashboard**
   - Go to **Table Editor** in Supabase
   - Click on **todos** table
   - You should see your created todos

### 🔍 **Step 6: Verify Database Connection**

1. **Check Table Editor**
   - In Supabase dashboard, go to **Table Editor**
   - Click on **todos** table
   - You should see the table structure and any data

2. **Test API Routes**
   - Visit `http://localhost:3000/test-todos`
   - Try the test interface
   - Check if todos are saved/loaded correctly

### 🛠️ **Troubleshooting Common Issues**

#### **Issue 1: "Missing Supabase environment variables"**

**Solution:**

- Check that `.env.local` file exists
- Verify environment variable names are correct
- Restart your development server

#### **Issue 2: "Failed to fetch todos"**

**Solution:**

- Check browser console for detailed errors
- Verify Supabase project is active
- Ensure database tables are created

#### **Issue 3: "Connection refused"**

**Solution:**

- Check your `DATABASE_URL` format
- Verify database password is correct
- Ensure project is not paused

#### **Issue 4: "Table does not exist"**

**Solution:**

- Go to SQL Editor in Supabase
- Run the table creation script again
- Check Table Editor to confirm tables exist

#### **Issue 5: "Row-level security policy violation"**

**Solution:**

- Go to SQL Editor in Supabase
- Run this additional SQL to fix RLS policies:

```sql
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow all operations on todos" ON todos;
DROP POLICY IF EXISTS "Allow all operations on users" ON users;

-- Create new policies that allow all operations
CREATE POLICY "Allow all operations on todos" ON todos
  FOR ALL USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations on users" ON users
  FOR ALL USING (true)
  WITH CHECK (true);
```

### 📊 **Monitoring Your Data**

1. **Real-time Monitoring**
   - Go to **Table Editor** → **todos**
   - Watch data update in real-time as you use the app

2. **API Logs**
   - Go to **Logs** in Supabase dashboard
   - Monitor API calls and errors

3. **Database Performance**
   - Go to **Database** → **Performance**
   - Monitor query performance

### 🚀 **Next Steps After Connection**

1. **Enable Row Level Security** (for production)
2. **Set up Authentication** with Supabase Auth
3. **Add Real-time Subscriptions** for live updates
4. **Configure Backup Settings**
5. **Set up Monitoring and Alerts**

### ✅ **Verification Checklist**

- [ ] Supabase project created
- [ ] Environment variables set correctly
- [ ] Database tables created
- [ ] RLS policies configured correctly
- [ ] Sample data inserted
- [ ] App connects to Supabase
- [ ] Todos can be created/updated/deleted
- [ ] Data persists after page refresh
- [ ] Data visible in Supabase dashboard

Once you complete these steps, your todos app will be fully connected to Supabase! 🎉
