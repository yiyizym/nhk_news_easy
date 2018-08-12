const htmlparser = require("htmlparser");
/**
 *
 * @param {array} input
 * @returns {array} [
 *  {
 *    title: {text: '', dom: dom},
 *    article: [
 *      {// 一句一句
 *          text: '',
 *          dom: dom
 *      }
 *    ]
 *  }
 * ]
 */
const parse = function (posts) {
    return posts.map(post => {
        return {
            title: parseTitle(post.title),
            article: parseArticle(post.article),
        }
    })
}

const handler = new htmlparser.DefaultHandler(function () { });
const parser = new htmlparser.Parser(handler);

const parseTitle = function (input) {
    parser.parseComplete(input);
    let text = '', trimed;
    handler.dom[0].children.slice(0).forEach(tag => {
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
    handler.dom[0].text = text;
    return handler.dom[0];
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
                } else {
                    result += handleNormalTag(tag)
                }
                break;
        }
    })
    return result;
}


const parseArticle = function (input) {
    let sentences = getSentences(input)
    let article = [], text;

    sentences.map(function(sentence){
        text = '';
        parser.parseComplete(sentence);
        handler.dom[0].children.slice(0).forEach(tag => {
            switch (tag.type) {
                case 'text':
                    if (tag.data.trim()){
                        text += tag.data.trim()
                    }
                    break;
                case 'tag':
                    if (tag.name == 'rt') {
                        //do nothing
                    } else {
                        text += handleNormalTag(tag);
                    }
                    break;
                default:
                    break;
            }
        })
        if(text){
            article.push({
                text: text,
                dom: handler.dom[0]
            })
        }
    })

    return article;
}

const getSentences = function (str) {
    let index = 0, result = [], temp = str;

    while (temp) {
        index = temp.indexOf('。') === -1 ? temp.length - 1 : temp.indexOf('。');
        result.push('<div>' + temp.substring(0, index + 1) + '</div>')
        temp = temp.slice(index + 1)
    }

    return result;
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
                } else if(tag.name == 'rt'){
                    // do nothing
                } else {
                    result += handleNormalTag(tag);
                }
                break;
            default:
        }
    })
    return result;
}

module.exports = {
    parse,
    parseTitle,
    parseArticle
};