"use client";

import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

export function VoiceRecorder() {
    return (
        <Button variant="outline" size="icon" className="rounded-full">
            <Mic className="w-5 h-5" />
        </Button>
    );
}
