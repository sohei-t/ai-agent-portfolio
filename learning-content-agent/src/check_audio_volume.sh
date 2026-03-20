#!/bin/bash
#
# check_audio_volume.sh - MP3ファイルの音量検証（セグメント単位検査対応 v2.0）
#
# 生成されたMP3ファイルが途中で無音にならないかをチェックする。
#
# 検査方式:
#   1. 前半/後半比較: 前半60秒と後半60秒の平均音量を比較（20dB以上の差で警告）
#   2. セグメント検査: 10秒ごとに全体をスキャンし、-50dBFS未満の無音セグメントを検出
#
# v2.0 変更点:
#   - セグメント単位の無音検出を追加（旧方式では局所的な無音を見逃していた）
#   - 旧方式: 前半/後半の平均音量のみ → 20秒程度の局所的無音を検出できなかった
#   - 新方式: 10秒ごとにスキャンし、各セグメントの音量を個別に検証
#
# 使用方法:
#   bash src/check_audio_volume.sh [content_dir]
#
# 戻り値:
#   0: 全ファイル正常
#   1: 無音問題を検出
#
# 依存関係:
#   - ffmpeg (brew install ffmpeg)
#

# 色定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# コンテンツディレクトリ
CONTENT_DIR="${1:-content}"

# 音量差の閾値（dB）- これ以上の差があると警告（前半/後半比較用）
VOLUME_DIFF_THRESHOLD=20

# 検査する区間の長さ（秒）（前半/後半比較用）
CHECK_DURATION=60

# セグメント検査の設定
SEGMENT_DURATION=10      # 10秒ごとにチェック
SILENT_THRESHOLD=-50     # -50dBFS未満は無音とみなす

echo "=============================================="
echo "🔊 MP3音量検証チェック（v2.0 セグメント検査対応）"
echo "=============================================="
echo "対象ディレクトリ: $CONTENT_DIR"
echo "前半/後半比較閾値: ${VOLUME_DIFF_THRESHOLD}dB"
echo "セグメント検査: ${SEGMENT_DURATION}秒ごと / 無音閾値: ${SILENT_THRESHOLD}dBFS"
echo ""

# ffmpegが存在するか確認
if ! command -v ffmpeg &> /dev/null; then
    echo -e "${RED}❌ ffmpegがインストールされていません${NC}"
    echo "インストール: brew install ffmpeg"
    exit 1
fi

# MP3ファイルが存在するか確認
if ! ls "$CONTENT_DIR"/*.mp3 &> /dev/null; then
    echo -e "${YELLOW}⚠️  MP3ファイルが見つかりません${NC}"
    exit 0
fi

error_count=0
warning_count=0
checked_count=0

# 音量を取得する関数（dBFS）
get_volume() {
    local file="$1"
    local start="$2"
    local duration="$3"

    # ffmpegのvolumedetectフィルターを使用
    result=$(ffmpeg -ss "$start" -t "$duration" -i "$file" -af "volumedetect" -f null /dev/null 2>&1 | \
             grep "mean_volume" | \
             sed 's/.*mean_volume: \([-0-9.]*\) dB.*/\1/')

    # 結果が空の場合は-999を返す（エラー扱い）
    if [ -z "$result" ]; then
        echo "-999"
    else
        echo "$result"
    fi
}

# 各MP3ファイルをチェック
for file in "$CONTENT_DIR"/*.mp3; do
    ((checked_count++))
    filename=$(basename "$file")
    file_has_error=false

    # ファイルの長さを取得
    duration=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$file" 2>/dev/null)

    if [ -z "$duration" ]; then
        echo -e "${YELLOW}⚠️  長さ取得失敗: $filename${NC}"
        ((warning_count++))
        continue
    fi

    # 整数に変換
    duration_int=${duration%.*}

    # 短すぎるファイルはスキップ
    if [ "$duration_int" -lt 30 ]; then
        echo "⏭️  短いファイル（${duration_int}秒）: $filename - スキップ"
        continue
    fi

    # ========================================
    # チェック1: セグメント単位の無音検出（10秒ごと）
    # ========================================
    silent_segments=""
    segment_start=0

    while [ "$segment_start" -lt "$duration_int" ]; do
        # 残り時間がセグメント長より短い場合は調整
        remaining=$((duration_int - segment_start))
        if [ "$remaining" -lt "$SEGMENT_DURATION" ]; then
            seg_len="$remaining"
        else
            seg_len="$SEGMENT_DURATION"
        fi

        # 短すぎるセグメントはスキップ（最低3秒）
        if [ "$seg_len" -lt 3 ]; then
            break
        fi

        seg_vol=$(get_volume "$file" "$segment_start" "$seg_len")

        if [ "$seg_vol" != "-999" ]; then
            # -50dBFS未満なら無音セグメント
            is_silent=$(echo "$seg_vol < $SILENT_THRESHOLD" | bc -l 2>/dev/null)
            if [ "$is_silent" = "1" ]; then
                seg_end=$((segment_start + seg_len))
                silent_segments="${silent_segments}    ${segment_start}-${seg_end}秒: ${seg_vol}dBFS\n"
            fi
        fi

        segment_start=$((segment_start + SEGMENT_DURATION))
    done

    if [ -n "$silent_segments" ]; then
        echo -e "${RED}❌ 無音セグメント検出: $filename${NC}"
        echo -e "$silent_segments"
        file_has_error=true
        ((error_count++))
    fi

    # ========================================
    # チェック2: 前半/後半の音量比較（120秒以上のファイルのみ）
    # ========================================
    if [ "$duration_int" -ge 120 ] && [ "$file_has_error" = false ]; then
        # 前半60秒の音量
        vol_start=$(get_volume "$file" "0" "$CHECK_DURATION")

        # 後半60秒の音量（終了位置から逆算）
        end_start=$((duration_int - CHECK_DURATION))
        vol_end=$(get_volume "$file" "$end_start" "$CHECK_DURATION")

        # エラーチェック
        if [ "$vol_start" == "-999" ] || [ "$vol_end" == "-999" ]; then
            echo -e "${YELLOW}⚠️  音量取得失敗: $filename${NC}"
            ((warning_count++))
            continue
        fi

        # 音量差を計算（絶対値）
        vol_diff=$(echo "scale=2; $vol_start - $vol_end" | bc)
        vol_diff_abs=$(echo "$vol_diff" | tr -d '-')

        # 判定
        if (( $(echo "$vol_diff_abs > $VOLUME_DIFF_THRESHOLD" | bc -l) )); then
            if (( $(echo "$vol_end < $vol_start - $VOLUME_DIFF_THRESHOLD" | bc -l) )); then
                echo -e "${RED}❌ 後半無音問題検出: $filename${NC}"
                echo "   前半${CHECK_DURATION}秒: ${vol_start}dB"
                echo "   後半${CHECK_DURATION}秒: ${vol_end}dB"
                echo "   差分: ${vol_diff}dB (閾値: ${VOLUME_DIFF_THRESHOLD}dB)"
                echo ""
                ((error_count++))
                file_has_error=true
            else
                echo -e "${YELLOW}⚠️  音量変化大: $filename${NC}"
                echo "   前半: ${vol_start}dB, 後半: ${vol_end}dB (差: ${vol_diff}dB)"
                ((warning_count++))
            fi
        fi
    fi

    # 問題なしの場合
    if [ "$file_has_error" = false ]; then
        echo -e "${GREEN}✅ 正常: $filename${NC} (${duration_int}秒)"
    fi
done

echo ""
echo "=============================================="
echo "📊 チェック結果"
echo "=============================================="
echo "チェックしたファイル: $checked_count 件"

if [ $error_count -eq 0 ]; then
    if [ $warning_count -eq 0 ]; then
        echo -e "${GREEN}✅ すべてのファイルで問題なし${NC}"
    else
        echo -e "${YELLOW}⚠️  警告: $warning_count 件${NC}"
    fi
    echo ""
    echo "音声ファイルは正常に生成されています。"
    exit 0
else
    echo -e "${RED}❌ 無音問題: $error_count ファイル${NC}"
    echo ""
    echo "【対処方法】"
    echo "1. 該当するMP3ファイルを削除"
    echo "2. 音声一括生成を再実行: python3 src/audio_batch_generator.py content"
    echo "   （自動リトライ機能で無音を回避）"
    echo "3. 再度このチェックを実行: bash src/check_audio_volume.sh content"
    echo "4. 問題ゼロになるまで繰り返し"
    echo ""
    echo "原因: Gemini TTS APIが非決定的に無音データを返すことがある"
    echo "詳細は CLAUDE.md の Phase 3 セクションを参照"
    exit 1
fi
