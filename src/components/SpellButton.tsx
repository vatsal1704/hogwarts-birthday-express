import { cn } from "@/lib/utils";

interface SpellButtonProps {
  spell: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

export const SpellButton = ({ spell, onClick, className, disabled }: SpellButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "btn-spell font-magical text-xl md:text-2xl",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      <span className="relative z-10 glow-gold">{spell}</span>
    </button>
  );
};
