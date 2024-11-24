"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import AuthDivider from "@/components/auth-divider";
import { ThirdPartyAuth } from "@/components/thirdparty-provider-auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type formSchemaType = z.infer<typeof signInSchema>;

export default function SignIn() {
  const router = useRouter();
  const form = useForm<formSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function signInWithPassword(values: formSchemaType) {
    const { email, password } = values;
    try {
      const signInUser = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      Cookies.set("userToken", await signInUser.user.getIdToken());
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <main className="min-h-[100dvh] max-w-[400px] flex items-center">
      <div className="w-full">
        <div className="mb-[57px]">
          <h4 className="font-semibold text-3xl">Hello,</h4>
          <p className="font-normal">Welcome Back!</p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(signInWithPassword)}
            className="w-full max-w-[600px]"
          >
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mb-[30px]">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter Email"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="my-5">
              <Link
                href={"/auth/forgot-password"}
                className="text-xs text-secondary100"
              >
                Forgot password?
              </Link>
            </div>

            <Button className="w-full font-semibold bg-primary100 text-white py-[18px]">
              Sign In <ArrowRightIcon />
            </Button>
          </form>
        </Form>
        <AuthDivider />
        <ThirdPartyAuth />

        <p className="text-xs font-semibold text-center mt-12">
          Don&apos;t have an account?{" "}
          <Link href={"/auth/sign-up"} className="text-secondary100">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
