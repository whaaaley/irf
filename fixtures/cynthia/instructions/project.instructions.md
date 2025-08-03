---
applyTo: '**'
---

This is Cynthia, a test-driven AI code synthesis tool that uses llm-exe for LLM integration.

We use Deno as the runtime environment, not Node.js, so when suggesting commands or imports, use Deno-compatible syntax.

We use JSR (jsr:@) for package imports, not npm packages where possible.

We follow test-driven development - tests are written first, then code is generated to satisfy the tests.

All test files use the Deno testing framework with BDD-style describe/it blocks from `jsr:@std/testing/bdd`.

The function under test must always be called `testFn` and results must be assigned to variables for prompt generation to work correctly.

We use Zod for all schema validation and type generation.

All LLM interactions go through llm-exe for provider abstraction and consistency.

Config is kept minimal and user-focused - complex implementation details are handled internally.

Parser selection is done automatically based on LLM provider - users don't configure parsers.

Always prefer composition over inheritance and functional programming patterns where appropriate.
