import React, { useState, useCallback, useEffect } from 'react';
import InputSection from './components/InputSection';
import PreviewSection from './components/PreviewSection';
import ControlsSection from './components/ControlsSection';
import Footer from './components/Footer'; // Import the new Footer
import { Customizations } from './types';
import { DEFAULT_CUSTOMIZATIONS, HANDWRITING_STYLES } from './constants';

const initialCustomizationsState: Customizations = {
  ...DEFAULT_CUSTOMIZATIONS,
  customPaperBackground: undefined,
};

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>("Hello! This is a sample text.\nTry typing your own, or upload a document.\n\nEnjoy converting your text into beautiful handwriting!");
  const [customizations, setCustomizations] = useState<Customizations>(initialCustomizationsState);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const style = HANDWRITING_STYLES.find(s => s.id === customizations.selectedHandwritingStyleId);
    if (style) {
      const updatedCustoms: Partial<Customizations> = {};
      if(style.lineHeight && customizations.lineHeight === DEFAULT_CUSTOMIZATIONS.lineHeight) {
        updatedCustoms.lineHeight = parseFloat(style.lineHeight);
      }
      if(style.letterSpacing && customizations.letterSpacing === DEFAULT_CUSTOMIZATIONS.letterSpacing) {
        updatedCustoms.letterSpacing = parseFloat(style.letterSpacing);
      }
      if(style.wordSpacing && customizations.wordSpacing === DEFAULT_CUSTOMIZATIONS.wordSpacing) {
        updatedCustoms.wordSpacing = parseFloat(style.wordSpacing);
      }
      if (Object.keys(updatedCustoms).length > 0) {
        setCustomizations(prev => ({ ...prev, ...updatedCustoms }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customizations.selectedHandwritingStyleId]);


  const handleCustomizationChange = useCallback(<K extends keyof Customizations>(key: K, value: Customizations[K]) => {
    setCustomizations(prev => ({ ...prev, [key]: value }));
  }, []);
  
  const handleBulkCustomizationChange = useCallback((updates: Partial<Customizations>) => {
    setCustomizations(prev => ({ ...prev, ...updates }));
  }, []);

  const handleCustomPaperUpload = useCallback((file: File | null) => {
    if (file) {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        handleCustomizationChange('customPaperBackground', reader.result as string);
        handleCustomizationChange('selectedPaperTypeId', 'custom');
        setIsLoading(false);
      };
      reader.onerror = () => {
        alert('Failed to load custom paper image.');
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    } else {
      handleCustomizationChange('customPaperBackground', undefined);
      if (customizations.selectedPaperTypeId === 'custom') {
        handleCustomizationChange('selectedPaperTypeId', DEFAULT_CUSTOMIZATIONS.selectedPaperTypeId);
      }
    }
  }, [handleCustomizationChange, customizations.selectedPaperTypeId]);


  const Header: React.FC = () => (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 sm:p-6 shadow-md sticky top-0 z-30">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">AI Handwritten Text Converter</h1>
      </div>
    </header>
  );
  
  // Estimated header height on large screens (sm:p-6 padding + content): ~5.5rem
  // Estimated footer height (py-12 padding + content): ~10rem
  // Main container y-padding on large screens (lg:p-8): 2rem top + 2rem bottom = 4rem
  // Total static vertical space: ~5.5rem (header) + ~10rem (footer) + 4rem (main y-padding) = ~19.5rem
  const contentAreaBaseHeight = "min-h-[350px] sm:min-h-[400px]";
  const contentAreaLgMaxHeight = "lg:max-h-[calc(100vh-19.5rem)]"; // Max height for content areas on large screens
  const controlsStickyTopLg = "lg:top-[calc(5.5rem+1rem)]"; // Header height (5.5rem) + 1rem gap


  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        {/* Controls Section */}
        <div className={`lg:col-span-1 lg:sticky ${controlsStickyTopLg} ${contentAreaLgMaxHeight} overflow-y-auto custom-scrollbar rounded-lg shadow-lg bg-white`}>
          <div className="h-full">
            <ControlsSection 
              customizations={customizations} 
              onCustomizationChange={handleCustomizationChange}
              onBulkCustomizationChange={handleBulkCustomizationChange}
              onCustomPaperUpload={handleCustomPaperUpload}
            />
          </div>
        </div>

        {/* Input and Preview Sections Wrapper */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Input Section */}
          <section aria-labelledby="input-heading" className={`${contentAreaBaseHeight} ${contentAreaLgMaxHeight} flex flex-col`}>
            {/* Using <section> requires an accessible name, e.g. via aria-labelledby linked to a visible heading or sr-only heading.
                InputSection itself has <h2 id="input-heading">Input Text</h2> (implicitly if not explicit id) */}
            <InputSection inputText={inputText} onTextChange={setInputText} setIsLoading={setIsLoading} />
          </section>
          {/* Preview Section */}
          <section aria-labelledby="preview-heading" className={`${contentAreaBaseHeight} ${contentAreaLgMaxHeight} flex flex-col`}>
             {/* PreviewSection itself has <h2 id="preview-heading">Preview</h2> */}
            <PreviewSection inputText={inputText} customizations={customizations} isLoading={isLoading} />
          </section>
        </div>
      </main>
      
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
          <p className="mt-4 text-white text-xl">Processing...</p>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default App;