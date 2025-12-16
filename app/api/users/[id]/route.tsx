import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseClient";


export async function GET(request: Request,context: { params: { id: string } }) {
    const supabase = await createClient();
    const { id }= await context.params;
    const { data, error } = await supabase
                                        .from('users')
                                        .select('*')
                                        .eq('id',id)
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
}