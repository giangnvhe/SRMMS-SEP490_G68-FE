import { Carousel } from "antd";

interface IProps {
  arrows?: boolean;
  autoplay?: boolean;
  autoplaySpeed?: number;
  speed?: number;
  className?: string;
  children?: JSX.Element[] | JSX.Element;
}

const CarouselComponent = ({
  arrows = false,
  autoplay = false,
  autoplaySpeed,
  speed,
  className = "",
  children,
}: IProps) => {
  return (
    <Carousel
      className={className}
      arrows={arrows}
      autoplay={autoplay}
      autoplaySpeed={autoplaySpeed}
      speed={speed}
    >
      {children}
    </Carousel>
  );
};

export default CarouselComponent;
