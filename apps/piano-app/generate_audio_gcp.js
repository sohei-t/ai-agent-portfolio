import fs from 'fs';
import textToSpeech from '@google-cloud/text-to-speech';

// クライアントを作成（アプリケーションデフォルト認証を使用）
const client = new textToSpeech.TextToSpeechClient();

async function generateSpeech() {
    // テキストを読み込み
    const text = fs.readFileSync('audio_script.txt', 'utf-8');

    // リクエストを構築
    const request = {
        input: { text: text },
        voice: {
            languageCode: 'ja-JP',
            name: 'ja-JP-Neural2-D',  // 男性の自然な声
            ssmlGender: 'MALE'
        },
        audioConfig: {
            audioEncoding: 'MP3',
            speakingRate: 1.0,
            pitch: 0.0,
            effectsProfileId: ['headphone-class-device']
        },
    };

    // API呼び出し
    const [response] = await client.synthesizeSpeech(request);

    // 音声ファイルを保存
    fs.writeFileSync('explanation.mp3', response.audioContent, 'binary');
    console.log('✅ 音声ファイルを生成しました: explanation.mp3');
}

generateSpeech().catch(console.error);
