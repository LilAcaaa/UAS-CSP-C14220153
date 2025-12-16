"use client";
import Layout from "@/app/components/layout";
import { useSearchParams } from 'next/navigation';

export default function SigninPage() {
    const searchParams = useSearchParams();
    const errorMsg = searchParams.get('message');

    return (
        <Layout>
            <h1>Signin Page</h1>
            {errorMsg && (
                <p className="mb-4 p-2 rounded bg-red-100 text-red-700">
                    {errorMsg}
                </p>
            )}
            <form method="POST" action="/dashboard">
                <input type="text" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <button className="bg-blue-500" type="submit">Sign In</button>
            </form>
        </Layout>
    );
}