'use client';

import { useState } from 'react';

import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';

import { useTodoStore } from '../store';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const { toggleTodo, deleteTodo, updateTodo } = useTodoStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');

  const handleToggle = async () => {
    await toggleTodo(todo.id);
  };

  const handleDelete = async () => {
    await deleteTodo(todo.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    await updateTodo(todo.id, {
      title: editTitle,
      description: editDescription
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setIsEditing(false);
  };

  return (
    <div className="flex items-center space-x-3 p-4 border rounded-lg">
      <Checkbox checked={todo.completed} onCheckedChange={handleToggle} className="flex-shrink-0" />

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="space-y-2">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Todo title"
            />
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Todo description (optional)"
              rows={2}
            />
            <div className="flex space-x-2">
              <Button onClick={handleSave} size="sm">
                Save
              </Button>
              <Button onClick={handleCancel} variant="outline" size="sm">
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-500' : ''}`}>{todo.title}</h3>
            {todo.description && (
              <p className={`text-sm text-gray-600 ${todo.completed ? 'line-through' : ''}`}>{todo.description}</p>
            )}
          </div>
        )}
      </div>

      {!isEditing && (
        <div className="flex space-x-2">
          <Button onClick={handleEdit} variant="outline" size="sm">
            Edit
          </Button>
          <Button onClick={handleDelete} variant="destructive" size="sm">
            Delete
          </Button>
        </div>
      )}
    </div>
  );
}
