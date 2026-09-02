import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gold' | 'outline-light' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  asLink?: boolean;
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  className = '',
  asLink = false,
  href,
  disabled,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-semibold uppercase tracking-widest text-[12px] md:text-[13px] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-sm select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap active:scale-[0.97] active:translate-y-0 active:shadow-inner';

  const sizeClasses = {
    sm: 'px-4 py-2 min-h-[36px] gap-1.5 text-[11px]',
    md: 'px-6 py-3 min-h-[42px] gap-2 text-[12px]',
    lg: 'px-8 py-3.5 min-h-[48px] gap-2.5 text-[13px]',
  };

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-[#650B0B] via-[#4A0606] to-[#650B0B] text-white border border-[#D4AF37]/50 shadow-[0_4px_14px_rgba(58,5,5,0.3)] hover:shadow-[0_8px_25px_rgba(58,5,5,0.45),0_0_12px_rgba(212,175,55,0.25)] hover:border-[#D4AF37] hover:brightness-110 hover:-translate-y-0.5',
    secondary:
      'bg-transparent text-[#650B0B] border-2 border-[#650B0B] hover:bg-[#650B0B] hover:text-white hover:border-[#D4AF37] hover:shadow-[0_6px_20px_rgba(101,11,11,0.25)] hover:-translate-y-0.5 shadow-sm',
    gold:
      'bg-gradient-to-r from-[#F2C94C] via-[#D4AF37] to-[#F2C94C] text-[#3A0505] border border-white/40 shadow-[0_4px_15px_rgba(212,175,55,0.35)] hover:shadow-[0_8px_24px_rgba(212,175,55,0.55),0_0_15px_rgba(255,255,255,0.4)] hover:brightness-105 hover:border-white/70 hover:-translate-y-0.5',
    'outline-light':
      'bg-white/5 text-[#FAF8F3] border border-[#FAF8F3]/60 hover:border-[#D4AF37] hover:text-[#D4AF37] hover:bg-white/12 hover:shadow-[0_4px_18px_rgba(212,175,55,0.2)] hover:-translate-y-0.5',
    ghost:
      'bg-transparent text-[#650B0B] hover:text-[#3A0505] hover:bg-[#650B0B]/8 hover:shadow-sm',
  };

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="inline-flex shrink-0">{icon}</span>}
    </>
  );

  if (asLink && href) {
    return (
      <a href={href} className={combinedClasses}>
        {content}
      </a>
    );
  }

  return (
    <button className={combinedClasses} disabled={disabled} {...props}>
      {content}
    </button>
  );
};

export const PrimaryButton: React.FC<ButtonProps> = (props) => <Button variant="primary" {...props} />;
export const SecondaryButton: React.FC<ButtonProps> = (props) => <Button variant="secondary" {...props} />;
export const GoldButton: React.FC<ButtonProps> = (props) => <Button variant="gold" {...props} />;
