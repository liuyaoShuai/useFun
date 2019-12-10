  // 对特殊符号进行转义
  function escapeHtml(str){
	  return str.replace(/[<>"&]/g,function(match){
		  switch(match){
			  case '<':
				return '&lt';
			  case '>':
				return '&gt';
			 case '&':
				return '&amp';
			 case '\"':
				return 'quot';
		  }
	  })
  }
  
  //时间戳格式化  返回格式为 2019-04-17
  function timeFormat(){
	  var d = new Date();
	  var year = d.getFullYear();
	  var month = d.getMonth() + 1;
	  month = month < 10 ? '0'+month : month;
	  var day = d.getDate();
		day = day < 10 ? '0'+ day : day;
	   return `${daya}-${month}-${day}`;
  }
  
  // 13位时间戳转日期
var getLocalTime = function(nS) {
  //return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/,' ');
  var date = new Date(nS);
  var Y = date.getFullYear() + '/';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
  var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
  var h = date.getHours() + ':';
  var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ' ';
  //var s = date.getSeconds();
  return Y + M + D + h + m;
}


/** 
 * 获取距离今天的N天的日期  N可正可负
 * @param {Number} interval default 0  -n 表示前几天  n表示后几天
 */
function getIntervalDate(interval = 0) {
    interval = Number(interval)
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + interval);
    let year = currentDate.getFullYear();
    let month = (currentDate.getMonth() + 1) < 10 ? "0" + (currentDate.getMonth() + 1) : (currentDate.getMonth() + 1);
    let day = currentDate.getDate() < 10 ? "0" + currentDate.getDate() : currentDate.getDate();
    return year + "-" + month + "-" + day;
}

  
  //抓取页面某一类元素
  function getElement(){
	  var domList = document.getElementsByTagName('input');
	  var checkBoxList = [];
	  
	  var len = domList.length;
	  
	  while(len--){
		  if(domList[len].type == 'checkbox'){
			  checkBoxList.push(domList[len])
		  }
	  }
  }
  
  //清除字符串前后的空格   使用自带接口trim（）考虑兼容性
  function clearStrSpace(){
	  if(!String.prototype.trim){
		  String.prototype.trim = function(){
			  // %s 匹配空白字符、回车 换行 制表符 tab  空格
			  return this.replace(/^\s+/,'').replace(/\s+$/,'')
		  }
	  }
  }
  
  //判断一个字符串中出现次数最多的字符 并统计这个次数
  function countStr(str){
	  var json = {};
	  for(var i=0;i<str.length;i++){
		  if(!json[str.charAt(i)]){
			  json[str.charAt(i)] = 1;
		  }else{
			  json[str.charAt(i)]++;
		  }
	  }
	  
	  var iMax = 0;
	  var index = '';
	  for(var a in json){
		  if(json[i]>iMax){
			  iMax = json[i];
			  index = i;
		  }
	  }
	  return `出现次数最多的是:${index}出现${iMax}次`;
	};
  
  //兼容写法
  function eventFun(){
	  var event = event || window.event;
	  
	  document.documentElement.clientWidth || document.body.clientWidth
	  
	  var target = event.srcElement || event.target;
  };
  
 //数组去重
 Array.prototype.unique = function(){
	 var len = this.length,
		 newArr = []
		 flag = 1;
	 for(var i=0;i<len;i++,flag=1){
		 for(var j=0;j<i;j++){
			 if(this[i] == this[j]){
				 flag = 0; //找到相同的数字后  不执行添加数据
			 }
		 }
		 flag ? newArr.push(this[i]) :'';
	 }
	 return newArr;
 }
 
 Number.prototype.N = function(){
	 let re = 1;
	 for(let i=0;i<=this;i++){
		 re *= i;
	 }
	 return re
 };
 
 //eg   var num = 6; alert(num.N())
 
 //阻止冒泡函数
 function stopPropagation(e){
	 e = e || window.event;
	 if(e.stopPropagation){
		 e.stopPropagation()
	 }else{
		 e.cancelBubble = true;
	 }
 }
 
 //将url 参数组成一个对象集合、  eg  var url = '?name=12&age=12'
 String.prototype.urlQuertString = function(){
	 var url = this.split('?')[1].split("&"),
		  len = url.length;
		  
	 this.url = {};
	 for(var i=0;i<len;i++){
		 var cell = url[i].split('='),
			key = cell[0],
			val = cell[1];
			
			this.url[""+key+""] = val;
	 }
	 return this.url;
 }
 
 // 获取网址的get参数
var GET = function(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return (r[2]);
  return null;
}
 
 
 //traversal(document) 循环目标节点  进行你需要的操作
 function traversal(node) {
    //对node的处理
    if (node && node.nodeType === 1) {
        console.log(node.tagName);
    }
    var i = 0,
        childNodes = node.childNodes,
        item;
    for (; i < childNodes.length; i++) {
        item = childNodes[i];
        if (item.nodeType === 1) {
            //递归先序遍历子节点
            traversal(item);
        }
    }
}

//冒泡排序法
function sort(element){
	for(var i=0;i<element.length;i++){
		for(var j=0;j<element.length;j++){
			if(element[j] > element[i]){
				let middle = element[j];
				element[j] = element[j + 1];
				element[j+1] = middle;
			}
		}
	}
}


/**
 * 返回浏览器版本
 */
 
function getExplorerInfo() {
    let explorer = window.navigator.userAgent.toLowerCase();
    // ie
    if (explorer.indexOf("msie") >= 0) {
        let ver = explorer.match(/msie ([\d.]+)/)[1];
        return {
            type: "IE",
            version: ver
        };
    }
    // firefox
    else if (explorer.indexOf("firefox") >= 0) {
        let ver = explorer.match(/firefox\/([\d.]+)/)[1];
        return {
            type: "Firefox",
            version: ver
        };
    }
    // Chrome
    else if (explorer.indexOf("chrome") >= 0) {
        let ver = explorer.match(/chrome\/([\d.]+)/)[1];
        return {
            type: "Chrome",
            version: ver
        };
    }
    // Opera
    else if (explorer.indexOf("opera") >= 0) {
        let ver = explorer.match(/opera.([\d.]+)/)[1];
        return {
            type: "Opera",
            version: ver
        };
    }
    // Safari
    else if (explorer.indexOf("Safari") >= 0) {
        let ver = explorer.match(/version\/([\d.]+)/)[1];
        return {
            type: "Safari",
            version: ver
        };
    }
}

//判断浏览器类型以及版本信息  {brower:'chrome',ver:'63'}  对以上代码进行优化简写
function getBrowserInfo(){
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var re =/(msie|firefox|chrome|opera|version).*?([\d.]+)/;
    var m = ua.match(re);
    Sys.browser = m[1].replace(/version/, "'safari");
    Sys.ver = m[2];
    return Sys;
}


//原生书写ajax过程
function jsAjax(){
	
		//1.创建ajax对象
        //只兼容非ie6的浏览器，在ie6浏览器上运行会提示没有被定义
        //var oAjax = new XMLHttpRequest();//这才是ajax实际的请求
        //alert(oAjax);
        
        //ie6浏览器下按照下面方法写,但是在别的浏览器中不能用，会报错。
        //var oAjax = new ActiveXObject("Microsoft.XMLHTTP");
        //alert(oAjax);
        
        //鉴于上面出现的问题，可以采取下面的方法解决，用if判断是否为IE6浏览器
        if(window.XMLHttpRequest)//如果有XMLHttpRequest，那就是非IE6浏览器。()里面加window的原因下面会有描述。
        {
            var oAjax = new XMLHttpRequest();//创建ajax对象
        }
        else//如果没有XMLHttpRequest，那就是IE6浏览器
        {
            var oAjax = new ActiveXObject("Microsoft.XMLHTTP");//IE6浏览器创建ajax对象
        }
        
        //2.连接服务器
        //open(方法、文件名、异步传输）
        //方法：
            //传输方式是get方式还是post方式。
        //文件名
            //告诉服务器要读哪个文件
        //异步传输
            //异步：多件事一件一件的做
            //同步：多件事情一起进行
            //但是js里面的同步和异步和现实的同步异步相反。
                //同步：多件事一件一件的做
                //异步：多件事情一起进行
        //ajax天生是用来做异步的
        
        oAjax.open("GET","a.txt?t='+new Date().getTime()",true);//加上t='+new Date().getTime()"的目的是为了消除缓存，每次的t的值不一样。
        
        //3.发送请求
        oAjax.send();
        
        //4.接收返回
        //客户端和服务器端有交互的时候会调用onreadystatechange
        oAjax.onreadystatechange=function()
        {
            //oAjax.readyState  //浏览器和服务器，进行到哪一步了。
                //0->（未初始化）：还没有调用 open() 方法。
                //1->（载入）：已调用 send() 方法，正在发送请求。
                //2->载入完成）：send() 方法完成，已收到全部响应内容。
                //3->（解析）：正在解析响应内容。
                //4->（完成）：响应内容解析完成，可以在客户端调用。
            if(oAjax.readyState==4)
            {
                if(oAjax.status==200)//判断是否成功,如果是200，就代表成功
                {
                    alert("成功"+oAjax.responseText);//读取a.txt文件成功就弹出成功。后面加上oAjax.responseText会输出a.txt文本的内容
                }
                else
                {
                    alert("失败");
                }
            }
        };	
}

//上述函数简写成以下函数
function ajax(url,fnSucc)
{
    if(window.XMLHttpRequest)
        {
            var oAjax = new XMLHttpRequest();
        }
        else
        {
            var oAjax = new ActiveXObject("Microsoft.XMLHTTP");//IE6浏览器创建ajax对象
        }
        oAjax.open("GET",url,true);//把要读取的参数的传过来。
        oAjax.send();
        oAjax.onreadystatechange=function()
        {
            if(oAjax.readyState==4)
            {
                if(oAjax.status==200)
                {
                    fnSucc(oAjax.responseText);//成功的时候调用这个方法
                }
                else
                {
                    if(fnfiled)
                    {
                        fnField(oAjax.status);
                    }
                }
            }
        };
}

//各种浏览器事件代理
function addEvent(element,type,handler){
	if(element.addEventListener){
		element.addEventListener(type,handler,false);
	}else if(element.attachEvent){
		element['temp'+type+handler] = handler;
		element[type+handler] = function(){
			element['temp'+type+handler].apply(element);
		}
	}else{
		element['on'+type] = handler;
	}
}

//比较通用的事件侦听器函数
function normalEvent(){
	var eventsFun  = new Object();
	eventFun.Event = {
		readyEvent : function(fn){
			if(fn==null){
				fn = document;
			}
			var oldonload = window.onload;
			if(typeof window.onload != 'function'){
				window.onload = fn;
			} else {
				window.onload = function(){
					oldonload();
					fn();
				}
			}
		},
		
		addEvent : function(element,type,handler){
			if(element.addEventListener){
				//事件类型 需要执行的函数/是否捕捉
				element.addEventListener(type,handler,false)
			}else if(element.attachEvent){
				element.attachEvent("on"+type,function(){
					handler.call(element);
				})
			} else {
				element['on'+ type] = handler;
			}
		},
		//移除事件
		removeEvent : function(element,type,handler){
			if(element.removeEventListener){
				//事件类型 需要执行的函数/是否捕捉
				element.removeEventListener(type,handler,false)
			}else if(element.detachEvent){
				element.detachEvent("on"+type,handler);
			} else {
				element['on'+ type] = null;
			}
		},
		
		//阻止事件（主要是事件冒泡，因为IE不支持事件捕获）
		stopPropagation : function(event){
			if(event.stopPropagation){
				event.stopPropagation();
			}else{
				event.cancelBubble = true;
			}
		},
		//取消事件默认行为
		preventDefault : function(event){
			if(event.preventDefault){
				event.preventDefault();
			}else{
				event.returnValue = false;
			}
		},
		//获取事件目标
		getTarget : function(event){
			return event.target || event.srcElement;
		},
		
		//获取event对象的引用，取到事件的所有信息，确保随时能使用event
		getEvent:function(event){
			var event = event || window.event;
			if(!event){
				var c = this.getEvent.caller;
				while(c){
					event = c.arguments[0];
					if(event && Event == event.constructor){
						break;
					}
					
					c = c.caller;
				}
			}
			return event;
		}
}

// 判断数组元素是否重复
isArrRepeat(arr) {
  var _arr = arr.sort();
  console.log(_arr)
  for (var i = 0; i < _arr.length; i++) {
    if (_arr[i] === _arr[i + 1]) {
      return true;
    }
  }
  return false;
}


// 判断数据类型
function type(elem) {
  if (elem == null) {
    return elem + '';
  }
  return toString.call(elem).replace(/[\[\]]/g, '').split(' ')[1].toLowerCase();
}

// 数组对象排序  data.sort(keysrt("firstWord"));
var keysrt = function(propertyName) {
  return function(object1, object2) {
    var value1 = object1[propertyName];
    var value2 = object2[propertyName];
    if (value2 < value1) {
      return 1;
    } else if (value2 > value1) {
      return -1;
    } else {
      return 0;
    }
  }
}


/**
 * 设置样式
 * @param {HTMLElement} elem 需要设置的节点
 * @param {Object} prop      CSS属性，键值对象
 */
function setStyle(elem, prop) {
    if (!elem) {
        return false
    };
    for (let i in prop) {
        elem.style[i] = prop[i];
    }
};



/**
 * 获取鼠标光标相对于整个页面的位置
 * @return {String} 值
 */
function getX(e) {
    e = e || window.event;
    let _left = document.documentElement.scrollLeft || document.body.scrollLeft;
    return e.pageX || e.clientX + _left;
}
 
function getY(e) {
    e = e || window.event;
    let _top = document.documentElement.scrollTop || document.body.scrollTop;
    return e.pageY || e.clientY + _top;
}


/**
 * 千分位显示 常用于价格   三大框架 有过滤器可以实现
 * @param {Number} num
 */
function toThousands(num) {
    return parseFloat(num).toFixed(2).replace(/(\d{1,3})(?=(\d{3})+(?:\.))/g, "$1,");
}
console.log(toThousands(252121321.25))
 
 
/**
 * 动态加载 CSS 样式文件
 */
function LoadStyle(url) {
    try {
        document.createStyleSheet(url);
    } catch (e) {
        let cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.type = 'text/css';
        cssLink.href = url;
        let head = document.getElementsByTagName('head')[0];
        head.appendChild(cssLink);
    }
}

//针对移动设备

/**
 * 判断是否移动设备
 */
function isMobile() {
    if (typeof this._isMobile === 'boolean') {
        return this._isMobile;
    }
    let screenWidth = this.getScreenWidth();
    let fixViewPortsExperiment = rendererModel.runningExperiments.FixViewport ||
        rendererModel.runningExperiments.fixviewport;
    let fixViewPortsExperimentRunning = fixViewPortsExperiment &&
        (fixViewPortsExperiment.toLowerCase() === "new");
    if (!fixViewPortsExperiment) {
        if (!this.isAppleMobileDevice()) {
            screenWidth = screenWidth / window.devicePixelRatio;
        }
    }
    let isMobileScreenSize = screenWidth < 600;
    let isMobileUserAgent = false;
    this._isMobile = isMobileScreenSize && this.isTouchScreen();
    return this._isMobile;
}
 
 
 
/**
 * 判断是否移动设备访问
 */
function isMobileUserAgent() {
    return (/iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/i
        .test(window.navigator.userAgent.toLowerCase()));
}
 
 
/**
 * 判断是否苹果移动设备访问
 */
function isAppleMobileDevice() {
    return (/iphone|ipod|ipad|Macintosh/i.test(navigator.userAgent
        .toLowerCase()));
}
 
/**
 * 判断是否安卓移动设备访问
 */
function isAndroidMobileDevice() {
    return (/android/i.test(navigator.userAgent.toLowerCase()));
}

 
/**
 * 判断是否在安卓上的谷歌浏览器
 */
function isNewChromeOnAndroid() {
    if (isAndroidMobileDevice()) {
        let userAgent = navigator.userAgent.toLowerCase();
        if ((/chrome/i.test(userAgent))) {
            let parts = userAgent.split('chrome/');
 
            let fullVersionString = parts[1].split(" ")[0];
            let versionString = fullVersionString.split('.')[0];
            let version = parseInt(versionString);
 
            if (version >= 27) {
                return true;
            }
        }
    }
    return false;
}

/********************************************************获取document部分结构各种高度宽度*********************************************************************/
/**
 * 获取页面高度
 */
function getPageHeight() {
    let g = document,
        a = g.body,
        f = g.documentElement,
        d = g.compatMode == "BackCompat" ?
        a :
        g.documentElement;
    return Math.max(f.scrollHeight, a.scrollHeight, d.clientHeight);
}
 
/**
 * 获取页面scrollLeft
 */
function getPageScrollLeft() {
    return document.documentElement.scrollLeft || document.body.scrollLeft;
}
 
 
/**
 * 获取页面宽度
 */
function getPageWidth() {
    let g = document,
        a = g.body,
        f = g.documentElement,
        d = g.compatMode == "BackCompat" ?
        a :
        g.documentElement;
    return Math.max(f.scrollWidth, a.scrollWidth, d.clientWidth);
}
 
/**
 * 获取页面scrollTop
 */
function getPageScrollTop() {
    return document.documentElement.scrollTop || document.body.scrollTop;
}
 
/**
 * 获取页面可视高度
 */
function getPageViewHeight() {
    let d = document,
        a = d.compatMode == "BackCompat" ?
        d.body :
        d.documentElement;
    return a.clientHeight;
}
 
 
function MouseWheelHandle (obj,handle){
    let info = navigator.userAgent;
    let down = null;
    if(info.indexOf("Firefox") !=-1){
        obj.addEventListener("DOMMouseScroll",function(event){
            let ev = event ||window.event;
                if(ev.detail>0){
                    down = true;
                }else{
                    down = false;            
                }
                handle(down,ev);
                handle.apply(obj,[down,ev]);
        },false);
    }else{
        obj.onmousewheel = function(event){
            let ev = event || window.event;
            if(ev.wheelDelta >0){
                down =false;
            }else{
                down = true;
            }
            handle(down,ev);
            handle.apply(obj,[down,ev]);
            handle.call(obj,down,ev);
        }
    }
}
	
// create uuid
getUUID() {
    return 'xxxx-xxxx-xxxx-xxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}
getUUID2() {
    return 'xxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

// 经典校验
	import { ValidatorFn, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';

import { uniq, map, every, each, isEmpty } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

import { byteLength as getByteLength } from '../services/util.service';

// 判断输入框是否为空
const isEmptyInputValue = (value: any): boolean => {
  // 此处验证undefined和null两种情况
  return value == null || value.length === 0;
};

/**
 * 验证服务
 *
 * @export
 * @class RoboValidators
 */
export class RoboValidators {

  /**
   * 验证常用Url地址规则的合法性
   *
   * @static
   * @param {AbstractControl} control 所属控制器
   * @returns {(ValidationErrors|null)} 验证通过，返回null；否则，返回验证错误
   * @memberof RoboValidators
   */
  static url(control: AbstractControl): ValidationErrors | null {
    // Url正则匹配
    const URL_REGEXP = {
      // tslint:disable-next-line:max-line-length [A-Za-z][A-Za-z0-9]*(?:\.\_\-[A-Za-z0-9]+)
      // include: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm,
      include: /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+).)+([A-Za-z0-9-~\\/])+$/
    };

    if (isEmptyInputValue(control.value)) {
      return null;    // 在可选控制器下不验证
    }
    const isValid = URL_REGEXP.include.test(control.value);
    return isValid ? null : { 'url': true };
  }
  /**
   * 验证只能以https开头的Url地址规则的合法性
   *
   * @static
   * @param {AbstractControl} control 所属控制器
   * @returns {(ValidationErrors|null)} 验证通过，返回null；否则，返回验证错误
   * @memberof RoboValidators
   */
  static urlHttps(control: AbstractControl): ValidationErrors | null {
    // Url正则匹配
    const URL_REGEXP = {
      // tslint:disable-next-line:max-line-length [A-Za-z][A-Za-z0-9]*(?:\.\_\-[A-Za-z0-9]+)
      // include: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm,
      include: /^([hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+).)+([A-Za-z0-9-~\\/])+$/
    };

    if (isEmptyInputValue(control.value)) {
      return null;    // 在可选控制器下不验证
    }
    const isValid = URL_REGEXP.include.test(control.value);
    return isValid ? null : { 'urlHttps': true };
  }
  /**
   * 验证常用邮箱规则的合法性
   *
   * @static
   * @param {AbstractControl} control 所属控制器
   * @returns {(ValidationErrors|null)} 验证通过，返回null；否则，返回验证错误
   * @memberof RoboValidators
   */
  static email(control: AbstractControl): ValidationErrors | null {
    // 邮箱(Email)正则匹配
    const EMAIL_REGEXP = {
      // tslint:disable-next-line:max-line-length [A-Za-z][A-Za-z0-9]*(?:\.\_\-[A-Za-z0-9]+)
      include: /^[a-zA-Z0-9](?:[a-zA-Z0-9\._-]{0,61}[a-zA-Z0-9])?@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z](?:[a-zA-Z0-9-]{0,61}[a-zA-Z])?)+$/,
    };

    if (isEmptyInputValue(control.value)) {
      return null;    // 在可选控制器下不验证
    }
    const isValid = EMAIL_REGEXP.include.test(control.value);
    return isValid ? null : { 'email': true };
  }

  /**
   * 验证子网掩码的合法性
   *
   * @static
   * @param {AbstractControl} control 所属控制器
   * @returns {(ValidationErrors|null)} 验证通过，返回null；否则，返回验证错误
   * @memberof RoboValidators
   */
  static netmask(control: AbstractControl): ValidationErrors | null {
    // 子网掩码(Netmask)正则匹配
    const NETMASK_REGEXP = {
      // tslint:disable-next-line:max-line-length
      include: /^(((255\.){3}(255|254|252|248|240|224|192|128|0+))|((255\.){2}(255|254|252|248|240|224|192|128|0+)\.0)|((255\.)(255|254|252|248|240|224|192|128|0+)(\.0+){2})|((255|254|252|248|240|224|192|128|0+)(\.0+){3}))$/
    };

    if (isEmptyInputValue(control.value)) {
      return null;    // 在可选控制器下不验证
    }
    const isValid = NETMASK_REGEXP.include.test(control.value);
    return isValid ? null : { 'netmask': true };
  }

  /**
   * 验证移动电话的合法性
   * 国际区号：(?:\(?[0\+]\d{2,3}\)?)[\s-]? 例子：(0086)-、+353-、"(+20) "、0086- ，其中"(+20) "后面带了一个空格
   * 国内区号：(?:(?:\(0{1,3}\))?[0\d]{1,4})[\s-]  例子："010 "、010-、7778-、(0)793、(0)208、
   *
   * 电话号码：(?:[\d]{7,8}|[\d]{3,4}[\s-][\d]{3,4}) 例子：2241288、"188 810"、"0179 230"、0179-230 、017-9230 、
   *
   * 国际区号+国内区号+电话号码：(?:\(?[0\+]\d{2,3}\)?)[\s-]?(?:(?:\(0{1,3}\))?[0\d]{1,4})[\s-](?:[\d]{7,8}|[\d]{3,4}[\s-][\d]{3,4})
   *
   * 国际区号：(?:\(?[0\+]?\d{1,3}\)?)[\s-]?  例子：001-、1-、+1-、、、、、、、、、
   *
   * 国内区号：(?:0|\d{1,4})[\s-]? 例子：0、"0 "、"0-"、"626-"、""、、
   *
   * 手机号码：(?:\(?[0\+]?\d{1,3}\)?)[\s-]?(?:0|\d{1,4})[\s-]?(?:(?:13\d{9})|(?:\d{7,8}))
   *
   * @static
   * @param {AbstractControl} control 所属控制器
   * @returns {(ValidationErrors|null)} 验证通过，返回null；否则，返回验证错误
   * @memberof RoboValidators
   */
  static mobile(control: AbstractControl): ValidationErrors | null {
    // 全球电话号码校验(特殊要求移除空格、(，正常情况是可以输入空格的)
    const GLOBAL_REGEXP = {
      phone: /^(?:[0\+]\d{2,3}?)[-]?(?:(?:0{1,3})?[0\d]{1,4})[-](?:[\d]{7,8}|[\d]{3,4}[-][\d]{3,4})$/,
      mobile: /^(?:[0\+]?\d{1,3}?)[-]?(?:0|\d{1,4})[-]?(?:(?:13\d{9})|(?:\d{7,8}))$/,
      cornet: /^(?:[0\+]?\d{2,3}?)[-]?(?:\d{3,27})$/,     // 5-32位短号
    };

    if (isEmptyInputValue(control.value)) {
      return null;    // 在可选控制器下不验证
    }
    const isValid = GLOBAL_REGEXP.phone.test(control.value)
      || GLOBAL_REGEXP.mobile.test(control.value)
      || GLOBAL_REGEXP.cornet.test(control.value);
    return isValid ? null : { 'mobile': true };
  }

  /**
   * 验证文件路径合法性
   *
   * @static
   * @param {AbstractControl} control 所属控制器
   * @returns {(ValidationErrors|null)} 验证通过，返回null；否则，返回验证错误
   * @memberof RoboValidators
   */
  static filePath(control: AbstractControl): ValidationErrors | null {
    // 文件路径(filePath)正则匹配
    const FILE_PATH_REGEXP = {
      include: /^(?![\s\.])[^':\\\^\!\;\&\$\(\)\?\*\u0022<>\|]*[^'\s:\\\^\!\;\&\$\(\)\?\*\u0022<>\|]$/,
      exclude: /(\\\.)|(\/\.)/
    };

    if (isEmptyInputValue(control.value)) {
      return null;    // 在可选控制器下不验证
    }
    const isValid = FILE_PATH_REGEXP.include.test(control.value)
      && !FILE_PATH_REGEXP.exclude.test(control.value);
    return isValid ? null : { 'filePath': true };
  }

  /**
   * 验证经纬度的合法性
   * 经度范围[0,180]；纬度范围[0,90]；允许最大精度6位
   *
   * @static
   * @param {('lng' | 'lat')} [lngLatType='lng'] 经纬度类型；默认为经度
   * @returns {ValidatorFn} 经纬度验证方法
   * @memberof RoboValidators
   */
  static lngLat(lngLatType: 'lng' | 'lat' = 'lng'): ValidatorFn {
    // lNGLAT正则匹配
    const LNGLAT_REGEXP = {
      lng: /^-?((0|[1-9]\d?|1[0-7]\d)(\.\d{1,6})?|180(\.0{1,6})?)?$/,     // 经度
      lat: /^-?((0|[1-8]\d?|9)(\.\d{1,6})?|90(\.0{1,6})?)?$/,   // 纬度
    };

    return (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value)) {
        return null;    // 在可选控制器下不验证
      }

      const isLngLat = LNGLAT_REGEXP[lngLatType].test(control.value);
      return isLngLat ? null : { [lngLatType]: true };
    };
  }

  /**
   * 同时验证IPV4 IPV6 Domain合法性
   *
   *
   * @static
   * @param {AbstractControl} control 所属控制器
   * @returns {(ValidationErrors|null)} 验证通过，返回null；否则，返回验证错误
   * @memberof RoboValidators
   */
  static ipDomain(control: AbstractControl): ValidationErrors | null {
    const isValid = !(RoboValidators.ip(control) && RoboValidators.domain(control));
    return isValid ? null : { 'ipDomain': true };
  }

  /**
   * 验证DOMAIN合法性
   * 一个完整的域名，由根域、顶级域、二级、三级……域名构成，
   * 每级域名之间用点分开，每级域名由字母、数字和减号构成（第一个字母不能是减号），不区分大小写，长度不超过63
   * 对于每一级域名长度的限制是63个字符，域名总长度则不能超过253个字符。
   *
   * @static
   * @param {AbstractControl} control 所属控制器
   * @returns {(ValidationErrors|null)} 验证通过，返回null；否则，返回验证错误
   * @memberof RoboValidators
   */
  static domain(control: AbstractControl): ValidationErrors | null {
    // DOMAIN地址(domain)正则匹配
    const DOMAIN_REGEXP = {
      // 注意：完整的域名至少包括两个名字（比如google.com，由google和com构成），最后可以有一个表示根域的点
      // 标准域名：/^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}\.?$/
      include: /^[^\x00-\x2c\x3a-\x40\x5b-\x60\x7b-\x7f]+$/       // 特殊业务域名验证
    };

    const { value } = control;

    if (isEmptyInputValue(value)) {
      return null;    // 在可选控制器下不验证
    }

    // 验证域名不能超过255个字符
    const isValidLength = !RoboValidators.maxByteLength(255)(control);
    const isValid = DOMAIN_REGEXP.include.test(value);
    return isValid && isValidLength ? null : { 'domain': true };
  }

  /**
   * 同时验证IPV4 IPV6合法性
   *
   *
   * @static
   * @param {AbstractControl} control 所属控制器
   * @returns {(ValidationErrors|null)} 验证通过，返回null；否则，返回验证错误
   * @memberof RoboValidators
   */
  static ip(control: AbstractControl): ValidationErrors | null {
    const isValid = !(RoboValidators.ipv4(control) && RoboValidators.ipv6(control));
    return isValid ? null : { 'ip': true };
  }

  /**
   * 验证IPV4合法性，取值范围[1-223].[1-255].[1-255].[1-255]
   *
   * @static
   * @param {AbstractControl} control 所属控制器
   * @returns {(ValidationErrors|null)} 验证通过，返回null；否则，返回验证错误
   * @memberof RoboValidators
   */
  static ipv4(control: AbstractControl): ValidationErrors | null {
    // IPV4地址(ipv4)正则匹配
    const IPV4_REGEXP = {
      // 注意：(22[0-3]|2[01][0-9]|[01]?[0-9][0-9]?)(\.) 校验(1-223)
      // include: new RegExp('^(22[0-3]|2[01][0-9]|1\\d{2}|[1-9]\\d|[1-9])(\\.)' // 验证(1-223)
      //     + '((1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)(\\.)){2}' // 验证中间两位
      //     + '(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)$'),  // 验证末尾一位

      // tslint:disable-next-line:max-line-length
      include: /(^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$)|(^([\da-fA-F]{1,4}:){6}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^::([\da-fA-F]{1,4}:){0,4}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:):([\da-fA-F]{1,4}:){0,3}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){2}:([\da-fA-F]{1,4}:){0,2}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){3}:([\da-fA-F]{1,4}:){0,1}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){4}:((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}$|^:((:[\da-fA-F]{1,4}){1,6}|:)$|^[\da-fA-F]{1,4}:((:[\da-fA-F]{1,4}){1,5}|:)$|^([\da-fA-F]{1,4}:){2}((:[\da-fA-F]{1,4}){1,4}|:)$|^([\da-fA-F]{1,4}:){3}((:[\da-fA-F]{1,4}){1,3}|:)$|^([\da-fA-F]{1,4}:){4}((:[\da-fA-F]{1,4}){1,2}|:)$|^([\da-fA-F]{1,4}:){5}:([\da-fA-F]{1,4})?$|^([\da-fA-F]{1,4}:){6}:$)/,
      loopBackAddr: /^127/, // 环回地址
      fullZeroIp: /^0.0.0.0$/ // 全0 地址
    };

    if (isEmptyInputValue(control.value)) {
      return null;    // 在可选控制器下不验证
    }

    const isValid = IPV4_REGEXP.include.test(control.value);
    return isValid ? null : { 'ipv4': true };
  }

  /**
   * 验证IPV6合法性
   *
   * Note that these are all the same address:
   *
   *  fe80:0000:0000:0000:0204:61ff:fe9d:f156 // full form of IPv6
   *  fe80:0:0:0:204:61ff:fe9d:f156 // drop leading zeroes
   *  fe80::204:61ff:fe9d:f156 // collapse multiple zeroes to :: in the IPv6 address
   *  fe80:0000:0000:0000:0204:61ff:254.157.241.86 // IPv4 dotted quad at the end
   *  fe80:0:0:0:0204:61ff:254.157.241.86 // drop leading zeroes, IPv4 dotted quad at the end
   *  fe80::204:61ff:254.157.241.86 // dotted quad at the end, multiple zeroes collapsed
   *
   *  In addition, the regular expression matches these IPv6 forms:
   *
   *  ::1 // localhost
   *  fe80:: // link-local prefix
   *  2001:: // global unicast prefix
   *
   * @static
   * @param {AbstractControl} control 所属控制器
   * @returns {(ValidationErrors|null)} 验证通过，返回null；否则，返回验证错误
   * @memberof RoboValidators
   */
  static ipv6(control: AbstractControl): ValidationErrors | null {
    // IPV6地址(ipv6)正则匹配
    const IPV6_REGEXP = {
      // tslint:disable-next-line:max-line-length
      include: /^((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?$/,
      loopBackAddr: /^(((0{1,4}:){1,6}|:):0{0,3}1$)|(0{1,4}:){7}0{0,3}1$/, // 环回地址
      fullZeroIp: /^(((0{1,4}:){1,6}|:):0{0,4}$)|((0{1,4}:){7}0{1,4})|(((0{1,4}:){1,6}|:):0.0.0.0)$/ // 全0 地址

    };

    if (isEmptyInputValue(control.value)) {
      return null;    // 在可选控制器下不验证
    }
    const isValid = IPV6_REGEXP.include.test(control.value);
    return isValid ? null : { ipv6: true };
  }

  /**
   * 验证Range范围合法性
   *
   * @static
   * @param {AbstractControl} control 所属控制器
   * @returns {(ValidationErrors|null)} 验证通过，返回null；否则，返回验证错误
   * @memberof RoboValidators
   */
  static range(range: number[] | string[], isDecimal: boolean = false): ValidatorFn {
    // RANGE正则匹配
    const RANGE_REGEXP = {
      integer: /^-?\d+$/,
      decimal: /^-?(\d*(\.\d{1,6})?)?$/,
    };

    return (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value)) {
        return null;    // 在可选控制器下不验证
      }
      const value = parseFloat(control.value);
      const regexpName = isDecimal ? 'decimal' : 'integer';
      const isValid = range && range.length === 2
        && !isNaN(value) && RANGE_REGEXP[regexpName].test(control.value)
        && value >= +range[0] && value <= +range[1];
      return isValid ? null : { 'range': control.value };
    };
  }

  /**
   * 验证Remote范围合法性
   *
   * @example
   * ```
   * const remoteObservable = Observable.of(['xx.com', 'yy.com']);
   *
   * RoboValidators.remote(remoteObservable.bind(this));
   * ```
   *
   * @static
   * @param {Observable<any>} remote 可观察对象
   * @param {string[default="remote"]} remoteKey 验证返回Key值，可自定义，默认为"remote"
   * @returns {(ValidationErrors|null)} 验证通过，返回null；否则，返回验证错误
   * @memberof RoboValidators
   */
  static remote(remote: Function, remoteKey: string = 'remote'): AsyncValidatorFn {
    // 异步验证
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      const value = control.value;

      const remoteOk = (resolve: any, key: string) => {
        return (result) => {
          let isValid = false;  // 默认未验证通过
          const { data, code } = result;

          if (!(code === 0 || code === '0')) {
            isValid = false;
          }

          isValid = !(data && data.isExist) || isValid;

          const validResult = isValid ? null : { [key]: true };

          resolve(validResult);
        };
      };

      return new Promise(
        resolve => (remote(value) as Observable<any>)
          .pipe(
            distinctUntilChanged(),
            debounceTime(500)   // 延迟500ms
          )
          .subscribe(remoteOk(resolve, remoteKey))
      );
    };
  }

  /**
   * 验证LessThan范围合法性
   *
   * @static
   * @param {string} lessThan 被对比的FormControl中所属的字段名称
   * @param {boolean} [isEqual=false] 是否与当前字段名的值相等
   * @returns {ValidatorFn} 返回验证函数
   * @memberof RoboValidators
   */
  static lessThan(lessThan: string, isEqual: boolean = false): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const lessThanControl = control.root.get(lessThan);

      if (isEmptyInputValue(control.value) || !lessThanControl) {
        return null;    // 在可选控制器下不验证
      }

      const { value, valid } = lessThanControl;

      const currentValue = parseFloat(control.value);
      const lessThanValue = parseFloat(value || 0);

      const isValid = !isNaN(currentValue) &&
        (isEqual ? currentValue <= lessThanValue : currentValue < lessThanValue);

      // 若对比控件验证未成功，且小于等于对比控件，才更新值及验证消息
      if (!valid && isValid) {
        lessThanControl.updateValueAndValidity({ onlySelf: true });
      }

      return isValid ? null : { 'lessThan': { 'lessThanField': lessThan, 'actual': control.value } };
    };
  }

  /**
   * 验证GreaterThan范围合法性
   *
   * @static
   * @param {string} greaterThan 被对比的FormControl中所属的字段名称
   * @param {boolean} [isEqual=false] 是否与当前字段名的值相等
   * @returns {ValidatorFn} 返回验证函数
   * @memberof RoboValidators
   */
  static greaterThan(greaterThan: string, isEqual: boolean = false): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const greaterThanControl = control.root.get(greaterThan);

      if (isEmptyInputValue(control.value) || !greaterThanControl) {
        return null;    // 在可选控制器下不验证
      }

      const { value, valid } = greaterThanControl;

      const currentValue = parseFloat(control.value);
      const greaterThanValue = parseFloat(value || 0);

      const isValid = !isNaN(currentValue) &&
        (isEqual ? currentValue >= greaterThanValue : currentValue > greaterThanValue);

      // 若对比控件验证未成功，且大于等于对比控件，才更新值及验证消息
      if (!valid && isValid) {
        greaterThanControl.updateValueAndValidity({ onlySelf: true });
      }

      return isValid ? null : { 'greaterThan': { 'greaterThanField': greaterThan, 'actual': control.value } };
    };
  }

  /**
   * 验证Equal范围合法性
   *
   * @static
   * @param equals 需要比较的form control名称
   * @returns {(ValidationErrors|null)} 验证通过，返回null；否则，返回验证错误
   * @memberof RoboValidators
   */
  static equal(...equals: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const currentValue = control.value;
      const root = control.root;

      if (isEmptyInputValue(currentValue)) {
        return null;
      }

      // 保证所有的值均不相等
      const isValid = every(equals, item => {
        const currControl = root.get(item);
        if (!currControl) {
          return true;
        }
        const { value, valid, disabled, pristine } = currControl;

        // 若控件不可用或者纯净的或者值相等，表示验证通过
        const isTempValid = disabled || pristine || currentValue === value;

        // 若对比控件验证未成功，且等于对比控件，才更新值及验证消息
        if (!valid && isTempValid) {
          currControl.updateValueAndValidity({ onlySelf: true });
        }

        return isTempValid;
      });

      return isValid ? null : { 'equal': { 'equalField': equals.join(','), 'actual': currentValue } };
    };
  }

  /**
   * 验证是否存在
   *
   * @static
   * @param notEquals 需要比较的form control名称
   * @returns {(ValidationErrors|null)} 验证通过，返回null；否则，返回验证错误
   * @memberof RoboValidators
   */
  static notEqual(...notEquals: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const currentValue = control.value;
      const root = control.root;

      if (isEmptyInputValue(currentValue)) {
        return null;
      }

      // 获取各字段的值
      const equalValues = map(notEquals, item => {
        const field = root.get(item);
        return field && field.value;
      });

      // 先进行值校验，确保字段值不会相同
      const isNotEqualValue = equalValues.length === uniq(equalValues).length;

      // 保证所有的值均不相等
      const isValid = every(notEquals, item => {
        const currControl = root.get(item);
        if (!currControl) {
          return true;
        }
        const { value, valid, disabled, pristine } = currControl;

        // 若控件不可用或者纯净且为空或者值不相等，表示验证通过
        const isTempValid = disabled || (pristine && isEmpty(value)) || currentValue !== value;

        // 若对比控件验证未成功，且不等于对比控件，才更新值及验证消息
        if (isNotEqualValue && !valid && isTempValid) {
          currControl.updateValueAndValidity({ onlySelf: true });
        }

        return isTempValid;
      });

      return isValid ? null : { 'notEqual': { 'notEqualField': notEquals.join(','), 'actual': currentValue } };
    };
  }
}
