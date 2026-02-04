"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const GYM_LOCATION = {
  lat: 37.1402155590581,
  lng: 128.211983410491,
  name: "제천남여헬스장",
  address: "충청북도 제천시 의림대로18길 3 행운빌딩 5층",
};

export default function KakaoMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        if (!mapRef.current) return;

        const options = {
          center: new window.kakao.maps.LatLng(GYM_LOCATION.lat, GYM_LOCATION.lng),
          level: 3,
        };

        const map = new window.kakao.maps.Map(mapRef.current, options);

        // 마커 생성
        const markerPosition = new window.kakao.maps.LatLng(GYM_LOCATION.lat, GYM_LOCATION.lng);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);

        // 인포윈도우 생성
        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:8px 12px;font-size:14px;font-weight:bold;color:#000;">${GYM_LOCATION.name}</div>`,
        });
        infowindow.open(map, marker);
      });
    };

    return () => {
      const existingScript = document.querySelector(`script[src*="dapi.kakao.com"]`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div
      ref={mapRef}
      className="w-full h-full min-h-[300px] md:min-h-[400px]"
      style={{ background: "#1a1a1a" }}
    />
  );
}
