import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { BellIcon } from 'lucide-react';
import SimpleTooltip from './simple-tooltip';

export default function Notifications() {
    return (
        <Popover>
            <SimpleTooltip text="Notifications">
                <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <BellIcon className="w-4 h-4" />
                    </Button>
                </PopoverTrigger>
            </SimpleTooltip>
            <PopoverContent align="end">
                <span className="text-sm text-muted-foreground">No Notifications</span>
            </PopoverContent>
        </Popover>
    );
}
