import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConfirmationModal } from '@/components/products';
import '@testing-library/jest-dom';


jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

jest.mock('@/components/ui/dialog', () => ({
  Dialog: ({ open, children, onOpenChange }: any) => (
    open ? <div>{children}</div> : null
  ),
  DialogContent: ({ children }: any) => <div>{children}</div>,
  DialogHeader: ({ children }: any) => <div>{children}</div>,
  DialogTitle: ({ children }: any) => <h2>{children}</h2>,
  DialogDescription: ({ children }: any) => <p>{children}</p>,
  DialogFooter: ({ children }: any) => <div>{children}</div>,
}));

describe('ConfirmationModal', () => {
  const defaultProps = {
    isOpen: true,
    message: 'Operación completada con éxito.',
    onClose: jest.fn(),
  };

  it('renders correctly when open', () => {
    render(<ConfirmationModal {...defaultProps} />);
    expect(screen.getByText('Finalizado')).toBeInTheDocument();
    expect(screen.getByText('Operación completada con éxito.')).toBeInTheDocument();
    expect(screen.getByText('Aceptar')).toBeInTheDocument();
  });

  it('calls onClose when the button is clicked', () => {
    render(<ConfirmationModal {...defaultProps} />);
    fireEvent.click(screen.getByText('Aceptar'));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('does not render when isOpen is false', () => {
    render(<ConfirmationModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByText('Finalizado')).not.toBeInTheDocument();
  });
});
