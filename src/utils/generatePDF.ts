import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Canvasの切り抜き
const clipCanvas = (baseCanvas: HTMLCanvasElement, pdfWidth: number, clipPdfHeight: number) => {
	const clipCanvas = document.createElement('canvas');
	const context = clipCanvas.getContext('2d');
};

const generatePdf = async (element: HTMLElement) => {
	const doc = new jsPDF('p', 'mm', 'a4', true);

	// A4サイズのPDFの高さ・横幅
	const pdfWidth = doc.internal.pageSize.getWidth();
	const pdfHeight = doc.internal.pageSize.getHeight();

	const marginX = 10;
	const pdfContentWidth = pdfWidth - 2 * marginX;

	// ElementをCanvas化
	const canvas = await html2canvas(element);
};

export { generatePdf };
