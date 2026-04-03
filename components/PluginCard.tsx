import Link from 'next/link'
import { Download, Star, Package } from 'lucide-react'
import type { Plugin, AgentType } from '@/lib/types'

const AGENT_SHORT: Record<AgentType, string> = {
  'all': 'All',
  'cursor': 'Cursor',
  'claude-code': 'Claude',
  'codex': 'Codex',
  'copilot': 'Copilot',
}

const CATEGORY_ICON: Record<string, string> = {
  Git: '🔀',
  Documentation: '📝',
  Security: '🛡️',
  DevOps: '🚀',
  Performance: '⚡',
  Analytics: '📊',
  Testing: '🧪',
}

interface PluginCardProps {
  plugin: Plugin
}

export default function PluginCard({ plugin }: PluginCardProps) {
  return (
    <div className="group flex flex-col rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition-all hover:border-violet-800/50 hover:shadow-lg hover:shadow-violet-900/10">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-lg">
            {CATEGORY_ICON[plugin.category] ?? <Package className="h-4 w-4 text-zinc-400" />}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-100 group-hover:text-white transition-colors line-clamp-1">
              {plugin.name}
            </h3>
            <span className="text-xs text-zinc-600">v{plugin.version}</span>
          </div>
        </div>
        <span className="shrink-0 rounded-full bg-zinc-800 px-2 py-0.5 text-xs font-medium text-zinc-400">
          {plugin.category}
        </span>
      </div>

      <p className="mb-4 flex-1 text-xs leading-relaxed text-zinc-500 line-clamp-2">
        {plugin.description}
      </p>

      <div className="mb-3 flex flex-wrap gap-1">
        {plugin.agent_compatibility.map((agent) => (
          <span
            key={agent}
            className="rounded-md bg-zinc-800/80 px-1.5 py-0.5 text-xs text-zinc-400"
          >
            {AGENT_SHORT[agent]}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-zinc-800 pt-3">
        <div className="flex items-center gap-3 text-xs text-zinc-500">
          <span className="flex items-center gap-1">
            <Download className="h-3.5 w-3.5" />
            {(plugin.downloads / 1000).toFixed(1)}k
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            {plugin.stars}
          </span>
        </div>
        <span
          className={`rounded-md px-2.5 py-1 text-xs font-semibold ${
            plugin.price === 0
              ? 'bg-emerald-900/30 text-emerald-400'
              : 'bg-violet-900/30 text-violet-400'
          }`}
        >
          {plugin.price === 0 ? 'Free' : `$${plugin.price}/mo`}
        </span>
      </div>
    </div>
  )
}
