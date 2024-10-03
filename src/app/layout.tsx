import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import { SavedRecipesProvider, UserProvider } from "@/utils/contexts";
import Login from "@/components/Login";
import LoginWrapper from "@/components/LoginWrapper";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Meal Mate",
    description: "Find your favourite recipe!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <Header />
                <UserProvider>
                    <SavedRecipesProvider>
                        <LoginWrapper children={children} />
                    </SavedRecipesProvider>
                </UserProvider>
            </body>
        </html>
    );
}
