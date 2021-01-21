import React, { Component } from 'react'
import { View, Text, SwiperItem } from '@tarojs/components'
import LdSwiperTabs from '../../components/ldSwiperTabs/index'
import './index.scss'

export default class Index extends Component {

  onTabClick() {
  }

  render () {
    const tabList = [ '全部', 'dididi', 'saiodhas' ]
    return (
      <View className='index'>
        <LdSwiperTabs tabList={tabList} onTabClick={this.onTabClick}>
        { tabList.map((item, index) => {
            return (
              <SwiperItem key={index} style={'height: 200px;width: 100vw'}>
                <View >{item}</View>
              </SwiperItem>
            )
          }) }
        </LdSwiperTabs>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
