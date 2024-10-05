import Link from "next/link";

export function Footer() {
    return <>
    <footer className="bg-gray-600 text-white text-right px-8 py-4 h-[10%]">
        <p>For Learning Purpose © 
            <Link href="https://jsinfinitude.wordpress.com/" className="underline ml-1">
             Jeya Suriya Muthumari </Link></p>
    </footer>
    </>
}