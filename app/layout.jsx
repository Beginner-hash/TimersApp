import "./globals.css";

export const metadata = {
  title: "LOCAL",
  description: "TIMER",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
