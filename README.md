# ld-swiper-tabs
适用于Taro小程序， swiper + scroll-view结合的容器骨架

## 因为目前这份文件只有一个组件，所以readme文档先这样书写，日后会再更新迭代

## 安装
npm install ld-swiper-tabs

## 引用
import LdSwiperTabs from 'ld-swiper-tabs' <br>
import '@~/taro-swiper-tabs/dist/style/index.scss'     tip: @~ 当前项目的node_modules的路径

## 属性列表

属性 | 类型 | 默认值 | 必填 | 说明
---- | --- | --- | --- | --- 
tabList | array | ['全部'] | 是 | tab栏内容
tabClass |  object | { color: '#4A4A4A' } | 否 | tab栏样式
tabActiveClass |  object | {} | 否 | 选中tab栏样式
scrollBarClass |  object | { height: 10px; box-shadow: 0px 1px 4px 0px rgba(0, 156, 156, 0.5);border-radius: 5px;top: 35px;z-index: -1;transition: all 0.5s; } | 是 | 滑动条样式
showScrollBar |  boolean | true | 否 | 滚动条显示
swiperClass |  object | { background: 'green' } | 否 | swiper区域样式
scrollViewClass |  object | {} | 否 | tab栏的滚动区域样式
swiperCircular |  boolean | false | 否 | swiper是否自动播放
onTabClick |  eventHandle |  | 否 | tab点击事件
onSwiperChange |  eventHandle |  | 否 | swiper change事件

## 用法说明
swiper区域内容由外部传入，注意点是需要由swiperItem包裹，如以下形式
``` 
{ tabList.map((item, index) => {
    return (
        <SwiperItem key={index} style={'height: 200px;width: 100vw'}>
            <View >{item}</View>
        </SwiperItem>
    )
    }) }
```
tab栏的宽度是全屏的


