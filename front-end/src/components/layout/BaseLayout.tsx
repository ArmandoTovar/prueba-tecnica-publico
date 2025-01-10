import React from 'react';
import ThemeToggle from './ThemeToggle.tsx'

export default function  BaseLayout  ({ children }) : React.FC<{ children: React.ReactNode }>{
  return (
    <div className="min-h-screen ">
      <header className="p-4 shadow-md">
        <ThemeToggle/>
        <h1 className="text-2xl font-bold">Gestión de Productos</h1>
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
};
