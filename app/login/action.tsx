'use server'
import { createClient } from '@/lib/supabaseClient'
import { redirect } from 'next/navigation';

export type SigninState = {
    success: boolean;
    message: string;
}

export async function formAction(prevState: SigninState, formData: FormData) {
    const supabase = await createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error){ 
        return {
            success: false,
            message: error.message
        }
    }
    redirect('/dashboard');
    // return {
    //     success: true,
    //     message: 'Sign In berhasil!'
    // }
}
