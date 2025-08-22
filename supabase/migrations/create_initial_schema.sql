/*
  # Super Admin Panel Schema

  1. New Tables
    - `admin_sessions`
      - `id` (uuid, primary key)
      - `admin_id` (uuid, foreign key)
      - `session_token` (text, unique)
      - `ip_address` (text)
      - `user_agent` (text)
      - `expires_at` (timestamp)
      - `created_at` (timestamp)
    
    - `admin_audit_logs`
      - `id` (uuid, primary key)
      - `admin_id` (uuid, foreign key)
      - `action` (text)
      - `target_type` (text)
      - `target_id` (uuid)
      - `old_values` (jsonb)
      - `new_values` (jsonb)
      - `ip_address` (text)
      - `created_at` (timestamp)
    
    - `system_settings`
      - `id` (uuid, primary key)
      - `key` (text, unique)
      - `value` (jsonb)
      - `description` (text)
      - `updated_by` (uuid, foreign key)
      - `updated_at` (timestamp)
    
    - `content_reports`
      - `id` (uuid, primary key)
      - `reporter_id` (uuid, foreign key)
      - `content_type` (text)
      - `content_id` (uuid)
      - `reason` (text)
      - `description` (text)
      - `status` (text)
      - `reviewed_by` (uuid, foreign key)
      - `reviewed_at` (timestamp)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add admin-only policies
    - Create secure session management
*/

-- Create custom types
CREATE TYPE report_status AS ENUM ('pending', 'reviewed', 'resolved', 'dismissed');
CREATE TYPE content_type AS ENUM ('post', 'message', 'user', 'comment');

-- Admin Sessions table
CREATE TABLE IF NOT EXISTS admin_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id uuid REFERENCES admin_users(id) ON DELETE CASCADE,
  session_token text UNIQUE NOT NULL,
  ip_address text,
  user_agent text,
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Admin Audit Logs table
CREATE TABLE IF NOT EXISTS admin_audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id uuid REFERENCES admin_users(id) ON DELETE CASCADE,
  action text NOT NULL,
  target_type text NOT NULL,
  target_id uuid,
  old_values jsonb,
  new_values jsonb,
  ip_address text,
  created_at timestamptz DEFAULT now()
);

-- System Settings table
CREATE TABLE IF NOT EXISTS system_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL,
  description text,
  updated_by uuid REFERENCES admin_users(id) ON DELETE SET NULL,
  updated_at timestamptz DEFAULT now()
);

-- Content Reports table
CREATE TABLE IF NOT EXISTS content_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id uuid REFERENCES users(id) ON DELETE CASCADE,
  content_type content_type NOT NULL,
  content_id uuid NOT NULL,
  reason text NOT NULL,
  description text,
  status report_status DEFAULT 'pending',
  reviewed_by uuid REFERENCES admin_users(id) ON DELETE SET NULL,
  reviewed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_reports ENABLE ROW LEVEL SECURITY;

-- RLS Policies for admin_sessions
CREATE POLICY "Admins can manage own sessions"
  ON admin_sessions
  FOR ALL
  TO authenticated
  USING (admin_id IN (SELECT id FROM admin_users WHERE email = auth.jwt() ->> 'email'));

-- RLS Policies for admin_audit_logs
CREATE POLICY "Admins can read audit logs"
  ON admin_audit_logs
  FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE email = auth.jwt() ->> 'email'));

CREATE POLICY "System can create audit logs"
  ON admin_audit_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- RLS Policies for system_settings
CREATE POLICY "Admins can manage settings"
  ON system_settings
  FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE email = auth.jwt() ->> 'email'));

-- RLS Policies for content_reports
CREATE POLICY "Users can create reports"
  ON content_reports
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = reporter_id);

CREATE POLICY "Admins can manage reports"
  ON content_reports
  FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE email = auth.jwt() ->> 'email'));

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_admin_sessions_token ON admin_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires ON admin_sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_audit_logs_admin_id ON admin_audit_logs(admin_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON admin_audit_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_system_settings_key ON system_settings(key);
CREATE INDEX IF NOT EXISTS idx_content_reports_status ON content_reports(status);

-- Insert default system settings
INSERT INTO system_settings (key, value, description) VALUES 
('site_name', '"EduLink"', 'Application name'),
('admin_email', '"admin@edulink.com"', 'Primary admin email'),
('max_file_size', '10', 'Maximum file upload size in MB'),
('session_timeout', '30', 'Admin session timeout in minutes'),
('maintenance_mode', 'false', 'Enable maintenance mode'),
('user_registration', 'true', 'Allow new user registration')
ON CONFLICT (key) DO NOTHING;

-- Function to log admin actions
CREATE OR REPLACE FUNCTION log_admin_action(
  p_admin_id uuid,
  p_action text,
  p_target_type text,
  p_target_id uuid DEFAULT NULL,
  p_old_values jsonb DEFAULT NULL,
  p_new_values jsonb DEFAULT NULL,
  p_ip_address text DEFAULT NULL
) RETURNS void AS $$
BEGIN
  INSERT INTO admin_audit_logs (
    admin_id, action, target_type, target_id, 
    old_values, new_values, ip_address
  ) VALUES (
    p_admin_id, p_action, p_target_type, p_target_id,
    p_old_values, p_new_values, p_ip_address
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to clean expired sessions
CREATE OR REPLACE FUNCTION clean_expired_admin_sessions() RETURNS void AS $$
BEGIN
  DELETE FROM admin_sessions WHERE expires_at < now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;