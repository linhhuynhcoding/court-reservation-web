"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { AddAccountPayload, AddAccountPayloadSchema } from "@/schemas/auth.schema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAccessTokenFromLocalStorage, handleErrorApi } from "@/lib/utils";
import { useAddAccountMutation } from "@/queries/useAccount";
import { toast } from "sonner";

export function AddManagerForm() {

  const useAddManager = useAddAccountMutation();

  const form = useForm<AddAccountPayload>({
    resolver: zodResolver(AddAccountPayloadSchema),
    defaultValues: {
      username: "",
      email: "",
      name: "",
      password: "",
      role: "COURT_MANAGER",
      orgaId: 0
    },
  });

  const [submittedData, setSubmittedData] = useState<AddAccountPayload | null>(null);

  const onSubmit = async (data: AddAccountPayload) => {
    try {
      const token = getAccessTokenFromLocalStorage();
      const payload: AddAccountPayload = data;

      if (!payload || !token) {
        return;
      }

      const response = await useAddManager.mutateAsync({ payload, accessToken: token! });

      toast.success(response.payload.message);

    } catch (error) {
      handleErrorApi({ error })
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

        <FormField
          control={form.control}
          name="orgaId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization ID</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="123"
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Create Account</Button>
      </form>
    </Form>
  );
}
