import type { Metadata } from 'next';
import './globals.css';
import AntiDevTools from '../components/AntiDevTools';

export const metadata: Metadata = {
  title: 'AutoPulse - Automotive Review & Part Analyzer',
  description: 'Next-generation automotive intelligence, car performance reviews, and spare part analysis.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-white antialiased selection:bg-cyan-500 selection:text-black">
        <AntiDevTools />
        {children}
      </body>
    </html>
  );
}
