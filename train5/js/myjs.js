function go_one(){
    var text1_input=document.getElementById("text1_input");
    show_words(text1_input);
}
function go_loop(){
    var status=document.getElementById("btn_go_loop");
    if(status.value=="循环发射"){
        status.value="停止循环";
    }else if(status.value=="停止循环"){
        status.value="循环发射";
    }
    var timer = setInterval(function () {
        go_one();
        if(status.value=="循环发射"){
            clearInterval(timer);
        }
    }, 1000);
}
function show_words(text){
    var words_screen=document.getElementById("words_screen");
    var words_span=document.createElement("span");
    words_span.innerText=text.value;
    //span随机样式和出现位置和存在时间
    var random_fontSize=parseInt(Math.random()*24+24);
    var random_fontColor='#'+Math.floor(Math.random()*16777215).toString(16);
    var hMax=words_screen.offsetHeight-random_fontSize;
    var hMin=words_screen.offsetTop;
    var random_height=Math.floor(Math.random()*(hMax-hMin)+hMin-10);
    var random_time=parseInt(Math.random()*10+1);
    words_span.style.fontSize=random_fontSize+"px";
    words_span.style.color=random_fontColor;
    words_span.style.marginTop=random_height+"px";
    //移动span，右边出现，左边消失
    var length=900;
    var timer = setInterval(function () {
        words_span.style.marginLeft = length + "px";
        if (length > -words_span.offsetWidth){
            length-=2;
            words_screen.appendChild(words_span);
        }
        else {
            clearInterval(timer);
            words_span.parentNode.removeChild(words_span);
        }
    }, random_time);
}