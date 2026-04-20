import React from 'react';

import apu from '../../assets/heroSection_imgs/apu.jpg';
import london_bus from '../../assets/heroSection_imgs/london_bus.jpg';
import harward from '../../assets/heroSection_imgs/harward.jpg';
import prague from '../../assets/heroSection_imgs/prague.webp';
import sunway from '../../assets/heroSection_imgs/sunway.jpg';

const rowTop = [
  { src: apu,    label: 'APU', rotate: '-6deg', z: 1 },
  { src: london_bus,  label: 'London', rotate:  '2deg', z: 2 },
  { src: harward,    label: 'Harward', rotate: '-3deg', z: 3 },
];

const rowBottom = [
  { src: prague, label: 'Prague', rotate: '-4deg', z: 2 },
  { src: sunway,  label: 'batu_caves', rotate:  '4deg', z: 1 },
];

function PolaroidRow({ items, offsetX = 0 }) {
  const count = items.length;
  return (
    <div className="relative" style={{ height: 260, width: '100%', marginRight: 200 }}>
      {items.map((p, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-sm transition-all duration-300 hover:!rotate-0 hover:scale-110 hover:z-50"
          style={{
            width: 260,
            padding: '10px 10px 34px 10px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.13), 0 1px 4px rgba(0,0,0,0.08)',
            transform: `rotate(${p.rotate})`,
            zIndex: p.z,
            left: `calc(50% + ${offsetX + (i - (count - 1) / 2) * 180}px)`,
            top: i % 2 === 0 ? '20px' : '5px',
          }}
        >
          <img
            src={p.src}
            alt={p.label}
            className="w-full rounded-sm object-cover"
            style={{ height: 200 }}
          />
        </div>
      ))}
    </div>
  );
}

export default function HeroVisual() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-4 py-6">
      {/* Верхний веер — 3 фото */}
      <PolaroidRow items={rowTop} offsetX={20} />
      {/* Нижний веер — 2 фото, чуть смещён вправо для баланса */}
      <PolaroidRow items={rowBottom} offsetX={40} />
    </div>
  );
}