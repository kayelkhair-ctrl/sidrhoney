import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Behaviors from "@/components/Behaviors";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <Behaviors />
    </>
  );
}
