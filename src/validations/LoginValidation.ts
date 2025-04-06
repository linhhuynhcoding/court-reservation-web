import { z } from 'zod';

export const LoginValidation = z.object({
  username: z.string().min(8).max(20),
  password: z.string().regex(RegExp("^(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?])[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?]+$")),
});