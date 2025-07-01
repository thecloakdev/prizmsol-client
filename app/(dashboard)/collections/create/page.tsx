import AutogrowTextarea from "@/components/AutogrowTextarea";
import SubmitButton from "@/components/submit-button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveCollection } from "@/lib/db/queries";
import { isEmpty } from "lodash";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function CreateCollection() {
    const submitAction = async (formData: FormData) => {
        "use server";
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;

        console.log({
            name,
            description
        });

        if (!isEmpty(name)) {
            const result = await saveCollection({
                name,
                description,
                userId: user.id as string
            });

            revalidatePath("/", "layout");

            // saved successfully.
            if (result.count > 0) {
                return redirect("/collections");
            }
        }
    }

    return (
        <div className="flex flex-col flex-1 justify-center items-center">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Create Collection</CardTitle>
                    <CardDescription>
                        Enter the collection details
                    </CardDescription>
                </CardHeader>
                <form action={submitAction}>
                    <CardContent>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Name your collection"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="description">Description</Label>
                                </div>
                                <AutogrowTextarea id="description" name="description" placeholder="Add a description for your collection" required />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <SubmitButton className="w-full" text="Create" pendingText="Creating" />
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
