from google.cloud import texttospeech
import os

client = texttospeech.TextToSpeechClient()
voice = texttospeech.VoiceSelectionParams(language_code='en-US', name='en-US-Neural2-F')
config = texttospeech.AudioConfig(audio_encoding=texttospeech.AudioEncoding.MP3)

# Advanced grammar
sentences_adv = [
    "I like playing games.",
    "She likes reading books.",
    "We like drawing pictures.",
    "He likes singing songs.",
    "They like dancing.",
    "I like playing with my friends.",
    "I don't like running.",
    "She doesn't like reading.",
    "We don't like singing.",
    "He doesn't like drawing.",
    "I don't like dancing.",
    "They don't like swimming.",
    "Do you like playing?",
    "Does she like reading?",
    "Do you like drawing?",
    "Does he like singing?",
    "What do you like doing?",
    "Does she like dancing?",
    "Do they like playing games?",
    "Do you like reading books?"
]

# Easy grammar
sentences_easy = [
    "I like playing.",
    "She likes reading books.",
    "We like drawing.",
    "He likes singing.",
    "I like dancing.",
    "They like playing games.",
    "You like reading.",
    "I like drawing pictures.",
    "I don't like running.",
    "She doesn't like playing.",
    "We don't like dancing.",
    "He doesn't like singing.",
    "They don't like swimming.",
    "I don't like reading.",
    "Do you like playing?",
    "Does she like reading?",
    "Does he like singing?",
    "Do you like dancing?",
    "Do they like drawing?",
    "Do you like reading?"
]

os.makedirs('public/audio/week4', exist_ok=True)
os.makedirs('public/audio/week4_easy', exist_ok=True)

count = 0
for i, text in enumerate(sentences_adv, 1):
    synthesis_input = texttospeech.SynthesisInput(text=text)
    response = client.synthesize_speech(input=synthesis_input, voice=voice, audio_config=config)
    with open(f'public/audio/week4/grammar_ex_{i}.mp3', 'wb') as f:
        f.write(response.audio_content)
    count += 1
    print(f'✅ Advanced grammar {i}/20')

for i, text in enumerate(sentences_easy, 1):
    synthesis_input = texttospeech.SynthesisInput(text=text)
    response = client.synthesize_speech(input=synthesis_input, voice=voice, audio_config=config)
    with open(f'public/audio/week4_easy/grammar_ex_{i}.mp3', 'wb') as f:
        f.write(response.audio_content)
    count += 1
    print(f'✅ Easy grammar {i}/20')

print(f'\n🎉 Generated {count} grammar audio files!')
