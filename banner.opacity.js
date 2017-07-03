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
var $wrap=$('.wrap');
var $boxInner=$wrap.find('.boxInner');
var $aImg=null;
var $ul=$wrap.find('ul');
var $left=$wrap.find('.left');
var $right=$wrap.find('.right');
var $aLi=null;
var data=null;
var n=0;//n决定让第几张图片显示
//1:获取数据
getData();
function getData(){
    $.ajax({
        url:'data.txt',
        type:'get',
        async:false,//同步
        dataType:'json',
        success:function(val){
            data=val;
        }
    })
}
//2:绑定数据
bind();
function bind(){
    var strImg="";
    var strLi="";
    $.each(data,function (index, item) {
        strImg+="<img src='' imgSrc='"+item.imgSrc+"' alt='"+item.desc+"'>";
        strLi+=index==0?"<li class='active'></li>":"<li></li>";
        $boxInner.html(strImg);
        $ul.html(strLi);
        $aImg=$boxInner.children('img');//jquery中没有DOM映射，所以得重新获取
        $aLi=$ul.children('li');
    })
}
//3：延迟加载
lazyImg();
function lazyImg(){
    $aImg.each(function (index, item) {
        var img=document.createElement("img");
        img.src=item.getAttribute("imgSrc");
        img.onload=function () {
            item.src=this.src;
            img=null;
            $aImg.first().stop().fadeIn(2000).css({zIndex:1});
        }
    })
}
//4：图片自动轮播
clearInterval(timer);
var timer=setInterval(autoMove,4000);
function autoMove(){
    n++;
    n%=$aImg.length;
    $aImg.eq(n).css("zIndex",1).fadeIn(2000).siblings().css("zIndex",0).fadeOut(2000);
}
//5：焦点自动轮播
function bannerTip(){
    //让当前索引为n的按钮点亮，同时让他的兄弟元素都变灭；
    $aLi.eq(n).addClass('active').siblings().removeClass('active');
}
//6：鼠标移入停止，移出继续运动
$wrap.mouseover(function(){
    $left.show();
    $right.show();
    clearInterval(timer);
}).mouseout(function(){
    $left.hide();
    $right.hide();
    timer=setInterval(autoMove,2000);
});
//7：点击焦点手动切换
$aLi.click(function(){
    n=$(this).index();
    setBanner();
});
//8：点击左右按钮手动切换
$right.click(function(){
    autoMove();
});
$left.click(function(){
    n--;
    n=n%$aImg.length;
    setBanner();
});
