"use server";

export async function formAction(data: FormData) {
    const name = data.get("name");
    console.log(name);
}