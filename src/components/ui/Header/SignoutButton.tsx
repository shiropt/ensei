"use client";
import { signout } from "@/utils/supabase/auth/actions";
import Link from "next/link";
import classes from "./header.module.css";

export const SignoutButton = () => {
  return (
    <Link className={classes.signout} href="/signin" onClick={() => signout()}>
      ログアウト
    </Link>
  );
};
