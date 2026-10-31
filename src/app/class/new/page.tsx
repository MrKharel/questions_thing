import { CreateClass } from "@/modules/class/new/create-class";
import { redirect } from "next/navigation";

export default async function NewClass({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;

  if (tab === "join") {
    return <>join clas form</>;
  }
  if (tab == "create") {
    return <CreateClass />;
  }

  redirect("/class/new?tab=join");
}
