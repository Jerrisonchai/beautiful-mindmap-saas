'use client'

import { useState } from 'react'
import { X, Sparkles, Briefcase, GraduationCap, Calendar, Lightbulb, Target, Users } from 'lucide-react'
import { templates, Template } from '@/lib/templates'

interface TemplateSelectorProps {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}

const categoryIcons: Record<string, any> = {
  business: Briefcase,
  education: GraduationCap,
  planning: Calendar,
  creative: Lightbulb,
  personal: Target
}

export default function TemplateSelector({ isOpen, onClose, onSelectTemplate }: TemplateSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  if (!isOpen) return null

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory)

  const categories = [
    { id: 'all', name: 'All Templates', icon: Sparkles },
    { id: 'business', name: 'Business', icon: Briefcase },
    { id: 'education', name: 'Education', icon: GraduationCap },
    { id: 'planning', name: 'Planning', icon: Calendar },
    { id: 'creative', name: 'Creative', icon: Lightbulb },
    { id: 'personal', name: 'Personal', icon: Target }
  ]

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-accent-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Sparkles className="w-6 h-6" />
                Choose a Template
              </h2>
              <p className="text-primary-100 mt-1">Start with a pre-built mindmap structure</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex h-[calc(90vh-100px)]">
          {/* Categories Sidebar */}
          <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
            <div className="space-y-2">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      selectedCategory === category.id
                        ? 'bg-primary-600 text-white shadow-lg'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{category.name}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Templates Grid */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTemplates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onSelect={onSelectTemplate}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TemplateCard({ template, onSelect }: { template: Template; onSelect: (id: string) => void }) {
  const Icon = categoryIcons[template.category] || Sparkles

  return (
    <div className="border-2 border-gray-200 rounded-xl p-5 hover:border-primary-500 hover:shadow-lg transition-all cursor-pointer group">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center text-2xl shadow-md">
          {template.icon}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
            {template.name}
          </h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {template.description}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {template.category.charAt(0).toUpperCase() + template.category.slice(1)}
            </span>
          </div>
        </div>
      </div>
      <button
        onClick={() => onSelect(template.id)}
        className="mt-4 w-full py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors group-hover:shadow-md"
      >
        Use This Template
      </button>
    </div>
  )
}
