import { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType } from 'docx'
import { PPTX } from 'pptxjs'

// Export to Markdown
export const exportToMarkdown = (nodes: Record<string, any>, filename: string = 'mindmap') => {
  const lines: string[] = []
  
  const traverse = (nodeId: string, depth: number = 0) => {
    const node = nodes[nodeId]
    if (!node) return
    
    const indent = '  '.repeat(depth)
    lines.push(`${indent}- ${node.text}`)
    
    if (node.children && node.children.length > 0) {
      node.children.forEach((childId: string) => {
        traverse(childId, depth + 1)
      })
    }
  }

  // Start from root
  const rootId = Object.keys(nodes)[0]
  if (rootId) {
    lines.push(`# ${nodes[rootId].text}`)
    lines.push('')
    node.children.forEach((childId: string) => {
      traverse(childId, 0)
    })
  }

  const markdown = lines.join('\n')
  const blob = new Blob([markdown], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.download = `${filename}.md`
  link.href = url
  link.click()
  URL.revokeObjectURL(url)
}

// Export to Word Document
export const exportToWord = async (nodes: Record<string, any>, filename: string = 'mindmap') => {
  const { Document: Doc, Packer } = await import('docx')

  const children: (Paragraph | Table)[] = []
  
  const traverse = (nodeId: string, depth: number = 0) => {
    const node = nodes[nodeId]
    if (!node) return

    children.push(
      new Paragraph({
        text: node.text,
        heading: depth === 0 ? HeadingLevel.HEADING_1 :
                 depth === 1 ? HeadingLevel.HEADING_2 :
                 depth === 2 ? HeadingLevel.HEADING_3 : undefined,
        spacing: { before: 200, after: 200 },
        alignment: depth === 0 ? AlignmentType.CENTER : AlignmentType.LEFT,
      })
    )

    if (node.children && node.children.length > 0) {
      node.children.forEach((childId: string) => {
        traverse(childId, depth + 1)
      })
    }
  }

  const rootId = Object.keys(nodes)[0]
  if (rootId) {
    traverse(rootId, 0)
  }

  const doc = new Doc({
    sections: [{
      properties: {},
      children
    }]
  })

  const blob = await Packer.toBlob(doc)
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.download = `${filename}.docx`
  link.href = url
  link.click()
  URL.revokeObjectURL(url)
}

// Export to PowerPoint Presentation
export const exportToPowerPoint = async (nodes: Record<string, any>, filename: string = 'mindmap') => {
  const pptx = new PPTX()
  
  // Create title slide
  const titleNode = nodes[Object.keys(nodes)[0]]
  pptx.addSlide({
    title: titleNode?.text || 'Mindmap',
    subtitle: 'Generated with Beautiful Mindmap',
    layout: 'title'
  })

  // Create content slides for each branch
  const traverse = (nodeId: string, depth: number = 0, parentText: string = '') => {
    const node = nodes[nodeId]
    if (!node) return

    if (depth === 1) {
      // Create a new slide for each main branch
      pptx.addSlide({
        title: node.text,
        content: [],
        layout: 'content'
      })
    } else if (depth > 1) {
      // Add bullet points to current slide
      const currentSlide = pptx.slides[pptx.slides.length - 1]
      currentSlide.content.push({
        text: node.text,
        level: depth - 1
      })
    }

    if (node.children && node.children.length > 0) {
      node.children.forEach((childId: string) => {
        traverse(childId, depth + 1, node.text)
      })
    }
  }

  const rootId = Object.keys(nodes)[0]
  if (rootId && nodes[rootId].children) {
    nodes[rootId].children.forEach((childId: string) => {
      traverse(childId, 1)
    })
  }

  const buffer = await pptx.write('arraybuffer')
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.download = `${filename}.pptx`
  link.href = url
  link.click()
  URL.revokeObjectURL(url)
}

// Export to JSON (enhanced with metadata)
export const exportToJSONEnhanced = (nodes: Record<string, any>, filename: string = 'mindmap') => {
  const exportData = {
    metadata: {
      title: nodes[Object.keys(nodes)[0]]?.text || 'Untitled',
      exportDate: new Date().toISOString(),
      version: '1.0',
      totalNodes: Object.keys(nodes).length
    },
    structure: nodes,
    styles: Object.values(nodes).map(node => ({
      id: node.id,
      color: node.color,
      text: node.text
    }))
  }

  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.download = `${filename}.json`
  link.href = url
  link.click()
  URL.revokeObjectURL(url)
}

// Batch export multiple mindmaps
export const exportBatch = async (mindmaps: Array<{title: string, nodes: any}>, format: 'md' | 'docx' | 'pptx' | 'json') => {
  // For now, we'll create a ZIP file with all exports
  // In a full implementation, you'd use JSZip library
  
  const results = []
  for (const mindmap of mindmaps) {
    switch (format) {
      case 'md':
        exportToMarkdown(mindmap.nodes, mindmap.title)
        break
      case 'docx':
        await exportToWord(mindmap.nodes, mindmap.title)
        break
      case 'pptx':
        await exportToPowerPoint(mindmap.nodes, mindmap.title)
        break
      case 'json':
        exportToJSONEnhanced(mindmap.nodes, mindmap.title)
        break
    }
    results.push({ title: mindmap.title, status: 'exported' })
  }

  return results
}
