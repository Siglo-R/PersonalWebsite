"use client"
import React from 'react';
import HeaderBar from '../Component/HeaderBar';
import { Inter } from 'next/font/google';
import { useUserLocation, UserLocationProvider } from '../../context/UserLocationContext';

const inter = Inter({ subsets: ['latin'] });


export default function RootLayout({ children }) {
  return (
    <UserLocationProvider>
      <LayoutContent>{children}</LayoutContent>
    </UserLocationProvider>
  );
}

function LayoutContent({ children }) {
  const userLocation = useUserLocation();

  return (
    <html lang="en">
      <body className={inter.className}>
        <HeaderBar />
        {children}
      </body>
    </html>
  );
}
