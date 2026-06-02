// __tests__/components/marketing/ContactForm.test.tsx
import ContactForm from '@/components/marketing/ContactForm';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';


describe('ContactForm Component', () => {
  it('renderitza tots els camps requerits del formulari', () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('renderitza el botó d\'enviament', () => {
    render(<ContactForm />);
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('mostra l\'estat d\'èxit després d\'enviar (simulació)', async () => {
    render(<ContactForm />);
    const form = screen.getByTestId('contact-form');

    // Simulem l'enviament del formulari
    fireEvent.submit(form);

    // Verifiquem que el missatge d'èxit apareix
    expect(await screen.findByText(/successTitle/i, {}, { timeout: 2000 })).toBeInTheDocument();
  });
});
