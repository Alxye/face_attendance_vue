import * as echarts from 'echarts/core'

const options = {
  color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
  title: {
    text: '本月上班打卡情况'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: ['月签到', '月未签', '月迟到', 'Line 4', 'Line 5']
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '月签到',
      type: 'line',
      stack: '总量',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: 'rgba(128, 255, 165)'
        }, {
          offset: 1,
          color: 'rgba(1, 191, 236)'
        }])
        // color: '#80FFA5'
      },

      emphasis: {
        focus: 'series'
      },
      data: [1,11,1,5,1,1,1,1,5,1,8,1]
    },
    {
      name: '月未签',
      type: 'line',
      stack: '总量',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: 'rgba(55, 162, 255)'
        }, {
          offset: 1,
          color: 'rgba(1, 191, 236)'
        }])
      },
      emphasis: {
        focus: 'series'
      },
      data: [1,11,1,5,1,1,1,1,5,1,8,1]
    },
    {
      name: '月迟到',
      type: 'line',
      stack: '总量',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#377dff'
        }, {
          offset: 1,
          color: '#37A2FF'
        }])
      },
      emphasis: {
        focus: 'series'
      },
      data: [1,11,1,5,1,1,1,1,5,1,8,1]
    },
  ]
}
export default options