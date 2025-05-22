
// Ensure global variables from CDNs are declared for TypeScript
declare var mammoth: any;
declare var pdfjsLib: any;
declare var html2canvas: any;
// declare var jspdf: any; // This declares jspdf globally, but not on window object explicitly for TS

// FIX: Augment the Window interface to make TypeScript aware of window.jspdf
declare global {
  interface Window {
    jspdf: {
      jsPDF: any; // You can replace 'any' with a more specific type if you have one for jsPDF constructor
    };
  }
}

export const extractTextFromFile = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        if (!event.target?.result) {
          return reject(new Error('File reading failed.'));
        }

        if (file.type === 'text/plain') {
          resolve(event.target.result as string);
        } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
          // DOCX
          const arrayBuffer = event.target.result as ArrayBuffer;
          const result = await mammoth.extractRawText({ arrayBuffer });
          resolve(result.value);
        } else if (file.type === 'application/pdf') {
          // PDF
          const arrayBuffer = event.target.result as ArrayBuffer;
          const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
          let textContent = '';
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const text = await page.getTextContent();
            textContent += text.items.map((item: any) => item.str).join(' ') + '\n';
          }
          resolve(textContent);
        } else {
          reject(new Error('Unsupported file type.'));
        }
      } catch (error) {
        console.error('Error processing file:', error);
        reject(new Error('Error processing file.'));
      }
    };

    reader.onerror = () => {
      reject(new Error('File reading error.'));
    };

    if (file.type === 'text/plain') {
      reader.readAsText(file);
    } else {
      // For DOCX and PDF, read as ArrayBuffer
      reader.readAsArrayBuffer(file);
    }
  });
};

export const exportToImage = async (element: HTMLElement, filename: string, format: 'png' | 'jpeg' = 'png'): Promise<void> => {
  if (!element) {
    console.error('Export failed: Element not found.');
    return;
  }
  try {
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true, // If using external images/fonts
      backgroundColor: null, // Transparent background for canvas, actual bg from element
      scrollX: 0, // Ensure full width is captured
      scrollY: -window.scrollY, // Ensure content from top is captured
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight
    });
    const image = canvas.toDataURL(format === 'jpeg' ? 'image/jpeg' : 'image/png', 1.0);
    const link = document.createElement('a');
    link.download = `${filename}.${format}`;
    link.href = image;
    link.click();
  } catch (error) {
    console.error('Error exporting to image:', error);
    alert('Failed to export image. See console for details.');
  }
};

export const exportToPdf = async (element: HTMLElement, filename: string): Promise<void> => {
  if (!element) {
    console.error('Export failed: Element not found.');
    return;
  }
  try {
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      backgroundColor: null, // Background comes from the element itself
      scrollX: 0,
      scrollY: -window.scrollY,
      windowWidth: element.scrollWidth, // Capture full scrollable width
      windowHeight: element.scrollHeight, // Capture full scrollable height
    });
    
    const { jsPDF } = window.jspdf;
    
    const A4_ASPECT_RATIO_PORTRAIT = 297 / 210; // height / width

    const imgTotalWidthPx = canvas.width; // This is element.offsetWidth * scale
    const imgTotalHeightPx = canvas.height; // This is element.scrollHeight * scale

    // Define PDF page dimensions based on captured content width and A4 aspect ratio
    const pdfPageWidthPx = imgTotalWidthPx;
    const pdfPageHeightPx = imgTotalWidthPx * A4_ASPECT_RATIO_PORTRAIT;

    const pdf = new jsPDF({
      orientation: 'p', // Portrait
      unit: 'px',
      format: [pdfPageWidthPx, pdfPageHeightPx], // Page size for all pages
    });

    const totalPages = Math.ceil(imgTotalHeightPx / pdfPageHeightPx);

    for (let i = 0; i < totalPages; i++) {
      const sourceY = pdfPageHeightPx * i; // Y position in the source canvas
      // Height of the slice: either full page height or remaining height for the last page
      const sourceHeight = Math.min(pdfPageHeightPx, imgTotalHeightPx - sourceY);

      if (sourceHeight <= 0) continue; // Should not happen if totalPages is correct

      const sliceCanvas = document.createElement('canvas');
      sliceCanvas.width = pdfPageWidthPx;
      sliceCanvas.height = sourceHeight;
      const sliceCtx = sliceCanvas.getContext('2d');

      if (sliceCtx) {
        // Draw the slice from the large canvas onto the temporary sliceCanvas
        sliceCtx.drawImage(canvas, 0, sourceY, pdfPageWidthPx, sourceHeight, 0, 0, pdfPageWidthPx, sourceHeight);
        const imgData = sliceCanvas.toDataURL('image/png', 1.0);

        if (i > 0) {
          pdf.addPage([pdfPageWidthPx, pdfPageHeightPx], 'p');
        }
        // Add the image to the PDF page. The image itself is pdfPageWidthPx wide and sourceHeight tall.
        // It will be placed at (0,0) on the PDF page of size (pdfPageWidthPx, pdfPageHeightPx).
        // If sourceHeight < pdfPageHeightPx (last page usually), there will be blank space at the bottom.
        pdf.addImage(imgData, 'PNG', 0, 0, pdfPageWidthPx, sourceHeight);
      }
    }
    pdf.save(`${filename}.pdf`);

  } catch (error) {
    console.error('Error exporting to PDF:', error);
    alert('Failed to export PDF. See console for details.');
  }
};
