            // script.js

// ---------- Elements ----------
const languageSelect = document.getElementById('languageSelect');
const inputText = document.getElementById('inputText');
const translateBtn = document.getElementById('translateBtn');
const outputText = document.getElementById('outputText');

// ---------- 100+ languages (ISO codes) ----------
const languages = {
  "af":"Afrikaans","sq":"Albanian","am":"Amharic","ar":"Arabic","hy":"Armenian",
  "az":"Azerbaijani","eu":"Basque","be":"Belarusian","bn":"Bengali","bs":"Bosnian",
  "bg":"Bulgarian","ca":"Catalan","ceb":"Cebuano","zh":"Chinese","zh-TW":"Chinese (Traditional)",
  "co":"Corsican","hr":"Croatian","cs":"Czech","da":"Danish","nl":"Dutch",
  "en":"English","eo":"Esperanto","et":"Estonian","fi":"Finnish","fr":"French",
  "fy":"Frisian","gl":"Galician","ka":"Georgian","de":"German","el":"Greek",
  "gu":"Gujarati","ht":"Haitian Creole","ha":"Hausa","haw":"Hawaiian","he":"Hebrew",
  "hi":"Hindi","hmn":"Hmong","hu":"Hungarian","is":"Icelandic","ig":"Igbo",
  "id":"Indonesian","ga":"Irish","it":"Italian","ja":"Japanese","jv":"Javanese",
  "kn":"Kannada","kk":"Kazakh","km":"Khmer","rw":"Kinyarwanda","ko":"Korean",
  "ku":"Kurdish","ky":"Kyrgyz","lo":"Lao","la":"Latin","lv":"Latvian",
  "lt":"Lithuanian","lb":"Luxembourgish","mk":"Macedonian","mg":"Malagasy","ms":"Malay",
  "ml":"Malayalam","mt":"Maltese","mi":"Maori","mr":"Marathi","mn":"Mongolian",
  "my":"Myanmar (Burmese)","ne":"Nepali","no":"Norwegian","ny":"Nyanja","or":"Odia",
  "ps":"Pashto","fa":"Persian","pl":"Polish","pt":"Portuguese","pa":"Punjabi",
  "ro":"Romanian","ru":"Russian","sm":"Samoan","gd":"Scots Gaelic","sr":"Serbian",
  "st":"Sesotho","sn":"Shona","sd":"Sindhi","si":"Sinhala","sk":"Slovak",
  "sl":"Slovenian","so":"Somali","es":"Spanish","su":"Sundanese","sw":"Swahili",
  "sv":"Swedish","tl":"Tagalog","tg":"Tajik","ta":"Tamil","tt":"Tatar",
  "te":"Telugu","th":"Thai","tr":"Turkish","tk":"Turkmen","uk":"Ukrainian",
  "ur":"Urdu","ug":"Uyghur","uz":"Uzbek","vi":"Vietnamese","cy":"Welsh",
  "xh":"Xhosa","yi":"Yiddish","yo":"Yoruba","zu":"Zulu"
};

// Populate dropdown (selected default English -> Hindi example)
function populateLanguages() {
  // Add a placeholder option
  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = 'Select target language';
  placeholder.disabled = true;
  placeholder.selected = true;
  languageSelect.appendChild(placeholder);

  for (const code in languages) {
    const opt = document.createElement('option');
    opt.value = code;
    opt.textContent = languages[code] + ` (${code})`;
    languageSelect.appendChild(opt);
  }
}
populateLanguages();

// ---------- Translate button ----------
translateBtn.addEventListener('click', async () => {
  const text = inputText.value.trim();
  const target = languageSelect.value;

  if (!text) {
    alert('Please enter text to translate.');
    return;
  }
  if (!target) {
    alert('Please select a target language.');
    return;
  }

  // Disable button while translating
  translateBtn.disabled = true;
  translateBtn.textContent = 'Translating...';

  try {
    // Change the server URL if hosted differently
    const resp = await fetch('http://localhost:5000/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: text, target })
    });

    const json = await resp.json();
    if (!resp.ok) {
      console.error(json);
      alert('Translation failed: ' + (json.error?.message || JSON.stringify(json)));
      outputText.value = '';
    } else {
      outputText.value = json.translatedText || '';
    }
  } catch (err) {
    console.error(err);
    alert('Network or server error.');
  } finally {
    translateBtn.disabled = false;
    translateBtn.textContent = 'Translate';
  }
});
