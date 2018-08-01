const contentBuilder = function (sentences) {
    let html = '', str, id = 0;
    sentences.forEach(sentence => {
        str = ''
        sentence.words.forEach(word => {
            if (word.furigana) {
                str += `<ruby>${word.moji}<rt>${word.furigana}</rt></ruby>`
            } else {
                str += `<span>${word.moji}</span>`
            }
        })
        html += `<p class="sentences" id=${id++}>${str}</p>`;
    })
    return html;
}