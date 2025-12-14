interface ReflexTargetProps {
  x: number;
  y: number;
  size: number;
  onClick: () => void;
}

const ReflexTarget = ({ x, y, size, onClick }: ReflexTargetProps) => {
  return (
    <div
      data-target
      className="absolute rounded-full bg-mint cursor-pointer hover:bg-mint/90 transition-colors"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
      }}
      onClick={onClick}
    />
  );
};

export default ReflexTarget;
