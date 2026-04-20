import React from "react";
import { PlayIcon, PauseIcon, SoundOnIcon, SoundOffIcon } from "./VideoIcons";

export default function VideoCard({ 
  src, 
  isActive, 
  isPlaying, 
  isMuted, 
  progress, 
  onCardClick, 
  onPlayPause, 
  onMuteToggle, 
  videoRef 
}) {
  return (
    <div
      onClick={onCardClick}
      className="w-full md:w-1/2" 
      style={{
        flex: isActive ? "0.3" : "0.25", 
        height: "clamp(200px, 50vw, 600px)",
        borderRadius: "20px",
        overflow: "hidden",
        background: "#0B2A4A",
        position: "relative",
        cursor: "pointer",
        opacity: isActive ? 1 : 0.65,
        transition: "flex 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.4s",
      }}
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

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: isActive ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0.28)",
          transition: "background 0.2s",
        }}
      >
        <button
          onClick={(e) => { e.stopPropagation(); onPlayPause(); }}
          style={{
            width: 58,
            height: 58,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.92)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "transform 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
      </div>

      {isActive && (
        <div
          className="video-controls"
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