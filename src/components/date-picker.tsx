"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface DatePickerProps {
    value: Date | undefined;
    onChange: (date: Date | undefined) => void;
    placeholder?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
                                                          value,
                                                          onChange,
                                                          placeholder = "Select date",
                                                      }) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="lg"
                    className={`w-full justify-start text-left font-normal px-3 ${
                        !value ? "text-muted-foreground" : ""
                    }`}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {value ? format(value, "PPP") : <span>{placeholder}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto mt-2 p-2 border rounded-md shadow-lg bg-white">
                <DayPicker
                    mode="single"
                    selected={value}
                    onSelect={onChange}
                    className="rounded-lg p-2"
                />
            </PopoverContent>
        </Popover>
    );
};
