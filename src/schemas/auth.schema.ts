import { z } from 'zod';
import { AccountRes } from './account.schema';
import { ApiRes } from './global.schemas';

export const LoginBody = z.object({
     username: z.string().min(8).max(20),
     password: z.string().regex(RegExp("^(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?])[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?]+$")),
});

export const LoginRes = ApiRes(
     z.object({
          accessToken: z.string(),
          refreshToken: z.string(),
          account: AccountRes,
     }));

export const RegisterBody = z.object({
     username: z.string().min(8).max(20),
     email: z.string().email(),
     name: z.string(),
     password: z.string().regex(RegExp("^(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?])[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?]+$")),
     confirmPassword: z.string(),
})
     .refine((data) => data.password === data.confirmPassword, {
          message: "Passwords don't match",
     });

export const JwtTokenRes = z.object({
     data: z.object({
          accessToken: z.string(),
          refreshToken: z.string()
     }),
     message: z.string()
})

export type LoginBodyType = z.infer<typeof LoginBody>;
export type RegisterBodyType = z.infer<typeof RegisterBody>;
export type JwtTokenResType = z.infer<typeof JwtTokenRes>;

export type LoginResType = z.infer<typeof LoginRes>;