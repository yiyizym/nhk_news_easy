const htmlparser = require("htmlparser");
/**
 * 
 * @param {array} input 
 * @returns {array} [
 *  {
 *    title: {text: '', dom: dom},
 *    content: [
 *      {
 *        text: '', 
 *        dom: dom
 *      }
 *    ]
 *  }
 * ]
 */
const parse = function (posts) {
  return posts.map(post => {
    return {
      title: parseTitle(post.title),
      content: parseContent(post.content),
    }
  })
}

const handler = new htmlparser.DefaultHandler(function(){});
const parser = new htmlparser.Parser(handler);

const parseTitle = function(input){
  parser.parseComplete(input);
  let text = '', trimed;
  handler.dom[0].children.slice(0).forEach(tag => {
    switch (tag.type) {
      case 'text':
        trimed = tag.data.trim()
        if(trimed != ''){
          text += trimed
        }
        break;
      case 'tag':
        if(tag.name == 'ruby'){
          text += handleRubyTag(tag)
        }
        break;
      default:
        break;
    }
  });
  handler.dom[0].text = text;
  return handler.dom[0];
}

const handleRubyTag = function(obj){
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
        if (tag.name == 'rt'){
          // result += tag.children[0].data.trim();
        } else {
          result += handleNormalTag(tag)
        }
        break;
    }
  })
  return result;
}


const parseContent = function (input) {
  parser.parseComplete(input);
  let content = [], text;

  handler.dom[0].children.slice(0).forEach(tag => {
    switch (tag.type) {
      case 'text':
        // 这种情况只有空白节点
        break;
      case 'tag':
        if (tag.data == 'p') {
          text = handlePTag(tag)
          if (text) {
            content.push({
              text: text,
              dom: tag
            })
          }
        }
      default:
        break;
    }
  })

  return content;
}

const handleNormalTag = function (obj) {
  let result = '', trimed;
  obj.children && obj.children.slice(0).forEach(tag => {
    switch (tag.type) {
      case 'text':
        trimed = tag.data.trim()
        if (trimed != '') {
          result += trimed
        }
        break;
      case 'tag':
        if (tag.name == 'ruby') {
          result += handleRubyTag(tag);
        } else if (tag.name == 'a') {
          result += handleATag(tag);
        } else if (tag.name == 'span') {
          result += handleSpanTag(tag);
        }
        break;
    }
  })
  return result;
}

const handlePTag = handleNormalTag, handleATag = handleNormalTag, handleSpanTag = handleNormalTag;

module.exports = {
  parse,
  parseTitle,
  parseContent
};