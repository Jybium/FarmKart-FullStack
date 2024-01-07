import "./globals.css";
import type { Metadata } from "next";
import type { Author } from "next/dist/lib/metadata/types/metadata-types";
import Footer from "./components/Footer";
import AuthProvider from "@/app/Context/AuthContext";
import ToastProvider from "./components/ToastContainer";

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
      {/* <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </Head> */}
      <body className="Hide">
        {/* <Header /> */}
        <ToastProvider>
          <AuthProvider>{children}</AuthProvider>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
