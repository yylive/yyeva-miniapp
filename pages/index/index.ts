export type AlphaDirection = 'left' | 'right'
export type VideoMode = 'AspectFill' | ''
export interface YyEvaOption {
  /** mp4地址 */
  videoUrl: string
  /** 是否循环、循环次数 */
  loop?: boolean | number
  /** 显示方式 横竖屏 */
  mode?: VideoMode
  /** 礼物播放动画帧数 */
  fps?: number
  /** 缓存视频 */
  useVideoDBCache?: boolean
  /** 静音播放、根据环境自动调整 */
  mute?: boolean
  /** 非带Key视频，适配alpha 位置 */
  alphaDirection?: AlphaDirection
  /** 根据素材传入相应的素材内容 */
  effects?: {
    [key: string]: any
  }
  /** 检查播放超时 */
  checkTimeout?: boolean
}
interface PageData extends WechatMiniprogram.Page.DataOption {
  yyEvaOption: YyEvaOption | {}
  loop: boolean
}
interface PageCustom extends WechatMiniprogram.Page.CustomOption {
  __play(): void
  __clear(): void
  __onEvaStop(): void
  __onEvaStart(): void
  __onEvaEnd(): void
  __times: number
}
Page<PageData, PageCustom>({
  __times: 0,
  data: {
    yyEvaOption: {},
    loop: true
  },
  onLoad() {
    if (this.data.loop) {
      this.__play()
    }
  },
  async __play() {
    console.log('@@@__play')
    const yyEvaOption: YyEvaOption = {
      videoUrl: 'https://lxcode.bs2cdn.yy.com/086c82a4-abc5-44b3-a6c3-e33e0b64d865.mp4',
      loop: false
    }

    this.setData({
      loop: true,
      yyEvaOption
    })
  },
  async __clear() {
    console.log('@@@__clear')
    return new Promise<void>((resolve) => {
      this.setData(
        {
          loop: false,
          yyEvaOption: {
            videoUrl: ''
          }
        },
        resolve
      )
    })
  },
  __onEvaEnd() {
    console.log('@@@__onEvaEnd, loop=', this.data.loop )
    wx.showToast({
      title: 'mp4 end',
      icon: 'none'
    })
    if (this.data.loop) {
      // this.setData(
      //   {
      //     yyEvaOption: {
      //       videoUrl: ''
      //     }
      //   },
      //   () => {
          this.__play()
      //   }
      // )
    }
  },
  __onEvaStart() {
    wx.showToast({
      title: `mp4 start(${++this.__times})`,
      icon: 'none'
    })
  },
  __onEvaStop() {
    wx.showToast({
      title: 'mp4 stop',
      icon: 'none'
    })
  }
})
