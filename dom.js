window.dom={
   create(string){//创建一个新的节点
       const container=document.createElement("template")//template是盛放的容器，不会在页面中显示
       container.innerHTML=string.trim()//加trim去掉字符串两边的空格
       return container.content.firstChild
   },
   after(node,node2){//在node后面插入一个新节点node2
    node.parentNode.insertBefore(node2,node.nextSibling)

   },
   before(node,node2){//node前插入node2
       node.parentNode.insertBefore(node2,node)
   },
   append(parent,node){//在parent中新增一个儿子node
       parent.appendChild(node)
   },
   wrap(node,parent){//给node新加一个parent
       dom.before(node,parent)//把parent变成node的兄弟节点
       dom.append(parent,node)
   },
   remove(node){//支持IE
      node.parentNode.removeChild(node)
      return node 
   },
   empty(node){//删除后代
       const {childNodes}=node//const childNodes=node.childNodes的简写
       const array=[]
       let x = node.firstChild
       while(x){
           array.push(dom.remove(node.firstChild))
           x=node.firstChild//此时node已被更新
       }
       return array
    },
    attr(node,name,value){//设置标题和获取标题（重载）
        if(arguments.length===3){
            node.setAttribute(name,value)
        }else if(arguments.length===2){
            return node.getAttribute(name)
        }
        
    },
    text(node,string){ //改变文本内容（适配）
        if(arguments.length===2){
        if("interText" in node){
            node.textContent=string//firefox/Chrome
        }else{
            node.innerText=string//IE
        } 
      }else if(arguments.length===1){
        if("interText" in node){
            return node.textContent
        }else{
            return node.innerText
        } 
      }
    },
    html(node,string){
        if(arguments.length===2){
            node.innerHTML=string
        }else if(arguments.length===1){
            return node.innerHTML
        } 
    },
    style(node,name,value){
        if(arguments.length===3){
         //dom.style(div,'color','red')
         node.style[name]=value
        }
        else if(arguments.length===2){
            if(typeof name==='string'){
                //dom.style(div,'color')
                return node.style[name]
            }else if(name instanceof Object){
                //dom.style(div,{color:'red'})
                const object = name
                for(let key in object){
                    node.style[key]=object[key]//key是变量，所以用[],例：node.style.color=...,key:color
                  }
            }
        }
        
    },
    class:{
        add(node,className){
            node.classList.add(className)
        },
        remove(node,className){
            node.classList.remove(className)
        },
        contains(node,className){
          return node.classList.contains(className)
        }
    },
    on(node,eventName,fn){
        node.addEventListener(eventName,fn)
    },
    off(node,eventName,fn){
        node.removeEventListener(eventName,fn)
    },
    find(selector,scope){//给id返回对应元素
        return (scope||document).querySelectorAll(selector)//如果有scope（范围）,在scope中查找
    },
    parent(node){
        return node.parentNode
    },
    children(node){
        return node.children
    },
    siblings(node){//兄弟节点
        return Array.from(node.parentNode.children)
        .filter(n=>n!==node)//先把children伪数组变成数组，再判断这个节点是否为传进来的节点
    },
    next(node){
        let x = node.nextSibling
        while(x&&x.nodeType === 3){//判断x是否为文本
            x=x.nextSibling
        }
        return x
    },
    previous(node){
        let x=node.previousSibling
        while(x&&x.nodeType === 3){//判断x是否为文本
            x=x.previousSibling
        }
        return x
    },
    each(nodeList,fn){
        for(let i=0;i<nodeList.length;i++){
            fn.call(null,nodeList[i])
        }
    },
    index(node){
        const list =dom.children(node.parentNode)
        let i
        for(i=0;i<list.length;i++){
            if(list[i]===node){
                break
            }
        }
        return i+1
    }



} 