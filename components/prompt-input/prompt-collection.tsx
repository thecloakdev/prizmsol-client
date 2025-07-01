import { Collection } from "@/lib/db/schema";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "../ui/select";

export default function PromptCollection({
    collections,
    onSelect,
    defaultValue
}: {
    collections: Array<Collection>;
    onSelect: (value: string) => void;
    defaultValue?: string;
}) {
    const renderItems = () => {
        return collections.map((collection: Collection, index: number) => {
            return <SelectItem key={index} value={collection.id}>{collection.name}</SelectItem>
        });
    }
    return (
        <Select defaultValue={defaultValue || "0"} onValueChange={onSelect} name="collection">
            <SelectTrigger className="w-fit">
                <SelectValue placeholder="Choose a collection" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={"0"} className="text-neutral-500 font-semibold">Choose a collection</SelectItem>
                {renderItems()}
            </SelectContent>
        </Select>
    );
}
