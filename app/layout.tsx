import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const geist = Geist({ subsets: ["latin"] });
export const metadata: Metadata = { title: "Sacrament Meeting Planner", description: "View and print current and past sacrament meeting programs." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body className={geist.className}><Header/><main>{children}</main><Footer/></body></html>; }
