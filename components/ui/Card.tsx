// app/components/ui/Card.tsx
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  variant?: "default" | "gradient" | "glass" | "elevated";
  hoverEffect?: boolean;
  onClick?: () => void;
}

export default function Card({
  children,
  className = "",
  padding = "md",
  variant = "default",
  hoverEffect = false,
  onClick,
}: CardProps) {
  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const variantClasses = {
    default: "bg-white border border-blue-100 shadow-sm",
    gradient:
      "bg-gradient-to-br from-white to-blue-50/50 border border-blue-100 shadow-sm",
    glass: "bg-white/80 backdrop-blur-sm border border-white/20 shadow-sm",
    elevated: "bg-white border border-blue-200 shadow-lg hover:shadow-xl",
  };

  const hoverClasses = hoverEffect
    ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-blue-300"
    : "";

  return (
    <div
      className={`
        rounded-2xl ${variantClasses[variant]} ${paddingClasses[padding]}
        ${hoverClasses} ${className}
        ${onClick ? "cursor-pointer" : ""}
        relative overflow-hidden
      `}
      onClick={onClick}
    >
      {/* Accent corner for gradient variant */}
      {variant === "gradient" && (
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-500/5 to-orange-500/5 rounded-bl-full" />
      )}

      {/* Content wrapper */}
      <div className="relative z-10">{children}</div>

      {/* Subtle glow effect for elevated variant */}
      {variant === "elevated" && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
    </div>
  );
}

// Optional: CardHeader component
interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className = "" }: CardHeaderProps) {
  return (
    <div className={`mb-6 pb-4 border-b border-blue-100 ${className}`}>
      {children}
    </div>
  );
}

// Optional: CardTitle component
interface CardTitleProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function CardTitle({
  children,
  className = "",
  size = "md",
}: CardTitleProps) {
  const sizeClasses = {
    sm: "text-lg font-semibold",
    md: "text-xl font-semibold",
    lg: "text-2xl font-bold",
  };

  return (
    <h3 className={`${sizeClasses[size]} text-gray-900 mb-2 ${className}`}>
      {children}
    </h3>
  );
}

// Optional: CardContent component
interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className = "" }: CardContentProps) {
  return <div className={`text-gray-600 ${className}`}>{children}</div>;
}

// Optional: CardFooter component
interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className = "" }: CardFooterProps) {
  return (
    <div className={`mt-6 pt-4 border-t border-blue-100 ${className}`}>
      {children}
    </div>
  );
}

// Optional: CardBadge component for labels/tags
interface CardBadgeProps {
  children: ReactNode;
  color?: "blue" | "orange" | "green" | "gray";
  className?: string;
}

export function CardBadge({
  children,
  color = "blue",
  className = "",
}: CardBadgeProps) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-700 border-blue-200",
    orange: "bg-orange-100 text-orange-700 border-orange-200",
    green: "bg-green-100 text-green-700 border-green-200",
    gray: "bg-gray-100 text-gray-700 border-gray-200",
  };

  return (
    <span
      className={`
      inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
      border ${colorClasses[color]} ${className}
    `}
    >
      {children}
    </span>
  );
}

// Optional: CardIcon component
interface CardIconProps {
  icon: ReactNode;
  color?: "blue" | "orange" | "green" | "purple";
  className?: string;
}

export function CardIcon({
  icon,
  color = "blue",
  className = "",
}: CardIconProps) {
  const colorClasses = {
    blue: "bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600",
    orange: "bg-gradient-to-br from-orange-50 to-orange-100 text-orange-600",
    green: "bg-gradient-to-br from-green-50 to-green-100 text-green-600",
    purple: "bg-gradient-to-br from-purple-50 to-purple-100 text-purple-600",
  };

  return (
    <div
      className={`
      w-12 h-12 rounded-xl flex items-center justify-center
      ${colorClasses[color]} ${className}
    `}
    >
      {icon}
    </div>
  );
}
