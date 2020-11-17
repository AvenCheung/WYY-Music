// pages/music/music.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        item: 0,
        tab: 0,
        playlist: [{
            id: 0,
            title: '起风了',
            singer: '买辣椒也用券',
            src: 'http://music.163.com/song/media/outer/url?id=1330348068.mp3',
            coverImgUrl: '/images/cover1.jpg'
        }, {
            id: 1,
            title: '野狼disco',
            singer: '宝石gem',
            src: 'http://music.163.com/song/media/outer/url?id=1357785909.mp3',
            coverImgUrl: '/images/cover4.jpg'
        }, {
            id: 2,
            title: '可不可以',
            singer: '张紫豪',
            src: 'http://music.163.com/song/media/outer/url?id=553755659.mp3',
            coverImgUrl: '/images/cover2.jpg'
        }, {
            id: 3,
            title: '我好想你',
            singer: '苏打绿',
            src: 'http://music.163.com/song/media/outer/url?id=26524510.mp3',
            coverImgUrl: '/images/cover3.jpg'
        }],
        //记录音乐的播放状态，播放位置
        state: 'paused',
        playIndex: 0,
        play: {
            currentTime: '00:00',
            duration: '00:00',
            percent: 0,
            title: '',
            singer: '',
            coverImgUrl: '/images/cover.jpg',
        },
        //swiperImg:['/images/baner.jpg','/images/baner.jpg','/images/baner.jpg']
    },

    /**
     * 实现音乐播放功能
     */
    audioCtx: null,
    onReady: function() {
        this.audioCtx = wx.createInnerAudioContext()
            //默认选择第一首
        this.setMusic(0)

    },
    setMusic: function(index) {
        var music = this.data.playlist[index]
        this.audioCtx.src = music.src
            // this.audioCtx.play()
        this.setData({
            playIndex: index,
            'play.title': music.title,
            'play.singer': music.singer,
            'play.coverImgUrl': music.coverImgUrl,
            'play.currentTime': '00:00',
            'play.duration': '00:00',
            'play.percent': 0
        })

    },
    //播放事件
    play: function() {
        this.audioCtx.play()
        this.setData({
            state: 'running'
        })
    },
    //暂停事件
    pause: function() {
        this.audioCtx.pause()
        this.setData({
            state: 'paused'
        })
    },
    //下一曲
    next: function() {
        var index = this.data.playIndex >= this.data.playlist.length - 1 ?
            0 : this.data.playIndex + 1
        this.setMusic(index)
        if (this.data.state === 'running') {
            this.play()
        }
    },
    /**
     * 控制进度条的进度和时间显示
     *  
     */
    onReady: function() {
        this.audioCtx = wx.createInnerAudioContext()
        var that = this
            //播放失败检测
        this.audioCtx.onError(function() {
                console.log('播放失败：' + that.audioCtx.src)
            })
            //播放完成自动切换下一曲
        this.audioCtx.onEnded(function() {
                that.next()
            })
            //自动更新播放进度
        this.audioCtx.onPlay(function() {})
        this.audioCtx.onTimeUpdate(function() {
                that.setData({
                    'play.duration': formatTime(that.audioCtx.duration),
                    'play.currentTime': formatTime(that.audioCtx.currentTime),
                    'play.percent': that.audioCtx.currentTime / that.audioCtx.duration * 100
                })
            })
            //默认选择第1曲
        this.setMusic(0)
            //格式化时间
        function formatTime(time) {
            var minute = Math.floor(time / 60) % 60;
            var second = Math.floor(time) % 60
            return (minute < 10 ? '0' + minute : minute) + ':' + (second < 10 ? '0' + second : second)
        }
    },
    /**
     * 获取用户的当前选择的进度
     */
    sliderChange: function(e) {
        var second = e.detail.value * this.audioCtx.duration / 100
        this.audioCtx.seek(second)
    },
    /**
     * 播放列表点击歌曲切换
     */
    change: function(e) {
        this.setMusic(e.currentTarget.dataset.index)
        this.play()
    },
    //点击头部列表切换页面
    changeItem: function(e) {
        this.setData({
            item: e.target.dataset.item
        })
    },
    //滑动切换页面
    changeTab: function(e) {
        this.setData({
            tab: e.detail.current
        })
    },
    //播放列表小按钮
    changePage: function(e) {
        this.setData({
            tab: e.target.dataset.page,
            item: e.target.dataset.page
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})