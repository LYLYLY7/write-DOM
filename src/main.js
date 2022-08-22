//main.js用来进行测试dom.js
//在index.html里面dom.js必须放到main.js前面,main.js才能正常执行


//利用dom里的create函数创造div标签 内容为你好
const div = dom.create('<div>newDiv</div>');
console.log(div);

//创建弟弟节点
dom.after(test, div);

//                             不能用单引号包裹住单引号
const div3 = dom.create('<div id = "parent">id为parent</div>');
dom.wrap(test, div3);

const remove1 = dom.remove(e4);
console.log(remove1);

const empty1 = dom.empty(window.empty)
console.log(empty1)

dom.attr(test, 'title', 'hello world')
const title = dom.attr(test, 'title')
//反引号  波浪键
console.log(`title:${title}`)

dom.text(test, '你好，这是新的内容')
dom.text(test)

dom.style(test, { border: '1px solid red', color: 'blue' })
console.log(dom.style(test, 'border'))
dom.style(test, 'border', '1px solid black')

dom.class.add(test, 'red')
dom.class.add(test, 'blue')
dom.class.remove(test, 'blue')
console.log(dom.class.has(test, 'blue'))

const fn = () => {
    console.log('点击了')
}
dom.on(test, 'click', fn)
dom.off(test, 'click', fn)


const testDiv = dom.find('#test')[0]
console.log(testDiv)
const test2 = dom.find('#test2')[0]
console.log(dom.find('.red', test2)[0])

console.log(dom.parent(test))

const s2 = dom.find('#s2')[0]
console.log(dom.siblings(s2))
console.log(dom.next(s2))
console.log(dom.previous(s2))

const t = dom.find('#travel')[0]
dom.each(dom.children(t), (n) => dom.style(n, 'color', 'red'))

console.log(dom.index(s2))

