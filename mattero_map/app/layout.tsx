import "./globals.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <MantineProvider
          theme={{
            primaryColor: "blue",
          }}
        >
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
