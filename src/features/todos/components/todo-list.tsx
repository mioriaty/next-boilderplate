'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

import { useTodoStore } from '../store';
import { TodoFilters } from '../types';
import { TodoItem } from './todo-item';

export function TodoList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCompleted, setShowCompleted] = useState<boolean | undefined>(undefined);

  const { todos, isLoading, error, filters, loadTodos, setFilters, clearError } = useTodoStore();

  // Load todos from database on component mount (no local storage)
  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const handleSearch = () => {
    const newFilters: TodoFilters = {
      ...filters,
      search: searchTerm || undefined
    };
    setFilters(newFilters);
    loadTodos(newFilters);
  };

  const handleFilterChange = (completed: boolean | undefined) => {
    const newFilters: TodoFilters = {
      ...filters,
      completed: completed
    };
    setFilters(newFilters);
    loadTodos(newFilters);
  };

  // Client-side filtering for better UX (since we're not using local storage)
  const filteredTodos = todos.filter((todo) => {
    if (showCompleted !== undefined && todo.completed !== showCompleted) {
      return false;
    }
    if (searchTerm && !todo.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  if (isLoading) {
    return <div className="text-center py-8">Loading todos from database...</div>;
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-600">{error}</p>
          <Button onClick={clearError} variant="outline" size="sm" className="mt-2">
            Dismiss
          </Button>
        </div>
      )}

      <div className="flex space-x-2">
        <Input
          placeholder="Search todos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      <div className="flex space-x-2">
        <Button
          variant={showCompleted === undefined ? 'default' : 'outline'}
          onClick={() => handleFilterChange(undefined)}
          size="sm"
        >
          All
        </Button>
        <Button
          variant={showCompleted === false ? 'default' : 'outline'}
          onClick={() => handleFilterChange(false)}
          size="sm"
        >
          Active
        </Button>
        <Button
          variant={showCompleted === true ? 'default' : 'outline'}
          onClick={() => handleFilterChange(true)}
          size="sm"
        >
          Completed
        </Button>
      </div>

      {filteredTodos.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {searchTerm || showCompleted !== undefined ? 'No todos found' : 'No todos in database yet'}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  );
}
