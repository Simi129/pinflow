import React from 'react';
import { Sidebar } from '../components/Navigation';
import CreatePinForm from '../components/dashboard/CreatePinForm';

export default function CreatePinPage() {
  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar />

      <main className="flex-1 ml-64 p-12 max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">Create New Pin</h1>
          <p className="text-on-surface-variant max-w-2xl">
            Craft a beautiful pin to inspire your audience. Use high-resolution images and clear descriptions for better reach.
          </p>
        </header>

        {/* Реальная форма из Next.js — загрузка изображений, борды, публикация, планирование */}
        <CreatePinForm />
      </main>
    </div>
  );
}