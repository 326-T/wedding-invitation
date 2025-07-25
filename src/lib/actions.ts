'use server'

import { revalidatePath } from 'next/cache'
import { supabaseAdmin, type InvitationResponse } from '@/lib/supabase'

type ActionResult = 
  | { success: true; message: string }
  | { success: false; error: string }

export async function submitInvitation(formData: FormData): Promise<ActionResult> {
  try {
    const name = formData.get('name')?.toString()
    const email = formData.get('email')?.toString()
    const attendance = formData.get('attendance')?.toString() as 'attending' | 'not_attending'
    const guestCountStr = formData.get('guest_count')?.toString()
    const dietary_restrictions = formData.get('dietary_restrictions')?.toString()
    const message = formData.get('message')?.toString()

    const data: InvitationResponse = {
      name: name || '',
      email: email || '',
      attendance,
      guest_count: guestCountStr ? parseInt(guestCountStr) : 1,
      dietary_restrictions: dietary_restrictions || null,
      message: message || null,
    }

    // 必須フィールドの検証
    if (!data.name || !data.email || !data.attendance) {
      return {
        success: false,
        error: '必須項目が不足しています'
      }
    }

    // Supabaseにデータを挿入
    const { error } = await supabaseAdmin
      .from('invitation_responses')
      .insert([data])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return {
        success: false,
        error: 'データベースエラーが発生しました'
      }
    }

    // キャッシュを再検証（必要に応じて）
    revalidatePath('/')

    return {
      success: true,
      message: '回答を受け付けました'
    }
  } catch (error) {
    console.error('Server action error:', error)
    return {
      success: false,
      error: 'サーバーエラーが発生しました'
    }
  }
}