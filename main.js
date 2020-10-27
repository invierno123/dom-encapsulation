const div = dom.create("<div>hi</div>");
console.log(div);

dom.before(test,div)

const div3=dom.create("<div id=parent>div3</div>")
dom.wrap(test,div3)  

const nodes=dom.empty(window.empty)
console.log(nodes)

dom.attr(test,"title",'hi!')
const title=dom.attr(test,"title")
console.log(`title:${title}`)

dom.text(test,`hello World!`)
dom.text(test)//会覆盖

dom.style(test,{border:'1px solid red',color:'green'})
console.log(dom.style(test,'border'))
dom.style(test,'border','solid blue')

dom.class.add(test,'red')
dom.class.add(test,'black')
dom.class.remove(test,'black')
console.log(dom.class.contains(test,'red'))

fn=()=>{console.log(`yes`)}
dom.on(test,'click',fn)
dom.off(test,'click',fn)

const testDiv=dom.find('#test2')[0]//[0]返回一个数组
console.log(testDiv)
console.log(dom.find('.red',test2)[0])

console.log(dom.parent(test))
console.log(dom.children(test2))

console.log(dom.siblings(dom.find('#b2')[0]))
console.log(dom.next(dom.find('#b2')[0]))
console.log(dom.previous(dom.find('#b2')[0]))

const t=dom.find('#travel')[0]
dom.each(dom.children(t),(n)=>dom.style(n,'color',"red"))

console.log(dom.index(b2))