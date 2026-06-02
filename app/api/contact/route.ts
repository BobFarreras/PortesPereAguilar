import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Nom, email i missatge són obligatoris' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'El correu electrònic no és vàlid' },
        { status: 400 }
      );
    }

    // TODO: Integrar amb servei d'email (Resend, SendGrid, Nodemailer, etc.)
    console.log('Formulari rebut:', { name, email, phone, message });

    return NextResponse.json({ success: true, message: 'Missatge rebut correctament' });
  } catch {
    return NextResponse.json(
      { error: 'Error processant la petició' },
      { status: 500 }
    );
  }
}
