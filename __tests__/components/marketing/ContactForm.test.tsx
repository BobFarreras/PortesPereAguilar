// __tests__/components/marketing/ContactForm.test.tsx
import ContactForm from '@/components/marketing/ContactForm';
import { render, screen, fireEvent } from '@testing-library/react';


describe('ContactForm Component', () => {
  it('renderitza tots els camps requerits del formulari', () => {
    render(<ContactForm />);
    
    expect(screen.getByLabelText(/Nom complet/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correu electrònic/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Telèfon/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Com et podem ajudar/i)).toBeInTheDocument();
  });

  it('renderitza el botó d\'enviament', () => {
    render(<ContactForm />);
    expect(screen.getByRole('button', { name: /Enviar petició/i })).toBeInTheDocument();
  });

  it('mostra l\'estat d\'èxit després d\'enviar (simulació)', async () => {
    render(<ContactForm />);
    const form = screen.getByTestId('contact-form');
    
    // Simulem l'enviament del formulari
    fireEvent.submit(form);
    
    // Verifiquem que el missatge d'èxit apareix
    expect(await screen.findByText(/Missatge enviat correctament/i)).toBeInTheDocument();
  });
});