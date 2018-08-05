var htmlparser = require("htmlparser");
var titleHandler = new htmlparser.DefaultHandler(function () { });
var titleParser = new htmlparser.Parser(titleHandler);

const parseTitle = function (input) {
  titleParser.parseComplete(input);
  let text = '', trimed;
  titleHandler.dom[0].children.slice(0).forEach(tag => {
    switch (tag.type) {
      case 'text':
        trimed = tag.data.trim()
        if (trimed != '') {
          text += trimed
        }
        break;
      case 'tag':
        if (tag.name == 'ruby') {
          text += handleRubyTag(tag)
        }
        break;
      default:
        break;
    }
  });
  return {
    text: text,
    dom: titleHandler.dom[0]
  }
}

const handleRubyTag = function (obj) {
  let result = '', trimed;
  obj.children.slice(0).forEach(tag => {
    switch (tag.type) {
      case 'text':
        trimed = tag.data.trim()
        if (trimed != '') {
          result += trimed
        }
        break;
      case 'tag':
        if (tag.name == 'rt') {
          // result += tag.children[0].data.trim();
        }
        break;
    }
  })
  return result;
}

const rawHtml = '<h1 class="article-main__title"> 「<ruby>熱中症<rt>ねっちゅうしょう</rt></ruby>にならないように」<ruby>梅干<rt>うめぼ</rt></ruby>しの<ruby>注文<rt>ちゅうもん</rt></ruby>が<ruby>増<rt>ふ</rt></ruby>える </h1>'

parseTitle(rawHtml)