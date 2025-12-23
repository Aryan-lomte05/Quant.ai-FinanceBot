"use client";

import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

export function VoiceInput() {
    return (
        <Button variant="outline" size="icon">
            <Mic className="w-4 h-4" />
        </Button>
    );
}
