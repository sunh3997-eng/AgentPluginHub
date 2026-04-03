import Link from 'next/link'
import { Zap } from 'lucide-react'

const LINKS = {
  Product: [
    { href: '/templates', label: 'Templates' },
    { href: '/marketplace', label: 'Marketplace' },
    { href: '/hooks', label: 'Hooks' },
    { href: '/upload', label: 'Publish' },
  ],
  Agents: [
    { href: '/templates?agent=cursor', label: 'Cursor' },
    { href: '/templates?agent=claude-code', label: 'Claude Code' },
    { href: '/templates?agent=codex', label: 'Codex' },
    { href: '/templates?agent=copilot', label: 'Copilot' },
  ],
  Company: [
    { href: '#', label: 'About' },
    { href: '#', label: 'Blog' },
    { href: '#', label: 'Changelog' },
    { href: '#', label: 'Status' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-blue-600">
                <Zap className="h-4 w-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-semibold text-white">AgentPluginHub</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500">
              The open marketplace for AI coding agent plugins, system prompt templates, and workflow hooks.
            </p>
          </div>

          {Object.entries(LINKS).map(([section, links]) => (
            <div key={section}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                {section}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-8 text-sm text-zinc-600 md:flex-row">
          <p>© 2026 AgentPluginHub. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-zinc-400 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-zinc-400 transition-colors">Terms</Link>
            <Link href="#" className="hover:text-zinc-400 transition-colors">License</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
