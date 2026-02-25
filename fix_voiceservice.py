path = '/Users/binhnguyen/Downloads/Engquest3k/src/services/voiceService.js'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the block by start/end line positions using character indices
start_marker = "    // \u2500\u2500 Route 2: Direct Google TTS API (dev mode / Worker not yet deployed) \u2500\u2500"
end_marker = "    }\n  },"

start_idx = content.find(start_marker)
if start_idx == -1:
    # Try alternate marker
    start_marker = "    // \u2500\u2500 Route 2:"
    start_idx = content.find(start_marker)

print(f"start_idx = {start_idx}")

# Find the closing '  },' after `throw err;`
throw_err_idx = content.find("      throw err;\n    }\n  },", start_idx)
print(f"throw_err_idx = {throw_err_idx}")

if start_idx != -1 and throw_err_idx != -1:
    end_idx = throw_err_idx + len("      throw err;\n    }\n  },")
    old_block = content[start_idx:end_idx]
    print("OLD BLOCK (first 100 chars):", repr(old_block[:100]))
    print("OLD BLOCK (last 50 chars):", repr(old_block[-50:]))
    
    new_block = (
        "    // \u2500\u2500 Route 2: Backend proxy for Google TTS (API key stays server-side) \u2500\u2500\n"
        "    return await proxyGoogleTTS(text, { voice: GOOGLE_TTS_VOICE, languageCode: 'en-US' });\n"
        "  },"
    )
    
    content = content[:start_idx] + new_block + content[end_idx:]
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Done. File written successfully.")
else:
    print("ERROR: Markers not found")
