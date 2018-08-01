import Vue from 'vue';
import data from './data'
import parser from './parser'
import speaker from './speaker'

const vue = new Vue({
    el: '#app',
    template: '#template',
    data: {
        title: parser(data.title),
        content: parser(data.content),
    },
    methods: {
        toggle(index) {
            if (speaker.isSpeaking()){
                console.log('speaking');

                if(speaker.isPaused()){
                    console.log('resume');
                    speaker.resume();
                } else {
                    console.log('pause');
                    speaker.pause();
                }
            } else {
                console.log('speak');
                speaker.speak(index === -1 ? this.title[0].content : this.content[index][content]);
            }
        }
    }
});

// let output = parser(input);
// contentBuilder(output, '.content');

// // const titleBuilder = function(title){
// //     let data = parser(title);
// //     document.title = data[0].content;
// //     document.querySelector('.title').innerHTML = data[0].content;
// // }

// // titleBuilder(title);

// document.querySelector('.content').addEventListener('click', function (event) {
//     let target = event.target.closest('.sentences');
//     if (target) {
//         voice.play(output[target.id].content);
//         target.classList.add('speaking');
//     }
// })


// let playIndex = 0;
// document.querySelector('.play_all').addEventListener('click', function (event) {
//     playIndex = 0;
//     playAll()
// })

// function playAll() {
//     voice.play(output[playIndex].content);
//     voice.onend(function () {
//         if (playIndex < output.length - 1) {
//             setTimeout(() => {
//                 playAll()
//             }, 500);
//         }
//         playIndex++
//     })

// }