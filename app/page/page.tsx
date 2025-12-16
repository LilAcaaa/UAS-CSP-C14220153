import { formAction } from "./action";
export default async function Page() {
    return (
        <form action={formAction}>
            <input type="text" name="name" />
            <button type="submit">Submit</button>
        </form>
    );
}