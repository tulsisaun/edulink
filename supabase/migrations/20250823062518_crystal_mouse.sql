/*
  # Advanced Features Schema for EduLink

  1. New Tables
    - `study_tasks`
      - Task management for study planner
    - `grades`
      - Grade tracking system
    - `achievements`
      - Gamification system
    - `user_achievements`
      - User achievement progress
    - `mock_tests`
      - Test management
    - `test_results`
      - Test performance tracking
    - `digital_books`
      - Digital library resources
    - `campus_locations`
      - Campus map data
    - `video_sessions`
      - Video call tracking
    - `ai_conversations`
      - AI tutor chat history

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies
*/

-- Create custom types
CREATE TYPE task_type AS ENUM ('assignment', 'exam', 'study', 'project');
CREATE TYPE task_priority AS ENUM ('high', 'medium', 'low');
CREATE TYPE achievement_type AS ENUM ('study_streak', 'helping_hand', 'subject_master', 'social', 'completion');
CREATE TYPE book_type AS ENUM ('textbook', 'notes', 'research', 'reference');
CREATE TYPE location_type AS ENUM ('academic', 'hostel', 'food', 'transport', 'admin', 'recreation');
CREATE TYPE session_status AS ENUM ('scheduled', 'active', 'completed', 'cancelled');

-- Study Tasks table
CREATE TABLE IF NOT EXISTS study_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  subject text NOT NULL,
  task_type task_type NOT NULL,
  priority task_priority DEFAULT 'medium',
  deadline timestamptz NOT NULL,
  completed boolean DEFAULT false,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Grades table
CREATE TABLE IF NOT EXISTS grades (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  subject text NOT NULL,
  exam_type text NOT NULL,
  marks integer NOT NULL,
  total_marks integer NOT NULL,
  exam_date date NOT NULL,
  semester text,
  created_at timestamptz DEFAULT now()
);

-- Achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  achievement_type achievement_type NOT NULL,
  points integer DEFAULT 0,
  max_progress integer DEFAULT 1,
  icon_name text,
  color_class text,
  created_at timestamptz DEFAULT now()
);

-- User Achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  achievement_id uuid REFERENCES achievements(id) ON DELETE CASCADE,
  progress integer DEFAULT 0,
  unlocked boolean DEFAULT false,
  unlocked_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

-- Mock Tests table
CREATE TABLE IF NOT EXISTS mock_tests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subject text NOT NULL,
  difficulty text DEFAULT 'medium',
  duration_minutes integer DEFAULT 30,
  total_questions integer NOT NULL,
  created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- Test Results table
CREATE TABLE IF NOT EXISTS test_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  test_id uuid REFERENCES mock_tests(id) ON DELETE CASCADE,
  score integer NOT NULL,
  total_questions integer NOT NULL,
  time_taken_minutes integer,
  answers jsonb,
  created_at timestamptz DEFAULT now()
);

-- Digital Books table
CREATE TABLE IF NOT EXISTS digital_books (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  author text NOT NULL,
  subject text NOT NULL,
  book_type book_type NOT NULL,
  pages integer,
  file_size text,
  file_url text,
  thumbnail_url text,
  uploaded_by uuid REFERENCES users(id) ON DELETE SET NULL,
  downloads integer DEFAULT 0,
  rating decimal(3,2) DEFAULT 0.0,
  created_at timestamptz DEFAULT now()
);

-- Campus Locations table
CREATE TABLE IF NOT EXISTS campus_locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location_type location_type NOT NULL,
  description text,
  coordinates_x decimal(5,2),
  coordinates_y decimal(5,2),
  timings text,
  contact_info text,
  facilities text[],
  created_at timestamptz DEFAULT now()
);

-- Video Sessions table
CREATE TABLE IF NOT EXISTS video_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  host_id uuid REFERENCES users(id) ON DELETE CASCADE,
  participant_id uuid REFERENCES users(id) ON DELETE CASCADE,
  session_title text,
  status session_status DEFAULT 'scheduled',
  scheduled_at timestamptz,
  started_at timestamptz,
  ended_at timestamptz,
  duration_minutes integer,
  recording_url text,
  created_at timestamptz DEFAULT now()
);

-- AI Conversations table
CREATE TABLE IF NOT EXISTS ai_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  subject text,
  conversation_data jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE study_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE mock_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE digital_books ENABLE ROW LEVEL SECURITY;
ALTER TABLE campus_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for study_tasks
CREATE POLICY "Users can manage own tasks"
  ON study_tasks
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for grades
CREATE POLICY "Users can manage own grades"
  ON grades
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for achievements
CREATE POLICY "Anyone can read achievements"
  ON achievements
  FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies for user_achievements
CREATE POLICY "Users can manage own achievements"
  ON user_achievements
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for mock_tests
CREATE POLICY "Anyone can read tests"
  ON mock_tests
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create tests"
  ON mock_tests
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- RLS Policies for test_results
CREATE POLICY "Users can manage own results"
  ON test_results
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for digital_books
CREATE POLICY "Anyone can read books"
  ON digital_books
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can upload books"
  ON digital_books
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = uploaded_by);

-- RLS Policies for campus_locations
CREATE POLICY "Anyone can read locations"
  ON campus_locations
  FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies for video_sessions
CREATE POLICY "Users can manage own sessions"
  ON video_sessions
  FOR ALL
  TO authenticated
  USING (auth.uid() = host_id OR auth.uid() = participant_id);

-- RLS Policies for ai_conversations
CREATE POLICY "Users can manage own conversations"
  ON ai_conversations
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_study_tasks_user_deadline ON study_tasks(user_id, deadline);
CREATE INDEX IF NOT EXISTS idx_grades_user_subject ON grades(user_id, subject);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_test_results_user ON test_results(user_id);
CREATE INDEX IF NOT EXISTS idx_digital_books_subject ON digital_books(subject);
CREATE INDEX IF NOT EXISTS idx_campus_locations_type ON campus_locations(location_type);
CREATE INDEX IF NOT EXISTS idx_video_sessions_participants ON video_sessions(host_id, participant_id);

-- Insert sample achievements
INSERT INTO achievements (title, description, achievement_type, points, max_progress, icon_name, color_class) VALUES 
('First Steps', 'Complete your first study session', 'completion', 50, 1, 'Target', 'bg-blue-500'),
('Study Streak', 'Study for 7 consecutive days', 'study_streak', 200, 7, 'Zap', 'bg-yellow-500'),
('Helping Hand', 'Help 10 fellow students', 'helping_hand', 300, 10, 'Award', 'bg-green-500'),
('Math Master', 'Score 90+ in 5 math tests', 'subject_master', 500, 5, 'Crown', 'bg-purple-500'),
('Social Butterfly', 'Join 5 study groups', 'social', 250, 5, 'Medal', 'bg-pink-500')
ON CONFLICT DO NOTHING;

-- Insert sample campus locations
INSERT INTO campus_locations (name, location_type, description, coordinates_x, coordinates_y, timings, facilities) VALUES 
('Main Library', 'academic', 'Central library with 50,000+ books and digital resources', 40.0, 30.0, '8:00 AM - 10:00 PM', ARRAY['WiFi', 'AC', 'Study Rooms', 'Computer Lab']),
('Computer Science Block', 'academic', 'CS Department with labs and classrooms', 60.0, 40.0, '9:00 AM - 6:00 PM', ARRAY['Programming Labs', 'WiFi', 'Projectors']),
('Boys Hostel A', 'hostel', 'Accommodation for 200 students', 20.0, 60.0, '24/7', ARRAY['Mess', 'WiFi', 'Laundry', 'Common Room']),
('Central Canteen', 'food', 'Main dining facility with variety of cuisines', 50.0, 50.0, '7:00 AM - 10:00 PM', ARRAY['North Indian', 'South Indian', 'Chinese', 'Snacks']),
('Bus Stop', 'transport', 'Main campus bus stop', 80.0, 20.0, '6:00 AM - 11:00 PM', ARRAY['DTC Bus', 'Metro Feeder', 'Auto Stand']),
('Sports Complex', 'recreation', 'Indoor and outdoor sports facilities', 30.0, 80.0, '6:00 AM - 9:00 PM', ARRAY['Gym', 'Basketball', 'Cricket', 'Badminton'])
ON CONFLICT DO NOTHING;

-- Insert sample digital books
INSERT INTO digital_books (title, author, subject, book_type, pages, file_size, uploaded_by, downloads, rating) VALUES 
('Advanced Calculus - Complete Guide', 'Dr. R.K. Sharma', 'Mathematics', 'textbook', 450, '15.2 MB', (SELECT id FROM users LIMIT 1), 1250, 4.8),
('Data Structures & Algorithms Notes', 'Prof. Arjun Kumar', 'Computer Science', 'notes', 120, '8.5 MB', (SELECT id FROM users LIMIT 1), 890, 4.9),
('Organic Chemistry Mechanisms', 'Dr. Priya Patel', 'Chemistry', 'reference', 280, '12.8 MB', (SELECT id FROM users LIMIT 1), 650, 4.7),
('Machine Learning Research Papers', 'Various Authors', 'Computer Science', 'research', 85, '6.2 MB', (SELECT id FROM users LIMIT 1), 420, 4.6)
ON CONFLICT DO NOTHING;