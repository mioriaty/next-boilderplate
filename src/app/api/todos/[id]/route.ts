import { createServerClient } from '@/shared/database/supabase-client';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/todos/[id] - Get a specific todo
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerClient();
    const { id } = params;

    const { data: todo, error } = await supabase.from('todos').select('*').eq('id', id).single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
      }
      console.error('Error fetching todo:', error);
      return NextResponse.json({ error: 'Failed to fetch todo' }, { status: 500 });
    }

    return NextResponse.json(todo);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/todos/[id] - Update a todo
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerClient();
    const { id } = params;
    const body = await request.json();

    const { title, description, completed } = body;

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (completed !== undefined) updateData.completed = completed;
    updateData.updated_at = new Date().toISOString();

    const { data: todo, error } = await supabase.from('todos').update(updateData).eq('id', id).select().single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
      }
      console.error('Error updating todo:', error);
      return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 });
    }

    return NextResponse.json(todo);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/todos/[id] - Delete a todo
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerClient();
    const { id } = params;

    const { error } = await supabase.from('todos').delete().eq('id', id);

    if (error) {
      console.error('Error deleting todo:', error);
      return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PATCH /api/todos/[id]/toggle - Toggle todo completion
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerClient();
    const { id } = params;

    // First get the current todo to toggle its completion status
    const { data: currentTodo, error: fetchError } = await supabase
      .from('todos')
      .select('completed')
      .eq('id', id)
      .single();

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
      }
      console.error('Error fetching todo:', fetchError);
      return NextResponse.json({ error: 'Failed to fetch todo' }, { status: 500 });
    }

    // Toggle the completion status
    const { data: todo, error } = await supabase
      .from('todos')
      .update({
        completed: !currentTodo.completed,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error toggling todo:', error);
      return NextResponse.json({ error: 'Failed to toggle todo' }, { status: 500 });
    }

    return NextResponse.json(todo);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
