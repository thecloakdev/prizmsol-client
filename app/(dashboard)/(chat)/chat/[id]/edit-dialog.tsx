import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { editProjectTitle } from "./actions/editProjectAction";

export default function EditDialog({
    open,
    project,
    onOpenChange
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    project: any;
}) {
    const router = useRouter();
    const handleSave = async (formData: FormData) => {
        const { success, message, error } = await editProjectTitle(formData);

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
                    <DialogTitle>Edit Chat</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Edit the title of your chat.
                </DialogDescription>
                <form className="space-y-4" action={handleSave}>
                    <input type="hidden" name="id" value={project?.id} />
                    <Input
                        placeholder="Untitled Project"
                        className="w-full"
                        name="title"
                        defaultValue={project?.title}
                    />
                    <DialogFooter>
                        <Button
                            variant="destructive"
                            className="bg-blue-500 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white"
                        >
                            <PencilIcon size={20} />
                            <span>Save</span>
                        </Button>
                        <Button type="button" variant="outline" className="bg-neutral-500 dark:bg-neutral-700 hover:bg-neutral-700 dark:hover:bg-neutral-800 text-white" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
