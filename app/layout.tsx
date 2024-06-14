import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { ModalProvider } from "../components/providers/modal-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { ThemeProvider } from "@/components/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jotion",
  description: "A way to connect and collaborate. Fast and easy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ConvexClientProvider>
        <EdgeStoreProvider>
          <Toaster position="bottom-center"/>
          <ModalProvider/>
          <body className={inter.className}>{children}</body>
        </EdgeStoreProvider>
      </ConvexClientProvider>
    </html>
  );
}
