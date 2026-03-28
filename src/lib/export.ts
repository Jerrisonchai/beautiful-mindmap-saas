import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const exportToPDF = async (canvasRef: React.RefObject<HTMLDivElement>, mindmapTitle: string = 'Mindmap') => {
  if (!canvasRef.current) return;

  try {
    const canvas = await html2canvas(canvasRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: canvas.width > canvas.height ? 'l' : 'p',
      unit: 'px',
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(`${mindmapTitle}.pdf`);
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    alert('Failed to export PDF. Please try again.');
  }
};

export const exportToPNG = async (canvasRef: React.RefObject<HTMLDivElement>, mindmapTitle: string = 'mindmap') => {
  if (!canvasRef.current) return;

  try {
    const canvas = await html2canvas(canvasRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
    });

    const link = document.createElement('a');
    link.download = `${mindmapTitle}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (error) {
    console.error('Error exporting to PNG:', error);
    alert('Failed to export PNG. Please try again.');
  }
};

export const exportToSVG = (nodes: Record<string, any>, mindmapTitle: string = 'mindmap') => {
  const svgWidth = 2000;
  const svgHeight = 1500;
  
  // Calculate bounds
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  Object.values(nodes).forEach((node: any) => {
    if (node.x < minX) minX = node.x;
    if (node.y < minY) minY = node.y;
    if (node.x > maxX) maxX = node.x;
    if (node.y > maxY) maxY = node.y;
  });

  const padding = 100;
  const width = (maxX - minX) + padding * 2;
  const height = (maxY - minY) + padding * 2;
  const offsetX = minX - padding;
  const offsetY = minY - padding;

  let svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <style>
        .node-rect { rx: 10; ry: 10; stroke-width: 2; }
        .node-text { font-family: Arial, sans-serif; font-size: 14px; font-weight: bold; text-anchor: middle; dominant-baseline: middle; }
        .connection { stroke-width: 3; stroke-linecap: round; }
      </style>
      <rect width="100%" height="100%" fill="white"/>
  `;

  // Draw connections first
  Object.values(nodes).forEach((node: any) => {
    node.children.forEach((childId: string) => {
      const child = nodes[childId];
      if (child) {
        svgContent += `
          <line 
            x1="${(node.x - offsetX)}" 
            y1="${(node.y - offsetY)}" 
            x2="${(child.x - offsetX)}" 
            y2="${(child.y - offsetY)}" 
            class="connection" 
            stroke="${node.color}" 
            opacity="0.6"
          />
        `;
      }
    });
  });

  // Draw nodes
  Object.values(nodes).forEach((node: any) => {
    const x = node.x - offsetX;
    const y = node.y - offsetY;
    const textWidth = node.text.length * 9 + 40; // Approximate width
    const textHeight = 40;

    svgContent += `
      <rect 
        x="${x - textWidth / 2}" 
        y="${y - textHeight / 2}" 
        width="${textWidth}" 
        height="${textHeight}" 
        fill="${node.color}" 
        class="node-rect"
      />
      <text 
        x="${x}" 
        y="${y}" 
        class="node-text" 
        fill="white"
      >
        ${node.text}
      </text>
    `;
  });

  svgContent += '</svg>';

  const blob = new Blob([svgContent], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = `${mindmapTitle}.svg`;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
};

export const exportToJSON = (nodes: Record<string, any>, mindmapTitle: string = 'mindmap') => {
  const data = JSON.stringify(nodes, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = `${mindmapTitle}.json`;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
};
