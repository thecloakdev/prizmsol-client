"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { CopyIcon } from "lucide-react";
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogHeader, AlertDialogCancel, AlertDialogFooter } from "@/components/ui/alert-dialog";

export default function ToolsPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [open, setOpen] = useState(false);

  const convertJsonToNewLine = () => {
    try {
      const json = JSON.parse(text);

      const values = Object.values(json);
      setResult(values.join("\n"));
    } catch (error) {
      toast.error("Invalid JSON");
      setResult("");
      setOpen(true);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    toast.success("Copied to clipboard");
  };

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Invalid JSON</AlertDialogTitle>
            <AlertDialogDescription>
              Make sure the JSON is added like this: {'{"key": "value"}'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <p className="text-sm">
            You maybe have something like this:
            <br />
            <code className="text-xs">
              {"\"common\": {\"key\": \"value\"}"}
            </code>
          </p>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="flex flex-col flex-1">
        <div className="flex w-full px-5 gap-2">
          <Button type="button" size="sm" onClick={convertJsonToNewLine}>
            <span>Convert JSON to New Line</span>
          </Button>
          {result.trim().length > 0 && (
            <Button
              variant="outline"
              type="button"
              size="sm"
              onClick={copyToClipboard}
            >
              <CopyIcon size={16} />
              <span>Copy to Clipboard</span>
            </Button>
          )}
        </div>
        <div className="flex flex-1 p-5 gap-10">
          <div className="flex flex-1">
            <Textarea
              placeholder="Paste your json here..."
              className="w-full h-full resize-none"
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="flex flex-1">
            {result && (
              <Textarea
                value={result}
                className="w-full h-full resize-none"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
