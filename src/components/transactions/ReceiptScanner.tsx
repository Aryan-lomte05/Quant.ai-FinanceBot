"use client";

import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ReceiptScanner() {
    return (
        <Button variant="outline" className="w-full">
            <Camera className="w-4 h-4 mr-2" />
            Scan Receipt
        </Button>
    );
}
