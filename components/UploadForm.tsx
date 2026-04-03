'use client'

import { useState } from 'react'
import { Check, ChevronRight, Upload, X } from 'lucide-react'
import type { AgentType } from '@/lib/types'

const AGENT_OPTIONS: { value: AgentType; label: string }[] = [
  { value: 'cursor', label: 'Cursor' },
  { value: 'claude-code', label: 'Claude Code' },
  { value: 'codex', label: 'Codex' },
  { value: 'copilot', label: 'GitHub Copilot' },
  { value: 'all', label: 'All Agents' },
]

const CATEGORY_OPTIONS = [
  'Code Review', 'Security', 'Testing', 'Documentation', 'Git',
  'DevOps', 'Performance', 'TypeScript', 'API Design', 'Analytics',
]

const STEPS = ['Basic Info', 'Compatibility', 'Upload', 'Review']

interface FormData {
  name: string
  description: string
  version: string
  category: string
  tags: string
  price: string
  agents: AgentType[]
  file: File | null
  readme: string
  termsAccepted: boolean
}

export default function UploadForm() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState<FormData>({
    name: '',
    description: '',
    version: '1.0.0',
    category: '',
    tags: '',
    price: '0',
    agents: [],
    file: null,
    readme: '',
    termsAccepted: false,
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  function toggleAgent(agent: AgentType) {
    set(
      'agents',
      form.agents.includes(agent)
        ? form.agents.filter((a) => a !== agent)
        : [...form.agents, agent]
    )
  }

  function validateStep(): boolean {
    const newErrors: Partial<Record<keyof FormData, string>> = {}
    if (step === 0) {
      if (!form.name.trim()) newErrors.name = 'Plugin name is required'
      if (!form.description.trim()) newErrors.description = 'Description is required'
      if (!form.version.match(/^\d+\.\d+\.\d+$/)) newErrors.version = 'Version must be semver (e.g. 1.0.0)'
      if (!form.category) newErrors.category = 'Category is required'
    }
    if (step === 1) {
      if (form.agents.length === 0) newErrors.agents = 'Select at least one agent'
    }
    if (step === 2) {
      if (!form.file) newErrors.file = 'Plugin file is required'
    }
    if (step === 3) {
      if (!form.termsAccepted) newErrors.termsAccepted = 'You must accept the terms'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function nextStep() {
    if (validateStep()) {
      if (step < STEPS.length - 1) setStep((s) => s + 1)
      else handleSubmit()
    }
  }

  function handleSubmit() {
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-emerald-800/40 bg-emerald-900/10 p-10 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-900/40">
          <Check className="h-7 w-7 text-emerald-400" />
        </div>
        <h2 className="text-xl font-semibold text-zinc-100">Submitted for Review</h2>
        <p className="mt-2 text-sm text-zinc-400">
          <strong className="text-zinc-200">{form.name}</strong> has been submitted. Our team will review it within 2–3 business days. You&apos;ll receive an email when it&apos;s approved.
        </p>
        <div className="mt-6 rounded-xl bg-zinc-900 p-4 text-left">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">Submission Details</p>
          <div className="space-y-1.5 text-xs text-zinc-400">
            <div className="flex justify-between"><span>Version</span><span className="text-zinc-300">v{form.version}</span></div>
            <div className="flex justify-between"><span>Category</span><span className="text-zinc-300">{form.category}</span></div>
            <div className="flex justify-between"><span>Price</span><span className="text-zinc-300">{form.price === '0' ? 'Free' : `$${form.price}/mo`}</span></div>
            <div className="flex justify-between"><span>Agents</span><span className="text-zinc-300">{form.agents.join(', ')}</span></div>
          </div>
        </div>
        <button
          onClick={() => { setSubmitted(false); setStep(0); setForm({ name: '', description: '', version: '1.0.0', category: '', tags: '', price: '0', agents: [], file: null, readme: '', termsAccepted: false }) }}
          className="mt-6 rounded-lg border border-zinc-800 px-4 py-2 text-sm text-zinc-400 hover:bg-zinc-800 transition-colors"
        >
          Submit Another Plugin
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Step indicator */}
      <div className="mb-8 flex items-center justify-between">
        {STEPS.map((label, i) => (
          <div key={label} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                  i < step
                    ? 'bg-violet-600 text-white'
                    : i === step
                    ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white ring-4 ring-violet-600/20'
                    : 'bg-zinc-800 text-zinc-500'
                }`}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className={`mt-1.5 text-xs ${i === step ? 'text-zinc-200' : 'text-zinc-600'}`}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-px mx-3 -mt-5 transition-colors ${i < step ? 'bg-violet-600' : 'bg-zinc-800'}`} />
            )}
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        {/* Step 0: Basic Info */}
        {step === 0 && (
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-zinc-100">Basic Information</h2>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-400">Plugin Name *</label>
              <input
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                placeholder="e.g. Auto-Docs Generator"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-violet-600"
              />
              {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-400">Description *</label>
              <textarea
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
                rows={3}
                placeholder="Describe what your plugin does and the problem it solves..."
                className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-violet-600"
              />
              {errors.description && <p className="mt-1 text-xs text-red-400">{errors.description}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-zinc-400">Version *</label>
                <input
                  value={form.version}
                  onChange={(e) => set('version', e.target.value)}
                  placeholder="1.0.0"
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-violet-600"
                />
                {errors.version && <p className="mt-1 text-xs text-red-400">{errors.version}</p>}
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-zinc-400">Price ($/mo, 0 = free)</label>
                <input
                  type="number"
                  min="0"
                  value={form.price}
                  onChange={(e) => set('price', e.target.value)}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-violet-600"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-400">Category *</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORY_OPTIONS.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => set('category', cat)}
                    className={`rounded-lg px-3 py-1.5 text-xs transition-all ${
                      form.category === cat
                        ? 'bg-violet-600 text-white'
                        : 'border border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              {errors.category && <p className="mt-1 text-xs text-red-400">{errors.category}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-400">Tags (comma-separated)</label>
              <input
                value={form.tags}
                onChange={(e) => set('tags', e.target.value)}
                placeholder="typescript, automation, linting"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-violet-600"
              />
            </div>
          </div>
        )}

        {/* Step 1: Compatibility */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-zinc-100">Agent Compatibility</h2>
            <p className="text-xs text-zinc-500">Select all AI coding agents your plugin supports.</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {AGENT_OPTIONS.map((opt) => {
                const selected = form.agents.includes(opt.value)
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => toggleAgent(opt.value)}
                    className={`flex items-center justify-between rounded-xl border p-3.5 text-sm transition-all ${
                      selected
                        ? 'border-violet-600 bg-violet-900/20 text-violet-300'
                        : 'border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    {opt.label}
                    {selected && <Check className="h-4 w-4 text-violet-400" />}
                  </button>
                )
              })}
            </div>
            {errors.agents && <p className="text-xs text-red-400">{errors.agents}</p>}
          </div>
        )}

        {/* Step 2: Upload */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-zinc-100">Upload Plugin Files</h2>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-400">Plugin Bundle *</label>
              <label className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed py-10 transition-colors ${
                form.file ? 'border-violet-700 bg-violet-900/10' : 'border-zinc-800 hover:border-zinc-700'
              }`}>
                <input
                  type="file"
                  className="hidden"
                  accept=".zip,.tar.gz,.js,.ts,.json"
                  onChange={(e) => set('file', e.target.files?.[0] ?? null)}
                />
                {form.file ? (
                  <>
                    <Check className="mb-2 h-8 w-8 text-violet-400" />
                    <p className="text-sm font-medium text-violet-300">{form.file.name}</p>
                    <p className="text-xs text-zinc-500">{(form.file.size / 1024).toFixed(1)} KB</p>
                  </>
                ) : (
                  <>
                    <Upload className="mb-2 h-8 w-8 text-zinc-600" />
                    <p className="text-sm text-zinc-400">Drop your file here or click to browse</p>
                    <p className="mt-1 text-xs text-zinc-600">Supports .zip, .tar.gz, .js, .ts, .json</p>
                  </>
                )}
              </label>
              {errors.file && <p className="mt-1 text-xs text-red-400">{errors.file}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-400">README / Documentation</label>
              <textarea
                value={form.readme}
                onChange={(e) => set('readme', e.target.value)}
                rows={6}
                placeholder="## Installation&#10;&#10;```bash&#10;npm install your-plugin&#10;```&#10;&#10;## Usage..."
                className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-400 placeholder-zinc-700 font-mono outline-none focus:border-violet-600"
              />
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-zinc-100">Review & Submit</h2>
            <div className="rounded-xl bg-zinc-950 p-4 space-y-3 text-sm">
              {[
                ['Name', form.name],
                ['Version', `v${form.version}`],
                ['Category', form.category],
                ['Price', form.price === '0' ? 'Free' : `$${form.price}/mo`],
                ['Agents', form.agents.join(', ')],
                ['Tags', form.tags || '—'],
                ['File', form.file?.name ?? '—'],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-zinc-500">{label}</span>
                  <span className="text-zinc-200 font-medium">{value}</span>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-amber-800/30 bg-amber-900/10 p-4 text-xs text-amber-400">
              <strong className="font-semibold">Review Process</strong>
              <ul className="mt-2 space-y-1 list-disc list-inside text-amber-500">
                <li>Manual security review within 2–3 business days</li>
                <li>Automated malware scan on submission</li>
                <li>You&apos;ll be notified by email on approval or rejection</li>
              </ul>
            </div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.termsAccepted}
                onChange={(e) => set('termsAccepted', e.target.checked)}
                className="mt-0.5 rounded border-zinc-700 accent-violet-600"
              />
              <span className="text-xs text-zinc-400">
                I agree to the{' '}
                <a href="#" className="text-violet-400 hover:underline">Developer Terms</a>{' '}
                and confirm this plugin is my original work or I have rights to distribute it.
              </span>
            </label>
            {errors.termsAccepted && <p className="text-xs text-red-400">{errors.termsAccepted}</p>}
          </div>
        )}

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between border-t border-zinc-800 pt-5">
          <button
            onClick={() => setStep((s) => s - 1)}
            disabled={step === 0}
            className="rounded-lg border border-zinc-800 px-4 py-2 text-sm text-zinc-400 hover:bg-zinc-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Back
          </button>
          <button
            onClick={nextStep}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity"
          >
            {step === STEPS.length - 1 ? 'Submit Plugin' : 'Continue'}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
