import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Swiper, ScrollView } from '@tarojs/components'

// import './index.scss'
import '../../style/components/ldSwiperTabs/index.scss'
import classnames from 'classnames'

export default class LdSwiperTabs extends Component {
  state = {
    activeIndex: 0,
    scrollBarStyle: { background: '#009C9C' }, // 横条样式
    scrollLeft: 0, // 滚动条移动距离
    sysScreenWidth: 0, // 可视屏幕宽度
    initTabItemList: [] // 初始化
  }

  async componentDidMount() {
    const { scrollBarClass } = this.props
    let scrollBarStyle = {}
    await this.initTabItemList()
    const sysInfo = Taro.getSystemInfoSync()
    if (scrollBarClass) {
      scrollBarStyle = Object.assign({}, scrollBarClass)
    }
    this.setState({ sysScreenWidth: sysInfo.screenWidth, scrollBarStyle })
  }

  async initTabItemList() {
    const { scrollBarStyle } = this.state
    const initTabItemList = await this.getViewClassLoaction()
    this.setState({ initTabItemList })
    if (initTabItemList.length === 0) {
      setTimeout(async() => {
        await this.initTabItemList()
      }, 200)
      return
    }
    // 设置第一个tab-item下方的横条的样式
    this.setState({
      scrollBarStyle:
     Object.assign({}, this.state.scrollBarStyle, {
      left: initTabItemList[0].left + 'px', width: initTabItemList[0].width + 'px', background: scrollBarStyle.background
      })
    })
  }

  getActiveViewLoaction(current) {
    return new Promise((resolve, reject) => {
      Taro.createSelectorQuery().select('#item' + current).boundingClientRect(rec => {
        if (rec) {
          resolve(rec)
        } else {
          reject('获取不到Id', `'item'${current}`)
        }
      }).exec()
    })
  }

  getViewClassLoaction() {
    return new Promise((resolve, reject) => {
      Taro.createSelectorQuery().selectAll('.tab-item').boundingClientRect(rec => {
        if (rec) {
          resolve(rec)
        } else {
          reject('获取不到元素')
        }
      }).exec()
    })
  }

  async handleChange(e) {
    const { onSwiperChange } = this.props
    const { sysScreenWidth, initTabItemList, scrollBarStyle } = this.state
    const { detail: { current }} = e
    const elementRec = await this.getActiveViewLoaction(current)
    const scrollLeft = (initTabItemList[current].left + elementRec.width / 2) - sysScreenWidth / 2 // 获取滚动条移动的距离
    const scrollBarClass = Object.assign({}, scrollBarStyle, { left: initTabItemList[current].left + 'px', width: (elementRec.width) + 'px', background: scrollBarStyle.background })  // 设置横条的宽度 和 移动的距离
    this.setState({ scrollBarStyle: scrollBarClass, scrollLeft, activeIndex: current })
    onSwiperChange && onSwiperChange()
  }

  async tabItemClick(index, e) {
    this.setState({ activeIndex: index })
    const { onTabClick } = this.props
    onTabClick && onTabClick()
  }

  render() {
    const { activeIndex, scrollBarStyle, scrollLeft } = this.state
    const {
      tabList = ['全部'],
      tabClass = {},
      tabActiveClass = {},
      showScrollBar = true,
      swiperCircular = false,
      swiperClass = { 'backgroundColor': 'green' },
      scrollViewClass = {}
    } = this.props
    return (
      <View className='ld-tabs'>
        <ScrollView
          scrollAnchoring={true}
          scrollWithAnimation
          scrollLeft={scrollLeft}
          scrollX
          className='tabs'
          style={scrollViewClass}
        >
          {
            tabList.map((item, index) => {
              return (
                <View
                  key={index}
                  id={'item' + index}
                  style={`${activeIndex === index ? tabActiveClass : tabClass}`}
                  className={classnames('tab-item', activeIndex === index && 'tab-active')}
                  onClick={this.tabItemClick.bind(this, index)}
                >
                  {item}
                </View>
              )
            })
          }
          { showScrollBar && <View className='scroll-bar' style={scrollBarStyle}></View> }
        </ScrollView>
        <Swiper
          className='tab-swiper'
          style={swiperClass}
          circular={swiperCircular}
          current={activeIndex}
          onChange={this.handleChange.bind(this)}
        >
          { this.props.children }
        </Swiper>

      </View>
    )
  }
}

// export default LdSwiperTabs
