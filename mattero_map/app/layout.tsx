import "@mantine/core/styles.css"; // ★ Mantine v7 なら必須

import type { ReactNode } from "react";
import Providers from "./providers";
import AppShellLayout from "../components/AppShellLayout";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <Providers>
          <AppShellLayout>{children}</AppShellLayout>
        </Providers>
      </body>
    </html>
  );
}
