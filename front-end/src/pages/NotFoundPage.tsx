import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold ">404</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-lg  mb-4">
            La página que buscas no existe.
          </p>
          <Button onClick={() => navigate('/')} className="w-full">
            Volver al inicio
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFoundPage;
