import React from "react";

import BigBen from "../../../assets/cambridge_album/uk/BigBen.jpg";
import Cambridge from "../../../assets/cambridge_album/uk/Cambridge.jpg";
import Group_1 from "../../../assets/cambridge_album/uk/group.jpg";
import Group_2 from "../../../assets/cambridge_album/uk/Cambridge_group.jpg";
import Bridge from "../../../assets/cambridge_album/uk/London_bridge.jpg";

import Czech1 from "../../../assets/cambridge_album/czechia/czechia1.png";
import Czech2 from "../../../assets/cambridge_album/czechia/czechia2.webp";
import Czech3 from "../../../assets/cambridge_album/czechia/czechia3.png";
import Czech4 from "../../../assets/cambridge_album/czechia/czechia4.png";
import Czech5 from "../../../assets/cambridge_album/czechia/czechia5.png";

import Malaysia1 from "../../../assets/cambridge_album/malaysia/malaz1.png";
import Malaysia2 from "../../../assets/cambridge_album/malaysia/malaz2.png";
import Malaysia3 from "../../../assets/cambridge_album/malaysia/malaz3.png";
import Malaysia4 from "../../../assets/cambridge_album/malaysia/malaz4.png";
import Malaysia5 from "../../../assets/cambridge_album/malaysia/malaz5.png";
import Malaysia6 from "../../../assets/cambridge_album/malaysia/malaz6.png";

export default function CountryAlbum({ country }) {
  const current = (country || "uk").toLowerCase();

  const albums = {
    uk: {
      left: BigBen,
      topRow: [Cambridge, Group_1, Bridge],
      bottom: Group_2,
    },
    czechia: {
      left: Czech1,
      topRow: Czech2,
      bottom: [Czech5, Czech3, Czech4],
    },
    malaysia: {
      grid: [Malaysia1, Malaysia2, Malaysia3, Malaysia4, Malaysia5, Malaysia6],
    },
  };

  const album = albums[current] || albums["uk"];
  const isCzechia = current === "czechia";
  const isMalaysia = current === "malaysia";

  return (
    <div className="bg-[#D1E8FF] py-8  w-full">
      <div className="bg-[#A8D6FF] w-[95%] md:w-[50%] mx-auto px-4 py-6 rounded-xl">
        {!isMalaysia ? (
          <>
            {/* Мобилка: сетка 2 колонки */}
            <div className="grid grid-cols-2 gap-2 md:hidden">
              {[
                album.left,
                ...(Array.isArray(album.topRow) ? album.topRow : [album.topRow]),
                ...(Array.isArray(album.bottom) ? album.bottom : [album.bottom]),
              ].map((img, index, arr) => (
                <img
                  key={index}
                  src={img}
                  alt={`photo ${index + 1}`}
                  className={`w-full object-cover rounded-lg aspect-[4/3] ${
                    arr.length % 2 !== 0 && index === arr.length - 1
                      ? "col-span-2"
                      : ""
                  }`}
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </div>

            {/* Десктоп: компактная сетка */}
            <div className="hidden md:flex flex-col gap-4">
              <div className="flex flex-row gap-4" style={{ maxHeight: "380px" }}>
                {/* Левое фото */}
                <div className="w-1/4">
                  <img
                    src={album.left}
                    alt="Left"
                    className="w-full h-full rounded-lg object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Правая часть */}
                <div className="w-3/4 flex flex-col gap-3">
                  {isCzechia ? (
                    <>
                      <img
                        src={album.topRow}
                        alt="Top Czechia"
                        className="w-full object-cover rounded-lg"
                        style={{ height: "45%" }}
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="flex flex-row gap-2" style={{ height: "52%" }}>
                        {album.bottom.map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt={`Czechia ${index + 1}`}
                            className="w-1/3 h-full object-cover rounded-lg"
                            loading="lazy"
                            decoding="async"
                          />
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-row gap-2" style={{ height: "45%" }}>
                        {album.topRow.map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt={`UK ${index + 1}`}
                            className="w-1/3 h-full object-cover rounded-lg"
                            loading="lazy"
                            decoding="async"
                          />
                        ))}
                      </div>
                      <img
                        src={album.bottom}
                        alt="Bottom UK"
                        className="w-full object-cover rounded-lg"
                        style={{ height: "52%" }}
                        loading="lazy"
                        decoding="async"
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {album.grid.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Malaysia ${index + 1}`}
                className="w-full h-auto aspect-[4/3] object-cover rounded-xl"
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}