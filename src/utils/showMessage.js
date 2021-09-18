import getComponentsRootDom from "./getComponentsRootDom";
import Icon from "@/components/Icon";
import styles from "./showMessage.module.less"
/**
 * 弹出消息
 * @param {string} content 消息内容
 * @param {string} type 消息类型 info error success warn
 * @param {Number} duration 多久后消失
 * @param {HTMLElement} container 容器，消息会显示到该容器的正中，如果不传，则显示到页面的正中间
 */
export default function (option) {
    const content = option.content || "";
    const type = option.type || "info";
    const duration = option.duration || 2000;
    const container = option.container || document.body;
    //创建消息元素
    const div = document.createElement('div');
    const iconDom = getComponentsRootDom(Icon, {
        type,
    })
    div.innerHTML = `<span class="${styles.icon}">${iconDom.outerHTML}</span><div>${content}</div>`
    // 设置样式
    // console.log(styles)
    const typeClassName = styles[`message-${type}`]; //类型样式名
    div.className = `${styles.message} ${typeClassName}`
    //将div加入到容器中

    //容器的position是否改动过
    if (option.container) {
        if (getComputedStyle(container).position === "static") {
            container.style.position = "relative"
        }
    }

    container.appendChild(div);

    //浏览器强行渲染
    div.clientHeight; //导致reflow

    // 回归到正常位置
    div.style.opacity = 1;
    div.style.transform = `translate(-50%,-50%)`;

    //当一段时间后消失
    setTimeout(() => {
        div.style.opacity = 0;
        div.style.transform = `translate(-50%,-50%) translateY(-25px)`;

        //添加事件监听，当div消失后将其移除
        div.addEventListener("transitionend", function () {
            div.remove();
            // 运行回调函数
            option.callback && option.callback();
        }, {
            once: true
        })
    }, duration)
}