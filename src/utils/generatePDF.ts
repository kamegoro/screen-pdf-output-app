import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Canvasの切り抜き
const clipCanvas = (baseCanvas: HTMLCanvasElement, pdfWidth: number, clipPdfHeight: number) => {
	const clipCanvas = document.createElement('canvas');

	// PDFの高さからCanvasの高さを逆算
	const clipCanvasHeight = (clipPdfHeight * baseCanvas.width) / pdfWidth;
	clipCanvas.width = baseCanvas.width;
	clipCanvas.height = clipCanvasHeight;
	const context = clipCanvas.getContext('2d');
	if (context) {
		context.drawImage(baseCanvas, 0, clipCanvasHeight);
	}

	return {
		canvas: clipCanvas,
		pdfHeight: convertCanvasHeightForPdf(clipCanvas.height, clipCanvas.width, pdfWidth)
	};
};

// 縦横の比率を維持したままPDFサイズに変換
const convertCanvasHeightForPdf = (
	canvasHeight: number,
	canvasWidth: number,
	pdfContentWidth: number
) => {
	return (canvasHeight * pdfContentWidth) / canvasWidth;
};

const generatePdf = async (element: HTMLElement) => {
	const now = Date.now();

	const doc = new jsPDF('p', 'mm', 'a4', true);

	// A4サイズのPDFの高さ・横幅
	const pdfWidth = doc.internal.pageSize.getWidth();
	const pdfHeight = doc.internal.pageSize.getHeight();

	const marginX = 10;
	const pdfContentWidth = pdfWidth - 2 * marginX;

	// ElementをCanvas化
	const canvas = await html2canvas(element, {
		scale: 2,
		useCORS: true,
		allowTaint: true,
		scrollY: -window.scrollY
	});

	doc.addImage(canvas.toDataURL('image/png'), 'PNG', marginX, 0, pdfContentWidth, 0);

	doc.save(`${now}.pdf`);
};

export { generatePdf };
