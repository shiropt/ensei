"use client";
import type { FC } from "react";
import { APIProvider, Map as GoogleMapComponent } from "@vis.gl/react-google-maps";

type Props = {
  lat: number;
  lng: number;
};

const GCP_API_KEY = process.env.NEXT_PUBLIC_GCP_API_KEY || "";

export const GoogleMap: FC<Props> = ({ lat, lng }) => {
  return (
    <APIProvider region="JP" apiKey={GCP_API_KEY}>
      <GoogleMapComponent
        defaultCenter={{ lat, lng }}
        defaultZoom={14}
        gestureHandling="greedy"
        disableDefaultUI
      />
    </APIProvider>
  );
};

// 後方互換性のためのエイリアス
export const StadiumMap = GoogleMap;