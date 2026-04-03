'use client'

import { useState } from 'react'
import SearchBar from '@/components/SearchBar'
import PluginCard from '@/components/PluginCard'
import { PLUGINS } from '@/lib/data'

export default function MarketplacePage() {
  const [query, setQuery] = useState('')

  const filtered = PLUGINS.filter(
    (p) =>
      !query ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Plugin Marketplace</h1>
        <p className="mt-2 text-zinc-400">Discover plugins and integrations for your coding agents.</p>
      </div>

      <SearchBar onSearch={setQuery} />

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-zinc-500">No plugins found.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PluginCard key={p.id} plugin={p} />
          ))}
        </div>
      )}
    </div>
  )
}
