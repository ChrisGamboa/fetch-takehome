import { Geist, Geist_Mono } from "next/font/google";
import "@/globals.css";

export const metadata = {
  title: "Fetch Take Home Project",
  description: "Website to look at dogs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
