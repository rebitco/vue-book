<template>
  <div id="map-container" style="width: 100%;height: 450px;margin: 80px 0;"></div>
</template>

<script>
export default {
  name: 'map',
  mounted () {
    this.initMap()
  },
  data () {
    return {
      AMapUI: null,
      AMap: null
    }
  },
  methods: {
    initMap: function () {
      let AMapUI = this.AMapUI = window.AMapUI
      let AMap = this.AMap = window.AMap
      let aMap = new AMap.Map('map-container', {
        resizeEnable: true,
        zoom: 12,
        mapStyle: 'amap://styles/whitesmoke'
      })
      aMap.setCity('东莞市')
      aMap.plugin('AMap.BezierCurveEditor', function () { // 异步加载插件
        let path = [// 每个弧线段有两种描述方式
          [113.690966, 23.035511], // 起点
          // 第一段弧线
          [113.690966, 23.035511, 113.689816, 23.0403], // 控制点，途经点
          // 第二段弧线
          [113.701889, 23.021143, 113.71425, 23.005709], // 控制点，途经点//弧线段有两种描述方式1
          // 第三段弧线
          [// 弧线段有两种描述方式2
            [113.720574, 23.000652], // 控制点
            [113.732504, 22.995064], // 控制点
            [113.724024, 22.969777]// 途经点
          ],
          // 第四段弧线
          [113.737534, 22.969112, 113.751619, 22.975367, 113.760531, 22.968446]
          // 控制点，控制点，途经点，每段最多两个控制点
        ]

        let path2 = [// 每个弧线段有两种描述方式
          [116.690966, 29.035511], // 起点
          // 第一段弧线
          [116.690966, 29.035511, 116.689816, 29.0403], // 控制点，途经点
          // 第二段弧线
          [116.701889, 29.021143, 116.71425, 29.005709], // 控制点，途经点//弧线段有两种描述方式1
          // 第三段弧线
          [// 弧线段有两种描述方式2
            [116.720574, 29.000652], // 控制点
            [116.732504, 28.995064], // 控制点
            [116.724024, 28.969777]// 途经点
          ],
          // 第四段弧线
          [114.737534, 23.969112, 114.751619, 23.975367, 114.760531, 23.968446]
          // 控制点，控制点，途经点，每段最多两个控制点
        ]

        let bezierCurve = new AMap.BezierCurve({
          path: path,
          isOutline: true,
          outlineColor: '#4395E2',
          borderWeight: 3,
          strokeColor: '#74B1EA',
          strokeOpacity: 1,
          strokeWeight: 3,
          // 线样式还支持 'dashed'
          strokeStyle: 'solid',
          // strokeStyle是dashed时有效
          strokeDasharray: [10, 10],
          lineJoin: 'round',
          lineCap: 'round',
          zIndex: 50
        })

        let bezierCurve2 = new AMap.BezierCurve({
          path: path2,
          isOutline: true,
          outlineColor: '#ccc',
          borderWeight: 3,
          strokeColor: '#e64340',
          strokeOpacity: 1,
          strokeWeight: 3,
          // 线样式还支持 'dashed'
          strokeStyle: 'solid',
          // strokeStyle是dashed时有效
          strokeDasharray: [10, 10],
          lineJoin: 'round',
          lineCap: 'round',
          zIndex: 50
        })

        bezierCurve.setMap(aMap)
        bezierCurve2.setMap(aMap)
        // 缩放地图到合适的视野级别
        aMap.setFitView([bezierCurve, bezierCurve2])
      })
      // var bezierCurveEditor = new AMap.BezierCurveEditor(aMap, bezierCurve)
    }
  }
}
</script>

<style scoped>

</style>
