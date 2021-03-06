import Vue from "vue";
/**
 * 获取某个组件渲染的Dom根元素
 * @param {*} comp 元素
 * @param {*} props 属性
 * @returns 
 */
export default function(comp,props){
    const vm = new Vue({
        render:h=>h(comp,{props})
    });
    vm.$mount();
    return vm.$el;
}