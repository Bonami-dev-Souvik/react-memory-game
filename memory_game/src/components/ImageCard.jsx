import * as React from "react";

function ImageCard({ imageSrc, altText, isFlipped, onCardClick }) {
  return (
    <div className="flex flex-col flex-1">
      <div
        className={`flex gap-5 justify-between items-start py-8 pr-10 pl-px bg-white rounded-2xl max-md:pr-5 ${isFlipped ? 'bg-green-300' : 'bg-white'}`}
        onClick={onCardClick}
      >
        <div className="flex shrink-0 self-start w-px bg-white rounded-sm h-[135px]" />
        <img
          loading="lazy"
          src={isFlipped ? imageSrc : 'https://store-images.s-microsoft.com/image/apps.56855.13961302732259333.f6b86fd7-3a23-429b-80d6-53f3ff7ce16b.20a32a1f-d91f-49bd-802a-05c4b3f0493d?mode=scale&q=90&h=300&w=300'}
          alt={altText}
          className={`object-contain shrink-0 my-auto aspect-square w-[76px] transition-all duration-300 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ...`}
        />
      </div>
    </div>
  );
}

export default ImageCard;
