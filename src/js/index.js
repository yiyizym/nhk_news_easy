import Vue from 'vue';
import { _axios } from './_axios';
import { parse } from './parser'
import { build } from './builder'
import speaker from './speaker'

import '../scss/index.scss'

const vue = new Vue({
    el: '#app',
    template: '#template',
    data: {
        // posts: parse(posts),
        posts: [],
        currentPost: null,
        playIndex: -1,
        isSuccessive: false,
        paused: true,
        mode: 'list'
    },
    mounted() {
        this.getPosts(1);
    },
    methods: {
        getPosts(page) {
            _axios
            .get(`/data/${page}.json`)
            .then(resp => this.posts = parse(resp));
        },
        showPost(index) {
            this.currentPost = this.posts[index];
            console.log('currentPost: ', this.currentPost);

            this.mode = 'post';
        },
        backToList() {
            this.pauseSentence();
            this.currentPost = null;
            this.playIndex = -1;
            this.paused = true;
            this.mode = 'list';
        },
        buildSentence(sentence) {
            return build(sentence);
        },
        play(index) {
            if (!this.paused) {
                this.pauseSentence();
            }
            this.speak(index);
        },
        toggleSuccessive() {
            this.isSuccessive = !this.isSuccessive;
        },
        isSpeaking(index) {
            return index === this.playIndex;
        },
        speak(index) {
            this.paused = false;
            this.playIndex = index;
            let article = this.currentPost.article;
            if (this.isSuccessive) {
                this.speakSuccessive();
            } else {
                speaker.speak(article[index].text);
            }
        },
        speakSuccessive() {
            let self = this, article = this.currentPost.article;;

            speaker.speak(article[this.playIndex].text);
            speaker.onend(function () {
                if (self.paused) {
                    // noop
                    return;
                }
                if (self.playIndex < article.length - 1) {
                    setTimeout(() => {
                        self.speakSuccessive()
                    }, 500);
                    self.playIndex++
                } else {
                    self.playIndex = 0
                    self.paused = false
                }
            })
        },
        pauseContinue() {
            if (this.paused) {
                this.speakSuccessive();
            } else {
                speaker.cancel();
            }
            this.paused = !this.paused;
        },
        pauseSentence() {
            this.paused = true
            speaker.cancel();
        }
    }
});