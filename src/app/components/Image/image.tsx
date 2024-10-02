import NextImage, { ImageProps } from "next/image";

interface CustomImageProps extends Omit<ImageProps, "width" | "height"> {
  width?: string | number;
  maxWidth?: string | number;
}

const Image: React.FC<CustomImageProps> = ({ width, maxWidth, ...rest }) => {
  const containerStyle = {
    width: width || "100%",
    maxWidth: maxWidth || "100%",
  };

  return (
    <div className="relative" style={containerStyle}>
      <NextImage className="object-contain w-full relative !h-auto" {...rest} />
    </div>
  );
};

export default Image;
