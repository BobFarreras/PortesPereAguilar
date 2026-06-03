import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(1, 'required').max(100),
  email: z.string().min(1, 'required').email('invalidEmail'),
  phone: z.string().max(20).optional().or(z.literal('')),
  message: z.string().min(1, 'required').max(2000),
  honeypot: z.string().max(0).optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
