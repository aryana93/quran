// navbar
let nav = document.createElement('div');
nav.classList.add('nav');

// surah selector
let surah_select = document.createElement('select');

// placeholder for surah selector
let option = document.createElement('option');
option.setAttribute("selected", "selected");
option.setAttribute('disabled', 'disabled');
option.textContent = "Select Surah";
surah_select.appendChild(option);

// options array for option nodes
let options = [];

// options for surah selector
for (let surah in koran) {
  let option = document.createElement('option');
  option.textContent = koran[surah]['name']['ar'];
  option.value = surah;
  options.push(Option);
  surah_select.appendChild(option);
}

// saheeh checkbox
let saheeh_check = document.createElement('input');
saheeh_check.setAttribute('type', 'checkbox');
saheeh_check.checked = false;

// saheeh label
let saheeh_label = document.createElement('label');
saheeh_label.textContent = "Saheeh";
saheeh_label.classList.add('label');

saheeh_label.appendChild(saheeh_check);
nav.appendChild(surah_select);
nav.appendChild(saheeh_label);
document.body.appendChild(nav);

// english token checkbox
let english_check = document.createElement('input');
english_check.setAttribute('type', 'checkbox');
english_check.checked = true;

// english token label
let english_label = document.createElement('label');
english_label.textContent = "English";
english_label.classList.add('label');

saheeh_label.appendChild(saheeh_check);
english_label.appendChild(english_check);
nav.appendChild(surah_select);
nav.appendChild(saheeh_label);
nav.appendChild(english_label);
document.body.appendChild(nav);

// surah div
let surah_div = document.createElement('div');
surah_div.classList.add('surah');

// saheehs node array
let saheehs = [];

// english token node array
let english_tokens = [];

function generate(surah_num) {
  surah_div.innerHTML = '';

  // surah name div
  let name = document.createElement('div');
  name.classList.add('name');
  surah_div.appendChild(name);

  // surah name english
  let name_en = document.createElement('div');
  name_en.classList.add('name-en');
  if (english_check.checked) {
    name_en.classList.add('is-visible');
  } else {
    name_en.classList.add('is-hidden');
  }
  english_tokens.push(name_en);
  name.appendChild(name_en);

  // surah name arabic
  let name_ar = document.createElement('div');
  name_ar.classList.add('name-ar');
  name.appendChild(name_ar);

  // add surah name
  name_en.textContent = koran[surah_num]['name']['en'];
  name_ar.textContent = koran[surah_num]['name']['ar'];

  // verses div
  let verses = document.createElement('div');
  verses.classList.add('verses');
  surah_div.appendChild(verses);

  // verse divs
  for (let verse_num in koran[surah_num]["verses"]) {
    // verse div
    let verse = document.createElement('div');
    verse.classList.add('verse');
    verses.appendChild(verse);
    for (let token in koran[surah_num]['verses'][verse_num]['tokens']) {
      // word for tokens
      let word = document.createElement('div');
      word.classList.add('word');
      verse.appendChild(word);
      // english token
      let word_en = document.createElement('div');
      word_en.classList.add('word-en');
      word_en.textContent = koran[surah_num]['verses'][verse_num]['tokens'][token]['en'];
      if (english_check.checked) {
        word_en.classList.add('is-visible');
      } else {
        word_en.classList.add('is-hidden');
      }
      english_tokens.push(word_en);
      word.appendChild(word_en);
      // arabic token
      let word_ar = document.createElement('div');
      word_ar.classList.add('word-ar');
      word_ar.textContent = koran[surah_num]['verses'][verse_num]['tokens'][token]['ar'];
      word.appendChild(word_ar);
    }
    // saheeh div
    let saheeh = document.createElement('div');
    saheeh.classList.add('saheeh');
    saheeh.textContent = koran[surah_num]['verses'][verse_num]['saheeh'];
    if (saheeh_check.checked) {
      saheeh.classList.add('is-visible');
    } else {
      saheeh.classList.add('is-hidden');
    }
    saheehs.push(saheeh);
    verses.appendChild(saheeh);
  }
  document.body.appendChild(surah_div)
};

// reset checks
function reset_checks(checkbox) {
  checkbox.checked = 'false';
};

// surah selector event listener
surah_select.addEventListener('input', function () {
  let surah_num = this.options[this.selectedIndex].value;
  generate(surah_num);
});

saheeh_check.addEventListener('input', function () {
  if (this.checked) {
    for (let item of saheehs) {
      item.classList.remove('is-hidden');
      item.classList.add('is-visible');
    }
  } else {
    for (let item of saheehs) {
      item.classList.remove('is-visible');
      item.classList.add('is-hidden');
    }
  }
});

english_check.addEventListener('input', function () {
  if (this.checked) {
    for (let item of english_tokens) {
      item.classList.remove('is-hidden');
      item.classList.add('is-visible');
    }
  } else {
    for (let item of english_tokens) {
      item.classList.remove('is-visible');
      item.classList.add('is-hidden');
    }
  }
});

generate("1");
