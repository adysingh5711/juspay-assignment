import { RevenueByLocationDataType } from "../types/revenue-by-location-data-type";

export const RevenueByLocationData: RevenueByLocationDataType = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { name: "New York", value: 72000 },
        geometry: { type: "Point", coordinates: [-74.0060, 40.7128] },
      },
      {
        type: "Feature",
        properties: { name: "San Francisco", value: 39000 },
        geometry: { type: "Point", coordinates: [-122.4194, 37.7749] },
      },
      {
        type: "Feature",
        properties: { name: "Sydney", value: 25000 },
        geometry: { type: "Point", coordinates: [151.2093, -33.8688] },
      },
      {
        type: "Feature",
        properties: { name: "Singapore", value: 61000 },
        geometry: { type: "Point", coordinates: [103.8198, 1.3521] },
      },
    ],
  };