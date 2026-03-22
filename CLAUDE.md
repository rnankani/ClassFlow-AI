# Claude Configuration

This project uses Supabase (@supabase/supabase-js) as a dependency, but we're disabling the auto-connected Supabase MCP server.

To prevent the Supabase MCP server from auto-connecting despite the dependency being present, you can:

1. Remove the Supabase plugin from Claude Code (if installed)
2. Or disable it via your Claude Code settings

The Supabase MCP server connection errors can be safely ignored if the server is not needed for your workflow.
