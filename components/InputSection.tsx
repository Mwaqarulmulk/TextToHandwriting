
import React, { useState, useCallback } from 'react';
import { UploadIcon } from '../constants';
import { extractTextFromFile } from '../services/documentProcessor';
import { ALL_SUPPORTED_EXTENSIONS, SUPPORTED_FILE_TYPES } from '../constants';

interface InputSectionProps {
  inputText: string;
  onTextChange: (text: string) => void;
  setIsLoading: (loading: boolean) => void;
}

const InputSection: React.FC<InputSectionProps> = ({ inputText, onTextChange, setIsLoading }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(async (file: File | null) => {
    if (!file) return;
    setError(null);

    const isValidType = Object.keys(SUPPORTED_FILE_TYPES).includes(file.type) || 
                        ALL_SUPPORTED_EXTENSIONS.split(',').some(ext => file.name.endsWith(ext));

    if (!isValidType) {
      setError(`Unsupported file type: ${file.name}. Supported types: .txt, .docx, .pdf`);
      return;
    }

    setIsLoading(true);
    try {
      const text = await extractTextFromFile(file);
      onTextChange(text);
    } catch (err: any) {
      setError(err.message || 'Failed to process file.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [onTextChange, setIsLoading]);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      handleFile(event.dataTransfer.files[0]);
      event.dataTransfer.clearData();
    }
  }, [handleFile]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleDragEnter = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      handleFile(event.target.files[0]);
      event.target.value = ''; // Reset file input
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg h-full flex flex-col">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Input Text</h2>
      <textarea
        value={inputText}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder="Type or paste your text here..."
        className="w-full flex-grow p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 resize-none custom-scrollbar"
      />
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        className={`mt-4 p-6 border-2 border-dashed rounded-md text-center cursor-pointer transition-colors duration-200 ease-in-out
                    ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-gray-400'}`}
      >
        <input
          type="file"
          id="fileUpload"
          className="hidden"
          accept={ALL_SUPPORTED_EXTENSIONS}
          onChange={handleFileChange}
        />
        <label htmlFor="fileUpload" className="cursor-pointer">
          <UploadIcon className="w-10 h-10 mx-auto text-gray-400 mb-2" />
          <p className="text-sm text-gray-600">
            Drag & drop a file here, or <span className="font-semibold text-indigo-600">click to browse</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">Supported: .txt, .docx, .pdf</p>
        </label>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default InputSection;
    