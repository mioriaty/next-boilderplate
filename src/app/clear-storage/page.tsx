'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/shared/components/ui/button';

export default function ClearStoragePage() {
  const [storageCleared, setStorageCleared] = useState(false);

  useEffect(() => {
    // Clear any existing local storage data
    if (typeof window !== 'undefined') {
      localStorage.removeItem('todo-store');
      localStorage.removeItem('todo-storage');
      setStorageCleared(true);
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Storage Cleanup</h1>

      {storageCleared ? (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <p className="text-green-600">✅ Local storage cleared successfully!</p>
            <p className="text-sm text-green-500 mt-2">All todo data will now be loaded from the Supabase database.</p>
          </div>

          <Button onClick={() => (window.location.href = '/')} className="w-full">
            Go to Todo App
          </Button>
        </div>
      ) : (
        <div className="text-center py-8">
          <p>Clearing local storage...</p>
        </div>
      )}
    </div>
  );
}
