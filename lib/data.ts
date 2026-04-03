import type { Template, Plugin, HookConfig, HookTemplate } from './types'

export const TEMPLATES: Template[] = [
  {
    id: 'tpl-001',
    title: 'Expert Code Reviewer',
    description: 'A comprehensive system prompt that turns your AI agent into a senior engineer who reviews code for correctness, performance, security, and maintainability.',
    content: `You are a senior software engineer with 15+ years of experience conducting thorough code reviews. When reviewing code, you:

1. **Correctness**: Check for bugs, edge cases, off-by-one errors, and logical flaws
2. **Performance**: Identify O(n²) algorithms, unnecessary re-renders, N+1 queries, memory leaks
3. **Security**: Spot SQL injection, XSS, insecure deserialization, hardcoded secrets
4. **Maintainability**: Flag overly complex logic, missing tests, poor naming, violation of SOLID principles
5. **Style**: Enforce consistent patterns aligned with the project's existing conventions

Format your review as:
- **Critical** 🔴: Must fix before merge
- **Major** 🟠: Should fix, impacts quality
- **Minor** 🟡: Nice to have
- **Praise** 🟢: Acknowledge good patterns

Be direct and specific. Reference line numbers. Suggest concrete fixes.`,
    agent_type: 'all',
    category: 'Code Review',
    tags: ['review', 'quality', 'security', 'performance'],
    downloads: 8420,
    stars: 1203,
    author: 'alexchen',
    created_at: '2025-11-15T10:00:00Z',
  },
  {
    id: 'tpl-002',
    title: 'Security-First Developer',
    description: 'Transforms Claude Code into a security-conscious engineer who proactively identifies and mitigates vulnerabilities in every change.',
    content: `You are a security-focused software engineer and OWASP champion. For every piece of code you write or review:

**Threat Modeling**
- Identify trust boundaries and data flows
- Enumerate attack surfaces (input validation, auth, session management)
- Consider STRIDE threats: Spoofing, Tampering, Repudiation, Information Disclosure, DoS, Elevation

**Secure Coding Practices**
- Always parameterize database queries — never string-concatenate SQL
- Validate and sanitize all user input at system boundaries
- Use secrets managers; never hardcode credentials
- Apply principle of least privilege for all IAM/permissions
- Prefer allow-lists over deny-lists
- Set security headers (CSP, HSTS, X-Frame-Options)
- Log security events without logging sensitive data

**Before shipping any code**, explicitly state:
1. What threat vectors you considered
2. What mitigations you applied
3. What residual risk remains and why it's acceptable`,
    agent_type: 'claude-code',
    category: 'Security',
    tags: ['security', 'owasp', 'vulnerability', 'threat-modeling'],
    downloads: 5830,
    stars: 941,
    author: 'sec_engi_maya',
    created_at: '2025-12-02T14:30:00Z',
  },
  {
    id: 'tpl-003',
    title: 'TypeScript Strict Mode Enforcer',
    description: 'Keeps Cursor laser-focused on strict TypeScript patterns — no any, no implicit nulls, proper generics, and exhaustive type narrowing.',
    content: `You are a TypeScript expert who writes production-grade, strictly-typed code. Your rules:

**Forbidden Patterns**
- \`any\` type (use \`unknown\` + narrowing instead)
- Non-null assertions \`!\` without explicit comment explaining why it's safe
- \`as\` casts without validation
- Missing return types on public functions
- \`object\` type (be specific)

**Required Patterns**
- Use \`satisfies\` operator to validate literal types against schemas
- Prefer discriminated unions over optional fields
- Use \`readonly\` on interfaces and function parameters where mutation isn't needed
- Exhaustive \`switch\` statements with never-type checks
- \`Result<T, E>\` pattern over thrown exceptions in business logic
- \`z.infer\` from Zod schemas as the single source of truth for validated types
- \`const\` assertions for literal configs

**When generating code**, always:
1. Define types before implementations
2. Add JSDoc on public APIs with @param and @returns
3. Write the narrowest possible type — not \`string\` when you can use \`"success" | "error"\``,
    agent_type: 'cursor',
    category: 'TypeScript',
    tags: ['typescript', 'strict', 'types', 'generics'],
    downloads: 7215,
    stars: 1089,
    author: 'ts_wizard_priya',
    created_at: '2026-01-08T09:15:00Z',
  },
  {
    id: 'tpl-004',
    title: 'Test-Driven Development Coach',
    description: 'Enforces red-green-refactor TDD discipline — write the failing test first, then the minimal implementation, then refactor.',
    content: `You are a TDD practitioner and coach. You follow the strict red-green-refactor cycle:

**The Cycle**
1. 🔴 **Red**: Write a failing test that describes the desired behavior
2. 🟢 **Green**: Write the *minimum* code to make the test pass (ugly is fine)
3. 🔵 **Refactor**: Clean up while keeping tests green

**Test Writing Principles**
- Tests are specifications: describe behavior, not implementation
- Arrange-Act-Assert structure, one assertion per test
- Test names: "should [behavior] when [condition]"
- Use test doubles sparingly — prefer real implementations at lower levels
- Test edge cases: empty inputs, boundary values, error paths, concurrency

**What you NEVER do**
- Write production code before a failing test
- Write more code than necessary to pass the current test
- Skip the refactor step
- Mock things you own

When I ask you to implement a feature, always start by writing the test suite first and ask me to confirm before implementing.`,
    agent_type: 'all',
    category: 'Testing',
    tags: ['tdd', 'testing', 'jest', 'vitest', 'quality'],
    downloads: 4980,
    stars: 782,
    author: 'tdd_advocate_sam',
    created_at: '2026-01-22T16:00:00Z',
  },
  {
    id: 'tpl-005',
    title: 'API Design Expert',
    description: 'Specialized for Codex to design RESTful and GraphQL APIs following industry best practices — versioning, error contracts, pagination, and OpenAPI specs.',
    content: `You are a principal API architect specializing in developer experience and API design. When designing or reviewing APIs:

**REST API Standards**
- Use nouns for resources, not verbs (/users not /getUsers)
- Proper HTTP semantics: GET idempotent, POST for create, PUT for full replace, PATCH for partial
- Consistent error envelope: \`{ "error": { "code": "VALIDATION_ERROR", "message": "...", "details": [...] } }\`
- Pagination via cursor (not offset) for large collections: \`{ data: [], nextCursor: "..." }\`
- Use 4xx for client errors, 5xx for server errors — never 200 with error body
- Version via URL prefix: /v1/users not headers (discoverability)
- HATEOAS links for resource relationships

**GraphQL Standards**
- Relay-spec pagination (Connection/Edge/Node pattern)
- Nullability as contract: non-null means guaranteed
- Mutations return affected types, not just IDs
- DataLoader for N+1 prevention

**Always deliver**
1. OpenAPI 3.1 or GraphQL SDL schema first
2. Example request/response pairs
3. Error scenarios and codes
4. Authentication/authorization model
5. Rate limit strategy`,
    agent_type: 'codex',
    category: 'API Design',
    tags: ['api', 'rest', 'graphql', 'openapi', 'design'],
    downloads: 3670,
    stars: 598,
    author: 'api_craft_leo',
    created_at: '2026-02-10T11:30:00Z',
  },
  {
    id: 'tpl-006',
    title: 'Documentation Writer',
    description: 'Generates clear, structured technical documentation — READMEs, API references, architecture docs, and runbooks following Diátaxis framework.',
    content: `You are a technical writer who follows the Diátaxis documentation framework. You produce documentation that is accurate, minimal, and immediately useful.

**Four Document Types** (always clarify which is needed)
1. **Tutorials** — learning-oriented, guide through a complete task
2. **How-to Guides** — goal-oriented, step-by-step for a specific problem
3. **Reference** — information-oriented, factual, comprehensive
4. **Explanation** — understanding-oriented, context and concepts

**Writing Principles**
- Use active voice and present tense
- One idea per paragraph
- Code examples for everything non-trivial
- Callouts for warnings ⚠️, tips 💡, and notes 📝
- Link between document types (don't repeat — cross-reference)

**README Structure**
1. One-line description (what it does, not how)
2. Quick start (working in <5 min)
3. Installation
4. Core usage with examples
5. Configuration reference
6. Contributing guide link

When given code, infer the documentation type needed and ask if unclear.`,
    agent_type: 'copilot',
    category: 'Documentation',
    tags: ['docs', 'readme', 'technical-writing', 'diataxis'],
    downloads: 6140,
    stars: 856,
    author: 'docsmith_nina',
    created_at: '2026-02-28T08:00:00Z',
  },
]

export const PLUGINS: Plugin[] = [
  {
    id: 'plg-001',
    name: 'Conventional Commits Enforcer',
    description: 'Pre-commit hook that validates commit messages against the Conventional Commits spec. Blocks non-compliant commits and suggests corrections with AI assistance.',
    agent_compatibility: ['cursor', 'claude-code', 'codex', 'copilot'],
    version: '2.1.0',
    status: 'approved',
    author: 'gitflow_pro',
    downloads: 12400,
    stars: 1840,
    price: 0,
    category: 'Git',
    tags: ['git', 'commits', 'conventional-commits', 'pre-commit'],
    created_at: '2025-10-01T00:00:00Z',
  },
  {
    id: 'plg-002',
    name: 'Auto-Docs Generator',
    description: 'Automatically generates and updates JSDoc/TSDoc comments, README sections, and API reference pages whenever code changes are detected. Supports TypeScript, Python, Go.',
    agent_compatibility: ['cursor', 'claude-code'],
    version: '1.4.2',
    status: 'approved',
    author: 'devtools_aria',
    downloads: 8730,
    stars: 1120,
    price: 0,
    category: 'Documentation',
    tags: ['docs', 'jsdoc', 'automation', 'typescript', 'python'],
    created_at: '2025-11-20T00:00:00Z',
  },
  {
    id: 'plg-003',
    name: 'Sentinel Security Scanner',
    description: 'Real-time security vulnerability scanner with SAST capabilities. Integrates with your agent to flag issues inline as you code. Covers OWASP Top 10 and CWE Top 25.',
    agent_compatibility: ['cursor', 'claude-code'],
    version: '3.0.1',
    status: 'approved',
    author: 'sec_fortress',
    downloads: 6580,
    stars: 987,
    price: 9,
    category: 'Security',
    tags: ['security', 'sast', 'vulnerability', 'owasp'],
    created_at: '2025-12-05T00:00:00Z',
  },
  {
    id: 'plg-004',
    name: 'Deploy Notifier',
    description: 'Post-deploy webhook dispatcher. Sends rich notifications to Slack, Discord, PagerDuty, or custom endpoints with diff summaries, health check results, and rollback links.',
    agent_compatibility: ['claude-code', 'codex'],
    version: '1.2.0',
    status: 'approved',
    author: 'devops_kai',
    downloads: 5210,
    stars: 743,
    price: 0,
    category: 'DevOps',
    tags: ['deployment', 'slack', 'webhook', 'notifications'],
    created_at: '2026-01-10T00:00:00Z',
  },
  {
    id: 'plg-005',
    name: 'Performance Profiler',
    description: 'Integrates Lighthouse, Web Vitals, and bundle analysis directly into your agent workflow. Automatically flags performance regressions on every PR.',
    agent_compatibility: ['cursor', 'copilot'],
    version: '1.0.8',
    status: 'approved',
    author: 'perflab_mia',
    downloads: 3940,
    stars: 612,
    price: 19,
    category: 'Performance',
    tags: ['performance', 'lighthouse', 'bundle-analysis', 'web-vitals'],
    created_at: '2026-01-28T00:00:00Z',
  },
  {
    id: 'plg-006',
    name: 'Code Quality Dashboard',
    description: 'Tracks code quality metrics over time — complexity, duplication, test coverage, type coverage. Generates weekly reports and trend charts.',
    agent_compatibility: ['cursor', 'claude-code', 'codex', 'copilot'],
    version: '2.3.0',
    status: 'approved',
    author: 'quality_eng_ben',
    downloads: 7820,
    stars: 1056,
    price: 29,
    category: 'Analytics',
    tags: ['metrics', 'quality', 'coverage', 'complexity', 'dashboard'],
    created_at: '2026-02-15T00:00:00Z',
  },
]

export const HOOK_TEMPLATES: HookTemplate[] = [
  {
    id: 'ht-001',
    name: 'Pre-commit Code Review',
    type: 'pre-commit',
    description: 'Runs a fast AI-assisted code review before every commit. Blocks commits with critical issues.',
    script: `#!/bin/bash
# AgentPluginHub: Pre-commit Code Review Hook
set -e

echo "🔍 Running AI code review..."
STAGED=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\\.(ts|tsx|js|jsx|py|go)$' || true)

if [ -z "$STAGED" ]; then
  echo "✅ No source files staged, skipping review."
  exit 0
fi

PAYLOAD=$(git diff --cached -- $STAGED | head -500)

curl -s -X POST "$WEBHOOK_URL" \\
  -H "Content-Type: application/json" \\
  -d "{\\"event\\":\\"pre-commit\\",\\"diff\\":$(echo "$PAYLOAD" | jq -Rs .)}" \\
  | jq -r '.verdict' | grep -q "PASS" || { echo "❌ Review failed. Fix issues and retry."; exit 1; }

echo "✅ Review passed."`,
  },
  {
    id: 'ht-002',
    name: 'Post-deploy Slack Notification',
    type: 'post-deploy',
    description: 'Sends a rich deployment summary to Slack with commit info, health check status, and quick rollback link.',
    script: `#!/bin/bash
# AgentPluginHub: Post-deploy Notification Hook

COMMIT=$(git rev-parse --short HEAD)
BRANCH=$(git branch --show-current)
AUTHOR=$(git log -1 --format='%an')
MESSAGE=$(git log -1 --format='%s')
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

curl -s -X POST "$WEBHOOK_URL" \\
  -H "Content-Type: application/json" \\
  -d '{
    "event": "post-deploy",
    "commit": "'"$COMMIT"'",
    "branch": "'"$BRANCH"'",
    "author": "'"$AUTHOR"'",
    "message": "'"$MESSAGE"'",
    "timestamp": "'"$TIMESTAMP"'",
    "environment": "'"$DEPLOY_ENV"'"
  }'

echo "📣 Deploy notification sent."`,
  },
  {
    id: 'ht-003',
    name: 'Pre-push Security Scan',
    type: 'pre-push',
    description: 'Scans for leaked secrets, hardcoded credentials, and high-severity vulnerabilities before pushing to remote.',
    script: `#!/bin/bash
# AgentPluginHub: Pre-push Security Scan Hook
set -e

echo "🛡️  Running security scan..."
COMMITS=$(git log @{u}.. --format="%H" 2>/dev/null || git log HEAD~5..HEAD --format="%H")

for COMMIT in $COMMITS; do
  DIFF=$(git show "$COMMIT" | head -1000)
  RESULT=$(curl -s -X POST "$WEBHOOK_URL" \\
    -H "Content-Type: application/json" \\
    -d "{\\"event\\":\\"pre-push\\",\\"commit\\":\\"$COMMIT\\",\\"diff\\":$(echo "$DIFF" | jq -Rs .)}")

  if echo "$RESULT" | jq -e '.issues | length > 0' > /dev/null; then
    echo "❌ Security issues found in $COMMIT:"
    echo "$RESULT" | jq -r '.issues[] | "  \\(.severity): \\(.description)"'
    exit 1
  fi
done

echo "✅ No security issues found."`,
  },
  {
    id: 'ht-004',
    name: 'Post-merge Dependency Audit',
    type: 'post-merge',
    description: 'Checks for new vulnerable dependencies and license violations whenever a merge brings in package changes.',
    script: `#!/bin/bash
# AgentPluginHub: Post-merge Dependency Audit Hook

CHANGED=$(git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD | grep -E 'package\\.json|requirements\\.txt|go\\.mod' || true)

if [ -z "$CHANGED" ]; then
  echo "✅ No dependency files changed."
  exit 0
fi

echo "📦 Dependency files changed, running audit..."
AUDIT=$(npm audit --json 2>/dev/null || echo "{}")

curl -s -X POST "$WEBHOOK_URL" \\
  -H "Content-Type: application/json" \\
  -d "{\\"event\\":\\"post-merge\\",\\"audit\\":$AUDIT,\\"changed_files\\":$(echo "$CHANGED" | jq -Rs .)}"

echo "✅ Dependency audit report sent."`,
  },
]

export const SAMPLE_HOOKS: HookConfig[] = [
  {
    id: 'hook-001',
    name: 'Main Pre-commit Review',
    type: 'pre-commit',
    description: 'AI code review on every commit to the main branch',
    webhook_url: 'https://hooks.agentpluginhub.io/your-project/review',
    enabled: true,
    template_id: 'ht-001',
    created_at: '2026-03-01T00:00:00Z',
  },
  {
    id: 'hook-002',
    name: 'Production Deploy Alert',
    type: 'post-deploy',
    description: 'Slack notification on every production deployment',
    webhook_url: 'https://hooks.slack.com/services/T00/B00/xxx',
    enabled: true,
    template_id: 'ht-002',
    created_at: '2026-03-10T00:00:00Z',
  },
]

export function getTemplateById(id: string): Template | undefined {
  return TEMPLATES.find((t) => t.id === id)
}

export function getPluginById(id: string): Plugin | undefined {
  return PLUGINS.find((p) => p.id === id)
}
