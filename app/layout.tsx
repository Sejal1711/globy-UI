import "./globals.css";

export const metadata = {
  title: "Semantic Photo Search",
  description: "Search your photos using natural language.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {children}
      </body>
    </html>
  );
}
