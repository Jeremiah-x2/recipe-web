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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/config/firebase";
import { useRouter } from "next/navigation";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import Cookies from "js-cookie";

const signUpSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be 2 characters minmum" }),
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "Password must have a minimum of 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type formSchemaType = z.infer<typeof signUpSchema>;

export default function SignIn() {
  const router = useRouter();
  const form = useForm<formSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function signUpWithPassword(values: formSchemaType) {
    const { email, password } = values;

    try {
      const createUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const collectionRef = doc(db, "users", createUser.user.uid);
      const userDoc = await setDoc(collectionRef, {
        avatar: "",
        bio: "",
        username: values.name,
        createdAt: serverTimestamp(),
      });
      Cookies.set("userToken", await createUser.user.getIdToken());
      console.log(userDoc);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="min-h-[100dvh] flex items-center">
      <div className="w-full">
        <div className="mb-[57px]">
          <h4 className="font-semibold text-3xl">Create an account</h4>
          <p className="font-normal">
            Let&apos;s help you set up your account, it won&apos;t take long.
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(signUpWithPassword)}
            className="w-full max-w-[600px]"
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mb-[30px]">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter Name"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                <FormItem className="mb-[30px]">
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
            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="my-5 text-xs text-secondary100">
              Accept Terms and Condition
            </div>

            <Button className="w-full font-semibold bg-primary100 text-white py-[18px]">
              Sign Up <ArrowRightIcon />
            </Button>
          </form>
        </Form>
        <AuthDivider />
        <ThirdPartyAuth />

        <p className="text-xs font-semibold text-center mt-12">
          Already a member?{" "}
          <Link href={"/auth/sign-in"} className="text-secondary100">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
