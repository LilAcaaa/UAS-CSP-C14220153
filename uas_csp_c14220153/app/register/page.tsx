"use client";
import { formAction } from "./action";
import { useActionState } from 'react'
import Layout from "@/app/components/layout";

const initialState = {
    success: false,
    message: '',
}

export default function SignupPage() {
    const [state, dispatch,isPending] = useActionState(formAction, initialState)

    return (
        <Layout>
            <h1>Signup Page</h1>
            {state.message && (
                <p className={`mb-4 p-2 rounded ${state.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {state.message}
                </p>
            )}
            <form action={dispatch}>
                <input type="text" name="email" placeholder="Username" />
                <input type="password" name="password" placeholder="Password" />
                <button type="submit">Sign Up</button>
            </form>
        </Layout>
    );
}