import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";


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
    <html lang="en">
      <body
        className={`
          ${gilroyMedium.variable}
          ${gilroyBold.variable}
          ${gilroyRegular.variable}
          ${gilroyLight.variable}
          ${gilroyHeavy.variable}
          antialiased`}
          >
        {children}
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
