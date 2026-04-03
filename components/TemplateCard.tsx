import Link from 'next/link'
import { Download, Star, Copy } from 'lucide-react'
import type { Template, AgentType } from '@/lib/types'

const AGENT_LABELS: Record<AgentType, string> = {
  'all': 'All Agents',
  'cursor': 'Cursor',
  'claude-code': 'Claude Code',
  'codex': 'Codex',
  'copilot': 'Copilot',
}

const AGENT_COLORS: Record<AgentType, string> = {
  'all': 'bg-zinc-800 text-zinc-300',
  'cursor': 'bg-blue-900/40 text-blue-400 ring-1 ring-blue-800/50',
  'claude-code': 'bg-violet-900/40 text-violet-400 ring-1 ring-violet-800/50',
  'codex': 'bg-emerald-900/40 text-emerald-400 ring-1 ring-emerald-800/50',
  'copilot': 'bg-orange-900/40 text-orange-400 ring-1 ring-orange-800/50',
}

interface TemplateCardProps {
  template: Template
}

export default function TemplateCard({ template }: TemplateCardProps) {
  return (
    <Link
      href={`/templates/${template.id}`}
      className="group flex flex-col rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition-all hover:border-violet-800/50 hover:bg-zinc-900/80 hover:shadow-lg hover:shadow-violet-900/10"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold text-zinc-100 group-hover:text-white transition-colors line-clamp-2">
          {template.title}
        </h3>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${AGENT_COLORS[template.agent_type]}`}
        >
          {AGENT_LABELS[template.agent_type]}
        </span>
      </div>

      <p className="mb-4 flex-1 text-xs leading-relaxed text-zinc-500 line-clamp-2">
        {template.description}
      </p>

      <div className="mb-3 flex flex-wrap gap-1.5">
        {template.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-zinc-800 pt-3">
        <div className="flex items-center gap-3 text-xs text-zinc-500">
          <span className="flex items-center gap-1">
            <Download className="h-3.5 w-3.5" />
            {(template.downloads / 1000).toFixed(1)}k
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            {template.stars}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-zinc-600">
          <Copy className="h-3.5 w-3.5" />
          <span>by {template.author}</span>
        </div>
      </div>
    </Link>
  )
}
