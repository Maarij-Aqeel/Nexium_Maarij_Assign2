import Link from "next/link"


export default function Navigation()
{

    return (
        <nav className="flex gap-6 px-4">
        <Link href='/' className="text-2xl hover:scale-105 transition-transform duration-300 text-gray-900 hover:text-indigo-600">Home</Link>
        <Link href='/about' className="text-2xl hover:scale-105 transition-transform duration-300 text-gray-900 hover:text-indigo-600">About</Link>
        </nav>
    )
}