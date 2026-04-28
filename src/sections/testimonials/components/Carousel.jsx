import React, { useState } from "react";

export default function Carousel({ items, activeIdx, onActiveIdxChange, renderItem }) {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      // Свайп влево -> Вперед
      onActiveIdxChange((activeIdx + 1) % items.length);
    } else if (distance < -minSwipeDistance) {
      // Свайп вправо -> Назад
      onActiveIdxChange((activeIdx - 1 + items.length) % items.length);
    }
  };

  return (
    <div 
      className="carousel-container w-full px-4 sm:px-8"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {items.map((item, i) => {
        let posClass = "";
        if (i === activeIdx) {
          posClass = "is-active";
        } else if (i === (activeIdx - 1 + items.length) % items.length) {
          posClass = "is-prev";
        } else if (i === (activeIdx + 1) % items.length) {
          posClass = "is-next";
        }

        return renderItem(item, i, posClass);
      })}
    </div>
  );
}