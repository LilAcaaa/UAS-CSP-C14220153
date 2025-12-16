"use client";
import Link from "next/link";
import { useState,useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";


export default function Header() {
    const [state, setState] = useState(false);
    

    function handleSignOutClick() {
        // Sign out logic here
        fetch('/api/signout', { method: 'POST' })
            .then(() => {
                window.location.href = '/login';
            });
    }
     // 2. Setup Supabase Client untuk Browser
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // 3. Cek User saat halaman dimuat dan subscribe perubahan auth
    useEffect(() => {
        const checkUser = async () => {
            // First try client-side auth (works if session is in browser)
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setState(true);
                return;
            }
            // Fallback: ask server (session cookie is only available server-side)
            try {
                const res = await fetch('/api');
                if (res.ok) {
                    const data = await res.json();
                    if (data.user) setState(true);
                }
            } catch (e) {
                // ignore
            }
        };
        checkUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setState(Boolean(session?.user));
        });

        return () => {
            subscription?.unsubscribe && subscription.unsubscribe();
        };
    }, []);

    return (
        <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6">
            <div className="flex items-center shrink-0 text-white mr-6">
                <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
                <span className="font-semibold text-xl tracking-tight">Employee Portal</span>
            </div>
            <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 border rounded text-blue-200 border-blue-400 hover:text-white hover:border-white">
                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                </button>
            </div>
            <div className="w-full block grow lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:grow">
                    <Link href="/" className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4">Home</Link>
                    { !state 
                        ? (
                                <>
                                    <Link href="/login" className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4">Sign In</Link>
                                    <Link href="/register" className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4">Sign Up</Link>
                                </> 
                        ) : null
                    }
                    { state ?
                        (
                            <Link href="#" onClick={handleSignOutClick} className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white">Sign Out</Link>
                        ) : null
                    }
                    </div>
            </div>
        </nav>
    );
}
