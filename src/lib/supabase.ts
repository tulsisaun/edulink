import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://your-project.supabase.co'
const supabaseKey = 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database Types
export interface User {
  id: string
  email: string
  name: string
  user_type: 'student' | 'tutor'
  college: string
  verified: boolean
  rating: number
  created_at: string
}

export interface Post {
  id: string
  user_id: string
  title: string
  description: string
  subject: string
  budget: number
  post_type: 'request' | 'offer'
  status: 'active' | 'completed' | 'paused'
  tags: string[]
  created_at: string
}

export interface Message {
  id: string
  sender_id: string
  receiver_id: string
  content: string
  message_type: 'text' | 'image' | 'file'
  created_at: string
}

export interface Transaction {
  id: string
  from_user_id: string
  to_user_id: string
  amount: number
  description: string
  status: 'pending' | 'completed' | 'failed'
  created_at: string
}

// Database Functions
export const dbFunctions = {
  // Users
  async createUser(userData: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
    return { data, error }
  },

  async getUser(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    return { data, error }
  },

  // Posts
  async createPost(postData: Partial<Post>) {
    const { data, error } = await supabase
      .from('posts')
      .insert([postData])
      .select()
    return { data, error }
  },

  async getPosts(userType: 'student' | 'tutor') {
    const postType = userType === 'student' ? 'offer' : 'request'
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        users (name, college, rating, verified)
      `)
      .eq('post_type', postType)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
    return { data, error }
  },

  // Messages
  async sendMessage(messageData: Partial<Message>) {
    const { data, error } = await supabase
      .from('messages')
      .insert([messageData])
      .select()
    return { data, error }
  },

  async getMessages(userId1: string, userId2: string) {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .or(`and(sender_id.eq.${userId1},receiver_id.eq.${userId2}),and(sender_id.eq.${userId2},receiver_id.eq.${userId1})`)
      .order('created_at', { ascending: true })
    return { data, error }
  },

  // Transactions
  async createTransaction(transactionData: Partial<Transaction>) {
    const { data, error } = await supabase
      .from('transactions')
      .insert([transactionData])
      .select()
    return { data, error }
  },

  async getUserTransactions(userId: string) {
    const { data, error } = await supabase
      .from('transactions')
      .select(`
        *,
        from_user:users!from_user_id (name),
        to_user:users!to_user_id (name)
      `)
      .or(`from_user_id.eq.${userId},to_user_id.eq.${userId}`)
      .order('created_at', { ascending: false })
    return { data, error }
  }
}