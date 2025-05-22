
import React from 'react';

export interface HandwritingStyle {
  id: string;
  name: string;
  fontFamily: string;
  description: string;
  variant?: string; // e.g., 'italic', 'bold'
  letterSpacing?: string; // e.g., '0.05em'
  wordSpacing?: string; // e.g., '0.1em'
  lineHeight?: string; // e.g., '1.6'
  fontSizeMultiplier?: number; // To adjust base font size for this style
}

export interface PaperType {
  id: string;
  name: string;
  className: string; // Tailwind classes for background, lines, etc.
  // FIX: Add optional description property to PaperType
  description?: string; // Description of the paper type
  textureClassName?: string; // Optional texture overlay class
  previewIcon?: React.ReactNode;
}

export interface PenStyle {
  id: string;
  name: string;
  // Future: could include properties for stroke width adjustments, effects like bleed
}

export type TextAlignment = 'left' | 'center' | 'right' | 'justify';

export interface Customizations {
  fontSize: number; // in px
  lineHeight: number; // multiplier
  letterSpacing: number; // in px
  wordSpacing: number; // in px
  margins: number; // in px (applied as padding to preview content)
  alignment: TextAlignment;
  inkColor: string;
  selectedHandwritingStyleId: string;
  selectedPaperTypeId: string;
  selectedPenStyleId: string; // Though primarily color-driven for now
  customPaperBackground?: string; // Data URL for user-uploaded paper
  applyScanEffects: boolean;
  textShadowIntensity: number; // 0 to 1 for ink bleed/pressure
}

export interface OptionType<T = string> {
  value: T;
  label: string;
}
