"use client";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import Link from "next/link";
import { Box } from "@mui/material";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const pages = [
    {
      title: "Form",
      href: "/",
    },
    {
      title: "OTP",
      href: "/otp",
    },
    {
      title: "Transfer",
      href: "/transfer",
    },
  ];
  return (
    <html lang="en">
      <AppRouterCacheProvider>
        <body>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 4,
              gap: "1rem",
            }}
          >
            {pages.map((page, i) => (
              <Link
                key={i}
                href={page.href}
                style={{
                  color: pathname === page.href ? "blue" : "black",
                  textDecoration: pathname === page.href ? "underline" : "none",
                  fontWeight: pathname === page.href ? "bold" : "normal",
                }}
              >
                {page.title}
              </Link>
            ))}
          </Box>
          {children}
        </body>
      </AppRouterCacheProvider>
    </html>
  );
}
