// __tests__/components/ui/MagicButton.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import MagicButton from '@/components/ui/MagicButton';

describe('MagicButton Component', () => {
    it('renderitza el botó amb el text proporcionat', () => {
        render(<MagicButton>Descobreix la Màgia</MagicButton>);
        const buttonElement = screen.getByRole('button', { name: /descobreix la màgia/i });
        expect(buttonElement).toBeInTheDocument();
    });

    it('crida la funció onClick quan es fa clic', () => {
        const handleClick = jest.fn();
        render(<MagicButton onClick={handleClick}>Clic Aquí</MagicButton>);

        const buttonElement = screen.getByRole('button', { name: /clic aquí/i });
        fireEvent.click(buttonElement);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('aplica la classe de variant primària per defecte', () => {
        render(<MagicButton>Primari</MagicButton>);
        const buttonElement = screen.getByRole('button', { name: /primari/i });
        // CORRECCIÓ: Afegim el /80 que és la classe real de Tailwind generada
        expect(buttonElement).toHaveClass('bg-blue-600/80');
    });
});