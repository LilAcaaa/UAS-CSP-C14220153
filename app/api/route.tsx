import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseClient";

// export async function GET() {
//     const data= { id:1, name: "John" };
//     return NextResponse.json(data);
// }

export async function POST(request: Request) {
    const data= await request.json();

    if(data.id==2){
        return NextResponse.json({ message: "ID 2" });
    }

    return NextResponse.json(data);
}

export async function GET(){
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);

}