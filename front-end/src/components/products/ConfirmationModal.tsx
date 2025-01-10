import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ConfirmationModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

export default function ConfirmationModal  ({
  isOpen,
  message,
  onClose,
}) {
return (

  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Finalizado</DialogTitle>
        <DialogDescription>{message}</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button onClick={onClose}>Aceptar</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)
};

