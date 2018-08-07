const build = function(obj){
  let htmlStr = '';
  obj.dom.children.slice(0).forEach(tag => {
    switch (tag.type) {
      case 'tag':
        switch (tag.name) {
          case 'ruby':
            htmlStr += handleRubyTag(tag);
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

module.exports = {
  build
}