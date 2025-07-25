import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, type InvitationResponse } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body: InvitationResponse = await request.json()
    
    // 必須フィールドの検証
    if (!body.name || !body.email || !body.attendance) {
      return NextResponse.json(
        { error: '必須項目が不足しています' },
        { status: 400 }
      )
    }

    // Supabaseにデータを挿入
    const { data, error } = await supabaseAdmin
      .from('invitation_responses')
      .insert([
        {
          name: body.name,
          email: body.email,
          attendance: body.attendance,
          guest_count: body.guest_count || 1,
          dietary_restrictions: body.dietary_restrictions || null,
          message: body.message || null,
        },
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'データベースエラーが発生しました' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: '回答を受け付けました', data },
      { status: 201 }
    )
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    )
  }
}