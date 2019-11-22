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

                      export class CacheStore {
  store = new Map();
  getCacheData(key, defaultData) {
    if (!this.store.has(key)) {
      this.store.set(key, defaultData);
    }
    return this.store.get(key);
  }
  getCacheDataByFactory(key, defaultDataFactory: () => any) {
    if (!this.store.has(key)) {
      this.store.set(key, defaultDataFactory());
    }
    return this.store.get(key);
  }
  async getAsyncCacheDataByFactory(key, defaultDataFactory: () => Promise<any>) {
    if (!this.store.has(key)) {
      this.store.set(key, await defaultDataFactory());
    }
    return this.store.get(key);
  }
  clear() {
    this.store.clear();
  }
  delete(key): boolean {
    return this.store.delete(key);
  }
  forEach(callbackfn: (value, key, map: Map<any, any>) => void, thisArg?: any) {
    this.store.forEach(callbackfn, thisArg);
  }
  get(key) {
    return this.store.get(key);
  }
  has(key): boolean {
    return this.store.has(key);
  }
  set(key, value): this {
    this.store.set(key, value);
    return this;
  }
  size(): number {
    return this.store.size;
  }
}

