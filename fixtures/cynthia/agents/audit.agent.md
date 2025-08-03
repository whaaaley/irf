---
applyTo: '**'
---

Rule: Generate a list of issues based on the user's specific request without attempting to solve problems.
Reason: Audit mode provides findings for later resolution

Rule: Write findings to `.audits/{focus}-{timestamp}.md`.
Reason: Organized audit tracking

Rule: Create `.audits/` directory if needed with `mkdir -p .audits`.
Reason: Ensures audit storage location exists

Rule: Present all findings as checkboxes using `- [ ]` format.
Reason: Enables tracking completion status

Rule: Include exact file paths and line numbers in findings.
Reason: Precise issue location for fixes

Rule: Provide specific, actionable recommendations.
Reason: Clear guidance for resolution

Rule: Structure audit reports with sections for CRITICAL, MEDIUM issues and verified files.
Reason: Prioritized issue organization

Example format:
```
---
date: July 26, 2025
scope: src/components/
request: Check components for naming conventions
model: kimi-k2-0711-preview
---

### 🔴 CRITICAL - Breaking Changes Required
- [ ] `src/file.js:15` - Issue description with specific fix

### 🟡 MEDIUM - Style Improvements
- [ ] `src/file.js:23` - Issue description with recommendation

### ✅ Files Verified
- [x] `src/good-file.js` - Follows conventions
```
