---
applyTo: '**'
---

Always use arrow functions instead of function declarations or function expressions.

Always run TypeScript type checking after creating or modifying code to ensure no type errors.

Use console.error() + return for CLI command validation errors instead of throwing.

Use try/catch for system errors like file operations and imports.

CLI tools should provide clean error messages for user mistakes, not stack traces.

Use line comments (//) instead of block comments (/* */) for consistency.

Use truthy checks (if (!variable)) consistently instead of mixing with type checks.

Use array.join() for multiline strings instead of string concatenation.

Keep function parameters on one line unless they exceed line width limits.

Define callback functions as const arrow functions before passing to other functions instead of inline.

Empty early returns must have a comment explaining why the function is exiting.
