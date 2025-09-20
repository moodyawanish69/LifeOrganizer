import { Layers, CheckCircle } from "lucide-react";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className = "", showText = true, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-10 h-10"
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl"
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        {/* Main logo icon - layered circles representing organization */}
        <div className={`${sizeClasses[size]} relative`}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg opacity-90" />
          <div className="absolute inset-1 bg-gradient-to-br from-blue-400 to-blue-500 rounded-md opacity-80" />
          <div className="absolute inset-2 bg-white dark:bg-gray-100 rounded-sm flex items-center justify-center">
            <CheckCircle className="w-3 h-3 text-blue-600" strokeWidth={2.5} />
          </div>
        </div>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <span className={`font-poppins font-semibold ${textSizeClasses[size]} text-gray-900 dark:text-gray-100 leading-none`}>
            LifeOrganizer
          </span>
          {size !== "sm" && (
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide">
              Productivity Suite
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export function LogoIcon({ className = "", size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) {
  return <Logo className={className} showText={false} size={size} />;
}