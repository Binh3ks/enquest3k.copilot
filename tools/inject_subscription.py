import os

main_file = 'src/main.jsx'
wrapper_import = "import FloatingUpgradeWrapper from './components/subscription/FloatingUpgradeWrapper';"
wrapper_tag = "<FloatingUpgradeWrapper />"

try:
    with open(main_file, 'r') as f:
        content = f.read()

    if "FloatingUpgradeWrapper" in content:
        print("✅ Subscription wrapper already injected.")
    else:
        # 1. Add Import
        lines = content.split('\n')
        last_import_idx = 0
        for i, line in enumerate(lines):
            if line.startswith('import '):
                last_import_idx = i
        
        lines.insert(last_import_idx + 1, wrapper_import)
        
        # 2. Add Component Wrapper
        # Tìm <App /> và thay thế bằng <><App /><FloatingUpgradeWrapper /></>
        # Hoặc chèn vào trong StrictMode
        new_content = '\n'.join(lines)
        if "<App />" in new_content:
            new_content = new_content.replace("<App />", "<>\n    <App />\n    <FloatingUpgradeWrapper />\n    </>")
            
            with open(main_file, 'w') as f:
                f.write(new_content)
            print("✅ Successfully injected FloatingUpgradeWrapper into src/main.jsx")
        else:
            print("⚠️ Could not find <App /> tag to inject wrapper. Please add <FloatingUpgradeWrapper /> manually.")

except Exception as e:
    print(f"❌ Error injecting subscription: {e}")
