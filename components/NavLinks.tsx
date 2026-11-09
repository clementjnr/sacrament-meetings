 "use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
export default function NavLinks(){const path=usePathname();const active=path==="/meetings"||(path.startsWith("/meetings/")&&path!=="/meetings/current");return <nav className="nav-links" aria-label="Meeting navigation"><Link href="/meetings" aria-current={active?"page":undefined}>All meetings</Link><Link href="/meetings/current" aria-current={path==="/meetings/current"?"page":undefined}>Current Sunday</Link></nav>;}
