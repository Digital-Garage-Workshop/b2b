import React from "react";

interface CustomMarkerProps {
  color?: string;
  size?: number;
  label?: string;
}

const CustomMarker: React.FC<CustomMarkerProps> = ({
  color = "#4285F4",
  size = 24,
  label,
}) => {
  // Create a data URI for your SVG so it can be used as a marker icon
  const createMarkerDataUri = () => {
    const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${
      size * 1.5
    }" viewBox="0 0 24 36">
        <path fill="${color}" d="M12 0C5.383 0 0 5.383 0 12c0 9 12 24 12 24s12-15 12-24c0-6.617-5.383-12-12-12z"/>
        <circle fill="#FFFFFF" cx="12" cy="12" r="6"/>
        ${
          label
            ? `<text x="12" y="15" font-size="8" text-anchor="middle" fill="#000000">${label}</text>`
            : ""
        }
      </svg>
    `;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgString)}`;
  };

  return createMarkerDataUri();
};

export default CustomMarker;
