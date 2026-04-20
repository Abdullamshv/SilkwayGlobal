import React from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

export default function Location() {
  return (
    <YMaps>
      <div className="w-full h-[300px] rounded-xl overflow-hidden">
        <Map
          defaultState={{ center: [42.30646, 69.590069], zoom: 15 }}
          width="100%"
          height="100%"
        >
          <Placemark geometry={[42.30646, 69.590069]} />
        </Map>
      </div>
    </YMaps>
  );
}
