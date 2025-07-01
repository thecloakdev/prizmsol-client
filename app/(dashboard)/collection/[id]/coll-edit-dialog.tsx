import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { editCollection } from "./action";
import AutogrowTextarea from "@/components/AutogrowTextarea";
import { Collection } from "@/lib/db/schema";
import SubmitButton from "@/components/submit-button";

export default function CollectionEditDialog({
    open,
    collection,
    onOpenChange
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    collection: Collection;
}) {
    const router = useRouter();
    const handleSave = async (formData: FormData) => {
        const { success, message, error } = await editCollection(formData);

        if (success) {
            toast.success(message);
            onOpenChange(false);
            router.refresh();
        } else {
            toast.error(error);
        }
    }
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Collection</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Edit the name of the collection.
                </DialogDescription>
                <form className="space-y-4" action={handleSave}>
                    <input type="hidden" name="id" value={collection?.id} />
                    <Input
                        placeholder="Untitled Collection"
                        className="w-full"
                        name="name"
                        defaultValue={collection?.name}
                    />
                    <AutogrowTextarea
                        placeholder="Collection description"
                        className="w-full"
                        name="description"
                        defaultValue={collection?.description as string}
                    />
                    <DialogFooter>
                        <SubmitButton text="Save" doneText="Saved" pendingText="Saving"/>
                        <Button type="button" variant="outline" className="bg-neutral-500 dark:bg-neutral-700 hover:bg-neutral-700 dark:hover:bg-neutral-800 text-white" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
