import { unknown, z } from "zod";

export const ApiRes = <T extends z.ZodType>(data: T) => z.object({
     timestamp: z.union([z.date(), z.string()]),
     success: z.boolean(),
     message: z.string(),
     details: z.string(),
     path: z.string(),
     data: data,
});

export const ErrorRes = <T extends z.ZodType>(error: T) => z.object({
     timestamp: z.union([z.date(), z.string()]),
     success: z.boolean(),
     message: z.string(),
     error: error,
     path: z.string(),
     details: z.string().optional().default(""),
     help: z.string().optional().default(""),
});

export const ValidationErrorRes = z.object({
     field: z.string(),
     message: z.string(),
});


const errorWithoutDetails = ErrorRes(z.unknown());
const errorValidation = ErrorRes(z.array(ValidationErrorRes));

export type ValidationErrorResType = z.infer<typeof ValidationErrorRes>;
export type ErrorValidationResType = z.infer<typeof errorValidation>;
export type ErrorResType = z.infer<typeof errorWithoutDetails>;