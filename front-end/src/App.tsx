import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {ProductListPage} from '@/pages/product';
import {ProductFormPage} from '@/pages/product';
import NotFoundPage from '@/pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductListPage />} />
      <Route path="/products/new" element={<ProductFormPage />} />
      <Route path="/products/:id" element={<ProductFormPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
