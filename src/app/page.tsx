import { ThemeSwitcher } from "@/components/theme-switcher";
import { Typixie } from "@/components/typixie";

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-between p-8 md:p-24">
      <Typixie />

      <ThemeSwitcher />
    </div>
  );
}
