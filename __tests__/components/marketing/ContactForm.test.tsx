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

  it('mostra errors de validació si s\'envia buit', async () => {
    render(<ContactForm />);
    const form = screen.getByTestId('contact-form');

    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getAllByText(/errors\.required/i).length).toBeGreaterThan(0);
    });
  });

  it('mostra l\'estat d\'èxit després d\'enviar correctament', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true });

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Test message' } });

    fireEvent.submit(screen.getByTestId('contact-form'));

    expect(await screen.findByText(/successTitle/i, {}, { timeout: 3000 })).toBeInTheDocument();

    (global.fetch as jest.Mock).mockRestore();
  });
});
