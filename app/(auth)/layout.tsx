import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Poppins } from 'next/font/google'
import '../globals.css'

const poppins = Poppins({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] })

export const metadata = {
    title: 'Diskus',
    description: 'A place for all diskussions'
}

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <ClerkProvider>
            <html lang = "en">
                <body className = {`${poppins.className} bg-light-body-background h-screen flex justify-center items-center`}>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    )
}