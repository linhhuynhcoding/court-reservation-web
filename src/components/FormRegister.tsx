"use client";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { RegisterBody, RegisterBodyType } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import React, { useRef } from "react";
import Link from "next/link";
import { motion } from "motion/react"
import authApi from "../apis/auth";
import { useRouter } from 'next/navigation'
import { handleErrorApi } from "../lib/utils";
import { toast } from "sonner";
import { useLoginMutation, useRegisterMutation } from "../queries/useAuth";

export function FormRegister() {
  const router = useRouter();
  const registerMutation = useRegisterMutation();
  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  })

  async function onSubmit(values: RegisterBodyType) {

    try {
      await registerMutation.mutateAsync(values);

      toast.success("Register successfully!");
      setTimeout(() => {
        router.push("\login");
      }, 2000);
    }
    catch (e) {

      handleErrorApi({
        error: e,
        setError: form.setError,
        duration: 2000
      });
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, z: -100, rotateX: -30, y: 100 }}
      animate={{ opacity: 1, scale: 1, z: 0, rotateX: 0, y: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      style={
        {
          transformStyle: "preserve-3d",
          transformPerspective: 800, // tạo chiều sâu
        }
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
          className={`flex flex-col p-8 rounded-4xl gap-4 border-2 border-sky-600 
                justify-center justify-items-center bg-white sm:w-140 w-100 shadow-2xl shadow-sky-900/50 text-sky-950`}
        >
          <div className="text-center text-4xl font-bold text-primary">
            <h1
              className="bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text"
            >ĐĂNG KÝ</h1>
          </div>
          <div className="text-left">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Tên của bạn</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Họ và tên..." className="rounded-xm"
                      ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="text-left">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Tên đăng nhập</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Điền tên đăng nhập..." className="rounded-xm"
                      ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="text-left">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Điền mail của bạn..." className="rounded-xm"
                       ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="text-left">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} placeholder="Mật khẩu của bạn"></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="text-left">
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Xác nhận mật khẩu</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} placeholder="Xác nhận mật khẩu"></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col content-center items-center justify-center gap-2 mt-2">
            <Button className={`w-fit pl-20 pr-20 rounded-none bg-sky-600 font-bold text-white hover:bg-sky-500 ${registerMutation.isPending ? 'bg-sky-500' : null}`} type="submit" >
              {
                registerMutation.isPending
                  ?
                  <div>
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                  </div>
                  : <></>
              }
              <span>
                SUBMIT
              </span>
            </Button>
            <span className="text-sm">Don&apos;t have an account? <Link className="text-primary italic font-semibold underline" href="/auth/register">Register here</Link></span>
          </div>
        </form>
      </Form>
    </motion.div>

  );
}