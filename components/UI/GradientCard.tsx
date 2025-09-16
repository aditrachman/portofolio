import React, { ReactNode } from "react";
import { cn } from "@/libs/cn";

interface GradientCardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    glow?: boolean;
}

export default function GradientCard({
    children,
    className = "",
    hover = true,
    glow = false
}: GradientCardProps) {
    return (
        <div className={cn(
            "relative group",
            className
        )}>
            {glow && (
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-success rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300" />
            )}
            <div className={cn(
                "relative glass rounded-2xl p-6 border border-border",
                hover && "hover-lift transition-all duration-300",
                "group-hover:border-border-light"
            )}>
                {children}
            </div>
        </div>
    );
}