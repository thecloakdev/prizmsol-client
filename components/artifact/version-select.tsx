
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useArtifact } from "@/hooks/use-artifact";
import { useEffect, useState } from "react";
import { ArtifactData } from ".";

export function VersionSelect({
    artifacts,
    onSelect
}: {
    artifacts: Array<ArtifactData>;
    onSelect: (value: ArtifactData) => void;
}) {
    const [value, setValue] = useState(artifacts[artifacts.length - 1].id);
    const { artifact } = useArtifact();

    const handleOnChange = (value: string) => {
        setValue(value);
        const artifact: ArtifactData = artifacts.find(artifact => artifact.id == value) as ArtifactData;
        onSelect(artifact);
    }

    useEffect(() => {
        if (artifact.documentId) {
            setValue(artifact.documentId);
        }
    }, [artifact]);

    return (
        <Select value={value} onValueChange={handleOnChange}>
            <SelectTrigger className="w-fit h-[28px]">
                <SelectValue placeholder="Select a Version" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {artifacts.map((artifact: ArtifactData, index: number) => <SelectItem key={index} value={artifact.id}>Version {index + 1}</SelectItem>)}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}