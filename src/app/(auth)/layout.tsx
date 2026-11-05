import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function AuuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="flex justify-between items-center px-4 md:px-12 py-4">
        <h2 className="text-xl font-medium">QuestionsThing</h2>
        <ThemeToggle />
      </header>
      <div className="pt-20 px-4 *:mx-auto *:max-w-[400px]">{children}</div>
    </>
  );
}
