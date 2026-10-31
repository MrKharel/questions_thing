import { Navbar } from "@/components/navbar";

export default function NewClassLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar
        links={[
          { label: "Join class", url: "/class/new?tab=join" },
          { label: "Create Class", url: "/class/new?tab=create" },
        ]}
      />
      {children}
    </>
  );
}
