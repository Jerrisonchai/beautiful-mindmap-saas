import Link from 'next/link'
import { Brain, Sparkles, Users, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-primary-600" />
            <span className="text-xl font-bold gradient-text">Beautiful Mindmap</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/features" className="text-gray-600 hover:text-primary-600 transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-primary-600 transition-colors">
              Pricing
            </Link>
            <Link href="/editor" className="px-6 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl">
              Start Creating
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Visual Thinking</span>
              <br />
              <span className="text-gray-900">Made Beautiful</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Create stunning mindmaps with intuitive drag-and-drop, real-time collaboration, 
              and animations that bring your ideas to life.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link 
                href="/editor"
                className="px-8 py-4 bg-primary-600 text-white rounded-full text-lg font-semibold hover:bg-primary-700 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Start Creating Free
              </Link>
              <Link 
                href="/demo"
                className="px-8 py-4 glass text-gray-700 rounded-full text-lg font-semibold hover:bg-white/20 transition-all"
              >
                Watch Demo
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="glass p-8 rounded-2xl hover:shadow-xl transition-all hover:-translate-y-2">
              <Sparkles className="w-12 h-12 text-accent-500 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Beautiful by Design</h3>
              <p className="text-gray-600">
                Stunning animations, elegant typography, and thoughtful interactions 
                that make mindmapping a joy.
              </p>
            </div>
            
            <div className="glass p-8 rounded-2xl hover:shadow-xl transition-all hover:-translate-y-2">
              <Users className="w-12 h-12 text-primary-500 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Real-time Collaboration</h3>
              <p className="text-gray-600">
                Work together with your team in real-time. See changes as they happen 
                and brainstorm together seamlessly.
              </p>
            </div>
            
            <div className="glass p-8 rounded-2xl hover:shadow-xl transition-all hover:-translate-y-2">
              <Zap className="w-12 h-12 text-accent-500 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Lightning Fast</h3>
              <p className="text-gray-600">
                Optimized for performance. Create, edit, and share mindmaps 
                without any lag or delays.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-24 text-center">
            <div className="glass p-12 rounded-3xl">
              <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Ideas?</h2>
              <p className="text-xl text-gray-600 mb-8">
                Join thousands of creative professionals using Beautiful Mindmap daily.
              </p>
              <Link 
                href="/editor"
                className="inline-block px-10 py-5 bg-gradient-to-r from-primary-600 to-accent-500 text-white rounded-full text-xl font-bold hover:shadow-2xl hover:scale-105 transition-all"
              >
                Get Started for Free
              </Link>
              <p className="mt-4 text-gray-500">No credit card required • Free forever plan available</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="glass mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-primary-600" />
              <span className="font-bold">Beautiful Mindmap</span>
            </div>
            <p className="text-gray-500">© 2026 Beautiful Mindmap. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
