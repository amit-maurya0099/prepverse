import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "PrepVerse",
  description: "An AI-powered platform for mock interviews",
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className={`dark ${monaSans.variable} antialiased pattern`}>
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
