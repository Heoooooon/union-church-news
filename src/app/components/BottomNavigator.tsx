"use client"; // 클라이언트 컴포넌트로 지정 (네비게이션 클릭 시 인터랙션이 필요하므로)
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNavigator() {
    const pathname = usePathname();

    const navItems = [
        { href: "/", label: "Home" },
        { href: "/gallery", label: "Gallery" },
        { href: "/about", label: "About" }
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around items-center h-12">
            {navItems.map((item) => (
                <Link href={item.href} key={item.href} className={`flex-1 text-center ${pathname === item.href ? "font-bold" : ""}`}>
                    {item.label}
                </Link>
            ))}
        </nav>
    );
}