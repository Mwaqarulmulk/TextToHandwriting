import React from 'react';
// FIX: Import Customizations type
import { HandwritingStyle, PaperType, PenStyle, Customizations } from './types';

// Consistent type for SVG Icon components
type IconProps = { className?: string };

// SVG Icons (simple examples)
export const UploadIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l-3.75 3.75M12 9.75l3.75 3.75M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const PenIcon: React.FC<IconProps> = ({ className }) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
  </svg>
);

export const PaperIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

export const SettingsIcon: React.FC<IconProps> = ({ className }) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-1.003 1.11-.962a8.958 8.958 0 017.324 3.97c.293.585.256 1.291-.084 1.825l-.812 1.459a3.375 3.375 0 00-3.182 3.182l-1.46.812c-.534.293-1.24.256-1.825-.084A8.958 8.958 0 013.94 9.594c-.542-.09-.962-.56-1.003-1.11a8.958 8.958 0 013.97-7.324c.585-.293 1.291-.256 1.825.084l1.459.812A3.375 3.375 0 009.594 3.94zM14.25 12a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18.75c.09.542.56 1.003 1.11.962a8.958 8.958 0 007.324-3.97c.293-.585.256-1.291-.084-1.825l-.812-1.459a3.375 3.375 0 01-3.182-3.182l-1.46-.812c-.534-.293-1.24-.256-1.825.084A8.958 8.958 0 0018.75 6c.542.09.962.56 1.003 1.11a8.958 8.958 0 00-3.97 7.324c-.585.293-1.291.256-1.825-.084l-1.459-.812a3.375 3.375 0 01-3.182-3.182l-.812-1.459c-.293-.585-.256-1.291.084-1.825A8.958 8.958 0 006 18.75z" />
 </svg>
);

// Social Media Icons
export const FacebookIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className || "w-6 h-6"} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
);

export const InstagramIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className || "w-6 h-6"} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12.315 2.014a.828.828 0 01.676 0 10.38 10.38 0 014.264.92c1.462.428 2.698 1.02 3.727 2.05C22.013 6.01 22.607 7.25 23.035 8.712a10.383 10.383 0 01.919 4.264.828.828 0 010 .676 10.38 10.38 0 01-.92 4.264c-.428 1.462-1.02 2.698-2.05 3.727-1.026 1.027-2.262 1.623-3.723 2.051a10.384 10.384 0 01-4.265.919.828.828 0 01-.676 0 10.38 10.38 0 01-4.264-.92c-1.462-.428-2.698-1.02-3.727-2.05C.987 17.99.393 16.75.035 15.288a10.383 10.383 0 01-.919-4.264.828.828 0 010-.676 10.38 10.38 0 01.92-4.264c.428-1.462 1.02-2.698 2.05-3.727 1.026-1.027 2.262-1.623 3.723-2.051A10.384 10.384 0 0111.999 2c.108.004.217.008.326.014zM12 6.803a5.197 5.197 0 100 10.394A5.197 5.197 0 0012 6.803zm0 8.318a3.121 3.121 0 110-6.242 3.121 3.121 0 010 6.242zm5.868-8.18a1.24 1.24 0 100-2.48 1.24 1.24 0 000 2.48z" clipRule="evenodd" />
  </svg>
);

export const LinkedInIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className || "w-6 h-6"} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
);

export const GitHubIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className || "w-6 h-6"} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.201 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.943.359.308.678.92.678 1.852 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

export const YouTubeIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className || "w-6 h-6"} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.411 0 5.822 0 12s.488 8.589 4.385 8.816c3.6.245 11.626.246 15.23 0 3.897-.227 4.385-2.652 4.385-8.816s-.488-8.589-4.385-8.816zm-10.615 12.737V8.079l6.268 3.429-6.268 3.413z" clipRule="evenodd" />
  </svg>
);

export const EmailIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className || "w-6 h-6"} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

export const ExternalLinkIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-4 h-4 ml-1"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
  </svg>
);

export const HANDWRITING_STYLES: HandwritingStyle[] = [
  { id: 'kalam', name: 'Kalam', fontFamily: "'Kalam', cursive", description: 'A friendly, slightly informal script.', fontSizeMultiplier: 1.1, lineHeight: '1.7' },
  { id: 'caveat', name: 'Caveat', fontFamily: "'Caveat', cursive", description: 'A cursive style with natural imperfections.', fontSizeMultiplier: 1.2, lineHeight: '1.8' },
  { id: 'patrick-hand', name: 'Patrick Hand', fontFamily: "'Patrick Hand', cursive", description: 'Neat, legible, like careful handwriting.' },
  { id: 'architects-daughter', name: 'Architects Daughter', fontFamily: "'Architects Daughter', cursive", description: 'Mimics an architect\'s print.' },
  { id: 'dancing-script', name: 'Dancing Script', fontFamily: "'Dancing Script', cursive", description: 'Elegant and flowing cursive.', fontSizeMultiplier: 1.2, lineHeight: '1.9' },
  { id: 'indie-flower', name: 'Indie Flower', fontFamily: "'Indie Flower', cursive", description: 'A rounded, playful script.' },
  { id: 'permanent-marker', name: 'Permanent Marker', fontFamily: "'Permanent Marker', cursive", description: 'Bold, like a marker pen.', fontSizeMultiplier: 1.1, wordSpacing: '0.1em' },
  { id: 'rock-salt', name: 'Rock Salt', fontFamily: "'Rock Salt', cursive", description: 'Rough, scratchy, high energy.', fontSizeMultiplier: 1.2, letterSpacing: '0.05em' },
  { id: 'shadows-into-light', name: 'Shadows Into Light', fontFamily: "'Shadows Into Light', cursive", description: 'A light, airy script.' },
  { id: 'homemade-apple', name: 'Homemade Apple', fontFamily: "'Homemade Apple', cursive", description: 'Quirky and unique handwritten feel.', fontSizeMultiplier: 1.3, lineHeight: '2.0' },
  { id: 'amatic-sc', name: 'Amatic SC', fontFamily: "'Amatic SC', cursive", description: 'A narrow, condensed handwritten style.', fontSizeMultiplier: 1.2, letterSpacing: '0.05em' },
  { id: 'satisfy', name: 'Satisfy', fontFamily: "'Satisfy', cursive", description: 'A flowing, slightly calligraphic script.' },
  { id: 'marck-script', name: 'Marck Script', fontFamily: "'Marck Script', cursive", description: 'Formal yet personal cursive.', fontSizeMultiplier: 1.1 },
  { id: 'cedarville-cursive', name: 'Cedarville Cursive', fontFamily: "'Cedarville Cursive', cursive", description: 'Classic, neat cursive handwriting.' },
  { id: 'bad-script', name: 'Bad Script', fontFamily: "'Bad Script', cursive", description: 'Casually written, legible script.' },
  { id: 'nanum-pen', name: 'Nanum Pen Script', fontFamily: "'Nanum Pen Script', cursive", description: 'A popular Korean handwriting style font.', fontSizeMultiplier: 1.1 },
  { id: 'gaegu', name: 'Gaegu', fontFamily: "'Gaegu', sans-serif", description: 'A cute, child-like Korean handwriting font.', fontSizeMultiplier: 1.1 }, // Note: Gaegu is more print like
  { id: 'east-sea-dokdo', name: 'East Sea Dokdo', fontFamily: "'East Sea Dokdo', cursive", description: 'A distinctive brush-like Korean font.', fontSizeMultiplier: 1.4, lineHeight: '1.8' },
  { id: 'stylish', name: 'Stylish', fontFamily: "'Stylish', sans-serif", description: 'A modern, chic Korean handwriting font.', fontSizeMultiplier: 1.0 },
  { id: 'schoolbell', name: 'Schoolbell', fontFamily: "'Schoolbell', cursive", description: 'Reminiscent of neat school notes.', fontSizeMultiplier: 1.05 }
];


export const PAPER_TYPES: PaperType[] = [
  { id: 'blank-white', name: 'Blank White', className: 'bg-white', previewIcon: <div className="w-6 h-4 border border-gray-300 bg-white rounded-sm"></div> },
  { id: 'blank-cream', name: 'Blank Cream', className: 'bg-yellow-50', previewIcon: <div className="w-6 h-4 border border-gray-300 bg-yellow-50 rounded-sm"></div> },
  { id: 'ruled-notebook', name: 'Ruled Notebook', className: 'bg-white bg-ruled-paper', previewIcon: <div className="w-6 h-4 border border-gray-300 bg-white bg-ruled-paper rounded-sm"></div> },
  { id: 'ruled-notebook-double', name: 'Ruled Notebook (Double)', className: 'bg-white bg-ruled-paper-double', previewIcon: <div className="w-6 h-4 border border-gray-300 bg-white bg-ruled-paper-double rounded-sm"></div> },
  { id: 'graph-paper', name: 'Graph Paper', className: 'bg-white bg-graph-paper', previewIcon: <div className="w-6 h-4 border border-gray-300 bg-white bg-graph-paper rounded-sm"></div> },
  { id: 'legal-pad', name: 'Legal Pad (Yellow)', className: 'bg-yellow-200 bg-ruled-paper', previewIcon: <div className="w-6 h-4 border border-gray-300 bg-yellow-200 bg-ruled-paper rounded-sm"></div> },
  { 
    id: 'assignment-margin-left', 
    name: 'Assignment (Left Margin)', 
    className: 'bg-assignment-margin-left', // Defines white bg + blue lines + red left margin
    description: 'White paper with blue lines and a left red margin.',
    previewIcon: <div className="w-6 h-4 border border-gray-300 bg-assignment-margin-left rounded-sm"></div>
  },
  { 
    id: 'assignment-margin-both', 
    name: 'Assignment (Both Margins)', 
    className: 'bg-assignment-margin-both', // Defines white bg + blue lines + red left/right margins
    description: 'White paper with blue lines and red margins on both sides.',
    previewIcon: <div className="w-6 h-4 border border-gray-300 bg-assignment-margin-both rounded-sm"></div>
  },
  { 
    id: 'blue-ruled-assignment', 
    name: 'Blue Ruled Assignment', 
    className: 'bg-blue-ruled-assignment', // Defines white bg + blue lines
    description: 'Standard white paper with blue ruling lines.',
    previewIcon: <div className="w-6 h-4 border border-gray-300 bg-blue-ruled-assignment rounded-sm"></div>
  },
  { 
    id: 'exam-paper-yellow', 
    name: 'Exam Paper (Yellow)', 
    className: 'bg-exam-paper-yellow', // Defines yellow bg + blue lines
    description: 'Yellow paper with blue ruling lines, like an exam booklet.',
    previewIcon: <div className="w-6 h-4 border border-gray-300 bg-exam-paper-yellow rounded-sm"></div>
  },
  { id: 'vintage-paper', name: 'Vintage Paper', className: 'bg-yellow-100', textureClassName: 'paper-texture-old', previewIcon: <div className="w-6 h-4 border border-gray-300 bg-yellow-100 rounded-sm"><div className="w-full h-full paper-texture-old"></div></div> },
  { id: 'wrinkled-paper', name: 'Wrinkled Paper', className: 'bg-gray-50', textureClassName: 'paper-texture-wrinkled', previewIcon: <div className="w-6 h-4 border border-gray-300 bg-gray-50 rounded-sm"><div className="w-full h-full paper-texture-wrinkled"></div></div> },
];

export const PEN_STYLES: PenStyle[] = [ // Simplified, mainly for color choice
  { id: 'ballpoint', name: 'Ballpoint Pen' },
  { id: 'ink-pen', name: 'Ink Pen' },
  { id: 'gel-pen', name: 'Gel Pen' },
  { id: 'marker', name: 'Marker' },
  { id: 'pencil', name: 'Pencil' },
];

export const PEN_COLORS: { name: string; value: string; className: string }[] = [
    { name: "Black", value: "#1f2937", className: "bg-gray-800" }, // Darker than pure black for realism
    { name: "Blue", value: "#1d4ed8", className: "bg-blue-700" },
    { name: "Red", value: "#dc2626", className: "bg-red-600" },
    { name: "Green", value: "#16a34a", className: "bg-green-600" },
];

export const DEFAULT_CUSTOMIZATIONS: Omit<Customizations, 'customPaperBackground'> = {
  fontSize: 5, // px <- UPDATED FROM 18 to 5
  lineHeight: 1.6, // multiplier
  letterSpacing: 0.5, // px
  wordSpacing: 1, // px
  margins: 40, // px
  alignment: 'left',
  inkColor: PEN_COLORS[0].value,
  selectedHandwritingStyleId: HANDWRITING_STYLES[0].id,
  selectedPaperTypeId: PAPER_TYPES[0].id,
  selectedPenStyleId: PEN_STYLES[0].id,
  applyScanEffects: true,
  textShadowIntensity: 0.3,
};

export const TEXT_ALIGNMENTS = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
  { value: 'justify', label: 'Justify' },
] as const;

export const SUPPORTED_FILE_TYPES = {
  'text/plain': ['.txt'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'application/pdf': ['.pdf'],
  // 'application/vnd.oasis.opendocument.text': ['.odt'], // .odt support requires another library or different mammoth setup
};
// Updated to use reduce for broader compatibility instead of .flat()
export const ALL_SUPPORTED_EXTENSIONS = Object.values(SUPPORTED_FILE_TYPES)
  .reduce((acc, val) => acc.concat(val), [])
  .join(',');
