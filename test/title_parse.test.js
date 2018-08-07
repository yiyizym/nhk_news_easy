const { parseTitle } = require('../src/js/parser')

const rawHtml = '<h1 class="article-main__title"> 「<ruby>熱中症<rt>ねっちゅうしょう</rt></ruby>にならないように」<ruby>梅干<rt>うめぼ</rt></ruby>しの<ruby>注文<rt>ちゅうもん</rt></ruby>が<ruby>増<rt>ふ</rt></ruby>える </h1>'

var result = parseTitle(rawHtml)
console.log(result);
