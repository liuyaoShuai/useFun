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
	
	download.service
	
	import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  /**
   *Creates an instance of DownloadService.
    // * @param {Http} http http服务
    // * @memberof DownloadService
   */
  public eventEmit: any;
  constructor(private http: HttpClient) {
    this.eventEmit = new EventEmitter();
  }

  /**
  * 文件GET下载 帮助链接：https://stackoverflow.com/questions/35138424/how-do-i-download-a-file-with-angular2
  *
  * @example
  * this.downloadService.download(url, 'download.txt')
  *
  * @param url 下载文档URL方法名相同地址
  * @param fileName 下载文件名称，带后缀，默认名称"download.txt"
  * @param responseType 文件下载类型，默认类型"application/zip"
  *
  */
  download(url: string, fileName: string = 'download.zip', responseType: string = 'application/zip') {
    // 构建下载Header类型
    const headers = new HttpHeaders({
      'Content-Type': responseType,
      'Accept': responseType
    });

    return this.http.get(url, { headers: headers, responseType: 'blob' })
      .subscribe(
        blob => {
          this.downloadWithBlob(blob, fileName);
        },
        error => {
          // TODO
        }
      );
  }


  /**
 * 文件下载 支持post请求的下载
 *
 * @example
 * this.downloadService.downloadPost(url, 'download.txt', data)
 *
 * @param url 下载文档URL地址
 * @param fileName 下载文件名称，带后缀，默认名称"download.txt"
 * @param options RequestOptionsArgs
 * @param responseType 文件下载类型，默认类型"application/zip"
 * // TODO:待改进
 */
  downloadPost(url: string, fileName: string = 'download.zip', data: any,
    responseType: string = 'application/zip') {
    // 构建下载Header类型
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': responseType
    });
    return this.http.post(url, data, { headers: headers, withCredentials: true, responseType: 'blob' })
      .subscribe(
        blob => {
          this.downloadWithBlob(blob, fileName);
        },
        error => {
          // TODO
        }
      );
  }
  /**
  * 通过Bolb下载文件
  * @param blob 文件转换为Bolb数据对象
  * @param fileName 下载时保存的文件名称
  */
  downloadWithBlob(blob: Blob, fileName: string) {
    // 兼容IE和Edge
    if (window.navigator.msSaveBlob) {
      window.navigator.msSaveOrOpenBlob(blob, fileName);
      return;
    }

    // 创建URL地址
    const url = URL.createObjectURL(blob);

    const aTag = document.createElement('a');

    // 设置下载文件所需熟悉
    aTag.setAttribute('target', '_blank');
    aTag.setAttribute('style', 'display: none;');
    aTag.setAttribute('href', url);
    aTag.setAttribute('download', fileName);

    // 插入到DOM
    document.body.appendChild(aTag);

    // 触发下载操作
    aTag.click();

    // 用完后开启多线程销毁
    setTimeout(() => {
      URL.revokeObjectURL(url);
      aTag.remove();
    }, 0);

    this.eventEmit.emit(true);
  }
}

// 大文件切片 上传
 // 大文件上传函数
  uploadBigFile() {
    this.fileSize = this.files[0].size;        // 总大小
    this.shardCount = Math.ceil(this.fileSize / this.BYTES_PER_CHUNK);  // 总片数
    this.totalSlices = this.shardCount;
    this.succeed = 0;
	// （当前是第几个，当前文件大小,分片的总片数,设定的每个分片的大小）   所有大小单位均换算为bit
    let form = this.getFormDataBigFile(0, this.fileSize, this.shardCount, this.BYTES_PER_CHUNK);

    this.fileUpload(this.uploadConfig.url, form).subscribe(data => {
      this.succeed++;
      if (data.error_code === '200' && !data.data) {
        let form = this.getFormDataBigFile(this.succeed, this.fileSize, this.shardCount, this.BYTES_PER_CHUNK);
        this.fileUploadSyn(form);
      } else {
        // 异常场景  关闭上传框   弹出错误消息框
        this.completeUpload.emit(data);
      }
    }, error => {
      console.log('Error', error);
    });
  }

  // 大文件构造formdata数据
  getFormDataBigFile(i, size, shardCount, shardSize): any {
    let current = i;
    let start = i * shardSize;
    let end = Math.min(size, start + shardSize);

    // 构造一个表单，FormData是HTML5新增的
    let form = new FormData();
    // slice方法用于切出文件的一部分
    form.append('file', new File([this.files[0].slice(start, end)], this.files[0].name, { type: '', lastModified: Date.now() }));
    form.append('chunks', shardCount);
    form.append('chunk', current + 1);
    form.append('fileSize', this.files[0].size);
    for (const key of Object.keys(this.uploadConfig.reqParams)) {
      form.append(key, this.uploadConfig.reqParams[key]);
    }

    return form;
  }

  // 大文件上传函数
  fileUploadSyn(form) {
    this.fileUpload(this.uploadConfig.url, form).subscribe(data => {
      if (data.error_code === '200') {
        this.succeed++;
        // 判断上传结束
        if (data.data) {
          // 分片上传结束  触发完成上传事件
          this.completeUpload.emit(data);
          return;
        } else {
          // 分片上传未结束   递归调用
          const forms = this.getFormDataBigFile(this.succeed, this.fileSize, this.shardCount, this.BYTES_PER_CHUNK);
          this.fileUploadSyn(forms);
        }
      } else {
        // 异常场景  关闭上传框   弹出错误消息框
        this.completeUpload.emit(data);
      }
    }, error => {
      console.log('Error', error);
    }
    );
  }


// robo file.service
import { Http, ResponseContentType, Headers, RequestOptionsArgs } from '@angular/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { BaseRequestOptionsArgs } from 'ang/api';

@Injectable()
export class DownloadService {

    /**
     *Creates an instance of DownloadService.
     * @param {Http} http http服务
     * @memberof DownloadService
     */
    constructor(private http: Http) { }

    /**
    * 文件下载 帮助链接：https://stackoverflow.com/questions/35138424/how-do-i-download-a-file-with-angular2
    *
    * @example
    * const url = this.restService.makeUrl('xxx');
    * this.downloadService.download(url, 'download.txt')
    *
    * @param url 下载文档URL方法名相同地址
    * @param fileName 下载文件名称，带后缀，默认名称"download.txt"
    * @param responseType 文件下载类型，默认类型"application/zip"
    *
    */
    download(url: string, fileName: string = 'download.zip', responseType: string = 'application/zip') {
        // 构建下载Header类型
        const headers = new Headers({
            'Content-Type': responseType,
            'Accept': responseType
        });

        return this.http.get(url, { headers: headers, responseType: ResponseContentType.Blob })
            .map(response => response.blob())
            .subscribe(
                blob => {
                    this.downloadWithBlob(blob, fileName);
                },
                error => {
                    // TODO
                }
            );
    }
    /**
    * 文件下载 支持post请求的下载
    *
    * @example
    * const url = this.restService.makeUrl('xxx');
    * this.downloadService.downloadPost(url, 'download.txt', body)
    *
    * @param url 下载文档URL地址
    * @param fileName 下载文件名称，带后缀，默认名称"download.txt"
    * @param options RequestOptionsArgs
    * @param responseType 文件下载类型，默认类型"application/zip"
    * // TODO:待改进
    */
    downloadPost(url: string, fileName: string = 'download.zip', body: any,
        responseType: string = 'application/zip') {
        // 构建下载Header类型
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': responseType
        });

        const options: BaseRequestOptionsArgs = {
            timeout: 6000 * 60 * 24,
            headers: headers,
            responseType: ResponseContentType.Blob
        };

        return this.http.post(url, body, options)
            .map(response => response.blob())
            .subscribe(
                blob => {
                    this.downloadWithBlob(blob, fileName);
                },
                error => {
                    // TODO
                    console.log('download', error);
                }
            );
    }
    /**
    * 通过Bolb下载文件
    * @param blob 文件转换为Bolb数据对象
    * @param fileName 下载时保存的文件名称
    */
    downloadWithBlob(blob: Blob, fileName: string) {
        //兼容IE和Edge
        if (window.navigator.msSaveBlob) {
            window.navigator.msSaveOrOpenBlob(blob, fileName);
            return;
        }

        // 创建URL地址
        const url = URL.createObjectURL(blob);

        const aTag = document.createElement('a');

        // 设置下载文件所需熟悉
        aTag.setAttribute('target', '_blank');
        aTag.setAttribute('style', 'display: none;');
        aTag.setAttribute('href', url);
        aTag.setAttribute('download', fileName);

        // 插入到DOM
        document.body.appendChild(aTag);

        // 触发下载操作
        aTag.click();

        // 用完后开启多线程销毁
        setTimeout(() => {
            URL.revokeObjectURL(url);
            aTag.remove();
        }, /* interval */ 0);
    }
}

