import { StadiumDetail } from "@/components/organisms/StadiumDetail";
import { Suspense } from "react";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ from: string | undefined }>;
}) {
  const { id } = await params;
  const { from } = await searchParams;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StadiumDetail from={from} id={id}></StadiumDetail>
    </Suspense>
  );
}
