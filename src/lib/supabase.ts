import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// サーバーサイド用のSupabaseクライアント（Service Role Key使用）
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// データベースの型定義
export interface InvitationResponse {
  id?: number
  name: string
  email: string
  attendance: 'attending' | 'not_attending'
  guest_count: number
  dietary_restrictions?: string
  message?: string
  created_at?: string
}