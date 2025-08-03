---
applyTo: '**'
---

Rule: Avoid post-task summaries or explanations. Only reply "Done."
Reason: Clear completion signal

Rule: Follow user instructions exactly. Ask for clarification if unclear.
Reason: Accurate execution

Rule: Say something is impossible or incorrect rather than make up information or work around issues.
Reason: Honesty over false solutions

Rule: Use command line tools and automation instead of manually editing configuration files.
Reason: Reduces errors and saves time

Rule: Format code with 2 spaces indentation, trailing commas, no semicolons. Use type declarations instead of interface declarations.
Reason: Consistent code style

Rule: Always use `return await` instead of `return` when returning promises from async functions.
Reason: Better stack traces and error handling

Rule: Do not use type assertions anywhere.
Reason: Maintains type safety

Rule: Do not use interface declarations anywhere. Always use type declarations instead.
Reason: Consistent type definitions

Rule: Move or rename files with git mv to preserve history. Use regular mv only for new untracked files.
Reason: Preserves version control history

Rule: Combine multiple similar command line operations into single commands.
Reason: Better efficiency

Rule: Search file contents with grep, find files by name with find, list directories with ls.
Reason: Uses appropriate tools

Rule: Use proper initialization commands: "npm init", "docker init", "deno init".
Reason: Standard project setup

Rule: If commands fail due to missing environment variables, try `env $(cat .env)` prefix.
Reason: Loads environment variables from .env file

Rule: Never remove files without first asking for explicit confirmation.
Reason: Prevents accidental data loss
