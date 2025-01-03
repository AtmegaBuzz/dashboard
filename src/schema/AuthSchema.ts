import { z } from 'zod';


export const UserRegisterSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  website: z.string().optional(),
  did_str: z.string().min(1), 
  wallet_address: z.string().min(12),
  signature: z.string().min(8)
});