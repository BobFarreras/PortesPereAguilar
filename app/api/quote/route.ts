import { NextResponse } from 'next/server';
import { quoteFormSchema } from '@/lib/validations/quote';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = quoteFormSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      return NextResponse.json(
        { errorKey: firstError?.message ?? 'serverError' },
        { status: 400 }
      );
    }

    const { honeypot, ...quoteData } = parsed.data;

    if (honeypot) {
      return NextResponse.json({ success: true });
    }

    // TODO: Integrar amb servei d'email (Resend, SendGrid, Nodemailer, etc.)
    console.log('Pressupost rebut:', quoteData);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { errorKey: 'serverError' },
      { status: 500 }
    );
  }
}
