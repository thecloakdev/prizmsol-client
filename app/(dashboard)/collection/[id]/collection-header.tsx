"use client";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontalIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import CollectionDeleteDialog from "./coll-delete-dialog";
import { Collection } from "@/lib/db/schema";
import PaneHeader from "@/components/PaneHeader";
import CollectionEditDialog from "./coll-edit-dialog";
export default function CollectionHeader({
    collection
}: {
    collection: Collection
}) {
    const [open, setOpen] = useState<boolean>(false);
    const [editOpen, setEditOpen] = useState<boolean>(false);
    return (
        <PaneHeader>
            <div className="flex justify-between items-center w-full">
                <span className="text-sm font-semibold">{collection.name}</span>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="p-1.5 h-auto w-auto" size="icon">
                            <MoreHorizontalIcon size={20} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setEditOpen(true)}>
                            <PencilIcon size={20} />
                            <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500" onClick={() => setOpen(true)}>
                            <TrashIcon size={20} />
                            <span>Delete</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <CollectionDeleteDialog collection={collection} open={open} onOpenChange={setOpen} />
                <CollectionEditDialog collection={collection} open={editOpen} onOpenChange={setEditOpen} />
            </div>
        </PaneHeader>
    );
}
