import type { Metadata } from 'next'
import './globals.css'
import RobotLayoutWrapper from '@/components/RobotLayoutWrapper';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'AI Mall | The Unified Marketplace for Enterprise-Grade AI',
  description: 'AI Mall is a multi-layer intelligent commerce fabric that powers the next wave of digital transformation. Discover, deploy, and scale AI solutions in one connected ecosystem.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body suppressHydrationWarning>
        <RobotLayoutWrapper />
        
        {/* Global Navbar */}
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000, pointerEvents: 'none' }}>
           <div style={{ pointerEvents: 'auto' }}>
              <Navbar />
           </div>
        </div>

        <div className="page-wrapper">
          {children}
        </div>
      </body>
    </html>
  )
}
