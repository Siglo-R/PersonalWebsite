"use client"
import React, { useState } from 'react';
import HeaderBar from './Component/HeaderBar';
import { Inter } from 'next/font/google';
import { useUserLocation, UserLocationProvider } from '@/app/Component/Home/UserLocationContext';
import { BusinessContext } from '@/context/BusinessContext.js'
const inter = Inter({ subsets: ['latin'] });



export default function RootLayout({ children }) {
  const [businessContext, setBusinessContext] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  return (
    <BusinessContext.Provider value={{ businessContext, setBusinessContext, selectedBusiness, setSelectedBusiness }}>
      <UserLocationProvider>
        <LayoutContent>{children}</LayoutContent>
      </UserLocationProvider>
    </BusinessContext.Provider>
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
