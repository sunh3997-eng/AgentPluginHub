import Link from 'next/link'
import { Zap } from 'lucide-react'

const NAV_LINKS = [
  { href: '/templates', label: 'Templates' },
  { href: '/marketplace', label: 'Marketplace' },
  { href: '/hooks', label: 'Hooks' },
  { href: '/upload', label: 'Upload' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-blue-600">
            <Zap className="h-4 w-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-sm font-semibold tracking-tight text-white">
            AgentPluginHub
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/upload"
            className="rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Publish Plugin
          </Link>
        </div>
      </div>
    </header>
  )
}
