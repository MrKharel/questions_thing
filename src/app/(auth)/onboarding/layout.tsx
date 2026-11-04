import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function AuthOnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="px-4 py-2 self-center w-full max-w-[1200px] flex justify-between items-center">
        <h2 className="tracking-tight font-bold text-lg">QuestionsThing</h2>
        <div>
          <ThemeToggle />
        </div>
      </header>
      <div className="self-center w-screen mt-20 *:mx-auto">{children}</div>;
    </>
  );
}
