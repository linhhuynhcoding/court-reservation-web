"use client";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { z } from "zod";
import { LoginBody, LoginBodyType } from "@/src/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import React, { useRef } from "react";
import Link from "next/link";
import { motion } from "motion/react"
import authApi from "../apis/auth";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from 'next/navigation'
import { handleErrorApi } from "../lib/utils";
import { toast } from "sonner";

export function FormLogin() {
  const router = useRouter();
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      username: "",
      password: "",
    }
  })

  const passwordField = useRef<HTMLInputElement>(null);

  async function onSubmit(values: LoginBodyType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("values: ", values);

    try {
      const response = await authApi.clogin(values);
      console.log(response);
      toast.success("Login successfully!");
      setTimeout(() => { }, 2000);

      router.push("/");
    }
    catch (e) {
      console.log(e);
      handleErrorApi({
        error: e,
        setError: form.setError,
        duration: 2000
      }
      );
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
            <h1>LOGIN</h1>
          </div>
          <div className="text-left">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Type your username..." className="rounded-xm"
                      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          passwordField.current?.focus();
                        }
                      }} ></Input>
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} ref={(e: HTMLInputElement) => {
                      field.ref(e);
                      if (e) {
                        passwordField.current = e;
                      }
                    }} placeholder="Password"></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col content-center items-center justify-center gap-2 mt-2">
            <Button className="w-fit pl-20 pr-20 rounded-none bg-sky-600 font-bold text-white hover:bg-sky-500" type="submit" >
              SUBMIT
            </Button>
            <span className="text-sm">Don&apos;t have an account? <Link className="text-primary italic font-semibold underline" href="/auth/register">Register here</Link></span>
          </div>
        </form>
      </Form>
    </motion.div>

  );
}