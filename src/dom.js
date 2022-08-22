//window.dom是我们自己设置的全局变量
//首先创建一个全局变量：dom；然后构造一个函数
window.dom = {
    //增加节点（创建）
    create(string) {
        //template这个标签可以容纳任何元素。由于一些标签只能被特定标签容纳
        //例如<td><tr>
        const container = document.createElement("template");
        //trim 删除字符串多余空格
        container.innerHTML = string.trim();
        return container.content.firstChild;
    }, //这里别忘加逗号


    //增加节点的弟弟
    //将node2插入到node后面
    after(node, node2) {
        //parentNode.insertBefore是在参考节点之前插入一个拥有指定父节点的子节点
        //node2为要插入的节点，next.Sibling为将要插在这个节点之前
        //parentNode为新插入节点的父节点
        //node.nextSibling为返回node父节点孩子列表（childNode）中紧跟在node后面的节点
        //下面语句就是将node2放到node之后
        node.parentNode.insertBefore(node2, node.nextSibling);
    },

    //同理，可以增加节点的哥哥
    //node2插入到node之前
    before(node, node2) {
        //node当前节点
        //node2要插入的节点
        //将node2放到node之前
        node.parentNode.insertBefore(node2, node);
    },

    //增加节点的儿子
    append(parent, node) {
        parent.appendChild(node);
    },

    //增加节点的爸爸
    wrap(node, parent) {
        //在已经存在的node节点前面加一个父节点
        //parent放在node之前（把node移出去）
        dom.before(node, parent);
        //然后在parent添加孩子节点
        dom.append(parent, node);
    },


    //删除
    //删除某一个节点
    remove(node) {
        //利用父亲节点删除孩子节点
        node.parentNode.removeChild(node);
        //返回node，毕竟node还在内存中，可能还要用
        return node
    },
    //删除该节点的所有孩子节点
    empty(node) {
        const array = [];
        //node为父亲节点
        //令x=该节点的第一个孩子节点，如果x存在则删除x，然后再令x等于新的孩子老大节点
        //依次类推
        let x = node.firstChild;
        while (x) {
            //push（）将一个或者多个与元素添加到数组末尾。并返回该数组新长度；
            //删除第一个孩子，并将删除的孩子添加到数组里
            // dom.remove(node.firstChild) 下面那一句会执行删除，无需先删除再赋值，这样会赋值两遍
            let y = dom.remove(node.firstChild)
            array.push(y);
            x = node.firstChild;
        }
        return array;
    },

    //改
    //用于读写属性
    attr(node, name, value) {
        //如果参数的长度等于3 arguments是参数，就是上面（node,name,value）
        //参数为node,name,value
        if (arguments.length === 3) {
            //语法：element.setAttribute(name, value);
            //设置指定元素上的某个属性值。如果属性已经存在，则更新该值；否则，使用指定的名称和值添加一个新的属性。
            node.setAttribute(name, value)
        } else if (arguments.length === 2) {
            //语法： let attribute = element.getAttribute(attributeName);
            //attribute 是一个包含 attributeName 属性值的字符串。
            //attributeName 是你想要获取的属性值的属性名称。\
            //getAttribute() 返回元素上一个指定的属性值。如果指定的属性不存在，则返回 null 或 "" （空字符串）
            return node.getAttribute(name)
        }
    },
    //读写文本
    text(node, string) {
        if (arguments.length === 2) {
            //innerText 属性表示一个节点及其后代的“渲染”文本内容。
            //innerText 可操作已被渲染的内容， 而 textContent 则不会。
            //textContent 表示一个节点及其后代的文本内容。
            if ('innerText' in node) {  //innerText是否存在,在不同的浏览器是不同的
                node.innerText = string  //适合ie               //适配
            } else {
                node.textContent = string   //适合firefox，chrome浏览器
            }
        } else if (arguments.length === 1) { //这一语句块是读文本 上面是写文本
            if ('innerText' in node) {
                return node.innerText
            } else {
                return node.textContent
            }
        }
    },

    //用于读写html里面的文本内容，与innerText有不同，不同看链接
    html(node, string) {
        if (arguments.length === 2) {
            node.innerHTML = string  //写html
        } else if (arguments.length === 1) {
            //用户只写了节点node，那就直接返回它的innerHTML
            return node.innerHTML //读html
        }
    },

    //用于修改style
    style(node, name, value) {
        if (arguments.length === 3) {
            //dom.style(div,'color','red')
            node.style[name] = value
        } else if (arguments.length === 2) {
            if (typeof name === 'string') { //name的类型是字符串
                //dom.style(div,'color')
                return node.style[name]
                //instanceof 运算符用于
                //检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
                //判断输入的name是不是一个对象
            } else if (name instanceof Object) {
                //dom.style(div,{color: 'red'})
                const object = name
                //Object.keys() 方法
                //会返回一个由一个给定对象的自身可枚举属性组成的数组，
                for (let key in object) {
                    node.style[key] = object[key]
                }
            }
        }
    },
    //用于修改class
    class: {
        add(node, className) {
            node.classList.add(className)
        },
        remove(node, className) {
            node.classList.remove(className)
        },
        has(node, className) {
            return node.classList.contains(className)
        },
    },
    //监听事件
    on(node, eventName, fn) {
        node.addEventListener(eventName, fn)
    },
    off(node, eventName, fn) {
        node.removeEventListener(eventName, fn)
    },

    //查
    //查标签们
    find(selector, scope) {
        //scope是范围的意思
        //find（selector，scope）就是在scope这个范围里寻找id或者class为selector的标签
        //如果scope存在，则用scope.qs,否则则用document
        return (scope || document).querySelectorAll(selector)
    },
    //查父亲元素
    parent(node) {
        return node.parentNode
    },
    //查孩子元素
    children(node) {
        return node.children
    },
    //查兄弟姐妹元素
    siblings(node) {
        return Array.from(node.parentNode.children)
            .filter(n => n !== node) //排除node这个节点的所有兄弟节点
        //filter() 方法创建一个新数组，其包含通过所提供函数实现的测试的所有元素。
    },
    //查弟弟元素
    next(node) {
        let x = node.nextSibling
        //Node.nodeType 表示的是该节点的类型。
        // 3表示是文本类型
        //当x存在且x的类型为文本，这是因为当有回车时，其弟弟元素是#text（文本）
        while (x && x.nodeType === 3) {
            x = x.nextSibling
        }
        return x
    },
    //查哥哥元素
    previous(node) {
        let x = node.previousSibling
        while (x && x.nodeType === 3) {
            x = x.previousSibling
        }
        return x
    },
    //遍历所有节点
    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
    },
    //获取元素排行第几
    index(node) {
        const list = dom.children(node.parentNode)
        let i //这个语句之所以写到这里是因为 for的作用域不包含下面的return i
        //如果写在for里面，return i里面的 i是未被定义的
        for (i = 0; i < list.length; i++) {
            if (list[i] === node) {
                break
            }
        }
        return i
    },
}