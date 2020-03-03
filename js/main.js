/*
    1.歌曲搜索接口
        请求地址：https://autumnfish.cn/search
        请求方式：get
        请求参数：keywords（查询关键词）
        响应内容：歌曲搜索结果

    2.歌曲url获取接口
        请求地址：https://autumnfish.cn/song/url
        请求方式：get
        请求参数：id(查询关键字返回的response内)
        响应内容：歌曲url地址

    3.歌曲详情获取
        请求地址：https://autumnfish.cn/song/detail
        请求方式：get
        请求参数：ids（查询关键字返回的response内）
        响应内容：歌曲详情（包括封面信息）

    4.热门评论获取
        请求地址：https://autumnfish.cn/comment/hot?type=0
        请求方式：get
        请求参数：id（歌曲id 地址中的type固定为0）
        响应内容：歌曲的热门评论

    5.mv地址获取
        请求地址：https://autumnfish.cn/mv/url
        请求方式：get
        请求参数：id（mvid，为0则表示没有mv）
        响应内容：mv的地址
*/

var app = new Vue({
    el: '#player',
    data: {
        //查询关键词
        query: '',
        //歌曲列表
        musicList: [],
        //歌曲地址
        musicUrl: '',
        //歌曲封面
        musicCover: '',
        //歌曲评论
        musicComments: [],
        //动画播放状态
        isPlaying: false,
        //遮罩层的显示状态
        isShow: false,
        //mv地址
        mvUrl: ''
    },
    methods: {
        //歌曲搜索
        searchMusic: function () {
            axios.get('https://autumnfish.cn/search?keywords=' + this.query)
                .then((response) => {
                    // console.log(response.data.result.songs);

                    this.musicList = response.data.result.songs;

                })
        },
        //歌曲播放
        playMusic: function (musicId) {
            // console.log(musicId);
            //获取歌曲地址
            axios.get('https://autumnfish.cn/song/url?id=' + musicId)
                .then((response) => {
                    // console.log(response);
                    // console.log(response.data.data[0].url);
                    this.musicUrl = response.data.data[0].url
                })
            //歌曲详情获取
            axios.get('https://autumnfish.cn/song/detail?ids=' + musicId)
                .then((response) => {
                    // console.log(response);
                    // console.log(response.data.songs[0].al.picUrl);
                    this.musicCover = response.data.songs[0].al.picUrl
                })
            //歌曲评论获取
            axios.get('https://autumnfish.cn/comment/hot?type=0&id=' + musicId)
                .then((response) => {
                    // console.log(response);
                    // console.log(response.data.hotComments);
                    this.musicComments = response.data.hotComments;
                })
        },
        //歌曲播放 （左下角）
        play: function () {
            // console.log('play');
            this.isPlaying = true
        },
        //歌曲暂停（左下角）
        pause: function () {
            // console.log('pause');
            this.isPlaying = false
        },
        //播放mv
        playMV: function (mvid) {
            axios.get('https://autumnfish.cn/mv/url?id=' + mvid)
                .then((response) => {
                    console.log(response);
                    console.log(response.data.data.url);
                    this.isShow = true;
                    this.mvUrl = response.data.data.url
                })
        },
        hide: function () {
            this.isShow = false;
            this.mvUrl = ''
        }

    }
})