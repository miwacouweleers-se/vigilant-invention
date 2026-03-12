# MCP: vertex-docs troubleshooting

## What’s going wrong

The **vertex-docs** MCP server is configured in your global MCP config (`~/.cursor/mcp.json`) to use this SSE endpoint:

- **URL:** `https://design.sb.se.com/api/mcp/sse`

When checked, this endpoint either:

- Returns **503 Service Unavailable**, or  
- Is **unreachable** (timeout / SSL or network issues).

So Cursor correctly reports that the MCP server has errored; the problem is with the remote service or how it’s reached, not with Cursor itself.

## What you can do

### 1. Temporarily disable vertex-docs (stop the error)

Edit your global config and remove or comment out the `vertex-docs` entry.

**Quick open:** in Terminal run `cursor ~/.cursor/mcp.json` (or `code ~/.cursor/mcp.json` if you use VS Code to edit it).

**File:** `~/.cursor/mcp.json`

**Before:**

```json
{
  "mcpServers": {
    "vertex-docs": {
      "url": "https://design.sb.se.com/api/mcp/sse"
    }
  }
}
```

**After (disabled):**

```json
{
  "mcpServers": {}
}
```

Save the file and restart Cursor. The vertex-docs error will go away until you add the server back.

### 2. If the service requires authentication

If `design.sb.se.com` expects a token or API key, add it via this project’s MCP config so it overrides the global one:

**File (in this repo):** `.cursor/mcp.json`

Example with a Bearer token:

```json
{
  "mcpServers": {
    "vertex-docs": {
      "url": "https://design.sb.se.com/api/mcp/sse",
      "headers": {
        "Authorization": "Bearer YOUR_TOKEN_HERE"
      }
    }
  }
}
```

Replace `YOUR_TOKEN_HERE` with the real token, save, and restart Cursor.

### 3. Check network and service

- **VPN / corporate network:** If this is an internal SE URL, make sure you’re on the right VPN or network.
- **Service status:** Ask the team that runs `design.sb.se.com` if the MCP endpoint is up and what auth (if any) is required.
- **Logs in Cursor:** **Cursor Settings → Tools & MCP**, then open **Output → MCP Logs** for the exact error message.

## Summary

| Cause              | Action |
|--------------------|--------|
| Service down / 503 | Disable in `~/.cursor/mcp.json` until it’s fixed, or contact service owners. |
| Auth required      | Add `headers` (e.g. `Authorization`) in this project’s `.cursor/mcp.json`. |
| Network / VPN      | Connect to the correct network and try again. |
