'use client';

import { TodoFilters } from '@/entities/models/todo';
import { TodoItem } from '@/libs/components/todo/todo-item';
import { Button } from '@/libs/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/libs/components/ui/card';
import { Input } from '@/libs/components/ui/input';
import { useTodoStore } from '@/stores/todo.store';
import { Filter, Search, X } from 'lucide-react';
import { useState } from 'react';

export function TodoList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCompleted, setShowCompleted] = useState<boolean | undefined>(undefined);

  const { todos, isLoading, error, filters, loadTodos, setFilters, clearError } = useTodoStore();

  const handleSearch = () => {
    const newFilters: TodoFilters = {
      ...filters,
      search: searchTerm || undefined
    };
    setFilters(newFilters);
    loadTodos(newFilters);
  };

  const handleFilterToggle = () => {
    let newCompleted: boolean | undefined;
    if (showCompleted === undefined) {
      newCompleted = true;
    } else if (showCompleted === true) {
      newCompleted = false;
    } else {
      newCompleted = undefined;
    }

    setShowCompleted(newCompleted);
    const newFilters: TodoFilters = {
      ...filters,
      completed: newCompleted
    };
    setFilters(newFilters);
    loadTodos(newFilters);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setShowCompleted(undefined);
    const newFilters: TodoFilters = {};
    setFilters(newFilters);
    loadTodos(newFilters);
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Todo List ({totalCount})</span>
          {completedCount > 0 && <span className="text-sm text-muted-foreground">{completedCount} completed</span>}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search and Filter Controls */}
        <div className="flex gap-2 flex-wrap">
          <div className="flex-1 min-w-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search todos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10"
              />
            </div>
          </div>
          <Button variant={showCompleted !== undefined ? 'default' : 'outline'} size="sm" onClick={handleFilterToggle}>
            <Filter className="h-4 w-4 mr-1" />
            {showCompleted === undefined && 'All'}
            {showCompleted === true && 'Completed'}
            {showCompleted === false && 'Active'}
          </Button>
          {(searchTerm || showCompleted !== undefined) && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
            <Button variant="ghost" size="sm" onClick={clearError} className="text-red-600 hover:text-red-800">
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading todos...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && todos.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              {searchTerm || showCompleted !== undefined
                ? 'No todos match your filters'
                : 'No todos yet. Create your first todo!'}
            </p>
          </div>
        )}

        {/* Todo Items */}
        {!isLoading && todos.length > 0 && (
          <div className="space-y-3">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
