import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: '교회 포털',
    description: '교회 정보 및 설교 공유 플랫폼',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="ko">
        <body className={`${inter.className} min-h-screen`}>
        {/* Navigation Component가 들어갈 자리 */}
        <main className="container mx-auto px-4">
            {children}
        </main>
        {/* Footer Component가 들어갈 자리 */}
        </body>
        </html>
    )
}