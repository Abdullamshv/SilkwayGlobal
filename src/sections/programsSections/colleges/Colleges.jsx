import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import cambridge from "../../../assets/programs/uk/cambridge_logo.svg";
import exe from "../../../assets/programs/uk/Exe.png";
import alliance from "../../../assets/programs/uk/Alliance.jpg";
import au from "../../../assets/programs/uk/AU.png";
import burleigh from "../../../assets/programs/uk/Burleigh.png";

import pli from "../../../assets/programs/cz/prague_language_institute.svg";
import fv from "../../../assets/programs/cz/FAST_VUT.png";
import cvut from "../../../assets/programs/cz/CVUT.jpg";
import ca from "../../../assets/programs/cz/Cardiff_Academy.png";
import cevro from "../../../assets/programs/cz/Cevro.png";

import apu from "../../../assets/programs/my/apu.svg";
import sunway from "../../../assets/programs/my/sunway.png";
import xiamen from "../../../assets/programs/my/xiamen.png";
import taylors from "../../../assets/programs/my/taylors.png";
import unimalay from "../../../assets/programs/my/university-of-malaya.png";

export default function Colleges({ country = "uk" }) {
  const { t } = useTranslation();

  const [collegeIndex, setCollegeIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);

  // Состояния для отслеживания свайпов
  const [touchStartCollege, setTouchStartCollege] = useState(null);
  const [touchEndCollege, setTouchEndCollege] = useState(null);
  
  const [touchStartReview, setTouchStartReview] = useState(null);
  const [touchEndReview, setTouchEndReview] = useState(null);

  const minSwipeDistance = 50;

  useEffect(() => {
    const timer = setInterval(() => {
      setCollegeIndex((prev) => (prev + 1) % 5);
      setReviewIndex((prev) => (prev + 1) % 5);
    }, 3000);

    return () => clearInterval(timer);
  });

  const countryImages = {
    uk: [burleigh, cambridge, au, alliance, exe],
    czechia: [pli, fv, cvut, ca, cevro],
    malaysia: [apu, sunway, xiamen, taylors, unimalay],
  };

  const images = countryImages[country] || countryImages.uk;

  const feedbacks = t(`colleges.feedbacks.${country}`, { returnObjects: true });
  const currentFeedback =
    Array.isArray(feedbacks) && feedbacks.length > 0
      ? feedbacks[reviewIndex]
      : { text: "Загрузка...", author: "" };

  const nextCollege = () => setCollegeIndex((prev) => (prev + 1) % 5);
  const prevCollege = () => setCollegeIndex((prev) => (prev - 1 + 5) % 5);

  const nextReview = () => setReviewIndex((prev) => (prev + 1) % 5);
  const prevReview = () => setReviewIndex((prev) => (prev - 1 + 5) % 5);

  // Обработчики свайпов для карусели логотипов
  const onTouchStartC = (e) => {
    setTouchEndCollege(null);
    setTouchStartCollege(e.targetTouches[0].clientX);
  };
  const onTouchMoveC = (e) => setTouchEndCollege(e.targetTouches[0].clientX);
  const onTouchEndC = () => {
    if (!touchStartCollege || !touchEndCollege) return;
    const distance = touchStartCollege - touchEndCollege;
    if (distance > minSwipeDistance) nextCollege();
    if (distance < -minSwipeDistance) prevCollege();
  };

  // Обработчики свайпов для карусели отзывов
  const onTouchStartR = (e) => {
    setTouchEndReview(null);
    setTouchStartReview(e.targetTouches[0].clientX);
  };
  const onTouchMoveR = (e) => setTouchEndReview(e.targetTouches[0].clientX);
  const onTouchEndR = () => {
    if (!touchStartReview || !touchEndReview) return;
    const distance = touchStartReview - touchEndReview;
    if (distance > minSwipeDistance) nextReview();
    if (distance < -minSwipeDistance) prevReview();
  };

  return (
    <section className="bg-[#D1E8FF] w-full font-[Montserrat] py-8 px-4 flex flex-col lg:flex-row items-center justify-center gap-6">
      
      {/* Карточка университетов */}
      <div 
        className="bg-[#A8D6FF] rounded-2xl w-full lg:w-[45%] max-w-md flex flex-col items-center p-5 pb-16 text-center relative min-h-[300px]"
        onTouchStart={onTouchStartC}
        onTouchMove={onTouchMoveC}
        onTouchEnd={onTouchEndC}
      >
        <h1 className="bg-[#1B3EC4] text-white text-lg sm:text-xl font-bold rounded-xl px-4 py-2 mb-4 w-full">
          {t("colleges.title")}
        </h1>

        <div className="flex-1 flex items-center justify-center w-full mt-2 mb-2 overflow-hidden">
          <img
            src={images[collegeIndex]}
            alt={`${country} college ${collegeIndex + 1}`}
            className="h-24 sm:h-32 object-contain w-full transition-opacity duration-300"
          />
        </div>

        <div className="absolute bottom-4 left-0 w-full flex justify-between items-center px-6">
          <button
            onClick={prevCollege}
            className="text-[#1B3EC4] font-bold text-2xl hover:scale-110 transition-transform p-2"
          >
            &larr;
          </button>
          <div className="flex gap-1.5">
            {images.map((_, i) => (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${i === collegeIndex ? "bg-[#1B3EC4]" : "bg-white"}`}
              />
            ))}
          </div>
          <button
            onClick={nextCollege}
            className="text-[#1B3EC4] font-bold text-2xl hover:scale-110 transition-transform p-2"
          >
            &rarr;
          </button>
        </div>
      </div>

      {/* Карточка отзывов */}
      <div 
        className="bg-[#A8D6FF] rounded-2xl w-full lg:w-[45%] max-w-md flex flex-col items-center p-5 pb-16 text-center relative min-h-[300px]"
        onTouchStart={onTouchStartR}
        onTouchMove={onTouchMoveR}
        onTouchEnd={onTouchEndR}
      >
        <h1 className="bg-[#1B3EC4] text-white text-lg sm:text-xl font-bold rounded-xl px-4 py-2 mb-4 w-full">
          {t("colleges.feedbackTitle")}
        </h1>

        <div className="flex-1 flex flex-col justify-center items-center w-full px-2 mt-2 mb-2">
          <p className="text-base sm:text-lg text-[#000000] mb-3 italic transition-opacity duration-300">
            "{currentFeedback.text}"
          </p>
          <p className="text-sm text-right text-gray-800 font-semibold w-full">
            — {currentFeedback.author}
          </p>
        </div>

        <div className="absolute bottom-4 left-0 w-full flex justify-between items-center px-6">
          <button
            onClick={prevReview}
            className="text-[#1B3EC4] font-bold text-2xl hover:scale-110 transition-transform p-2"
          >
            &larr;
          </button>
          <div className="flex gap-1.5">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${i === reviewIndex ? "bg-[#1B3EC4]" : "bg-white"}`}
                />
              ))}
          </div>
          <button
            onClick={nextReview}
            className="text-[#1B3EC4] font-bold text-2xl hover:scale-110 transition-transform p-2"
          >
            &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}