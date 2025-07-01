import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteChatAction } from "./actions/deleteProjectAction";

export default function DeleteDialog({
    project,
    open,
    onOpenChange
}: {
    project: any;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const router = useRouter();

    const handleDelete = async (formData: FormData) => {
        const { success } = await deleteChatAction(formData);

        if (success) {
            toast.success("Chat deleted successfully");
            onOpenChange(false);
            router.replace("/");
        } else {
            console.error("Error deleting chat");
            toast.error("Error deleting chat");
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Chat</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Are you sure you want to delete this chat? This action cannot be undone.
                </DialogDescription>
                <DialogFooter>
                    <form className="flex items-center space-x-4" action={handleDelete}>
                        <input type="hidden" name="id" value={project.id} />
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
