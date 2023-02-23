import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Canvasの切り抜き
const clipCanvas = (
	baseCanvas: HTMLCanvasElement,
	canvasPdfY: number,
	pdfWidth: number,
	clipPdfHeight: number
) => {
	const clipCanvas = document.createElement('canvas');

	// PDFの高さからCanvasの高さを逆算
	const clipCanvasHeight = (pdfHeight: number) => (pdfHeight * baseCanvas.width) / pdfWidth;

	clipCanvas.width = baseCanvas.width;
	clipCanvas.height = clipCanvasHeight(clipPdfHeight);
	const context = clipCanvas.getContext('2d');
	if (context) {
		context.drawImage(baseCanvas, 0, clipCanvasHeight(canvasPdfY));
	}

	return {
		height: clipCanvas.height,
		width: clipCanvas.width,
		dataUrl: clipCanvas.toDataURL('image/png')
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

	const margin = 10;
	const pdfContentWidth = pdfWidth - 2 * margin;

	// ElementをCanvas化
	const canvas = await html2canvas(element);

	const heightInCanvasPdf = convertCanvasHeightForPdf(canvas.height, canvas.width, pdfContentWidth);
	let restImageHeight = heightInCanvasPdf;

	while (restImageHeight > 0) {
		if (restImageHeight <= pdfHeight) {
			const clippedCanvas = clipCanvas(
				canvas,
				-(heightInCanvasPdf - restImageHeight),
				pdfContentWidth,
				restImageHeight
			);

			doc.addImage(clippedCanvas.dataUrl, 'PNG', margin, 0, pdfContentWidth, 0);
			restImageHeight -= pdfHeight;
		} else {
			const clippedCanvas = clipCanvas(
				canvas,
				-(heightInCanvasPdf - restImageHeight),
				pdfContentWidth,
				pdfHeight
			);
			doc.addImage(clippedCanvas.dataUrl, 'PNG', margin, 0, pdfContentWidth, 0);
			doc.addPage();
			restImageHeight -= pdfHeight;
		}
	}

	doc.save(`${now}.pdf`);
};

export { generatePdf };
