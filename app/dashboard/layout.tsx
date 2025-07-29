import { AppProviders } from '@/providers';
import '../globals.css'
import type { Metadata } from "next";
import { AppSidebar } from '@/components/sidebar';

export const metadata: Metadata = {
  title: 'Coffee Shop CMS',
  description: 'Content Management System Dashboard for the Coffee Shop',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html lang="en" suppressHydrationWarning>
      // <body>
      <>
        <AppProviders>
          <AppSidebar>
            {children}
          </AppSidebar>
        </AppProviders>
        </>
    //   </body>
    // </html>
  )
}
