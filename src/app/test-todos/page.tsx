'use client';

import { useState } from 'react';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

export default function TestTodosPage() {
  const [todos, setTodos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });

  const loadTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/todos');
      if (!response.ok) {
        throw new Error('Failed to load todos');
      }
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const createTodo = async () => {
    if (!newTodo.title.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create todo');
      }
      const createdTodo = await response.json();
      setTodos([createdTodo, ...todos]);
      setNewTodo({ title: '', description: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const toggleTodo = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PATCH'
      });
      if (!response.ok) {
        throw new Error('Failed to toggle todo');
      }
      const updatedTodo = await response.json();
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Test Todos with Supabase</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <div className="space-y-4 mb-8">
        <div className="flex space-x-2">
          <Input
            placeholder="Todo title"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            className="flex-1"
          />
          <Input
            placeholder="Description (optional)"
            value={newTodo.description}
            onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
            className="flex-1"
          />
          <Button onClick={createTodo} disabled={loading}>
            Add Todo
          </Button>
        </div>

        <Button onClick={loadTodos} disabled={loading} variant="outline">
          {loading ? 'Loading...' : 'Load Todos'}
        </Button>
      </div>

      <div className="space-y-2">
        {todos.map((todo) => (
          <div key={todo.id} className="border rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="h-4 w-4"
              />
              <div>
                <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-500' : ''}`}>{todo.title}</h3>
                {todo.description && <p className="text-sm text-gray-600">{todo.description}</p>}
                <p className="text-xs text-gray-400">Created: {new Date(todo.created_at).toLocaleDateString()}</p>
              </div>
            </div>
            <Button onClick={() => deleteTodo(todo.id)} variant="destructive" size="sm" disabled={loading}>
              Delete
            </Button>
          </div>
        ))}
      </div>

      {todos.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500">
          No todos found. Click "Load Todos" to fetch from Supabase or create a new one.
        </div>
      )}
    </div>
  );
}
