

//针对所有checkbox和radio进行统一优化

$compileProvider.directive('ngIcheck', function($compile) {
  return {
    restrict : 'A',
    require : '?ngModel',
    link : function($scope, $element, $attrs, $ngModel) {
      if (!$ngModel) {
        return;
      }
      //using iCheck
      $($element).iCheck({
        labelHover : false,
        cursor : true,
        checkboxClass : 'icheckbox_square-blue',
        radioClass : 'iradio_square-blue',
        increaseArea : '20%'
      }).on('ifClicked', function(event) {
        if ($attrs.type == "checkbox") {
          //checkbox, $ViewValue = true/false/undefined
          $scope.$apply(function() {
            $ngModel.$setViewValue(!($ngModel.$modelValue == undefined ? false : $ngModel.$modelValue));
          });
        } else {
          // radio, $ViewValue = $attrs.value
          $scope.$apply(function() {
            $ngModel.$setViewValue($attrs.value);
          });
        }
      });
    },
  };
});


//angular 表单实例

<div ng-app="myApp" ng-controller="formCtrl">
  <form novalidate>
    First Name:<br>
    <input type="text" ng-model="user.firstName"><br>
    Last Name:<br>
    <input type="text" ng-model="user.lastName">
    <br><br>
    <button ng-click="reset()">RESET</button>
  </form>
  <p>form = {{user}}</p>
  <p>master = {{master}}</p>
</div>
 
<script>
var app = angular.module('myApp', []);
app.controller('formCtrl', function($scope) {
    $scope.master = {firstName: "John", lastName: "Doe"};
    $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
    };
    $scope.reset();
});
</script>


//书本实例
window.onload = preparenLinks ;
	function preparenLinks(){
		var links = document.getElementsByTagName('a');
			for(var m=0;m<links.length;m++){
				if(links[m].getAttribute('class') == 'popup')
					{
						popUp(this.getAttribyte('href'));
						return false;
					}
			}
}

function prepareGallery(){
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById('imagegallery')) return false;
	
	var gallery = document.getElementById('imagegallery');
	var links = gallery.getElementByTagName('a');
	for(var m=0;m<links.length;m++){
		links[m].onclick = function(){
			
			showPic(this);
			return false;
		}
	}
}

//共享onload事件

function addLoadEvent(func){
	
	var onload = window.onload;
	if(type of window.onload != 'function'){
		
		window.onload = func;
		
	}else{

		window.onload = function(){
			oldonload();
			func();
		}
	
	}
	
}

utile.service.ts

import { Injectable } from '@angular/core';

import { isString, each, findIndex, isUndefined, isNull, isArray, uniqueId} from 'lodash';

import { UnitConsts, CommonConsts } from '../constants';

import { MsgBoxService, I18NService } from 'ang/api';


declare function unescape(s: string): string;

/**
* 获取字符串字节长度
* @param {string} text 待计算字节长度的字符串
* @returns {number} 字符串字节长度
* @memberof UtilService
*/
export function byteLength(text: string): number {
    if (!text) {
        return 0;
    }
    return unescape(encodeURIComponent(text)).length;
}

@Injectable()
export class UtilService {
    /**
     * Creates an instance of UtilService.
     * @memberof UtilService
     */
    constructor(private msgBox: MsgBoxService, private i18n: I18NService) { }

    /**
     * 序列化
     *
     * @param {*} obj 被序列化的对象
     * @returns {string} 被序列化的对象的字符串
     * @memberof UtilService
     */
    serialize(obj: any): string {
        if (isString(obj)) {
            return obj;
        }
        return JSON.stringify(obj);
    }

    /**
     * 反序列化
     *
     * @param {string} val 反序列化的值
     * @param {*} [defaultVal=''] 默认值为空
     * @returns {*} 反序列化对象
     * @memberof UtilService
     */
    deserialize(val: string, defaultVal: any = ''): any {
        if (!val) { return defaultVal; }

        let parseVal = '';

        try {
            parseVal = JSON.parse(val);
        } catch (e) {
            parseVal = val;
        }

        return (parseVal !== undefined ? parseVal : defaultVal);
    }

    /**
     * 将任意类型的数据转换为boolean类型
     *
     * @param {*} value 任意类型数据
     * @returns {boolean} boolean类型
     * @memberof UtilService
     */
    toBool(value: any): boolean {
        if (isUndefined(value) || isNull(value)) {
            return false;
        }
        if (value === 0 || value === '0') {
            return false;
        }
        if (isString(value) && value.toLowerCase() === 'false') {
            return false;
        }

        return !!value;
    }

    /**
     * 格式化字符串
     *
     * @example
     *
     * // 数组形式
     * utilService.format('{ 0 }Formatter{ 1 }Array{ 2 }!', ['x', 'y', 'z'])
     *
     * // 对象形式
     * utilService.format('{ propx }Formatter{ propy }Objext{ propn }!',
     *      {prox: 'x', proy: 'y', pron: 'n'})
     *
     * @param {string} format 待格式化的字符串
     * @param {(any[]|any)} values 格式化填充值
     * @returns {string} 格式化后的字符串
     * @memberof UtilService
     */
    format(format: string, values: any[] | any): string {
        // 处理数组及对象
        each(values, (value: any, key) => {
            // 匹配“${x}”或者“{x}”
            format = format.replace(new RegExp('\\$?\\{' + key + '\\}', 'gi'), value);
        });

        return format;
    }

    /**
     * 获取字符串字节长度
     * @param {string} stringText 待计算字节长度的字符串
     * @returns {number} 字符串字节长度
     * @memberof UtilService
     */
    byteLength(stringText: string): number {
        return byteLength(stringText);
    }

    /**
     * 自适应计算容量单位
     * @param {string|number} capacityValue 待计算容量大小
     * @param {string} unit 当前单位，默认值MB
     * @returns {object} 字符串字节长度
     * @memberof UtilService
     */
    adaptUnit(capacityValue: string | number, unit: string = UnitConsts.MB) {
        const units = [UnitConsts.BYTE, UnitConsts.KB, UnitConsts.MB, UnitConsts.GB, UnitConsts.TB, UnitConsts.PB];
        const unitIndex = findIndex(units, (item) => {
            return item === unit.toUpperCase();
        });
        const returnObj = {
            value: +capacityValue,
            unit: units[unitIndex],
            label: ''
        };
        each(units, (item, index) => {
            if (index <= unitIndex) {
                return;
            }
            if (returnObj.value < 1024) {
                return;
            }
            returnObj.value = returnObj.value / 1024;
            returnObj.unit = item;
        });
        returnObj.value = +returnObj.value.toFixed(3);
        returnObj.label = `${returnObj.value} ${returnObj.unit}`; // 返回示例 “1 MB”
        return returnObj;
    }

    // 事件订阅
    subscribe(name, fn) {
        let subscriber = CommonConsts.SUBSCRIBERS.find(item => item.name == name);
        if (!subscriber) {
            subscriber = {
                name: name,
                callbacks: []
            };

            CommonConsts.SUBSCRIBERS.push(subscriber);
        }

        subscriber.callbacks.push(fn);
    }

    // 事件推送
    emit(name, ...params) {
        const subscriber = CommonConsts.SUBSCRIBERS.find(item => item.name == name);
        if (subscriber) {
            each(subscriber.callbacks, (cb: Function) => cb.apply(this, params));
        }
    }

    // 取消订阅
    unsubscribe(name) {
        const index = CommonConsts.SUBSCRIBERS.findIndex(item => item.name == name);
        CommonConsts.SUBSCRIBERS.splice(index, 1);
    }

    /**
     * 获取唯一ID
     *
     * @returns 唯一ID
     * @memberof UtilService
     */
    uniqueId() {
        return uniqueId('uniqueId_');
    }

    /**
     * 格式化时间
     *
     * @param {*} timestamp 时间戳
     * @returns 格式化后的字符串
     * @memberof UtilService
     */
    formatTime(timestamp: any) {
        if (!timestamp) {
            return CommonConsts.UNKNOW_PLACEHOLDER;
        }

        const time = new Date(+timestamp);
        const year = time.getFullYear();
        const month = time.getMonth() + 1;
        const date = time.getDate();
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();

        const timeStr = year + '-' +
            this.toTwoDigtal(month) + '-' +
            this.toTwoDigtal(date) + ' ' +
            this.toTwoDigtal(hours) + ':' +
            this.toTwoDigtal(minutes) + ':' +
            this.toTwoDigtal(seconds);

        return timeStr + ' ' + CommonConsts.TIMEZONE || this.getTimezone();
    }

    // 转换为两位数值
    private toTwoDigtal(m) {
        return m < 10 ? '0' + m : m;
    }

    // 获取时区
    getTimezone() {
        let offset = (new Date()).getTimezoneOffset();
        const symbol = offset < 0 ? '+' : '-';

        offset = Math.abs(offset);

        const hour = Math.floor(offset / 60);
        const min = offset % 60;

        return 'UTC' + symbol + this.toTwoDigtal(hour) + ':' + this.toTwoDigtal(min);
    }
    //提示暂不支持
    getMsgBoxNotSupport() {
        return this.msgBox.info(this.i18n.get('common_not_support'))
    }

    getTargetZoneTime(timestamp,timeZone?:any){
        let offset_GMT = (new Date()).getTimezoneOffset();
        let timeZoneHour = Number(timeZone.split(":")[0]);
        let timeZoneMinute = Number(timeZone.split(":")[1]);

        //获取0时区 以0时区为基准进而获取目标时区的时间戳
        let targetTime = timestamp + offset_GMT * 60 * 1000 +  timeZoneHour * 60 * 60 * 1000 + timeZoneMinute * 60 * 1000;
        return this.formatTime(targetTime)+"(UTC"+timeZone+")";
    }
}
		  
preload.guard.ts
import { Observable, of } from 'rxjs';
import { delay, flatMap } from 'rxjs/operators';
import { PreloadingStrategy, Route } from '@angular/router';

export class PreloadGuard implements PreloadingStrategy{
    preload(route:Route,load:Function): Observable<any>{
        return route.data && route.data.preload
            //延迟2s预加载
            ? of(true).pipe(delay(2000)).pipe(flatMap((_:boolean)=>load())): of(null)
    }
}

