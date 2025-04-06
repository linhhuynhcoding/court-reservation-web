"use client";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { z } from "zod";
import { LoginValidation } from "../validations/LoginValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import React, { useRef } from "react";

export function FormLogin() {
  const form = useForm<z.infer<typeof LoginValidation>>({
    resolver: zodResolver(LoginValidation),
    defaultValues: {
      username: "",
      password: "",
    }
  })

  const passwordField = useRef<HTMLInputElement>(null);

  function onSubmit(values: z.infer<typeof LoginValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("values: ", values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
        className={`flex flex-col p-12 rounded-4xl gap-6 border-2 border-sky-600 
                justify-center justify-items-center bg-white
                w-140 shadow-2xl shadow-sky-900/50 text-sky-950`}
      >
        <div className="text-center text-4xl font-bold">
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
                      e.preventDefault();
                      if (e.key === "Enter") {
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
                  <Input {...field} ref={(e: HTMLInputElement) => {
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

        <Button className="w-full" type="submit" onKeyDown={() => {}} >Login now</Button>

      </form>
    </Form>
  );
}