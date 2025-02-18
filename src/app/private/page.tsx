import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/auth/server";

export default async function PrivatePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/signin");
  }

  return <p>Hello {data.user.email}</p>;
}
