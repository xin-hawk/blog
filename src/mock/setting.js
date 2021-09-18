import Mock from "mockjs"

Mock.mock("/api/setting", "get", {
    code: 0,
    msg: "",
    data: {
        avatar: "http://qzd24uze9.hn-bkt.clouddn.com/logo.jpg",
        siteTitle: "hawk°的小窝",
        github: "https://github.com/xin-hawk",
        qq: "1020458617",
        qqQrCode: "http://qzd24uze9.hn-bkt.clouddn.com/qq%E4%BA%8C%E7%BB%B4%E7%A0%81.jpg",
        weixin: "xin1020458617",
        weixinQrCode: "http://qzd24uze9.hn-bkt.clouddn.com/%E5%BE%AE%E4%BF%A1%E4%BA%8C%E7%BB%B4%E7%A0%81.jpg",
        mail: "1020458617@qq.com",
        githubName: "xin-hawk",
        favicon: "http://qzd24uze9.hn-bkt.clouddn.com/icon.jpg",
    }
})