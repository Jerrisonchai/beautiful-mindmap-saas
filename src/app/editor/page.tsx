'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { Plus, Trash2, Download, Share2, ZoomIn, ZoomOut, Undo, Redo, Users, Wifi, WifiOff, FileJson, FileImage, FileText, LayoutTemplate, LogOut, Save, Cloud, LogIn, FileCode } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'
import { exportToPDF, exportToPNG, exportToSVG, exportToJSON } from '@/lib/export'
import { exportToMarkdown, exportToWord, exportToPowerPoint, exportToJSONEnhanced } from '@/lib/export-advanced'
import { applyTemplate } from '@/lib/templates'
import TemplateSelector from '@/components/TemplateSelector'
import { useAuth } from '@/contexts/AuthContext'

interface Node {
  id: string
  x: number
  y: number
  text: string
  children: string[]
  color: string
  expanded: boolean
}

const COLORS = [
  '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
  '#ec4899', '#06b6d4', '#f97316', '#84cc16', '#6366f1'
]

export default function MindmapEditor() {
  const [nodes, setNodes] = useState<Record<string, Node>>({
    'root': {
      id: 'root',
      x: 0,
      y: 0,
      text: 'Central Idea',
      children: [],
      color: COLORS[0],
      expanded: true
    }
  })
  const [selectedNode, setSelectedNode] = useState<string | null>('root')
  const [scale, setScale] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [isConnected, setIsConnected] = useState(false)
  const [activeUsers, setActiveUsers] = useState<string[]>([])
  const [isClient, setIsClient] = useState(false)
  const [showTemplateSelector, setShowTemplateSelector] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const userId = useRef<string>(uuidv4())
  const mindmapId = useRef<string>('demo-mindmap')
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { user, token, logout } = useAuth()

  // Initialize client-side only
  useEffect(() => {
    setIsClient(true)
    setPan({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  }, [])

  // WebSocket connection
  useEffect(() => {
    if (!isClient) return
    const ws = new WebSocket(`ws://localhost:3000/ws?mindmapId=${mindmapId.current}`)
    wsRef.current = ws

    ws.onopen = () => {
      setIsConnected(true)
      ws.send(JSON.stringify({ type: 'join', userId: userId.current }))
    }

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data)
        if (message.type === 'update') {
          setNodes(message.data.nodes)
        }
      } catch (error) {
        console.error('Error parsing message:', error)
      }
    }

    ws.onclose = () => setIsConnected(false)
    return () => ws.close()
  }, [isClient])

  // Auto-save effect
  useEffect(() => {
    if (!token || !user) return

    const saveMindmap = async () => {
      if (!token) return
      setIsSaving(true)
      try {
        const root = nodes['root']
        const title = root?.text || 'Untitled Mindmap'
        await fetch('/api/mindmaps', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ title, nodes })
        })
        setLastSaved(new Date())
      } catch (error) {
        console.error('Auto-save failed:', error)
      } finally {
        setIsSaving(false)
      }
    }

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current)
    saveTimeoutRef.current = setTimeout(saveMindmap, 30000)
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current)
    }
  }, [nodes, token, user])

  const addNode = useCallback((parentId: string) => {
    const newNodeId = uuidv4()
    const parent = nodes[parentId]
    const newNodes = {
      ...nodes,
      [newNodeId]: {
        id: newNodeId,
        x: parent.x + 200,
        y: parent.y + (parent.children.length * 80) - 40,
        text: 'New Node',
        children: [],
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        expanded: true
      },
      [parentId]: { ...parent, children: [...parent.children, newNodeId] }
    }
    setNodes(newNodes)
    setSelectedNode(newNodeId)
    broadcastUpdate(newNodes)
  }, [nodes])

  const deleteNode = useCallback((nodeId: string) => {
    if (nodeId === 'root') return
    const node = nodes[nodeId]
    const parentId = Object.keys(nodes).find(key => nodes[key].children.includes(nodeId))
    if (parentId) {
      const newNodes = { ...nodes }
      delete newNodes[nodeId]
      newNodes[parentId] = { ...newNodes[parentId], children: newNodes[parentId].children.filter(id => id !== nodeId) }
      setNodes(newNodes)
      setSelectedNode(parentId)
      broadcastUpdate(newNodes)
    }
  }, [nodes])

  const updateNodeText = useCallback((nodeId: string, text: string) => {
    const newNodes = { ...nodes, [nodeId]: { ...nodes[nodeId], text } }
    setNodes(newNodes)
    broadcastUpdate(newNodes)
  }, [nodes])

  const toggleExpand = useCallback((nodeId: string) => {
    const newNodes = { ...nodes, [nodeId]: { ...nodes[nodeId], expanded: !nodes[nodeId].expanded } }
    setNodes(newNodes)
    broadcastUpdate(newNodes)
  }, [nodes])

  const broadcastUpdate = useCallback((newNodes: Record<string, Node>) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'update', data: { nodes: newNodes }, userId: userId.current }))
    }
  }, [])

  const handleManualSave = async () => {
    if (!token) return
    setIsSaving(true)
    try {
      const root = nodes['root']
      const title = root?.text || 'Untitled Mindmap'
      await fetch('/api/mindmaps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, nodes })
      })
      setLastSaved(new Date())
    } catch (error) {
      console.error('Save failed:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleSelectTemplate = (templateId: string) => {
    const newNodes = applyTemplate(templateId)
    if (newNodes) {
      setNodes(newNodes)
      setShowTemplateSelector(false)
      setPan({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
      setScale(1)
    }
  }

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
    }
  }

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (isDragging) setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y })
  }

  const handleCanvasMouseUp = () => setIsDragging(false)

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? 0.9 : 1.1
    setScale(prev => Math.min(Math.max(prev * delta, 0.2), 3))
  }

  const renderConnections = () => {
    const connections: JSX.Element[] = []
    Object.values(nodes).forEach(node => {
      node.children.forEach(childId => {
        const child = nodes[childId]
        if (!child) return
        connections.push(
          <line key={`${node.id}-${child.id}`} x1={node.x * scale + pan.x} y1={node.y * scale + pan.y} x2={child.x * scale + pan.x} y2={child.y * scale + pan.y} stroke={node.color} strokeWidth="3" opacity="0.6" />
        )
      })
    })
    return connections
  }

  const renderNodes = () => {
    return Object.values(nodes).map(node => (
      <div key={node.id} className={`absolute cursor-pointer transition-all duration-300 ${selectedNode === node.id ? 'z-50 scale-110' : 'z-10'}`} style={{ left: node.x * scale + pan.x, top: node.y * scale + pan.y, transform: 'translate(-50%, -50%)' }} onClick={(e) => { e.stopPropagation(); setSelectedNode(node.id); }} onDoubleClick={(e) => { e.stopPropagation(); toggleExpand(node.id); }}>
        <div className="px-6 py-3 rounded-xl shadow-depth hover:shadow-2xl transition-all duration-300 smooth-transition" style={{ backgroundColor: node.color, minWidth: '150px', textAlign: 'center', boxShadow: `0 10px 40px -10px ${node.color}66, 0 0 20px ${node.color}33` }}>
          <input type="text" value={node.text} onChange={(e) => updateNodeText(node.id, e.target.value)} className="bg-transparent text-white font-semibold text-center w-full outline-none placeholder-white/70" placeholder="Node text..." onClick={(e) => e.stopPropagation()} />
        </div>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 opacity-0 hover:opacity-100 transition-opacity duration-300 smooth-transition">
          <button onClick={(e) => { e.stopPropagation(); addNode(node.id); }} className="p-2 bg-white rounded-full shadow-lg hover:bg-primary-100 hover:scale-110 transition-all duration-200 smooth-transition" title="Add Child Node"><Plus className="w-4 h-4 text-primary-600" /></button>
          {node.id !== 'root' && (
            <button onClick={(e) => { e.stopPropagation(); deleteNode(node.id); }} className="p-2 bg-white rounded-full shadow-lg hover:bg-red-100 hover:scale-110 transition-all duration-200 smooth-transition" title="Delete Node"><Trash2 className="w-4 h-4 text-red-600" /></button>
          )}
        </div>
      </div>
    ))
  }

  if (!isClient) return <div className="h-screen flex items-center justify-center">Loading...</div>

  return (
    <div className="h-screen flex flex-col">
      {/* Toolbar */}
      <div className="glass px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold gradient-text">Beautiful Mindmap</h1>
          <div className="h-6 w-px bg-gray-300" />
          <div className="flex items-center gap-2">
            {isConnected ? (<> <Wifi className="w-4 h-4 text-green-500" /> <span className="text-sm text-green-600">Connected</span> {activeUsers.length > 0 && (<div className="flex items-center gap-1 ml-2"><Users className="w-4 h-4 text-primary-500" /> <span className="text-sm text-gray-600">{activeUsers.length + 1} users</span></div>)}</>) : (<> <WifiOff className="w-4 h-4 text-red-500" /> <span className="text-sm text-red-600">Offline</span> </>)}
          </div>
          {user && (
            <div className="flex items-center gap-2 ml-4">
              <button onClick={handleManualSave} disabled={isSaving} className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors disabled:opacity-50">
                {isSaving ? <Cloud className="w-4 h-4 animate-pulse" /> : <Save className="w-4 h-4" />}
                {isSaving ? 'Saving...' : 'Save'}
              </button>
              {lastSaved && <span className="text-xs text-gray-500">Saved {lastSaved.toLocaleTimeString()}</span>}
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setShowTemplateSelector(true)} className="p-2 hover:bg-white/20 rounded-lg transition-colors" title="Templates"><LayoutTemplate className="w-5 h-5" /></button>
          <button onClick={() => selectedNode && addNode(selectedNode)} className="p-2 hover:bg-white/20 rounded-lg transition-colors" title="Add Node"><Plus className="w-5 h-5" /></button>
          <button onClick={() => selectedNode && selectedNode !== 'root' && deleteNode(selectedNode)} className="p-2 hover:bg-white/20 rounded-lg transition-colors" title="Delete Node"><Trash2 className="w-5 h-5" /></button>
          <div className="h-6 w-px bg-gray-300" />
          <button onClick={() => setScale(s => Math.min(s + 0.1, 3))} className="p-2 hover:bg-white/20 rounded-lg transition-colors"><ZoomIn className="w-5 h-5" /></button>
          <span className="text-sm font-mono">{Math.round(scale * 100)}%</span>
          <button onClick={() => setScale(s => Math.max(s - 0.1, 0.2))} className="p-2 hover:bg-white/20 rounded-lg transition-colors"><ZoomOut className="w-5 h-5" /></button>
          <div className="h-6 w-px bg-gray-300" />
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"><Share2 className="w-4 h-4" />Share</button>
          
          {/* Export Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 glass rounded-lg hover:bg-white/20 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
            <div className="absolute right-0 top-full mt-2 w-56 glass rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 max-h-96 overflow-y-auto">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 border-b border-gray-200">IMAGES & DOCUMENTS</div>
              <button onClick={() => exportToPDF(canvasRef, nodes['root']?.text || 'mindmap')} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/20 transition-colors text-left"><FileText className="w-4 h-4" /><span className="text-sm">PDF Document</span></button>
              <button onClick={() => exportToPNG(canvasRef, nodes['root']?.text || 'mindmap')} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/20 transition-colors text-left"><FileImage className="w-4 h-4" /><span className="text-sm">PNG Image</span></button>
              <button onClick={() => exportToSVG(nodes, nodes['root']?.text || 'mindmap')} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/20 transition-colors text-left"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg><span className="text-sm">SVG Vector</span></button>
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 border-t border-b border-gray-200 mt-1">OFFICE FORMATS</div>
              <button onClick={() => exportToMarkdown(nodes, nodes['root']?.text || 'mindmap')} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/20 transition-colors text-left"><span className="w-4 h-4 flex items-center justify-center text-xs font-bold">#</span><span className="text-sm">Markdown</span></button>
              <button onClick={() => exportToWord(nodes, nodes['root']?.text || 'mindmap')} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/20 transition-colors text-left"><span className="w-4 h-4 flex items-center justify-center text-xs font-bold">W</span><span className="text-sm">Word Document</span></button>
              <button onClick={() => exportToPowerPoint(nodes, nodes['root']?.text || 'mindmap')} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/20 transition-colors text-left"><span className="w-4 h-4 flex items-center justify-center text-xs font-bold">P</span><span className="text-sm">PowerPoint</span></button>
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 border-t border-b border-gray-200 mt-1">DATA & BACKUP</div>
              <button onClick={() => exportToJSON(nodes, nodes['root']?.text || 'mindmap')} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/20 transition-colors text-left"><FileJson className="w-4 h-4" /><span className="text-sm">JSON (Simple)</span></button>
              <button onClick={() => exportToJSONEnhanced(nodes, nodes['root']?.text || 'mindmap')} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/20 rounded-b-lg transition-colors text-left"><FileJson className="w-4 h-4" /><span className="text-sm">JSON (Enhanced)</span></button>
            </div>
          </div>

          {/* User Profile */}
          {user ? (
            <div className="relative group">
              <button className="flex items-center gap-2 px-3 py-2 glass rounded-lg hover:bg-white/20 transition-colors">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-bold">{user.name?.charAt(0) || user.email.charAt(0).toUpperCase()}</div>
                <span className="text-sm font-medium">{user.name || user.email}</span>
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 glass rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <div className="p-2">
                  <div className="px-3 py-2 text-xs text-gray-500 border-b border-gray-200">Signed in as</div>
                  <div className="px-3 py-2 text-sm font-medium text-gray-700 truncate">{user.email}</div>
                  <button onClick={logout} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-1"><LogOut className="w-4 h-4" />Sign Out</button>
                </div>
              </div>
            </div>
          ) : (
            <a href="/login" className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">Sign In</a>
          )}
        </div>
      </div>

      {/* Template Selector Modal */}
      <TemplateSelector isOpen={showTemplateSelector} onClose={() => setShowTemplateSelector(false)} onSelectTemplate={handleSelectTemplate} />

      {/* Canvas */}
      <div ref={canvasRef} className="flex-1 bg-gradient-to-br from-primary-50 via-white to-accent-50/30 relative overflow-hidden cursor-grab active:cursor-grabbing" onMouseDown={handleCanvasMouseDown} onMouseMove={handleCanvasMouseMove} onMouseUp={handleCanvasMouseUp} onMouseLeave={handleCanvasMouseUp} onWheel={handleWheel}>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        <svg className="absolute inset-0 pointer-events-none">{renderConnections()}</svg>
        {renderNodes()}
        <div className="absolute bottom-6 left-6 glass px-4 py-3 rounded-lg text-sm text-gray-600 shadow-depth">
          <p><strong>Double-click</strong> node to expand/collapse</p>
          <p><strong>Drag</strong> canvas to pan • <strong>Scroll</strong> to zoom</p>
          {isConnected && <p className="text-green-600 mt-1 font-medium">✨ Real-time collaboration active</p>}
        </div>
      </div>
    </div>
  )
}
