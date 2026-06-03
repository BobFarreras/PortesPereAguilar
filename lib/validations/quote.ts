import { z } from 'zod';

export const quoteFormSchema = z.object({
  product: z.enum(['portes', 'estructures', 'automatismes'], {
    required_error: 'required',
  }),
  doorType: z.string().optional(),
  structureType: z.string().optional(),
  width: z.number().min(1000, 'invalidDimension').max(12000, 'invalidDimension'),
  height: z.number().min(1000, 'invalidDimension').max(5000, 'invalidDimension'),
  material: z.string().min(1, 'required'),
  finish: z.string().min(1, 'required'),
  ralColor: z.string().optional(),
  accessories: z.array(z.string()).optional(),
  name: z.string().min(1, 'required').max(100),
  email: z.string().min(1, 'required').email('invalidEmail'),
  phone: z.string().min(1, 'required').max(20),
  message: z.string().max(2000).optional(),
  honeypot: z.string().max(0).optional(),
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;
