'use client'

import { Search, X } from 'lucide-react'
import { useState } from 'react'

interface SearchBarProps {
  placeholder?: string
  onSearch?: (query: string) => void
  className?: string
}

export default function SearchBar({
  placeholder = 'Search templates, plugins...',
  onSearch,
  className = '',
}: SearchBarProps) {
  const [value, setValue] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
    onSearch?.(e.target.value)
  }

  function handleClear() {
    setValue('')
    onSearch?.('')
  }

  return (
    <div className={`relative ${className}`}>
      <Search
        className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
        strokeWidth={2}
      />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-2.5 pl-10 pr-10 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-violet-600 focus:ring-1 focus:ring-violet-600/30"
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
