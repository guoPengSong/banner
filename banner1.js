/**
 *　　　　　　　　┏┓　　　┏┓+ +
 *　　　　　　　┏┛┻━━━┛┻┓ + +
 *　　　　　　　┃　　　　　　　┃ 　
 *　　　　　　　┃　　　━　　　┃ ++ + + +
 *　　　　　　 ████━████ ┃+
 *　　　　　　　┃　　　　　　　┃ +
 *　　　　　　　┃　　　┻　　　┃
 *　　　　　　　┃　　　　　　　┃ + +
 *　　　　　　　┗━┓　　　┏━┛
 *　　　　　　　　　┃　　　┃　　　　　　　　　　　
 *　　　　　　　　　┃　　　┃ + + + +
 *　　　　　　　　　┃　　　┃　　　　Code is far away from bug with the animal protecting　　　　　　　
 *　　　　　　　　　┃　　　┃ + 　　　　神兽保佑,代码无bug　　
 *　　　　　　　　　┃　　　┃
 *　　　　　　　　　┃　　　┃　　+　　　　　　　　　
 *　　　　　　　　　┃　 　　┗━━━┓ + +
 *　　　　　　　　　┃ 　　　　　　　┣┓
 *　　　　　　　　　┃ 　　　　　　　┏┛
 *　　　　　　　　　┗┓┓┏━┳┓┏┛ + + + +
 *　　　　　　　　　　┃┫┫　┃┫┫
 *　　　　　　　　　　┗┻┛　┗┻┛+ + + +
 */
//1、获取元素
var oWrap=document.getElementsByTagName("div")[0];
var boxInner=oWrap.getElementsByTagName("div")[0];
var aImg=boxInner.getElementsByTagName("img");
var aBtn=oWrap.getElementsByTagName('li');
var oLeft=utils.getByClass('left')[0];
var oRight=utils.getByClass('right')[0];
var n=0;
var data;
//2、获取数据
function getData() {
    var xhr=new XMLHttpRequest();
    xhr.open("GET","data.txt");
    xhr.onreadystatechange=function () {
        if(xhr.readyState==4 && /^2\d{2}$/.test(xhr.status)){
            data=utils.jsonParse(xhr.responseText);
            bindData();
        }
    };
    xhr.send();
}
getData();

//绑定数据
function bindData() {
    for(var i=0;i<data.length;i++){
        var img=document.createElement("img");
        var li=document.createElement("li");
        if (i===0){
            li.className="active";
        }
        var oUl=oWrap.getElementsByTagName("ul")[0];
        img.imgSrc=data[i].imgSrc;
        img.alt=data[i].desc;
        boxInner.appendChild(img);
        oUl.appendChild(li);
    }
    img=document.createElement("img");
    img.imgSrc=data[0].imgSrc;
    img.alt=data[0].desc;
    boxInner.appendChild(img);
    boxInner.style.width=1000*aImg.length+"px";
    lazyImg();
    handleChange();
}

//图片延迟加载
function lazyImg() {
    for(var i=0;i<aImg.length;i++){
        (function (i) {
            var oImg=document.createElement("img");
            oImg.src=aImg[i].imgSrc;
            oImg.onload=function () {
                aImg[i].src=this.src;
            };
        })(i);
    }
};

//5、图片自动轮播
function autoMove() {
    if(n>=aImg.length-1){
        n=0;
        utils.css(boxInner,{left:n*-1000});
    }
    n++;
    animate({
        ele:boxInner,
        target:{
            left:-n*1000
        }
    });
    bannerTip();
}
var timer=setInterval(autoMove,3000);

//6、焦点自动轮播
function bannerTip() {
    var index=n>=aBtn.length?0:n;
    for(var i=0;i<aBtn.length;i++){
        aBtn[i].className=i==index?"active":null;
    }
}

//7:鼠标移入停止，移除继续
oWrap.onmouseover=function(){
    clearInterval(timer);
    oLeft.style.display=oRight.style.display='block';
};
oWrap.onmouseout=function(){
    clearInterval(timer);
    timer=setInterval(autoMove,2000);
    oLeft.style.display=oRight.style.display='none';
};

//8:点击焦点手动切换
function handleChange(){
    for(var i=0;i<aBtn.length;i++){
        (function (i) {
            aBtn[i].onclick=function () {
                n=i;
                animate({
                    ele:boxInner,
                    target:{
                        left:-n*1000
                    }
                });
                bannerTip();
            }
        })(i);
    }
}

//9:点击左右按钮进行切换
oRight.onclick=autoMove;
oLeft.onclick=function(){
    if(n<=0){
        n=aImg.length-1;
        utils.css(oBoxInner,{left:-n*1000});
    }
    n--;
    animate({
        ele:oBoxInner,
        target:{
            left:-n*1000
        },
        effect:2
    });
    bannerTip();
};