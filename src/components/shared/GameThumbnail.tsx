import { Link } from "react-router-dom";

interface GameThumbnailProps {
  img: string;
  name: string;
  url?: string;
}

const GameThumbnail = ({ img, name, url }: GameThumbnailProps) => {
  const content = (
    <div className="flex flex-col space-y-6 group cursor-pointer">
      <div className="aspect-video w-full bg-[#D9D9D9]/5 group-hover:bg-[#D9D9D9]/10 transition-colors">
        {img && (
          <img src={img} alt={name} className="w-full h-full object-cover" />
        )}
      </div>
      <span className="text-xl text-light-blue text-center group-hover:text-mint transition-colors">
        {name}
      </span>
    </div>
  );

  if (url) {
    return <Link to={url}>{content}</Link>;
  }

  return content;
};

export default GameThumbnail;
