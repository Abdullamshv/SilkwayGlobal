import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import HeroVisual from "../sections/heroSection/HeroVisual";
import NavBar from "../components/navBar/NavBar";
import "../styles/global.css";
import WhyUs from "../sections/whyUs/WhyUs";
import About from "../sections/about/About";
import Testimonials from "../sections/testimonials/Testimonials";
import Team from "../sections/team/Team";
import Contacts from "../sections/contacts/Contacts";
import Articles from "../sections/articles/Articles";

import mainImage from "../assets/heroSection_imgs/globus_main.png";

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <section className="relative min-h-fit md:min-h-screen w-full flex flex-col bg-gradient-to-b from-[#A8D6FF] to-[#D7EEFF] overflow-visible font-[Montserrat]">
        <div className="relative w-full z-30">
          <NavBar />
        </div>

        {/* Измененный главный контейнер: убрали flex-col-reverse, добавили отступ сверху для мобилок */}
        <div className="flex w-full h-full flex-1 flex-col md:flex-row max-w-7xl mx-auto px-4 mt-8 md:mt-0">
          {/* Левая часть: текст и кнопка (по центру на мобилках, по левому краю на десктопе) */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center gap-8 md:gap-10 pb-12 pt-4 md:py-0 z-20 backdrop-blur-sm text-center md:text-left">
            <div className="space-y-4 select-none relative w-full px-2 sm:px-0">
              <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-[#304BAA] leading-tight">
                {t("home.title1")} <br className="hidden md:block" />
                {t("home.title2")}{" "}
                <span className="hidden lg:inline">
                  <br />
                </span>
                {t("home.title3")}{" "}
                <span className="hidden lg:inline">
                  <br />
                </span>
                {t("home.title4")}
              </h1>

              <p className="text-content text-lg sm:text-xl md:text-2xl text-gray-800">
                {t("home.description.line1")} <br className="hidden md:block" />
                {t("home.description.line2")} <br className="hidden md:block" />
                {t("home.description.line3")}
              </p>
            </div>

            <div className="flex w-full justify-center md:justify-start">
              {/* Кнопка растягивается на 90% ширины на телефонах для удобного нажатия */}
              <a
                href={`https://wa.me/77715993843?text=${encodeURIComponent("Здравствуйте, я перешел(шла) по объявлению о консультации с вашего сайта, и хотел(а) бы проконсультироваться об учебе")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[90%] sm:w-auto bg-[#304BAA] text-xl sm:text-2xl md:text-3xl border-2 border-[#304BAA] text-white px-8 py-4 rounded-xl hover:cursor-pointer hover:bg-white hover:text-[#304BAA] transition-colors shadow-lg"
              >
                {t("home.button")}
              </a>
            </div>
          </div>

          <div className="hidden md:flex flex-1 w-full lg:w-1/2 relative">
            <img
              src={mainImage}
              alt=""
              className="absolute bottom-0 right-0 h-full w-full object-contain object-right-bottom rounded-[20px] animate-float border-2 border-[#A8D6FF]"
            />
          </div>
        </div>
      </section>

      {/* Нижние секции (остаются без изменений) */}
      <div style={{ lineHeight: 0, background: "#D7EEFF" }}>
        <svg
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          width="100%"
          height="60"
        >
          <path
            d="M0,0 C400,60 800,0 1200,40 L1200,60 L0,60 Z"
            fill="#D1E8FF"
          />
        </svg>
      </div>

      <WhyUs />
      <About />

      <div style={{ lineHeight: 0, background: "#D1E8FF" }}>
        <svg
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          width="100%"
          height="48"
        >
          <path d="M0,80 C300,0 900,80 1200,20 L1200,0 L0,0 Z" fill="#FFFFFF" />
        </svg>
      </div>

      <Testimonials />
      <div style={{ lineHeight: 0, background: "#D1E8FF" }}>
        <svg
          viewBox="0 0 1200 48"
          preserveAspectRatio="none"
          width="100%"
          height="48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0 C300,48 900,0 1200,32 L1200,48 L0,48 Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>
      <Team />

      <div style={{ lineHeight: 0, background: "#D1E8FF" }}>
        <svg
          viewBox="0 0 1200 48"
          preserveAspectRatio="none"
          width="100%"
          height="48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0 C300,48 900,0 1200,32 L1200,48 L0,48 Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>

      <Contacts />

      <div style={{ lineHeight: 0, background: "#D1E8FF" }}>
        <svg
          viewBox="0 0 1200 48"
          preserveAspectRatio="none"
          width="100%"
          height="48"
        >
          <path
            d="M0,0 C300,48 900,0 1200,32 L1200,48 L0,48 Z"
            fill="#A9D3F5"
          />
        </svg>
      </div>

      <Articles />
    </>
  );
}
