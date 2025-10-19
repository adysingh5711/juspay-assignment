import { useTheme } from "../../../../contexts/theme-context";
import { RevenueByLocationData } from "../data/revenue-by-location-data";
import { useState, useEffect } from "react";

export const RevenueList = () => {
  const maxValue = 100;
  const { theme } = useTheme();
  const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const animationDuration = 1000; // 1 second
    const steps = 60; // 60 steps for smooth animation
    const stepDuration = animationDuration / steps;

    let currentStep = 0;

    const animate = () => {
      if (currentStep <= steps) {
        const progress = currentStep / steps;

        const newValues: { [key: string]: number } = {};
        RevenueByLocationData.features.forEach(feature => {
          const { name, value } = feature.properties;
          newValues[name] = Math.round(value * progress);
        });

        setAnimatedValues(newValues);
        currentStep++;
        setTimeout(animate, stepDuration);
      }
    };

    animate();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {RevenueByLocationData.features.map(feature => {
        const { name } = feature.properties;
        const animatedValue = animatedValues[name] || 0;

        return (
          <div key={name} className=" flex flex-col">
            <div className={`flex justify-between text-sm font-medium items-center ${theme === 'dark' ? 'text-white/80' : 'text-black'}`}>
              <span>{name}</span>
              <span>{Math.round(animatedValue / 1000)}K</span>
            </div>

            <div className={`relative h-0.5 ${theme === 'dark' ? 'bg-white/10' : 'bg-blue-100'} rounded-full overflow-hidden`}>
              <div
                className={`absolute top-0 left-0 h-full bg-[#A8C5DA] rounded-full transition-all duration-100 ease-out`}
                style={{ width: `${(animatedValue / (maxValue * 1000)) * 100}%` }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
