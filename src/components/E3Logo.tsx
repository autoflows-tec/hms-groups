interface E3LogoProps {
  className?: string;
}

const E3Logo = ({ className = "h-8 w-8" }: E3LogoProps) => {
  return (
    <div className={`${className} relative`}>
      <img 
        src="/e3-logo.png" 
        alt="HMS Tráfego e Performance" 
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default E3Logo; 