import React from "react";

interface LoadingSpinnerProps {
    size?: "sm" | "md" | "lg";
    className?: string;
}

export default function LoadingSpinner({ size = "md", className = "" }: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8"
    };

    return (
        <div className={`${sizeClasses[size]} ${className}`}>
            <div className="relative">
                <div className="w-full h-full border-2 border-border rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-full border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
            </div>
        </div>
    );
}