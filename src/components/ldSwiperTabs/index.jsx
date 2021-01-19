import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Swiper, SwiperItem, ScrollView } from '@tarojs/components'

import './index.scss'
import classnames from 'classnames'

export default class LdSwiperTabs extends Component {
  state = {
    activeIndex: 0,
    scrollBarStyle: {}, // 横条样式
    scrollLeft: 0, // 滚动条移动距离
    sysScreenWidth: 0, // 可视屏幕宽度
    initTabItemList: [] // 初始化
  }

  async componentDidMount() {
    await this.initTabItemList()
    const sysInfo = Taro.getSystemInfoSync()
    this.setState({ sysScreenWidth: sysInfo.screenWidth })
  }

  async initTabItemList() {
    const { scrollBarColor = '#009C9C' } = this.props
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
      {
        left: initTabItemList[0].left + 'px', width: initTabItemList[0].width + 'px', background: scrollBarColor
      }})
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
    const { scrollBarColor = '#009C9C' } = this.props
    const { sysScreenWidth, initTabItemList } = this.state
    const { detail: { current }} = e
    const elementRec = await this.getActiveViewLoaction(current)
    const scrollLeft = (initTabItemList[current].left + elementRec.width / 2) - sysScreenWidth / 2 // 获取滚动条移动的距离

    const scrollBarStyle = { left: initTabItemList[current].left + 'px', width: (elementRec.width) + 'px', background: scrollBarColor } // 设置横条的宽度 和 移动的距离
    this.setState({ scrollBarStyle, scrollLeft, activeIndex: current })
  }

  async tabItemClick(index, e) {
    this.setState({ activeIndex: index })
  }

  render() {
    const { activeIndex, scrollBarStyle, scrollLeft } = this.state
    const { paddingTop, scrollViewStyle, tabsHeight = 45 } = this.props
    const {
      tabList = ['全部'],
      tabItemColor = { color: '#4A4A4A', activeColor: '' },
      swiperStyle = { 'backgroundColor': 'green' }
    } = this.props
    return (
      <View className='ld-tabs'>
        <ScrollView
          scrollAnchoring={true}
          scrollWithAnimation
          scrollLeft={scrollLeft}
          scrollX
          className='tabs'
          style={scrollViewStyle}
        >
          {
            tabList.map((item, index) => {
              return (
                <View
                  key={index}
                  id={'item' + index}
                  style={`color: ${activeIndex === index ? tabItemColor.color : tabItemColor.activeColor}`}
                  className={classnames('tab-item', activeIndex === index && 'tab-active')}
                  onClick={this.tabItemClick.bind(this, index)}
                >
                  {item}
                </View>
              )
            })
          }
          <View className='scroll-bar' style={scrollBarStyle}></View>
        </ScrollView>
        <Swiper
          className='tab-swiper'
          style={swiperStyle}
          circular={false}
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
