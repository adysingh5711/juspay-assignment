import * as L from 'leaflet'
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet'
import { RevenueByLocationData } from '../data/revenue-by-location-data'
import { useTheme } from '../../../../contexts/theme-context'


const blackDot = new L.DivIcon({
  html: `<div style="
      width:10px;
      height:10px;
      background:black;
      border-radius:50%;
      border:2px solid white;
    "></div>`,
  className: ""
});


export const RevenueMap = () => {
  const { theme } = useTheme()
  return (
    <div className="w-full h-[80px] sm:h-[100px] rounded-xl overflow-hidden">
      <MapContainer
        center={[0, 0]}
        zoom={0}
        scrollWheelZoom={true}
        zoomControl={false}
        style={{ width: "100%", height: "100%", background: "transparent" }}
      >

        <TileLayer
          url={theme === 'dark' ? "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png" : "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"}
          attribution=""
        />

        {RevenueByLocationData.features.map((feature) => (
          <Marker
            key={feature.properties.name}
            position={[
              feature.geometry.coordinates[1],
              feature.geometry.coordinates[0],
            ]}
            icon={blackDot}
          >
            <Tooltip
              className="custom-tooltip"
              permanent={false}
              direction="top"
              offset={[0, -10]}
            >
              <div className={`px-2 py-1 text-xs font-medium rounded border shadow-sm ${theme === 'dark'
                  ? 'bg-[#191919] text-white border-white/20'
                  : 'text-black bg-white border-black/10'
                }`}>
                {feature.properties.name}
              </div>
            </Tooltip>
          </Marker>
        ))}

        <Marker position={[40.7128, -74.0060]} icon={blackDot}>
          <Tooltip
            className="custom-tooltip"
            permanent={false}
            direction="top"
            offset={[0, -10]}
          >
            <div className={`px-2 py-1 text-xs font-medium rounded border shadow-sm ${theme === 'dark'
                ? 'bg-black/90 text-white border-white/20'
                : 'text-black bg-white border-black/10'
              }`}>
              New York
            </div>
          </Tooltip>
        </Marker>
      </MapContainer>
    </div>
  );
};
