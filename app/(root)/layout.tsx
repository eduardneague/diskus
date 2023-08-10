import '../globals.css'
import type { Metadata } from 'next'
import { ClerkProvider } from "@clerk/nextjs";
import { Poppins } from 'next/font/google'

import Topbar from '@/components/shared/TopBar';
import LeftSideBar from '@/components/shared/LeftSideBar';
import RightSideBar from '@/components/shared/RightSideBar';
import BottomBar from '@/components/shared/BottomBar';

const poppins = Poppins({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] })

export const metadata: Metadata = {
  title: 'Diskus',
  description: 'A place for all diskussions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${poppins.className} flex flex-col justify-center items-center w-full h-screen bg-light-body-background`}>

          <Topbar/>

          <div className = "FLEX-WRAPPER flex w-full md:w-[90%] md:h-[80%] h-full">
            <LeftSideBar/>
            <main className = "flex justify-between">

              <section>
                <div className = "max-w-4xl">
                  {children}
                </div>
              </section>

            </main>
            <RightSideBar/>
          </div>

          <BottomBar/>

        </body>

      </html>
    </ClerkProvider>
  )
}