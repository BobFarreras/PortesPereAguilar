import { NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validations/contact';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      return NextResponse.json(
        { errorKey: firstError?.message ?? 'serverError' },
        { status: 400 }
      );
    }

    const { name, email, phone, message, honeypot } = parsed.data;

    if (honeypot) {
      return NextResponse.json({ success: true });
    }

    // TODO: Integrar amb servei d'email (Resend, SendGrid, Nodemailer, etc.)
    console.log('Formulari rebut:', { name, email, phone, message });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { errorKey: 'serverError' },
      { status: 500 }
    );
  }
}
