import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteCollectionAction } from "./action";
import { Collection } from "@/lib/db/schema";

export default function CollectionDeleteDialog({
    collection,
    open,
    onOpenChange
}: {
    collection: Collection;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const router = useRouter();

    const handleDelete = async (formData: FormData) => {
        const { success } = await deleteCollectionAction(formData);

        if (success) {
            toast.success("Collection deleted successfully");
            onOpenChange(false);
            router.replace("/collections");
        } else {
            console.error("Error deleting collection");
            toast.error("Error deleting collection");
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Collection</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Are you sure you want to delete this collection? This action cannot be undone.
                </DialogDescription>
                <DialogFooter>
                    <form className="flex items-center space-x-4" action={handleDelete}>
                        <input type="hidden" name="id" value={collection.id} />
                        <SubmitButton variant="destructive" text="Delete" icon={TrashIcon} />
                        <Button type="button" variant="outline" className="bg-neutral-500 dark:bg-neutral-700 hover:bg-neutral-700 dark:hover:bg-neutral-800 text-white" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                    </form>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
