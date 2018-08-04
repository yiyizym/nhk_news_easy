/**
 * 
 * @param {array} input 
 * @returns {array} [
 *  {
 *    title: {text: '', words: [{moji: '', furigana: ''}]},
 *    content: [
 *      {
 *        text: '', 
 *        words: [
 *          {moji: '', furigana: ''}
 *        ]
 *      }
 *    ]
 *  }
 * ]
 */
const parser = function (posts) {
  return posts.map(post => {
    return {
      title: handleTitle(post.title),
      content: handleContent(post.content),
    }
  })
}

const handleContent = function(input){
  let curr_index = 0, sentences = [];

  while (curr_index != -1) {
    curr_index = input.indexOf('。')
    if (curr_index != -1) {
      sentences.push(input.substring(0, curr_index + 1).trim())
      input = input.substring(curr_index + 1)
    } else {
      if (sentences.length) {
        sentences[sentences.length - 1] += input;
      } else {
        sentences[sentences.length] = input;
      }
    }
  }

  return sentences.map((sentence) => {
    return constructSentence(sentence);
  })

}

const handleTitle = function(input){
  
  return constructSentence(input);
  
}

const constructSentence = function (rawSen) {
  let result = {}
  result.text = rawSen.replace(/<rt>[^<]*?<\/rt>|\s/g, '').replace(/<[^>]*?>/g, '');
  result.words = constructWords(rawSen);

  return result;
}

const constructWords = function (rawSen) {
  let words = []

  rawSen = rawSen.replace(/(<\/[^>]*?>|^)([^<\/>]+?)(<[^>]*?>|$)/g, function (match, p1, p2, p3) {
    return `${p1}<span>${p2}</span>${p3}`;
  })

  rawSen.replace(/<span[^>]*?>(.*?)<\/span>|<ruby>(.*?)<rt>(.*?)<\/rt><\/ruby>/g, function (match, p1, p2, p3) {
    if (match.indexOf('<span') === 0) {
      words.push({
        "moji": p1.replace(/<[^>]*?>|\s/g, ''),
        "furigana": ""
      })
    } else {
      words.push({
        "moji": p2.replace(/<[^>]*?>|\s/g, ''),
        "furigana": p3.replace(/<[^>]*?>|\s/g, '')
      })
    }
    return '';
  });

  return words;

}

export default parser;