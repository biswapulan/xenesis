import "./globals.css";

const desc =
  "Coming soon. Organized by Department of Computer Science & Engineering, Government College of Engineering, Keonjhar";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "XENESIS 4.0",
  description: desc,
  openGraph: { title: "XENESIS 4.0", description: desc, type: "website" },
  twitter: { card: "summary_large_image", title: "XENESIS 4.0", description: desc },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
