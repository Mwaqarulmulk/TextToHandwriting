
import React, { useRef } from 'react';
import { Customizations, HandwritingStyle, PaperType } from '../types';
import { HANDWRITING_STYLES, PAPER_TYPES } from '../constants';
import { exportToImage, exportToPdf } from '../services/documentProcessor';

interface PreviewSectionProps {
  inputText: string;
  customizations: Customizations;
  isLoading: boolean;
}

const PreviewSection: React.FC<PreviewSectionProps> = ({ inputText, customizations, isLoading }) => {
  const previewRef = useRef<HTMLDivElement>(null);

  const currentHandwritingStyle = HANDWRITING_STYLES.find(s => s.id === customizations.selectedHandwritingStyleId) || HANDWRITING_STYLES[0];
  const currentPaperType = PAPER_TYPES.find(p => p.id === customizations.selectedPaperTypeId) || PAPER_TYPES[0];

  const textStyleBase: React.CSSProperties = {
    fontFamily: currentHandwritingStyle.fontFamily,
    fontSize: `${customizations.fontSize * (currentHandwritingStyle.fontSizeMultiplier || 1)}px`,
    lineHeight: `${customizations.lineHeight * (parseFloat(currentHandwritingStyle.lineHeight || '1'))}`,
    letterSpacing: `${customizations.letterSpacing + (parseFloat(currentHandwritingStyle.letterSpacing || '0'))}px`,
    wordSpacing: `${customizations.wordSpacing + (parseFloat(currentHandwritingStyle.wordSpacing || '0'))}px`,
    color: customizations.inkColor,
    textAlign: customizations.alignment,
    // Padding is applied to the main preview div (handwritten-preview) which acts as the "page"
    padding: `${customizations.margins}px`, 
    whiteSpace: 'pre-wrap', // Preserve line breaks and spaces
    overflowWrap: 'break-word',
    minHeight: '100%', // Ensure it fills the container for proper scroll height calculation
  };
  
  const previewDivStyle: React.CSSProperties = { ...textStyleBase };


  if (customizations.applyScanEffects && customizations.textShadowIntensity > 0) {
    // Simulate ink bleed/pressure with a subtle text shadow applied to the text itself.
    // This needs to be on the text, not the whole div if padding is large.
    // However, for simplicity and current structure, it's part of textStyleBase.
    // If text is wrapped in its own div, move this there.
    const shadowIntensity = customizations.textShadowIntensity * 0.5; // Max 0.5px blur
    previewDivStyle.textShadow = `0 0 ${shadowIntensity}px ${customizations.inkColor}`;
  }
  
  // Custom paper background is applied to the main preview div
  if (customizations.customPaperBackground) {
    previewDivStyle.backgroundImage = `url(${customizations.customPaperBackground})`;
    previewDivStyle.backgroundSize = 'cover'; 
    previewDivStyle.backgroundPosition = 'center';
    previewDivStyle.backgroundRepeat = 'no-repeat'; // Typically for custom images
  }


  return (
    <div className="bg-gray-200 p-6 rounded-lg shadow-lg h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Preview</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => previewRef.current && exportToImage(previewRef.current, 'handwritten-output', 'png')}
            disabled={isLoading}
            className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition disabled:opacity-50"
          >
            Export PNG
          </button>
          <button
            onClick={() => previewRef.current && exportToImage(previewRef.current, 'handwritten-output', 'jpeg')}
            disabled={isLoading}
            className="px-4 py-2 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 transition disabled:opacity-50"
          >
            Export JPG
          </button>
          <button
            onClick={() => previewRef.current && exportToPdf(previewRef.current, 'handwritten-output')}
            disabled={isLoading}
            className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition disabled:opacity-50"
          >
            Export PDF
          </button>
        </div>
      </div>

      {/* This outer div handles scrolling and basic framing */}
      <div 
        className="flex-grow overflow-auto custom-scrollbar border border-gray-300 bg-gray-50" // Neutral bg for scroll container
        id="preview-area-container"
      >
        {/* This inner div is what html2canvas captures. It has all paper styles and text. */}
        <div
          ref={previewRef}
          id="handwritten-preview"
          className={`relative ${!customizations.customPaperBackground ? currentPaperType.className : ''} ${customizations.applyScanEffects ? 'shadow-xl' : ''}`}
          style={previewDivStyle} // Contains text styles, padding (margins), and custom background if any
        >
          {/* Texture and Noise overlays are children, so they are part of the capture */}
          {!customizations.customPaperBackground && currentPaperType.textureClassName && 
            <div className={`absolute inset-0 pointer-events-none ${currentPaperType.textureClassName} opacity-50 z-0`}></div>
          }
          {customizations.applyScanEffects && !customizations.customPaperBackground && /* Avoid double noise if custom bg used */
            <div className="absolute inset-0 pointer-events-none bg-black opacity-[0.03] mix-blend-multiply z-0"></div>
          }
          {/* The actual text content. Rendered on top of overlays due to natural stacking or explicit z-index. */}
          {/* textStyleBase already applied to parent, so text inherits it. No need for an extra wrapper unless specific z-indexing is needed against complex overlays. */}
          {inputText || "Your handwritten text will appear here..."}
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2 text-center">Note: PDF export will paginate content to A4-style pages.</p>
    </div>
  );
};

export default PreviewSection;
