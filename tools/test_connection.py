import asyncio
import edge_tts

async def test():
    TEXT = "Connection successful. System ready."
    VOICE = "en-US-AriaNeural"
    OUTPUT = "public/audio/test_connection.mp3"
    print(f"📡 Testing connection to Microsoft Edge TTS Server...")
    print(f"🗣️  Voice: {VOICE}")
    
    try:
        communicate = edge_tts.Communicate(TEXT, VOICE)
        await communicate.save(OUTPUT)
        print(f"✅ SUCCESS! Created: {OUTPUT}")
        print("👉 Hệ thống TTS hoạt động tốt. Vấn đề có thể do giọng đọc cũ.")
    except Exception as e:
        print(f"❌ CONNECTION FAILED: {e}")
        print("👉 Hãy kiểm tra kết nối mạng hoặc VPN của bạn.")

if __name__ == "__main__":
    asyncio.run(test())
