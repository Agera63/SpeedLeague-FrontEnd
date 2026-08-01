import "@/app/globals.css";
import Navbar from "@/../packages/ui/TopNavbar/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar pageName="Home" />
      {children}
    </>
  );
}
