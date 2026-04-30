interface IconProps {
  name: string; 
  className?: string;
  width?: number;
  height?: number;
}


export const Icon = ({ 
  name, 
  className, 
  width = 32, 
  height = 32 
}: IconProps) => {
  return (
    <svg 
      className={className} 
      width={width} 
      height={height} 
      aria-hidden="true"
    >
      <use href={`/images/sprite.svg#${name}`} />
    </svg>
  );
};