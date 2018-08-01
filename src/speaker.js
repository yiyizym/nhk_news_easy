function buildSpeaker() {
    let speechSU = new window.SpeechSynthesisUtterance(), currentText;
    let synth = window.speechSynthesis;

    speechSU.lang = 'ja-JP';
    speechSU.rate = 0.8;


    return {
        setText: function (text) {
            speechSU.text = text
            currentText = text
        },
        speak: function (text) {
            speechSU.text = text || currentText;
            synth.speak(speechSU);
        },
        onend: function (cb) {
            speechSU.onend = cb;
        },
        isSpeaking: function(){
            return synth.speaking
        },
        isPaused: function(){
            return synth.paused
        },
        resume: function () {
            synth.resume()
        },
        pause: function(){
            synth.pause();
        }
    }
}
export default buildSpeaker();



