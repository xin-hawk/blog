import loadingUrl from "@/assets/loading.svg";
// 导入样式
import sytle from "./loading.module.less";
// 获得img元素
function getLoadingImage(el){
    return el.querySelector("img[data-role=loading]")
}

// 创建img元素
function setLoadingImg(){
    const img = document.createElement("img");
    img.dataset.role = "loading";
    img.src = loadingUrl;
    img.className = sytle.loading;
    return img;
}
// 配置指令对象
export default function(el,binding){
    // 根据binding.value的值，决定创建或删除img元素
    const curImg = getLoadingImage(el);
    if(binding.value){
        if(!curImg){
            const img = setLoadingImg();
            el.appendChild(img);
        }
    }else{
        if(curImg){
            curImg.remove();
        }
    }
}