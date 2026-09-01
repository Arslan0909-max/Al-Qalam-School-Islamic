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
    'inline-flex items-center justify-center font-semibold uppercase tracking-widest text-[12px] md:text-[13px] transition-all duration-300 rounded-sm select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap active:translate-y-0';

  const sizeClasses = {
    sm: 'px-4 py-2 min-h-[36px] gap-1.5 text-[11px]',
    md: 'px-6 py-3 min-h-[42px] gap-2 text-[12px]',
    lg: 'px-8 py-3.5 min-h-[48px] gap-2.5 text-[13px]',
  };

  const variantClasses = {
    primary:
      'bg-[#650B0B] text-white border border-[#D4AF37]/50 shadow-md shadow-[#3A0505]/20 hover:bg-[#3A0505] hover:border-[#D4AF37] hover:-translate-y-0.5',
    secondary:
      'bg-transparent text-[#650B0B] border border-[#650B0B] hover:bg-[#650B0B] hover:text-white hover:-translate-y-0.5 shadow-sm',
    gold:
      'bg-[#D4AF37] text-[#3A0505] border border-[#D4AF37] hover:bg-[#F2C94C] hover:border-[#F2C94C] hover:-translate-y-0.5 shadow-md shadow-[#D4AF37]/20',
    'outline-light':
      'bg-transparent text-[#FAF8F3] border border-[#FAF8F3]/60 hover:border-[#D4AF37] hover:text-[#D4AF37] hover:bg-white/5 hover:-translate-y-0.5',
    ghost:
      'bg-transparent text-[#650B0B] hover:text-[#3A0505] hover:bg-[#650B0B]/5',
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
