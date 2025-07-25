import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Missing Supabase environment variables");
}

// サーバーサイド用のSupabaseクライアント（Service Role Key使用）
export const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// データベースの型定義（レガシー - 新しいコードではDatabase型を使用）
export interface InvitationResponse {
  id?: number;
  name: string;
  email: string;
  attendance: "attending" | "not_attending";
  guest_count: number;
  dietary_restrictions: string | null;
  message: string | null;
  created_at?: string;
}

// 新しい型安全な型定義
export type InvitationRow = Database["public"]["Tables"]["invitation_responses"]["Row"];
export type InvitationInsert = Database["public"]["Tables"]["invitation_responses"]["Insert"];
export type InvitationUpdate = Database["public"]["Tables"]["invitation_responses"]["Update"];
