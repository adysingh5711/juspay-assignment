export interface RevenueByLocationFeature {
    type: "Feature";
    properties: {
      name: string;
      value: number;
    };
    geometry: {
      type: "Point";
      coordinates: [number, number];
    };
  }
  
  export interface RevenueByLocationDataType {
    type: "FeatureCollection";
    features: RevenueByLocationFeature[];
  }