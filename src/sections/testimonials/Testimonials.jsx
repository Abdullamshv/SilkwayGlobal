import React, { useRef, useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import VideoCard from "./components/VideoCard";

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

  const activateNext = useCallback((finishedIdx) => {
    const next = (finishedIdx + 1) % VIDEO_SOURCES.length;
    setActiveIdx(next);
    setProgress(prev => prev.map((p, i) => i === finishedIdx ? 0 : p));
    playVideo(next);
  }, [playVideo]);

  useEffect(() => {
    const cleanups = videoRefs.current.map((v, i) => {
      if (!v) return () => {};

      const onTimeUpdate = () => {
        if (v.duration) {
          const pct = Math.round((v.currentTime / v.duration) * 100);
          setProgress(prev => prev.map((p, j) => j === i ? pct : p));
        }
      };
      const onEnded = () => {
        setPlaying(prev => prev.map((p, j) => j === i ? false : p));
        activateNext(i);
      };

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
            videoRefs.current.forEach((v, i) => {
              if (v && !v.paused) pauseVideo(i);
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [hasIntersected, playVideo, pauseVideo]);

  const handleCardClick = (idx) => {
    if (idx === activeIdx) return;
    pauseVideo(activeIdx);
    setActiveIdx(idx);
    playVideo(idx);
  };

  const handlePlayPause = (idx) => {
    if (playing[idx]) {
      pauseVideo(idx);
    } else {
      if (idx !== activeIdx) {
        pauseVideo(activeIdx);
      }
      setActiveIdx(idx);
      playVideo(idx);
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
      `}</style>

      <section
        id="feedbacks"
        ref={sectionRef}
        className="sm:px-2 lg:px-8 bg-[#D1E8FF] font-[Montserrat] w-full flex flex-col gap-12"
        style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
      >
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="title text-2xl sm:text-3xl md:text-4xl">
            {t("testimonialsTitle")}
          </h1>
          <p className="title_text text-base sm:text-lg">
            {t("testimonialsSubtitle")}
          </p>
        </div>

        <div className="gap-1 md:gap-12" style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", minHeight: "10px" }}>
          {VIDEO_SOURCES.map((src, i) => (
            <VideoCard
              key={i}
              src={src}
              isActive={activeIdx === i}
              isPlaying={playing[i]}
              isMuted={muted[i]}
              progress={progress[i]}
              onCardClick={() => handleCardClick(i)}
              onPlayPause={() => handlePlayPause(i)}
              onMuteToggle={() => handleMuteToggle(i)}
              videoRef={el => (videoRefs.current[i] = el)}
            />
          ))}
        </div>
      </section>
    </>
  );
}