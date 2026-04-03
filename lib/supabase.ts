import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null

export type Database = {
  public: {
    Tables: {
      templates: {
        Row: {
          id: string
          title: string
          description: string
          content: string
          agent_type: string
          category: string
          tags: string[]
          downloads: number
          stars: number
          author_id: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['templates']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['templates']['Insert']>
      }
      plugins: {
        Row: {
          id: string
          name: string
          description: string
          agent_compatibility: string[]
          version: string
          status: string
          author_id: string
          downloads: number
          stars: number
          price: number
          category: string
          tags: string[]
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['plugins']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['plugins']['Insert']>
      }
      hooks: {
        Row: {
          id: string
          name: string
          type: string
          description: string
          webhook_url: string
          enabled: boolean
          user_id: string
          template_id: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['hooks']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['hooks']['Insert']>
      }
    }
  }
}
