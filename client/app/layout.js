import { Manrope } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata = {
  title: "VibeMood | Everyday style, made easy",
  description: "Shop VibeMood fashion for men, women, and kids.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
