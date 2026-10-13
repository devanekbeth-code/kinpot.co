import type { Metadata } from "next";
import { Cantarell, Michroma } from "next/font/google";
import "./globals.css";

const cantarell = Cantarell({
  variable: "--font-cantarell",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const michroma = Michroma({
  variable: "--font-michroma",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "KINPOT",
  description: "KINPOT is coming soon.",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cantarell.variable} ${michroma.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
