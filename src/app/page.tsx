'use client';

import { UserForm } from '@/libs/components/forms/user-form';
import { Button } from '@/libs/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/libs/components/ui/card';

/**
 * Home page component demonstrating the application features
 */
export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-md">
          <h1 className="mb-8 text-3xl font-bold text-center">Next.js Core App</h1>

          <Card>
            <CardHeader>
              <CardTitle>User Registration</CardTitle>
              <CardDescription>Complete the form below to create your account</CardDescription>
            </CardHeader>
            <CardContent>
              <UserForm
                onSubmit={(data) => {
                  console.log('Form submitted:', data);
                }}
              />
            </CardContent>
          </Card>

          <div className="mt-8 flex gap-4 justify-center">
            <Button variant="default">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="destructive">Destructive Button</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
