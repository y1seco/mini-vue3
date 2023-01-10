
// const {effect,reactive} = require("@vue/reactivity")

import { effectWatch,reactive } from "./core/reactivity/index.js";
import { h } from "./core/h.js";

// //ref 声明一个响应式对象

let a = reactive({
    value:1,
});

let b ;


effectWatch(()=>{
    console.log("-------------reactivity----------");

    b = a.value+10;
    console.log(b);
})

a.value = 10;

//vue3
export default  {

    render(context){
    // template ->render
        //构建视图=b;
        //view 每次要重新创建，开销大
        //要计算出最小的更新点 ->vdom
        //js ->diff

        // //reset
        // const div = document.createElement("div");
        // div.innerHTML = context.state.count;
        // return div;

      //  return h("div",null,context.state.count);
        return h(
            "div",
            {
                id:"app == "+context.state.count,
                class:"showTime",
            },
            // String(context.state.count)
            [h("p",null,String(context.state.count)),h("p",null,"fffff")],
        )

    },

    setup(){
        //a = 响应式数据
        const state = reactive({
            count :0,
        })
        window.state = state;
        return {state};

    }
};


