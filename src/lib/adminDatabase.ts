import { supabase } from './supabase';

// Admin Database Types
export interface AdminSession {
  id: string;
  admin_id: string;
  session_token: string;
  ip_address?: string;
  user_agent?: string;
  expires_at: string;
  created_at: string;
}

export interface AdminAuditLog {
  id: string;
  admin_id: string;
  action: string;
  target_type: string;
  target_id?: string;
  old_values?: any;
  new_values?: any;
  ip_address?: string;
  created_at: string;
}

export interface SystemSetting {
  id: string;
  key: string;
  value: any;
  description?: string;
  updated_by?: string;
  updated_at: string;
}

export interface ContentReport {
  id: string;
  reporter_id: string;
  content_type: 'post' | 'message' | 'user' | 'comment';
  content_id: string;
  reason: string;
  description?: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  reviewed_by?: string;
  reviewed_at?: string;
  created_at: string;
}

// Admin Database Functions
export const adminDbOperations = {
  // Authentication & Sessions
  async createAdminSession(adminId: string, sessionToken: string, ipAddress?: string, userAgent?: string) {
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
    
    const { data, error } = await supabase
      .from('admin_sessions')
      .insert([{
        admin_id: adminId,
        session_token: sessionToken,
        ip_address: ipAddress,
        user_agent: userAgent,
        expires_at: expiresAt.toISOString()
      }]);
    
    return { data, error };
  },

  async validateAdminSession(sessionToken: string) {
    const { data, error } = await supabase
      .from('admin_sessions')
      .select(`
        *,
        admin_users (id, email, name, role)
      `)
      .eq('session_token', sessionToken)
      .gt('expires_at', new Date().toISOString())
      .single();
    
    return { data, error };
  },

  async revokeAdminSession(sessionToken: string) {
    const { data, error } = await supabase
      .from('admin_sessions')
      .delete()
      .eq('session_token', sessionToken);
    
    return { data, error };
  },

  // Audit Logging
  async logAdminAction(
    adminId: string,
    action: string,
    targetType: string,
    targetId?: string,
    oldValues?: any,
    newValues?: any,
    ipAddress?: string
  ) {
    const { data, error } = await supabase
      .from('admin_audit_logs')
      .insert([{
        admin_id: adminId,
        action,
        target_type: targetType,
        target_id: targetId,
        old_values: oldValues,
        new_values: newValues,
        ip_address: ipAddress
      }]);
    
    return { data, error };
  },

  async getAuditLogs(limit = 100, offset = 0) {
    const { data, error } = await supabase
      .from('admin_audit_logs')
      .select(`
        *,
        admin_users (name, email)
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    
    return { data, error };
  },

  // User Management
  async getAllUsers(limit = 50, offset = 0, searchTerm?: string) {
    let query = supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (searchTerm) {
      query = query.or(`name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,college.ilike.%${searchTerm}%`);
    }

    const { data, error } = await query;
    return { data, error };
  },

  async blockUser(userId: string, reason: string, adminId: string) {
    // Get current user data for audit log
    const { data: currentUser } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    // Update user status
    const { data, error } = await supabase
      .from('users')
      .update({
        blocked: true,
        block_reason: reason,
        blocked_at: new Date().toISOString()
      })
      .eq('id', userId);

    // Log the action
    if (!error) {
      await this.logAdminAction(
        adminId,
        'User Blocked',
        'user',
        userId,
        { blocked: currentUser?.blocked },
        { blocked: true, block_reason: reason }
      );
    }

    return { data, error };
  },

  async unblockUser(userId: string, adminId: string) {
    const { data, error } = await supabase
      .from('users')
      .update({
        blocked: false,
        block_reason: null,
        blocked_at: null
      })
      .eq('id', userId);

    // Log the action
    if (!error) {
      await this.logAdminAction(
        adminId,
        'User Unblocked',
        'user',
        userId,
        { blocked: true },
        { blocked: false }
      );
    }

    return { data, error };
  },

  async deleteUser(userId: string, adminId: string) {
    // Get user data for audit log
    const { data: userData } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    const { data, error } = await supabase
      .from('users')
      .delete()
      .eq('id', userId);

    // Log the action
    if (!error) {
      await this.logAdminAction(
        adminId,
        'User Deleted',
        'user',
        userId,
        userData,
        null
      );
    }

    return { data, error };
  },

  // Content Management
  async getAllPosts(limit = 50, offset = 0) {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        users (name, email, college)
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    
    return { data, error };
  },

  async deletePost(postId: string, adminId: string) {
    // Get post data for audit log
    const { data: postData } = await supabase
      .from('posts')
      .select('*')
      .eq('id', postId)
      .single();

    const { data, error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId);

    // Log the action
    if (!error) {
      await this.logAdminAction(
        adminId,
        'Post Deleted',
        'post',
        postId,
        postData,
        null
      );
    }

    return { data, error };
  },

  // System Settings
  async getSystemSettings() {
    const { data, error } = await supabase
      .from('system_settings')
      .select('*')
      .order('key');
    
    return { data, error };
  },

  async updateSystemSetting(key: string, value: any, adminId: string) {
    // Get current value for audit log
    const { data: currentSetting } = await supabase
      .from('system_settings')
      .select('value')
      .eq('key', key)
      .single();

    const { data, error } = await supabase
      .from('system_settings')
      .upsert({
        key,
        value,
        updated_by: adminId,
        updated_at: new Date().toISOString()
      });

    // Log the action
    if (!error) {
      await this.logAdminAction(
        adminId,
        'System Setting Updated',
        'setting',
        key,
        { value: currentSetting?.value },
        { value }
      );
    }

    return { data, error };
  },

  // Content Reports
  async getContentReports(status?: string) {
    let query = supabase
      .from('content_reports')
      .select(`
        *,
        reporter:users!reporter_id (name, email),
        reviewer:admin_users!reviewed_by (name, email)
      `)
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;
    return { data, error };
  },

  async updateReportStatus(
    reportId: string,
    status: 'reviewed' | 'resolved' | 'dismissed',
    adminId: string
  ) {
    const { data, error } = await supabase
      .from('content_reports')
      .update({
        status,
        reviewed_by: adminId,
        reviewed_at: new Date().toISOString()
      })
      .eq('id', reportId);

    // Log the action
    if (!error) {
      await this.logAdminAction(
        adminId,
        'Report Status Updated',
        'report',
        reportId,
        null,
        { status }
      );
    }

    return { data, error };
  },

  // Analytics
  async getSystemAnalytics() {
    // Get user statistics
    const { data: userStats } = await supabase
      .from('users')
      .select('user_type, created_at, blocked')
      .order('created_at', { ascending: false });

    // Get post statistics
    const { data: postStats } = await supabase
      .from('posts')
      .select('post_type, status, created_at')
      .order('created_at', { ascending: false });

    // Get message statistics
    const { data: messageStats } = await supabase
      .from('messages')
      .select('created_at')
      .order('created_at', { ascending: false });

    // Calculate analytics
    const totalUsers = userStats?.length || 0;
    const activeUsers = userStats?.filter(u => !u.blocked).length || 0;
    const totalPosts = postStats?.length || 0;
    const activePosts = postStats?.filter(p => p.status === 'active').length || 0;
    const totalMessages = messageStats?.length || 0;

    // Get recent activity (last 24 hours)
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const recentUsers = userStats?.filter(u => u.created_at > yesterday).length || 0;
    const recentPosts = postStats?.filter(p => p.created_at > yesterday).length || 0;
    const recentMessages = messageStats?.filter(m => m.created_at > yesterday).length || 0;

    return {
      totalUsers,
      activeUsers,
      blockedUsers: totalUsers - activeUsers,
      totalPosts,
      activePosts,
      totalMessages,
      recentActivity: {
        newUsers: recentUsers,
        newPosts: recentPosts,
        newMessages: recentMessages
      },
      userTypes: {
        students: userStats?.filter(u => u.user_type === 'student').length || 0,
        tutors: userStats?.filter(u => u.user_type === 'tutor').length || 0
      },
      postTypes: {
        requests: postStats?.filter(p => p.post_type === 'request').length || 0,
        offers: postStats?.filter(p => p.post_type === 'offer').length || 0
      }
    };
  },

  // Database Backup (Mock implementation)
  async createBackup(adminId: string) {
    // In a real implementation, this would trigger a database backup
    await this.logAdminAction(
      adminId,
      'Database Backup Created',
      'system',
      'backup',
      null,
      { timestamp: new Date().toISOString() }
    );

    return {
      success: true,
      filename: `backup_${new Date().toISOString().split('T')[0]}.sql`,
      size: '2.4 MB'
    };
  },

  // Security Functions
  async getFailedLoginAttempts(hours = 24) {
    const since = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
    
    const { data, error } = await supabase
      .from('user_activities')
      .select('*')
      .eq('action_type', 'login')
      .gte('created_at', since)
      .ilike('details', '%failed%');
    
    return { data, error };
  },

  async getSecurityAlerts() {
    // Mock security alerts - in production, this would check various security metrics
    return [
      {
        type: 'failed_logins',
        count: 3,
        severity: 'medium',
        description: 'Multiple failed login attempts detected'
      },
      {
        type: 'suspicious_activity',
        count: 0,
        severity: 'low',
        description: 'No suspicious activity detected'
      }
    ];
  }
};