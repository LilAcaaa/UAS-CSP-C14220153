import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseClient";

export async function GET() {
    const supabase = await createClient();
    const { data, error } = await supabase
                                    .from('users')
                                    .select('*')
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
}

export async function POST(request: Request) {
    const supabase = await createClient();
    const datas= await request.json();
    
    const { data, error } = await supabase
                            .from('users')
                            .insert([
                                { name: datas.name, email: datas.email },
                            ])
                            .select()
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
}