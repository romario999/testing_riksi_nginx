import React from "react";
import Image from "next/image";
import { Flame } from "lucide-react";
import { ImageViewer } from "./image-viewer";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel-product";

interface Props {
  items: string[];
  stickers: string[] | undefined;
  productName: string;
}

const CarouselProductImg: React.FC<Props> = ({
  items,
  stickers,
  productName,
}) => {
  const [api, setApi] = React.useState<CarouselApi | undefined>(undefined);
  const [active, setActive] = React.useState<number>(0);
  const [isViewerOpen, setIsViewerOpen] = React.useState<boolean>(false);
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!api) return;

    setActive(api.selectedScrollSnap());

    api.on("select", () => {
      setActive(api.selectedScrollSnap());
    });
  }, [api]);

  const handleActive = (e: React.MouseEvent<HTMLDivElement>) => {
    const index = Number(e.currentTarget?.id);
    setActive(index);
    api?.scrollTo(index);
  };

  const openImageViewer = (image: string) => {
    setSelectedImage(image);
    setIsViewerOpen(true);
  };

  const closeImageViewer = () => {
    setSelectedImage(null);
    setIsViewerOpen(false);
  };

  const changeImage = (index: number) => {
    setActive(index);
  };

  return (
    <>
      <Carousel
        setApi={setApi}
        className="w-full mx-auto md:mx-0 max-w-[400px] sm:max-w-[460px] md:max-w-[500px]"
      >
        <CarouselContent className="relative w-full h-auto flex gap-6">
          {items.map((item, i) => (
            <CarouselItem
              key={i}
              className="flex justify-center relative mx-auto"
              onClick={() => openImageViewer(item)}
            >
              <div className="w-full aspect-[3/4] max-w-[500px] overflow-hidden rounded-xl">
                <Image
                  src={item}
                  alt={`Image ${i}`}
                  className="object-cover w-full h-full cursor-pointer transition-all duration-300"
                  width={500}
                  height={700}
                  priority
                />
              </div>


              {/* Стікери */}
              {stickers?.map((sticker, index) => (
                <div
                  key={index}
                  className={`absolute ${
                    index === 0 ? "top-0" : "top-8"
                  } ${
                    sticker === "HITS" &&
                    "bg-[#28a745] text-white left-1 px-4"
                  } ${
                    sticker === "NEW" &&
                    "bg-[#e80aa4] text-white left-1 px-3"
                  } ${
                    sticker === "PRICEPARTY" &&
                    "bg-yellow-300 left-1 px-1"
                  } rounded-l-full rounded-r-sm text-black py-1 text-sm`}
                >
                  {(sticker === "HITS" ? (
                    <Flame size={18} />
                  ) : null) ||
                    (sticker === "NEW" ? "New" : null) ||
                    (sticker === "PRICEPARTY" ? "Price Party" : null)}
                </div>
              ))}
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Превʼю */}
        {items.length > 1 && (
          <div className="flex justify-center mt-5 gap-4 flex-wrap">
            {items.map((item, i) => (
              <div
                key={i}
                id={String(i)}
                onClick={handleActive}
                className={`p-0.5 rounded-sm cursor-pointer transition border ${
                  i === active
                    ? "border-primary"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                <div className="w-[60px] h-[80px] overflow-hidden rounded-xl">
  <img
    className="w-full h-full object-cover"
    src={item}
    alt={`Preview ${i}`}
  />
</div>

              </div>
            ))}
          </div>
        )}

        {/* Стрілки */}
        {items.length > 1 && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
      </Carousel>

      {/* Повноекранне зображення */}
      {isViewerOpen && selectedImage && (
        <ImageViewer
          images={items}
          activeIndex={active}
          onClose={closeImageViewer}
          productName={productName}
          onChangeImage={changeImage}
        />
      )}
    </>
  );
};

export default CarouselProductImg;
