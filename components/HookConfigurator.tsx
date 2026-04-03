'use client'

import { useState } from 'react'
import { Plus, Trash2, ToggleLeft, ToggleRight, ChevronDown, Copy, Check } from 'lucide-react'
import type { HookConfig, HookTemplate, HookType } from '@/lib/types'

const HOOK_TYPE_LABELS: Record<HookType, string> = {
  'pre-commit': 'Pre-commit',
  'post-deploy': 'Post-deploy',
  'pre-push': 'Pre-push',
  'post-merge': 'Post-merge',
}

const HOOK_TYPE_COLORS: Record<HookType, string> = {
  'pre-commit': 'bg-violet-900/40 text-violet-400',
  'post-deploy': 'bg-emerald-900/40 text-emerald-400',
  'pre-push': 'bg-blue-900/40 text-blue-400',
  'post-merge': 'bg-orange-900/40 text-orange-400',
}

interface HookConfiguratorProps {
  initialHooks: HookConfig[]
  hookTemplates: HookTemplate[]
}

export default function HookConfigurator({
  initialHooks,
  hookTemplates,
}: HookConfiguratorProps) {
  const [hooks, setHooks] = useState<HookConfig[]>(initialHooks)
  const [showAddForm, setShowAddForm] = useState(false)
  const [expandedScript, setExpandedScript] = useState<string | null>(null)
  const [copiedScript, setCopiedScript] = useState<string | null>(null)

  const [newHook, setNewHook] = useState({
    name: '',
    type: 'pre-commit' as HookType,
    description: '',
    webhook_url: '',
    template_id: '',
  })

  function toggleHook(id: string) {
    setHooks((prev) =>
      prev.map((h) => (h.id === id ? { ...h, enabled: !h.enabled } : h))
    )
  }

  function deleteHook(id: string) {
    setHooks((prev) => prev.filter((h) => h.id !== id))
  }

  function addHook() {
    if (!newHook.name || !newHook.webhook_url) return
    const hook: HookConfig = {
      id: `hook-${Date.now()}`,
      ...newHook,
      enabled: true,
      created_at: new Date().toISOString(),
    }
    setHooks((prev) => [...prev, hook])
    setNewHook({ name: '', type: 'pre-commit', description: '', webhook_url: '', template_id: '' })
    setShowAddForm(false)
  }

  function copyScript(templateId: string, script: string) {
    navigator.clipboard.writeText(script)
    setCopiedScript(templateId)
    setTimeout(() => setCopiedScript(null), 2000)
  }

  function applyTemplate(templateId: string) {
    const tpl = hookTemplates.find((t) => t.id === templateId)
    if (!tpl) return
    setNewHook((prev) => ({
      ...prev,
      name: tpl.name,
      type: tpl.type,
      description: tpl.description,
      template_id: tpl.id,
    }))
  }

  return (
    <div className="space-y-4">
      {/* Active hooks */}
      {hooks.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-800 py-12 text-center">
          <p className="text-sm text-zinc-500">No hooks configured yet.</p>
          <p className="mt-1 text-xs text-zinc-600">Add a hook below to get started.</p>
        </div>
      ) : (
        hooks.map((hook) => (
          <div
            key={hook.id}
            className={`rounded-xl border p-4 transition-all ${
              hook.enabled ? 'border-zinc-800 bg-zinc-900' : 'border-zinc-800/50 bg-zinc-900/50 opacity-60'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-2.5">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${HOOK_TYPE_COLORS[hook.type]}`}
                  >
                    {HOOK_TYPE_LABELS[hook.type]}
                  </span>
                  <h3 className="text-sm font-semibold text-zinc-100">{hook.name}</h3>
                </div>
                <p className="text-xs text-zinc-500">{hook.description}</p>
                <div className="mt-2 flex items-center gap-2">
                  <code className="rounded bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400 truncate max-w-xs">
                    {hook.webhook_url}
                  </code>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleHook(hook.id)}
                  className="text-zinc-400 hover:text-zinc-200 transition-colors"
                  title={hook.enabled ? 'Disable' : 'Enable'}
                >
                  {hook.enabled ? (
                    <ToggleRight className="h-5 w-5 text-violet-500" />
                  ) : (
                    <ToggleLeft className="h-5 w-5" />
                  )}
                </button>
                <button
                  onClick={() => deleteHook(hook.id)}
                  className="text-zinc-600 hover:text-red-400 transition-colors"
                  title="Delete hook"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      {/* Add hook button */}
      {!showAddForm && (
        <button
          onClick={() => setShowAddForm(true)}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-700 py-3 text-sm text-zinc-400 transition-colors hover:border-violet-700 hover:text-violet-400"
        >
          <Plus className="h-4 w-4" />
          Add Hook
        </button>
      )}

      {/* Add hook form */}
      {showAddForm && (
        <div className="rounded-xl border border-violet-800/40 bg-zinc-900 p-5">
          <h3 className="mb-4 text-sm font-semibold text-zinc-100">New Hook</h3>

          {/* Template picker */}
          <div className="mb-4">
            <label className="mb-1.5 block text-xs font-medium text-zinc-400">
              Start from template (optional)
            </label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {hookTemplates.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => applyTemplate(tpl.id)}
                  className={`rounded-lg border p-2.5 text-left text-xs transition-all ${
                    newHook.template_id === tpl.id
                      ? 'border-violet-600 bg-violet-900/20 text-violet-300'
                      : 'border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <span className={`mb-1 block rounded-full px-1.5 py-0.5 text-[10px] w-fit ${HOOK_TYPE_COLORS[tpl.type]}`}>
                    {HOOK_TYPE_LABELS[tpl.type]}
                  </span>
                  {tpl.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-400">Hook Name *</label>
              <input
                type="text"
                value={newHook.name}
                onChange={(e) => setNewHook((p) => ({ ...p, name: e.target.value }))}
                placeholder="e.g. Main Pre-commit Review"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-violet-600"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-400">Hook Type *</label>
              <div className="relative">
                <select
                  value={newHook.type}
                  onChange={(e) => setNewHook((p) => ({ ...p, type: e.target.value as HookType }))}
                  className="w-full appearance-none rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-violet-600"
                >
                  {Object.entries(HOOK_TYPE_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-medium text-zinc-400">Webhook URL *</label>
              <input
                type="url"
                value={newHook.webhook_url}
                onChange={(e) => setNewHook((p) => ({ ...p, webhook_url: e.target.value }))}
                placeholder="https://hooks.example.com/your-endpoint"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-violet-600"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-medium text-zinc-400">Description</label>
              <input
                type="text"
                value={newHook.description}
                onChange={(e) => setNewHook((p) => ({ ...p, description: e.target.value }))}
                placeholder="What does this hook do?"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-violet-600"
              />
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={addHook}
              className="rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity"
            >
              Add Hook
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="rounded-lg border border-zinc-800 px-4 py-2 text-sm text-zinc-400 hover:bg-zinc-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Hook template scripts */}
      <div className="mt-8">
        <h2 className="mb-4 text-sm font-semibold text-zinc-300">Shell Scripts</h2>
        <div className="space-y-3">
          {hookTemplates.map((tpl) => (
            <div key={tpl.id} className="rounded-xl border border-zinc-800 bg-zinc-900">
              <button
                onClick={() => setExpandedScript(expandedScript === tpl.id ? null : tpl.id)}
                className="flex w-full items-center justify-between px-4 py-3 text-left"
              >
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs ${HOOK_TYPE_COLORS[tpl.type]}`}>
                    {HOOK_TYPE_LABELS[tpl.type]}
                  </span>
                  <span className="text-sm font-medium text-zinc-200">{tpl.name}</span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-zinc-500 transition-transform ${expandedScript === tpl.id ? 'rotate-180' : ''}`}
                />
              </button>

              {expandedScript === tpl.id && (
                <div className="border-t border-zinc-800 p-4">
                  <p className="mb-3 text-xs text-zinc-500">{tpl.description}</p>
                  <div className="relative">
                    <pre className="overflow-x-auto rounded-lg bg-zinc-950 p-4 text-xs text-zinc-400 leading-relaxed">
                      <code>{tpl.script}</code>
                    </pre>
                    <button
                      onClick={() => copyScript(tpl.id, tpl.script)}
                      className="absolute right-3 top-3 flex items-center gap-1.5 rounded-md bg-zinc-800 px-2.5 py-1.5 text-xs text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200 transition-colors"
                    >
                      {copiedScript === tpl.id ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
