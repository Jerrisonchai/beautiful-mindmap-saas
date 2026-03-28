// Template definitions for Beautiful Mindmap
import { v4 as uuidv4 } from 'uuid';

export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'business' | 'education' | 'planning' | 'creative' | 'personal';
  icon: string;
  nodes: Record<string, any>;
}

export const templates: Template[] = [
  {
    id: 'brainstorming',
    name: 'Brainstorming Session',
    description: 'Generate and organize ideas for projects, products, or creative work',
    category: 'creative',
    icon: '💡',
    nodes: {
      'root': {
        id: 'root',
        x: 0,
        y: 0,
        text: 'Central Idea',
        children: ['idea1', 'idea2', 'idea3', 'idea4'],
        color: '#3b82f6',
        expanded: true
      },
      'idea1': {
        id: 'idea1',
        x: 200,
        y: -100,
        text: 'New Product Ideas',
        children: [],
        color: '#10b981',
        expanded: true
      },
      'idea2': {
        id: 'idea2',
        x: 200,
        y: -30,
        text: 'Process Improvements',
        children: [],
        color: '#f59e0b',
        expanded: true
      },
      'idea3': {
        id: 'idea3',
        x: 200,
        y: 40,
        text: 'Marketing Strategies',
        children: [],
        color: '#8b5cf6',
        expanded: true
      },
      'idea4': {
        id: 'idea4',
        x: 200,
        y: 110,
        text: 'Cost Reduction',
        children: [],
        color: '#ec4899',
        expanded: true
      }
    }
  },
  {
    id: 'swot',
    name: 'SWOT Analysis',
    description: 'Analyze Strengths, Weaknesses, Opportunities, and Threats',
    category: 'business',
    icon: '📊',
    nodes: {
      'root': {
        id: 'root',
        x: 0,
        y: 0,
        text: 'Project/Company',
        children: ['strengths', 'weaknesses', 'opportunities', 'threats'],
        color: '#3b82f6',
        expanded: true
      },
      'strengths': {
        id: 'strengths',
        x: 200,
        y: -150,
        text: 'Strengths',
        children: [],
        color: '#10b981',
        expanded: true
      },
      'weaknesses': {
        id: 'weaknesses',
        x: 200,
        y: -50,
        text: 'Weaknesses',
        children: [],
        color: '#ef4444',
        expanded: true
      },
      'opportunities': {
        id: 'opportunities',
        x: 200,
        y: 50,
        text: 'Opportunities',
        children: [],
        color: '#3b82f6',
        expanded: true
      },
      'threats': {
        id: 'threats',
        x: 200,
        y: 150,
        text: 'Threats',
        children: [],
        color: '#f59e0b',
        expanded: true
      }
    }
  },
  {
    id: 'project-plan',
    name: 'Project Planning',
    description: 'Plan projects with phases, tasks, and milestones',
    category: 'planning',
    icon: '📅',
    nodes: {
      'root': {
        id: 'root',
        x: 0,
        y: 0,
        text: 'Project Name',
        children: ['phase1', 'phase2', 'phase3', 'milestones'],
        color: '#3b82f6',
        expanded: true
      },
      'phase1': {
        id: 'phase1',
        x: 200,
        y: -120,
        text: 'Phase 1: Planning',
        children: [],
        color: '#10b981',
        expanded: true
      },
      'phase2': {
        id: 'phase2',
        x: 200,
        y: -40,
        text: 'Phase 2: Development',
        children: [],
        color: '#3b82f6',
        expanded: true
      },
      'phase3': {
        id: 'phase3',
        x: 200,
        y: 40,
        text: 'Phase 3: Testing',
        children: [],
        color: '#f59e0b',
        expanded: true
      },
      'milestones': {
        id: 'milestones',
        x: 200,
        y: 120,
        text: 'Key Milestones',
        children: [],
        color: '#ec4899',
        expanded: true
      }
    }
  },
  {
    id: 'study-notes',
    name: 'Study Notes',
    description: 'Organize study materials and concepts',
    category: 'education',
    icon: '📚',
    nodes: {
      'root': {
        id: 'root',
        x: 0,
        y: 0,
        text: 'Subject/Topic',
        children: ['chapter1', 'chapter2', 'chapter3', 'key-concepts'],
        color: '#3b82f6',
        expanded: true
      },
      'chapter1': {
        id: 'chapter1',
        x: 200,
        y: -100,
        text: 'Chapter 1',
        children: [],
        color: '#10b981',
        expanded: true
      },
      'chapter2': {
        id: 'chapter2',
        x: 200,
        y: -33,
        text: 'Chapter 2',
        children: [],
        color: '#3b82f6',
        expanded: true
      },
      'chapter3': {
        id: 'chapter3',
        x: 200,
        y: 33,
        text: 'Chapter 3',
        children: [],
        color: '#f59e0b',
        expanded: true
      },
      'key-concepts': {
        id: 'key-concepts',
        x: 200,
        y: 100,
        text: 'Key Concepts',
        children: [],
        color: '#8b5cf6',
        expanded: true
      }
    }
  },
  {
    id: 'goal-setting',
    name: 'Goal Setting',
    description: 'Set and track personal or professional goals',
    category: 'personal',
    icon: '🎯',
    nodes: {
      'root': {
        id: 'root',
        x: 0,
        y: 0,
        text: 'Main Goal',
        children: ['short-term', 'medium-term', 'long-term', 'actions'],
        color: '#3b82f6',
        expanded: true
      },
      'short-term': {
        id: 'short-term',
        x: 200,
        y: -100,
        text: 'Short-term (1-3 months)',
        children: [],
        color: '#10b981',
        expanded: true
      },
      'medium-term': {
        id: 'medium-term',
        x: 200,
        y: -33,
        text: 'Medium-term (3-12 months)',
        children: [],
        color: '#3b82f6',
        expanded: true
      },
      'long-term': {
        id: 'long-term',
        x: 200,
        y: 33,
        text: 'Long-term (1-5 years)',
        children: [],
        color: '#f59e0b',
        expanded: true
      },
      'actions': {
        id: 'actions',
        x: 200,
        y: 100,
        text: 'Action Steps',
        children: [],
        color: '#ec4899',
        expanded: true
      }
    }
  },
  {
    id: 'meeting-notes',
    name: 'Meeting Notes',
    description: 'Structure meeting agendas and action items',
    category: 'business',
    icon: '🤝',
    nodes: {
      'root': {
        id: 'root',
        x: 0,
        y: 0,
        text: 'Meeting Topic',
        children: ['agenda', 'discussions', 'decisions', 'action-items'],
        color: '#3b82f6',
        expanded: true
      },
      'agenda': {
        id: 'agenda',
        x: 200,
        y: -100,
        text: 'Agenda Items',
        children: [],
        color: '#10b981',
        expanded: true
      },
      'discussions': {
        id: 'discussions',
        x: 200,
        y: -33,
        text: 'Key Discussions',
        children: [],
        color: '#3b82f6',
        expanded: true
      },
      'decisions': {
        id: 'decisions',
        x: 200,
        y: 33,
        text: 'Decisions Made',
        children: [],
        color: '#f59e0b',
        expanded: true
      },
      'action-items': {
        id: 'action-items',
        x: 200,
        y: 100,
        text: 'Action Items',
        children: [],
        color: '#ec4899',
        expanded: true
      }
    }
  }
];

export const getTemplatesByCategory = (category: string) => {
  return templates.filter(t => t.category === category);
};

export const applyTemplate = (templateId: string) => {
  const template = templates.find(t => t.id === templateId);
  if (!template) return null;
  
  // Deep copy the nodes to avoid reference issues
  const newNodes = JSON.parse(JSON.stringify(template.nodes));
  
  // Re-map IDs to new unique IDs
  const idMap: Record<string, string> = {};
  Object.keys(newNodes).forEach(oldId => {
    const newId = uuidv4();
    idMap[oldId] = newId;
    newNodes[newId] = { ...newNodes[oldId], id: newId };
    delete newNodes[oldId];
  });
  
  // Update child references
  Object.values(newNodes).forEach((node: any) => {
    node.children = node.children.map((childId: string) => idMap[childId] || childId);
  });
  
  return newNodes;
};
