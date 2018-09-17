const build = function(obj){
  let htmlStr = '';
  obj.dom.children.slice(0).forEach(tag => {
    switch (tag.type) {
      case 'tag':
        switch (tag.name) {
          case 'ruby':
            htmlStr += handleRubyTag(tag);
            break;
          case 'img':
            //do nothing
            break;
          case 'span':
            htmlStr += handleSpanTag(tag);
            break;
          default:
            htmlStr += `<span>${tag.children.slice(0).map(handleTag).join('')}</span>`;
            break;
        }
        break;
      case 'text':
      default:
        htmlStr += tag.data
        break;
    }
  })

  return htmlStr;
}

const handleTag = function(tag) {
  switch (tag.type) {
    case 'tag':
      switch (tag.name) {
        case 'ruby':
          return handleRubyTag(tag);
        case 'img':
          //do nothing
          break;
        case 'span':
          return handleSpanTag(tag);
          break;
        default:
          return `<span>${tag.children.slice(0).map(handleTag).join('')}</span>`;
      }
      break;
    case 'text':
    default:
      return `<span>${tag.data}</span>`
  }
}

const handleRubyTag = function(obj){
  return `<ruby>${handleTag(obj.children[0])}<rt>${obj.children[1].children[0].data}</rt></ruby>`;
}

const clazzMap = {
  colorC: 'blue',
  colorN: 'green',
  colorL: 'orange'
}

const handleSpanTag = function(obj){
  let clazz = obj.attribs ? obj.attribs.class : '';
  return `<span class="${clazzMap[clazz]}">${obj.children.slice(0).map(handleTag).join('')}</span>`;;
}

module.exports = {
  build
}