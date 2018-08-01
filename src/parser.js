const parser = function (input) {
    let output = [], curr_index = 0, sentences = [];

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

    sentences.forEach((sentence) => {
        output.push(constructSentence(sentence));
    })


    function constructSentence(rawSen) {
        let result = {}
        result.content = rawSen.replace(/<rt>[^<]*?<\/rt>|\s/g, '').replace(/<[^>]*?>/g, '');
        result.words = constructWords(rawSen);

        return result;
    }

    function constructWords(rawSen) {
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

    return output;
}

export default parser;