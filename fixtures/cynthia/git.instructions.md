Rule: Use conventional commit format: `<type>[optional scope]: <description>`
Reason: Enables automated tooling and clear communication

Rule: Keep subject under 50 characters: present tense imperative, capitalized, no trailing punctuation
Reason: Readable in git log and matches git's own conventions

Rule: Use `feat:` for new features, `fix:` for bug fixes, `docs:` for documentation, `refactor:` for code restructuring, `test:` for testing, `chore:` for maintenance
Reason: Core types for semantic versioning and clear categorization

Rule: Use `chore:` for changes to instruction files (.github/instructions/)
Reason: Instruction updates are maintenance tasks, not user-facing features

Rule: Add `!` after type or `BREAKING CHANGE:` in footer for breaking changes
Reason: Signals major version bumps in semantic versioning

Rule: Make atomic commits - one logical change per commit
Reason: Easier to review, revert, and understand history

Rule: Use body to explain what and why, not how
Reason: Code shows how, commit message explains motivation

Rule: Avoid adding commit message body/description unless specifically requested
Reason: Keep commits concise and focused on the core change

Rule: Avoid adding automated tool attribution, metadata, or AI assistant co-authors (opencode, copilot, windsurf, cursor) in commit messages
Reason: Keep commit history clean and focused on human contributors

Rule: Never include "Co-Authored-By" lines with opencode
Reason: Explicitly prevents opencode attribution in commit history

Rule: Use only basic local git commands (add, commit, status, log, reset --soft, restore --staged) - no remote operations or branching
Reason: Keep git usage minimal and safe for basic version control

Rule: Never commit without first asking for explicit confirmation
Reason: Prevents accidental commits and ensures user control over version history
