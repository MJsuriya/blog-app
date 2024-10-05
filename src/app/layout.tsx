import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./components/Header/header";
import { Footer } from "./components/Footer/footer";

export const metadata: Metadata = {
  title: "Blog App",
  description: "Blog App Using DatoCMS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="h-screen flex flex-col bg-gray-100"
      >
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
