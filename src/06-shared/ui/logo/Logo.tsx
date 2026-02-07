interface LogoProps {
  icon: React.ReactNode;
  className?: string;
}

export function Logo({ className, icon }: LogoProps) {
  return (
    <a className={className} style={{ display: 'inline-block' }} href="/">
      {icon}
    </a>
  );
}
