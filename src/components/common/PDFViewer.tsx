// components/common/PDFViewer.tsx
'use client'
import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;
// https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.min.mjs
interface PDFViewerProps {
  url: string;
  title: string;
}

export function PDFViewer({ url, title }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.5);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPosition({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - startPosition.x,
        y: e.clientY - startPosition.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

// URL이 유효한지 확인하는 함수
const validatePDF = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('PDF를 불러올 수 없습니다');
    }
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (err) {
    setError('PDF 로드 중 오류가 발생했습니다');
    return null;
  }
};

  useEffect(() => {
    const loadPDF = async () => {
      const validatedUrl = await validatePDF(url);
      setPdfUrl(validatedUrl);
    };
    loadPDF();
    
    // Cleanup
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [url]);

  // 기존의 onDocumentLoadSuccess 함수명을 onLoadSuccess로 변경
  function onLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
      <div className="flex flex-col items-center bg-gray-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        <div className="mb-4 flex gap-4 items-center">
          <button
              onClick={() => setScale(scale => Math.max(scale - 0.2, 0.5))}
              className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            작게
          </button>
          <span className="text-sm">{Math.round(scale * 100)}%</span>
          <button
              onClick={() => setScale(scale => Math.min(scale + 0.2, 3))}
              className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            크게
          </button>
        </div>

        <div 
        className="overflow-hidden max-h-[70vh] shadow-lg bg-white p-4 rounded-lg relative"
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
            transition: isDragging ? 'none' : 'transform 0.3s ease',
            willChange: 'transform'
          }}
        >
          <Document
            file={pdfUrl}
            onLoadSuccess={onLoadSuccess}
            onLoadError={(error: Error) => setError(error.message)}
            loading={<div>Loading...</div>}
            error={<div>PDF를 불러오는 중 오류가 발생했습니다.</div>}
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer
              renderAnnotationLayer
            />
          </Document>
        </div>
      </div>
        <div className="mt-4 flex flex-col items-center">
          <div className="flex gap-4 mb-2">
            <button
                onClick={() => setPageNumber(page => Math.max(page - 1, 1))}
                disabled={pageNumber <= 1}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300 hover:bg-blue-600"
            >
              이전
            </button>
            <div className="flex items-center">
            <span className="text-lg">
              {pageNumber} / {numPages}
            </span>
            </div>
            <button
                onClick={() => setPageNumber(page => Math.min(page + 1, numPages || page))}
                disabled={pageNumber >= (numPages || 1)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300 hover:bg-blue-600"
            >
              다음
            </button>
          </div>
        </div>
      </div>
  );
}