import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import { Toaster } from 'react-hot-toast'
import PrelineScript from '@/util/PrelineScript';
import { UIProvider } from '@/util/UIProvider';

export const metadata: Metadata = {
  title: 'Melba',
  description: 'Welcome to Melba!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='scroll-smooth dark'>
      <head>
        <link href="https://fonts.googleapis.com/css?family=Josefin+Sans:400,500,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Nothing+You+Could+Do&display=swap" rel="stylesheet" />
      </head>
      <body className="font-poppins bg-[url('/assets/bg_dark.jpg')] bg-repeat bg-fixed">
        <UIProvider>
          <main>
           
              <Toaster />
              <Header />
              {children}
           
          </main>
        </UIProvider>
      </body>
      <PrelineScript />
    </html>
  )
}