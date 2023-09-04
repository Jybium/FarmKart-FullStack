import "./globals.css";
import type { Metadata } from "next";
import type { Author } from "next/dist/lib/metadata/types/metadata-types";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";

// const inter = Inter({ subsets: ["latin"] });

const author = "Asaolu James";

export const metadata: Metadata = {
  title: "Farmkart | A Place Where Farmers Meet Buyers.",
  description:
    "Farmkart is an online market place where farmers meet buyers for easy market of their product. Since the world is going digital now, it is important that we follow suit and utilize this advancement to our possible advantage. It is useful for both sellers and buyer; uyers get to buy fresh farm produce at more discounted price, buyer get to sell faster through high visibility",
  keywords:
    "farm, agric ,farm produce, fresh, product, organic, agricultural, buyers, sellers, business, farm business, buy, sell, agricultural",
  authors: author as Author,
  viewport: "width=device-width, initial-scale=1",
  icons: "./favicon.ico",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* <Header /> */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
