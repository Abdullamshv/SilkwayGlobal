import React from "react";
import { useTranslation } from "react-i18next";
import { ArticlesList } from "./ArticlesList";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

import bgImage from "../../assets/articles/white-cloud-blue-sky.jpg";

function ArticleCard({ article, t }) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none" }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "18px",
          overflow: "hidden",
          border: "1.5px solid #B8D8F8",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          height: "100%",
          transition: "transform 0.25s, box-shadow 0.25s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-6px)";
          e.currentTarget.style.boxShadow = "0 14px 36px rgba(10,60,120,0.13)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* Image */}
        <div
          style={{
            width: "100%",
            height: "140px",
            background: article.imageBg || "#EEF6FF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            borderBottom: "1px solid #D1E8FF",
            flexShrink: 0,
          }}
        >
          <img
            src={article.image}
            alt={t(`articles.${article.key}.title`)}
            loading="lazy"
            decoding="async"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              padding: "16px",
              mixBlendMode: "multiply",
            }}
          />
        </div>

        {/* Body */}
        <div
          style={{
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.45rem",
            flex: 1,
          }}
        >
          {/* Tag */}
          {article.tag && (
            <span
              style={{
                display: "inline-block",
                background: "#D1ECFF",
                color: "#1A5A9A",
                fontSize: "0.62rem",
                fontWeight: 700,
                padding: "3px 9px",
                borderRadius: "20px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                width: "fit-content",
              }}
            >
              {article.tag}
            </span>
          )}

          {/* Title */}
          <p
            style={{
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "#0B2A4A",
              lineHeight: 1.4,
            }}
          >
            {t(`articles.${article.key}.title`)}
          </p>

          {/* Description */}
          <p
            style={{
              fontSize: "0.75rem",
              color: "#3A5A7A",
              lineHeight: 1.55,
              flex: 1,
            }}
          >
            {t(`articles.${article.key}.description`)}
          </p>
        </div>
      </div>
    </a>
  );
}

export default function Articles() {
  const { t } = useTranslation();

  return (
    <div
      id="articles"
      className=" font-[Montserrat] bg-[#A9D3F5] flex flex-col w-full py-12 px-4 sm:px-6"
      
    >
      <h1 style={{color: "white"}} className="title  mb-8 text-center">{t("articles.title")}</h1>

      {/* Swiper — mobile */}
      <div className="sm:hidden w-full">
        <Swiper
          spaceBetween={16}
          slidesPerView={1.2}
          loop={true}
          grabCursor={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          className="w-full px-2 pb-8"
        >
          {ArticlesList.map((article) => (
            <SwiperSlide key={article.id} style={{ height: "auto" }}>
              <div style={{ width: "90%", margin: "0 auto", height: "100%" }}>
                <ArticleCard article={article} t={t} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 max-w-7xl mx-auto w-full">
        {ArticlesList.map((article) => (
          <ArticleCard key={article.id} article={article} t={t} />
        ))}
      </div>
    </div>
  );
}
