import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { InboxIcon } from 'lucide-react';
import SimpleTooltip from './simple-tooltip';

export default function InboxJewel(){
    return (
        <Popover>
            <SimpleTooltip text="Inbox">
                <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <InboxIcon className="w-4 h-4" />
                    </Button>
                </PopoverTrigger>
            </SimpleTooltip>
            <PopoverContent align="end">
                <span className="text-sm text-muted-foreground">No Messages Yet</span>
            </PopoverContent>
        </Popover>
    );
}