import { z } from 'zod'

const configSchema = z.object({
     NEXT_PUBLIC_SERVER_URL: z.string(),
     //   NEXT_PUBLIC_API_ENDPOINT: z.string(),
     //   NEXT_PUBLIC_URL: z.string()
})

const configProject = configSchema.safeParse({
     NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,

     // NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
     // NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL
})
if (!configProject.success) {
     console.error(configProject.error.issues)
     throw new Error('Các giá trị khai báo trong file .env không hợp lệ')
}

const envConfig = configProject.data
console.log(envConfig);
export default envConfig