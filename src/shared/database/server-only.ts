// Server-only utility to prevent client-side database access
export function serverOnly() {
  if (typeof window !== 'undefined') {
    throw new Error('This function can only be called on the server side');
  }
}

// Type guard to ensure server-side execution
export function isServer(): boolean {
  return typeof window === 'undefined';
}
