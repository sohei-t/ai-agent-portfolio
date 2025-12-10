/**
 * Instrument Selector Component
 * Allows users to switch between different instrument sounds
 */
import React from 'react';
import styles from './InstrumentSelector.module.css';

// Instrument display names (Japanese and English)
const INSTRUMENT_NAMES = {
  // Traditional instruments
  piano: { en: 'Piano', ja: 'ピアノ' },
  organ: { en: 'Organ', ja: 'オルガン' },
  pipeOrgan: { en: 'Pipe Organ', ja: 'パイプオルガン' },
  strings: { en: 'Strings', ja: '弦楽器' },
  brass: { en: 'Brass', ja: '金管楽器' },
  flute: { en: 'Flute', ja: 'フルート' },
  synth: { en: 'Synth', ja: 'シンセ' },
  bells: { en: 'Bells', ja: 'ベル' },
  marimba: { en: 'Marimba', ja: 'マリンバ' },
  guitar: { en: 'Guitar', ja: 'ギター' },
  bass: { en: 'Bass', ja: 'ベース' },
  vibraphone: { en: 'Vibraphone', ja: 'ビブラフォン' },
  harpsichord: { en: 'Harpsichord', ja: 'ハープシコード' },
  // Fun animal and special sounds
  dog: { en: 'Dog', ja: '犬 🐕' },
  cat: { en: 'Cat', ja: '猫 🐈' },
  bird: { en: 'Bird', ja: '鳥 🐦' },
  cow: { en: 'Cow', ja: '牛 🐄' },
  robot: { en: 'Robot', ja: 'ロボット 🤖' },
  alien: { en: 'Alien', ja: 'エイリアン 👽' },
};

/**
 * Instrument selector component
 * @param {Object} props
 * @param {string} props.currentInstrument - Currently selected instrument
 * @param {Function} props.onInstrumentChange - Callback when instrument changes
 * @param {string[]} props.availableInstruments - List of available instruments
 * @param {string} props.theme - Current theme
 * @param {string} props.language - Display language ('en' or 'ja')
 */
export const InstrumentSelector = ({
  currentInstrument,
  onInstrumentChange,
  availableInstruments = [],
  theme = 'classic',
  language = 'ja',
}) => {
  const handleChange = React.useCallback((event) => {
    const newInstrument = event.target.value;
    if (onInstrumentChange) {
      onInstrumentChange(newInstrument);
    }
  }, [onInstrumentChange]);

  return (
    <div className={styles.instrumentSelector} data-theme={theme}>
      <label className={styles.label} htmlFor="instrument-select">
        {language === 'ja' ? '楽器' : 'Instrument'}:
      </label>
      <select
        id="instrument-select"
        className={styles.select}
        value={currentInstrument}
        onChange={handleChange}
        aria-label={language === 'ja' ? '楽器を選択' : 'Select instrument'}
      >
        {availableInstruments.map((instrument) => (
          <option key={instrument} value={instrument}>
            {INSTRUMENT_NAMES[instrument]?.[language] || instrument}
          </option>
        ))}
      </select>
      <div className={styles.instrumentIcon} data-instrument={currentInstrument}>
        {getInstrumentEmoji(currentInstrument)}
      </div>
    </div>
  );
};

/**
 * Get emoji icon for instrument
 * @param {string} instrument - Instrument name
 * @returns {string} Emoji character
 */
function getInstrumentEmoji(instrument) {
  const emojis = {
    // Traditional instruments
    piano: '🎹',
    organ: '🎹',
    pipeOrgan: '⛪',
    strings: '🎻',
    brass: '🎺',
    flute: '🎶',
    synth: '🎛️',
    bells: '🔔',
    marimba: '🥁',
    guitar: '🎸',
    bass: '🎸',
    vibraphone: '🎼',
    harpsichord: '🎹',
    // Fun sounds
    dog: '🐕',
    cat: '🐈',
    bird: '🐦',
    cow: '🐄',
    robot: '🤖',
    alien: '👽',
  };
  return emojis[instrument] || '🎵';
}