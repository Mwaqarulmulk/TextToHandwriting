import React, { useState, useCallback } from 'react';
import { Customizations, HandwritingStyle, PaperType, PenStyle, TextAlignment, OptionType } from '../types';
// FIX: Import DEFAULT_CUSTOMIZATIONS from constants
import { HANDWRITING_STYLES, PAPER_TYPES, PEN_STYLES, PEN_COLORS, TEXT_ALIGNMENTS, PaperIcon, PenIcon, SettingsIcon, DEFAULT_CUSTOMIZATIONS } from '../constants';

interface ControlsSectionProps {
  customizations: Customizations;
  onCustomizationChange: <K extends keyof Customizations>(key: K, value: Customizations[K]) => void;
  onBulkCustomizationChange: (updates: Partial<Customizations>) => void;
  onCustomPaperUpload: (file: File | null) => void;
}

type ActiveTab = 'handwriting' | 'paper' | 'pen' | 'layout' | 'effects';

const TabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-t-md transition-colors duration-150 focus:outline-none whitespace-nowrap
                ${active ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'}`}
  >
    {children}
  </button>
);

const ControlItemWrapper: React.FC<{ title: string; children: React.ReactNode; htmlFor?: string }> = ({ title, children, htmlFor }) => (
  <div className="mb-4">
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-1">{title}</label>
    {children}
  </div>
);

const ControlsSection: React.FC<ControlsSectionProps> = ({ customizations, onCustomizationChange, onBulkCustomizationChange, onCustomPaperUpload }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('handwriting');

  const handleHandwritingStyleChange = (styleId: string) => {
    const selectedStyle = HANDWRITING_STYLES.find(s => s.id === styleId);
    if (selectedStyle) {
        const updates: Partial<Customizations> = { selectedHandwritingStyleId: styleId };
        // FIX: Use imported DEFAULT_CUSTOMIZATIONS
        if (selectedStyle.fontSizeMultiplier) updates.fontSize = DEFAULT_CUSTOMIZATIONS.fontSize; // Reset base font size before multiplier
        if (selectedStyle.lineHeight) updates.lineHeight = parseFloat(selectedStyle.lineHeight);
        if (selectedStyle.letterSpacing) updates.letterSpacing = parseFloat(selectedStyle.letterSpacing);
        if (selectedStyle.wordSpacing) updates.wordSpacing = parseFloat(selectedStyle.wordSpacing);
        onBulkCustomizationChange(updates);
    }
  };
  
  const handlePaperTypeChange = (paperId: string) => {
    onCustomizationChange('selectedPaperTypeId', paperId);
    if(paperId !== 'custom') { // If not custom, clear custom background
        onCustomizationChange('customPaperBackground', undefined);
    }
  };

  const handleCustomPaperFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      onCustomPaperUpload(event.target.files[0]);
      onCustomizationChange('selectedPaperTypeId', 'custom'); // Indicate custom paper is active
      event.target.value = ''; // Reset file input
    }
  };


  const renderHandwritingTab = () => (
    <div>
      <ControlItemWrapper title="Handwriting Style" htmlFor="handwriting-style">
        <select
          id="handwriting-style"
          value={customizations.selectedHandwritingStyleId}
          onChange={(e) => handleHandwritingStyleChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        >
          {HANDWRITING_STYLES.map(style => (
            <option key={style.id} value={style.id} style={{ fontFamily: style.fontFamily }} className="text-sm">
              {style.name} - {style.description}
            </option>
          ))}
        </select>
      </ControlItemWrapper>
    </div>
  );

  const renderPaperTab = () => (
    <div>
      <ControlItemWrapper title="Paper Type">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {PAPER_TYPES.map(paper => (
            <button
              key={paper.id}
              onClick={() => handlePaperTypeChange(paper.id)}
              className={`p-2 border rounded-md flex flex-col items-center justify-center text-center h-20 sm:h-24
                          ${customizations.selectedPaperTypeId === paper.id ? 'ring-2 ring-indigo-500 border-indigo-500' : 'border-gray-300 hover:border-gray-400 transition-all'}`}
            >
              {paper.previewIcon || <PaperIcon className="w-5 h-5 sm:w-6 sm:h-6 mb-1 text-gray-500"/>}
              <span className="text-xs mt-1">{paper.name}</span>
            </button>
          ))}
        </div>
      </ControlItemWrapper>
       <ControlItemWrapper title="Custom Paper Background (Optional)" htmlFor="custom-paper-upload">
        <input 
            type="file" 
            id="custom-paper-upload"
            accept="image/*" 
            onChange={handleCustomPaperFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
        />
        {customizations.customPaperBackground && customizations.selectedPaperTypeId === 'custom' && (
            <div className="mt-2">
                <img src={customizations.customPaperBackground} alt="Custom paper preview" className="w-full h-20 object-cover border rounded"/>
                <button onClick={() => {
                     onCustomizationChange('customPaperBackground', undefined);
                     onCustomizationChange('selectedPaperTypeId', PAPER_TYPES[0].id); // Revert to default
                }} className="text-xs text-red-500 hover:text-red-700 mt-1">Remove custom paper</button>
            </div>
        )}
      </ControlItemWrapper>
    </div>
  );

  const renderPenTab = () => (
    <div>
      <ControlItemWrapper title="Pen Style (Primarily Color)" htmlFor="pen-style">
         {/* Pen style selection is simplified; primary effect is color and potential future stroke settings */}
        <select
          id="pen-style"
          value={customizations.selectedPenStyleId}
          onChange={(e) => onCustomizationChange('selectedPenStyleId', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        >
          {PEN_STYLES.map(style => (
            <option key={style.id} value={style.id} className="text-sm">{style.name}</option>
          ))}
        </select>
      </ControlItemWrapper>
      <ControlItemWrapper title="Ink Color">
        <div className="flex space-x-2 mb-2">
          {PEN_COLORS.map(color => (
            <button
              key={color.value}
              title={color.name}
              onClick={() => onCustomizationChange('inkColor', color.value)}
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 ${customizations.inkColor === color.value ? 'ring-2 ring-offset-1 ring-indigo-500 border-white' : 'border-gray-300'} ${color.className} transition-all`}
            />
          ))}
        </div>
        <input
          type="color"
          id="ink-color-picker"
          value={customizations.inkColor}
          onChange={(e) => onCustomizationChange('inkColor', e.target.value)}
          className="w-full h-10 p-1 border border-gray-300 rounded-md cursor-pointer"
        />
      </ControlItemWrapper>
    </div>
  );

  const renderLayoutTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
      <ControlItemWrapper title={`Font Size: ${customizations.fontSize}px`} htmlFor="font-size">
        <input type="range" id="font-size" min="5" max="30" step="1" value={customizations.fontSize} onChange={(e) => onCustomizationChange('fontSize', parseInt(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
      </ControlItemWrapper>
      <ControlItemWrapper title={`Line Height: ${customizations.lineHeight.toFixed(1)}`} htmlFor="line-height">
        <input type="range" id="line-height" min="1.0" max="3.0" step="0.1" value={customizations.lineHeight} onChange={(e) => onCustomizationChange('lineHeight', parseFloat(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
      </ControlItemWrapper>
      <ControlItemWrapper title={`Letter Spacing: ${customizations.letterSpacing.toFixed(1)}px`} htmlFor="letter-spacing">
        <input type="range" id="letter-spacing" min="-2" max="5" step="0.1" value={customizations.letterSpacing} onChange={(e) => onCustomizationChange('letterSpacing', parseFloat(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
      </ControlItemWrapper>
      <ControlItemWrapper title={`Word Spacing: ${customizations.wordSpacing.toFixed(1)}px`} htmlFor="word-spacing">
        <input type="range" id="word-spacing" min="0" max="10" step="0.1" value={customizations.wordSpacing} onChange={(e) => onCustomizationChange('wordSpacing', parseFloat(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
      </ControlItemWrapper>
      <ControlItemWrapper title={`Margins: ${customizations.margins}px`} htmlFor="margins">
        <input type="range" id="margins" min="10" max="100" step="5" value={customizations.margins} onChange={(e) => onCustomizationChange('margins', parseInt(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
      </ControlItemWrapper>
      <ControlItemWrapper title="Text Alignment" htmlFor="text-alignment">
        <select
          id="text-alignment"
          value={customizations.alignment}
          onChange={(e) => onCustomizationChange('alignment', e.target.value as TextAlignment)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        >
          {TEXT_ALIGNMENTS.map(align => (
            <option key={align.value} value={align.value} className="text-sm">{align.label}</option>
          ))}
        </select>
      </ControlItemWrapper>
    </div>
  );
  
  const renderEffectsTab = () => (
    <div>
        <ControlItemWrapper title="Realism Enhancements">
            <div className="flex items-center">
                <input
                    id="scan-effects"
                    type="checkbox"
                    checked={customizations.applyScanEffects}
                    onChange={(e) => onCustomizationChange('applyScanEffects', e.target.checked)}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor="scan-effects" className="ml-2 block text-sm text-gray-900">
                    Apply Scan-like Effects (shadows, noise)
                </label>
            </div>
        </ControlItemWrapper>
        <ControlItemWrapper title={`Ink Pressure/Bleed: ${customizations.textShadowIntensity.toFixed(1)}`} htmlFor="text-shadow-intensity">
            <input 
                type="range" 
                id="text-shadow-intensity" 
                min="0" max="1" step="0.1" 
                value={customizations.textShadowIntensity} 
                onChange={(e) => onCustomizationChange('textShadowIntensity', parseFloat(e.target.value))} 
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" 
                disabled={!customizations.applyScanEffects}
            />
             <p className="text-xs text-gray-500 mt-1">Adjusts subtle ink bleed. Effective when scan effects are on.</p>
        </ControlItemWrapper>
    </div>
  );


  return (
    // Removed bg-white, p-6 etc from here; parent div in App.tsx now handles this for sticky behavior
    <div className="h-full flex flex-col"> 
      <div className="p-4 sm:p-6"> {/* Added padding here that was removed from parent */}
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Customize Output</h2>
        <div className="border-b border-gray-200 mb-4">
          <nav className="-mb-px flex space-x-1 sm:space-x-2 flex-wrap" aria-label="Tabs"> {/* Allow tabs to wrap */}
            <TabButton active={activeTab === 'handwriting'} onClick={() => setActiveTab('handwriting')}>Handwriting</TabButton>
            <TabButton active={activeTab === 'paper'} onClick={() => setActiveTab('paper')}>Paper</TabButton>
            <TabButton active={activeTab === 'pen'} onClick={() => setActiveTab('pen')}>Pen</TabButton>
            <TabButton active={activeTab === 'layout'} onClick={() => setActiveTab('layout')}>Layout</TabButton>
            <TabButton active={activeTab === 'effects'} onClick={() => setActiveTab('effects')}>Effects</TabButton>
          </nav>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto custom-scrollbar px-4 sm:px-6 pb-6"> {/* Padding for scroll content area */}
        {activeTab === 'handwriting' && renderHandwritingTab()}
        {activeTab === 'paper' && renderPaperTab()}
        {activeTab === 'pen' && renderPenTab()}
        {activeTab === 'layout' && renderLayoutTab()}
        {activeTab === 'effects' && renderEffectsTab()}
      </div>
    </div>
  );
};

export default ControlsSection;
