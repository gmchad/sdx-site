'use client'

import React, { createContext, useContext, useState } from 'react';

interface CanvasSettings {
  heroBlur: number;
  heroContrast: number;
  heroThreshold: number;
  heroOpacity: number;
  heroCellSize: number;
  heroDensity: number;
  footerBlur: number;
  footerContrast: number;
  footerThreshold: number;
  footerOpacity: number;
  footerCellSize: number;
  footerDensity: number;
}

const defaults: CanvasSettings = {
  heroBlur: 8.5,
  heroContrast: 48,
  heroThreshold: -37,
  heroOpacity: 0.7,
  heroCellSize: 62,
  heroDensity: 0.9,
  footerBlur: 8.5,
  footerContrast: 48,
  footerThreshold: -36,
  footerOpacity: 0.63,
  footerCellSize: 62,
  footerDensity: 1.3,
};

const CanvasSettingsContext = createContext<{
  settings: CanvasSettings;
  setSettings: React.Dispatch<React.SetStateAction<CanvasSettings>>;
}>({ settings: defaults, setSettings: () => {} });

export const useCanvasSettings = () => useContext(CanvasSettingsContext);

export function CanvasSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<CanvasSettings>(defaults);
  return (
    <CanvasSettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </CanvasSettingsContext.Provider>
  );
}

export type { CanvasSettings };
export { defaults as canvasSettingsDefaults };
