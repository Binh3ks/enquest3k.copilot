import os

main_file = 'src/main.jsx'
launcher_import = "import SuperAdminLauncher from './components/subscription/SuperAdminLauncher';"
launcher_tag = "<SuperAdminLauncher />"

try:
    with open(main_file, 'r') as f:
        content = f.read()

    if "SuperAdminLauncher" in content:
        print("✅ Super Admin Launcher already injected.")
    else:
        lines = content.split('\n')
        last_import = 0
        for i, line in enumerate(lines):
            if line.startswith('import '):
                last_import = i
        
        lines.insert(last_import + 1, launcher_import)
        
        # Chèn vào cuối cùng trong StrictMode hoặc Fragment
        # Tìm thẻ đóng cuối cùng của App wrapper
        content_with_import = '\n'.join(lines)
        
        # Simple injection: replace closing fragment or strictmode if possible, 
        # or just put it next to App if it is wrapped.
        # Safe bet: Replace <App /> with <><App /><SuperAdminLauncher /></>
        
        if "<App />" in content_with_import:
            new_content = content_with_import.replace("<App />", "<>\n    <App />\n    <SuperAdminLauncher />\n    </>")
            with open(main_file, 'w') as f:
                f.write(new_content)
            print("✅ Successfully injected SuperAdminLauncher.")
        else:
            print("⚠️ Check src/main.jsx structure manually.")

except Exception as e:
    print(f"❌ Error: {e}")
