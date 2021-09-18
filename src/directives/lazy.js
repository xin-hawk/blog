import lazyImg from "@/assets/loading.gif"
import eventBus from "@/eventBus.js";
import debounce from "@/utils/debounce.js";

let imgs = [];

function setImage(img) {
    // 处理图片
    // 该图片是否在视口范围内
    img.dom.src = lazyImg;
    const rect = img.dom.getBoundingClientRect();
    const clientHeight = document.documentElement.clientHeight;
    const height = rect.height || 100;
    if (rect.top >= -height && rect.top <= clientHeight) {
        // 当矩形的顶部比自身高度的负值大时，证明上半部分在视口中；
        // 当矩形的顶部比视口的高度还要小时，证明下半部分在视口中；
        const tempImg = new Image();
        tempImg.onload = function () {
            // 当真实图片加载完成之后
            img.dom.src = img.src;
        };
        tempImg.src = img.src;
        imgs = imgs.filter(i => i !== img)
    }

}

function setImages() {
    for (const img of imgs) {
        // 处理图片
        setImage(img)
    }
}

function handleScroll() {
    setImages()
}
eventBus.$on("mainScroll", debounce(handleScroll, 100));
export default {
    inserted(el, bindings) {
        const img = {
            dom: el,
            src: bindings.value,
        };
        imgs.push(img);
        // 立即处理
        setImage(img)
    },
    unbind(el) {
        imgs = imgs.filter(img => img.dom !== el)
    }
}