interface LogoProps {
  className: string;
  icon: React.ReactNode;
}

export function Logo({ className, icon }: LogoProps) {
  return (
    <a className={className} style={{ display: 'inline-block' }} href="/">
      {icon}
    </a>
  );
}
