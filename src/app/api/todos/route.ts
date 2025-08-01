import { createServerClient } from '@/shared/database/supabase-client';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/todos - Get all todos
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const completed = searchParams.get('completed');
    const search = searchParams.get('search');

    let query = supabase.from('todos').select('*').order('created_at', { ascending: false });

    // Apply filters
    if (userId) {
      query = query.eq('user_id', userId);
    }
    if (completed !== null) {
      query = query.eq('completed', completed === 'true');
    }
    if (search) {
      query = query.ilike('title', `%${search}%`);
    }

    const { data: todos, error } = await query;

    if (error) {
      console.error('Error fetching todos:', error);
      return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 });
    }

    return NextResponse.json(todos);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/todos - Create a new todo
export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const body = await request.json();

    const { title, description, userId } = body;

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const { data: todo, error } = await supabase
      .from('todos')
      .insert({
        title,
        description: description || null,
        user_id: userId || null,
        completed: false
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating todo:', error);
      return NextResponse.json({ error: 'Failed to create todo' }, { status: 500 });
    }

    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
