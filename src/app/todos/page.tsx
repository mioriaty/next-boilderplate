import { createServerClient } from '@/shared/database/supabase-client';

export default async function TodosPage() {
  const supabase = createServerClient();

  // Query todos from Supabase
  const { data: todos, error } = await supabase.from('todos').select('*').order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching todos:', error);
    return <div>Error loading todos</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Todos from Supabase</h1>

      <div className="space-y-4">
        {todos?.map((todo) => (
          <div key={todo.id} className="p-4 border rounded-lg">
            <h3 className="font-medium">{todo.title}</h3>
            {todo.description && <p className="text-gray-600 mt-2">{todo.description}</p>}
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <span>Status: {todo.completed ? 'Completed' : 'Pending'}</span>
              <span>Created: {new Date(todo.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))}

        {todos?.length === 0 && <div className="text-center py-8 text-gray-500">No todos found</div>}
      </div>
    </div>
  );
}
