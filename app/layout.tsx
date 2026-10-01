import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smile Dental Clinic — A healthier smile. A calmer visit. | Concept demo",
  description:
    "Self-initiated concept demo: bilingual dental clinic site with treatment discovery and a guided demo booking enquiry. Not a live clinic.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
