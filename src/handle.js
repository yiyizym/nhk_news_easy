let input = '<p> <span class="colorL">ドイツ</span> では <ruby>厳<rt>きび</rt></ruby> しい <ruby>暑<rt>あつ</rt></ruby> さが <ruby>続<rt>つづ</rt></ruby> いていて、 <ruby>山<rt>やま</rt></ruby> が <ruby>火事<rt>かじ</rt></ruby> になったり、 <ruby>雨<rt>あめ</rt></ruby> が <ruby>少<rt>すく</rt></ruby> なくて <a href="javascript:void(0)" class="dicWin" id="id-0003"><ruby><span class="under">畑</span><rt>はたけ</rt></ruby></a> に <ruby>水<rt>みず</rt></ruby> が <ruby>足<rt>た</rt></ruby> りなくなったりしています。 <span class="colorL">ハノーバー</span> にある <ruby>空港<rt>くうこう</rt></ruby> では、 <a href="javascript:void(0)" class="dicWin" id="id-0004"><ruby><span class="under">滑走路</span><rt>かっそうろ</rt></ruby></a> の <a href="javascript:void(0)" class="dicWin" id="id-0005"><ruby><span class="under">表面</span><rt>ひょうめん</rt></ruby></a> が <a href="javascript:void(0)" class="dicWin" id="id-0006"><span class="under">はがれ</span></a> て、しばらく <ruby>空港<rt>くうこう</rt></ruby> を <ruby>使<rt>つか</rt></ruby> うことができなくなりました。 </p>';

const parser = function(input){
    let output = [], curr_index = 0, sentences = [];

    while(curr_index != -1){
        curr_index = input.indexOf('。')
        if(curr_index != -1){
            sentences.push(input.substring(0, curr_index + 1).trim())
            input = input.substring(curr_index + 1)
        } else {
            sentences[sentences.length - 1] += input;
        }
    }

    sentences.forEach((sentence) => {
        output.push(constructSentence(sentence));
    })


    function constructSentence(rawSen){
        let result = {}
        result.content = rawSen.replace(/<rt>[^<]*?<\/rt>|\s/g, '').replace(/<[^>]*?>/g, '');
        result.words = constructWords(rawSen);

        return result;
    }

    function constructWords(rawSen){
        let words = []

        rawSen = rawSen.replace(/(<\/[^>]*?>|^)([^<\/>]+?)(<[^>]*?>|$)/g, function(match, p1, p2, p3){
            return `${p1}<span>${p2}</span>${p3}`;
        })

        rawSen.replace(/<span[^>]*?>(.*?)<\/span>|<ruby>(.*?)<rt>(.*?)<\/rt><\/ruby>/g, function(match, p1, p2, p3){
            if(match.indexOf('<span') === 0){
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

const builder = function(sentences){
    let html = '', str;
    sentences.forEach(sentence => {
        str= ''
        sentence.words.forEach(word => {
            if(word.furigana){
                str += `<ruby>${word.moji}<rt>${word.furigana}</rt></ruby>`
            } else {
                str += `<span>${word.moji}</span>`
            }
        })
        html += `<p>${str}</p>`;
    })

    return html;
}

const data = parser(input);
console.log(builder(data));


