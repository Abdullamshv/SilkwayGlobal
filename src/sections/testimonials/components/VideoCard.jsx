import React from "react";
import { SoundOnIcon, SoundOffIcon } from "./VideoIcons";

export default function VideoCard({ 
  src, 
  isActive, 
  isPlaying, 
  isMuted, 
  progress, 
  onCardClick, 
  onMuteToggle, 
  videoRef,
  positionClass // Получаем класс позиции
}) {
  return (
    <div
      onClick={onCardClick}
      className={`v-card ${positionClass}`}
    >
      <video
        ref={videoRef}
        src={src}
        playsInline
        preload="metadata"
        muted={isMuted}
        style={{ 
          width: "100%", 
          height: "100%", 
          objectFit: "cover", 
          display: "block" 
        }}
      />

      {isActive && (
        <div
          className="video-controls"
          onClick={(e) => e.stopPropagation()} // Изолируем клики по панели
          style={{
            position: "absolute",
            bottom: 14,
            left: 0,
            right: 0,
            display: "flex",
            alignItems: "center",
            padding: "0 14px",
            gap: 10,
          }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); onMuteToggle(); }}
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.88)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {isMuted ? <SoundOffIcon /> : <SoundOnIcon />}
          </button>

          <div style={{ flex: 1, height: 4, background: "rgba(255,255,255,0.35)", borderRadius: 4, overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "#fff",
                borderRadius: 4,
                transition: "width 0.3s linear",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}