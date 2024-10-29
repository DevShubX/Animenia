import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ContextProvider from "@/GlobalContext/ContextProvider";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/Theme/theme-provider";

export const metadata: Metadata = {
  title: "Animenia",
  description: "Animenia is a anime streaming and discovery website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${gilroyMedium.variable}
          ${gilroyBold.variable}
          ${gilroyRegular.variable}
          ${gilroyLight.variable}
          ${gilroyHeavy.variable}
          antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ContextProvider>
            <Toaster />
            {children}
          </ContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

const gilroyMedium = localFont({
  src: "./fonts/Gilroy-Medium.ttf",
  variable: "--font-gilroy-medium",
});
const gilroyBold = localFont({
  src: "./fonts/Gilroy-Bold.ttf",
  variable: "--font-gilroy-bold",
});
const gilroyRegular = localFont({
  src: "./fonts/Gilroy-Regular.ttf",
  variable: "--font-gilroy-regular",
});
const gilroyLight = localFont({
  src: "./fonts/Gilroy-Light.ttf",
  variable: "--font-gilroy-light",
});
const gilroyHeavy = localFont({
  src: "./fonts/Gilroy-Heavy.ttf",
  variable: "--font-gilroy-heavy",
});
