import React, { useRef, useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import VideoCard from "./components/VideoCard";
import Carousel from "./components/Carousel";

import feedback1 from "../../assets/testimonials/videos/feedback1.mp4";
import feedback2 from "../../assets/testimonials/videos/feedback2.mp4";
import feedback3 from "../../assets/testimonials/videos/feedback3.mp4";

const VIDEO_SOURCES = [feedback1, feedback2, feedback3];

export default function Testimonials() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const videoRefs = useRef([null, null, null]);

  const [activeIdx, setActiveIdx] = useState(0);
  const [playing, setPlaying] = useState([false, false, false]);
  const [muted, setMuted] = useState([false, false, false]);
  const [progress, setProgress] = useState([0, 0, 0]);
  const [hasIntersected, setHasIntersected] = useState(false);

  const playVideo = useCallback((idx) => {
    const v = videoRefs.current[idx];
    if (!v) return;
    v.play().catch(() => {});
    setPlaying(prev => prev.map((p, i) => i === idx ? true : p));
  }, []);

  const pauseVideo = useCallback((idx) => {
    const v = videoRefs.current[idx];
    if (!v) return;
    v.pause();
    setPlaying(prev => prev.map((p, i) => i === idx ? false : p));
  }, []);

  // Синхронизация при смене активного индекса (из карусели или автоматически)
  const handleIndexChange = useCallback((newIdx) => {
    if (newIdx === activeIdx) return;
    pauseVideo(activeIdx);
    setActiveIdx(newIdx);
    playVideo(newIdx);
  }, [activeIdx, pauseVideo, playVideo]);

  const activateNext = useCallback((finishedIdx) => {
    const next = (finishedIdx + 1) % VIDEO_SOURCES.length;
    handleIndexChange(next);
    setProgress(prev => prev.map((p, i) => i === finishedIdx ? 0 : p));
  }, [handleIndexChange]);

  useEffect(() => {
    const cleanups = videoRefs.current.map((v, i) => {
      if (!v) return () => {};
      const onTimeUpdate = () => {
        if (v.duration) {
          const pct = Math.round((v.currentTime / v.duration) * 100);
          setProgress(prev => prev.map((p, j) => j === i ? pct : p));
        }
      };
      const onEnded = () => activateNext(i);

      v.addEventListener("timeupdate", onTimeUpdate);
      v.addEventListener("ended", onEnded);
      return () => {
        v.removeEventListener("timeupdate", onTimeUpdate);
        v.removeEventListener("ended", onEnded);
      };
    });
    return () => cleanups.forEach(fn => fn());
  }, [activateNext]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasIntersected) {
            setHasIntersected(true);
            playVideo(0);
          } else if (!entry.isIntersecting && hasIntersected) {
            videoRefs.current.forEach((v, i) => { if (v && !v.paused) pauseVideo(i); });
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [hasIntersected, playVideo, pauseVideo]);

  const handleCardClick = (idx) => {
    if (idx !== activeIdx) {
      handleIndexChange(idx);
    } else {
      playing[idx] ? pauseVideo(idx) : playVideo(idx);
    }
  };

  const handleMuteToggle = (idx) => {
    const v = videoRefs.current[idx];
    if (!v) return;
    const newMuted = !muted[idx];
    v.muted = newMuted;
    setMuted(prev => prev.map((m, i) => i === idx ? newMuted : m));
  };

  return (
    <>
      <style>{`
        .video-controls { opacity: 0; transition: opacity 0.2s; }
        .video-controls:hover, *:hover > .video-controls { opacity: 1; }
        .v-card { transition: flex 0.5s cubic-bezier(0.4,0,0.2,1), transform 0.5s ease, opacity 0.5s ease; border-radius: 20px; overflow: hidden; background: #0B2A4A; cursor: pointer; }

        @media (min-width: 768px) {
          .carousel-container { display: flex; align-items: flex-end; justify-content: center; gap: 3rem; min-height: 10px; }
          .v-card { position: relative; flex: 0.25; height: clamp(200px, 50vw, 600px); }
          .v-card.is-active { flex: 0.3; opacity: 1; }
          .v-card:not(.is-active) { opacity: 0.65; }
        }

        @media (max-width: 767px) {
          .carousel-container { position: relative; height: 65vh; width: 100%; display: flex; justify-content: center; align-items: center; overflow: hidden; }
          .v-card { position: absolute; width: 80vw; height: 65vh; }
          .v-card.is-active { transform: translateX(0) scale(1); opacity: 1; z-index: 10; }
          .v-card.is-prev { transform: translateX(-90%) scale(0.9); opacity: 0.5; z-index: 5; }
          .v-card.is-next { transform: translateX(90%) scale(0.9); opacity: 0.5; z-index: 5; }
        }
      `}</style>

      <section id="feedbacks" ref={sectionRef} className="bg-[#D1E8FF] font-[Montserrat] w-full flex flex-col gap-12 py-8">
        <div className="flex flex-col items-center justify-center text-center px-4">
          <h1 className="title text-2xl sm:text-3xl md:text-4xl">{t("testimonialsTitle")}</h1>
          <p className="title_text text-base sm:text-lg">{t("testimonialsSubtitle")}</p>
        </div>

        <Carousel 
          items={VIDEO_SOURCES}
          activeIdx={activeIdx}
          onActiveIdxChange={handleIndexChange}
          renderItem={(src, i, posClass) => (
            <VideoCard
              key={i}
              src={src}
              isActive={activeIdx === i}
              isPlaying={playing[i]}
              isMuted={muted[i]}
              progress={progress[i]}
              positionClass={posClass}
              onCardClick={() => handleCardClick(i)}
              onMuteToggle={() => handleMuteToggle(i)}
              videoRef={el => (videoRefs.current[i] = el)}
            />
          )}
        />
      </section>
    </>
  );
}