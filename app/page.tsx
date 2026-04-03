import Link from 'next/link'
import { ArrowRight, Blocks, GitBranch, Upload, Zap, Star, Download } from 'lucide-react'
import SearchBar from '@/components/SearchBar'
import TemplateCard from '@/components/TemplateCard'
import PluginCard from '@/components/PluginCard'
import { TEMPLATES, PLUGINS } from '@/lib/data'

const FEATURES = [
  {
    icon: Blocks,
    title: 'Prompt Template Library',
    desc: 'Browse and import system prompts across Cursor, Claude Code, Codex, and Copilot with one click.',
    href: '/templates',
  },
  {
    icon: GitBranch,
    title: 'Workflow Hook Configurator',
    desc: 'Set up pre-commit reviews, post-deploy notifications, and custom hooks with a visual editor.',
    href: '/hooks',
  },
  {
    icon: Upload,
    title: 'Plugin Marketplace',
    desc: 'Upload, review, and publish plugins. Monetize your agent integrations through the marketplace.',
    href: '/marketplace',
  },
]

export default function Home() {
  const topTemplates = TEMPLATES.slice(0, 3)
  const topPlugins = PLUGINS.slice(0, 3)

  return (
    <div className="space-y-24">
      {/* Hero */}
      <section className="relative flex flex-col items-center gap-6 pt-12 text-center">
        <div className="absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-600/20 blur-[100px]" />
        <span className="relative inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-1 text-xs font-medium text-zinc-400">
          <Zap className="h-3 w-3 text-violet-400" /> Now in Public Beta
        </span>
        <h1 className="relative max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          One Hub for{' '}
          <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
            Every Coding Agent
          </span>
        </h1>
        <p className="relative max-w-xl text-lg text-zinc-400">
          Share prompt templates, workflow hooks, and plugins across Cursor, Claude Code, Codex &amp; Copilot. Stop reinventing the wheel.
        </p>
        <div className="relative flex items-center gap-3">
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Browse Templates <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/upload"
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-5 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white"
          >
            Publish a Plugin
          </Link>
        </div>

        <div className="relative mt-6 w-full max-w-2xl">
          <SearchBar />
        </div>
      </section>

      {/* Features */}
      <section className="grid gap-6 md:grid-cols-3">
        {FEATURES.map((f) => (
          <Link
            key={f.title}
            href={f.href}
            className="group rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-colors hover:border-zinc-700 hover:bg-zinc-900"
          >
            <f.icon className="mb-4 h-8 w-8 text-violet-400" />
            <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
            <p className="text-sm leading-relaxed text-zinc-400">{f.desc}</p>
          </Link>
        ))}
      </section>

      {/* Top Templates */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            <Star className="mr-2 inline h-5 w-5 text-yellow-400" />
            Popular Templates
          </h2>
          <Link href="/templates" className="text-sm text-violet-400 hover:underline">
            View All →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topTemplates.map((t) => (
            <TemplateCard key={t.id} template={t} />
          ))}
        </div>
      </section>

      {/* Top Plugins */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            <Download className="mr-2 inline h-5 w-5 text-blue-400" />
            Trending Plugins
          </h2>
          <Link href="/marketplace" className="text-sm text-violet-400 hover:underline">
            View All →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topPlugins.map((p) => (
            <PluginCard key={p.id} plugin={p} />
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 px-8 py-12 text-center">
        <h2 className="mb-8 text-2xl font-bold">Trusted by Agent Power Users</h2>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {[
            { label: 'Templates', value: '240+' },
            { label: 'Plugins', value: '85+' },
            { label: 'Developers', value: '3.2K' },
            { label: 'Monthly Installs', value: '18K' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-zinc-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
