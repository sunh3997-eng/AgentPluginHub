'use client'

import { useState } from 'react'
import SearchBar from '@/components/SearchBar'
import TemplateCard from '@/components/TemplateCard'
import { TEMPLATES } from '@/lib/data'
import type { AgentType } from '@/lib/types'

const AGENT_FILTERS: { label: string; value: AgentType | 'all' }[] = [
  { label: 'All Agents', value: 'all' },
  { label: 'Cursor', value: 'cursor' },
  { label: 'Claude Code', value: 'claude-code' },
  { label: 'Codex', value: 'codex' },
  { label: 'Copilot', value: 'copilot' },
]

export default function TemplatesPage() {
  const [filter, setFilter] = useState<AgentType | 'all'>('all')
  const [query, setQuery] = useState('')

  const filtered = TEMPLATES.filter((t) => {
    const matchAgent = filter === 'all' || t.agent_type === filter || t.agent_type === 'all'
    const matchQuery =
      !query ||
      t.title.toLowerCase().includes(query.toLowerCase()) ||
      t.description.toLowerCase().includes(query.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
    return matchAgent && matchQuery
  })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Prompt Templates</h1>
        <p className="mt-2 text-zinc-400">Browse and import system prompts for your favorite coding agent.</p>
      </div>

      <SearchBar onSearch={setQuery} />

      <div className="flex flex-wrap gap-2">
        {AGENT_FILTERS.map((af) => (
          <button
            key={af.value}
            onClick={() => setFilter(af.value)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === af.value
                ? 'bg-violet-600 text-white'
                : 'border border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-white'
            }`}
          >
            {af.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-zinc-500">No templates match your search.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => (
            <TemplateCard key={t.id} template={t} />
          ))}
        </div>
      )}
    </div>
  )
}
