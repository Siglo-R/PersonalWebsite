"use client"
import { useEffect } from 'react'
import './globals.css'
import { Inter } from 'next/font/google'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <body className={inter.className}>
        {children}</body>
    </html>
  )
}
