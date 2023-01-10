//把虚拟dom转化为真实dom

//n1,oldVnode
//n2,newVnode
export function diff(n1,n2) {

    //1. tag

    if(n1.tag != n2.tag){
        n1.el.replaceWith(document.createElement(n2.tag));
    }else{
        //细节
       const el = ( n2.el = n1.el);
        //2. props
        //更新或添加减少class等元素
        const {props: newProps} = n2;
        const {props: oldProps} = n1;
        
        if(newProps && oldProps){
            Object.keys(newProps).forEach((key)=>{
                const newVal = newProps[key]
                const oldVal = oldProps[key]
                if(newVal != oldVal){
                    el.setAttribute(key,newVal);
                }
            });
        }

        if(oldProps){
            Object.keys(oldProps).forEach((key)=>{
                if(!newProps[key]){
                    el.removeAttribute(key);
                }
            });
        }




    }
    
    //3. children
// 1. newChildren ->string
// 2. newChildren -> array

    const {children : newChildren = []} = n2;
    const {children : oldChildren = []} = n1;

    if(typeof newChildren === 'string'){
        if(typeof oldChildren === 'string'){
            if(newChildren != oldChildren){
                el.textContent = newChildren;
            }
        }else if(Array.isArray(oldChildren)){
            el.textContent  = newChildren;
        }
    }else if(Array.isArray(newChildren)){
        if(typeof oldChildren === 'string'){
            el.innerText =  ``;
            mountElement(n2,el);
        }
    }else if(Array.isArray(oldChildren)){

        //new {a,b,c}
        //old {a,e,c,d}
        //暴力解法
        const length = Math.min(newChildren.length,oldChildren.length);
        //处理公共的vnode
        for (let index = 0; index < length; index++) {
            const newVnode = newChildren[index];
            const oldVnode = oldChildren[index];
            diff(newVnode,oldVnode);

            if(newChildren.length > length){
                //创建节点
                for(let index = length; index < newChildren.length;index++){
                    const newVnode = newChildren[index];
                    mountElement(newVnode);
                }
            }
            if(oldChildren.length > length){
                //删除节点
                for(let index = length;index < oldChildren.length;index++){
                    const oldVnode = oldChildren[index];
                    oldVnode.el.parent.removeChild(oldVnode.el);
                }

            }


            
        }



    }
    


    
}




export function mountElement(vnode,container) {
    const {tag,props,children} = vnode;
    
    const el = (vnode.el= document.createElement(tag));

    if(props){
        for(const key in props){
            const val = props[key];
            el.setAttribute(key,val);
        }
    }


    //children
    //1. 可以接受一个 string
    if(typeof children === "string"){
        const textNode = document.createTextNode(children);
        el.append(textNode);

    }else if(Array.isArray(children)){

        //2. 可以接受一个数组
        children.forEach((v)=>{
            mountElement(v,el);
        })
    }



    container.append(el);
}