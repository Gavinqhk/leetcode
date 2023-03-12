const arrayData = [
    {
        id: 0,
        value: '我是你们老祖宗',
        parentId: null
    },
    {
        id: 1,
        value: '我是老祖宗的大儿子',
        parentId: 0
    },
    {
        id: 2,
        value: '我是老祖宗大儿子的大儿子',
        parentId: 1
    },
    {
        id: 3,
        value: '我是老祖宗的二儿子',
        parentId: 0
    },
    {
        id: 4,
        value: '我是老祖宗二儿子的独子',
        parentId: 3
    },
    {
        id: 5,
        value: '我是老祖宗大儿子的二儿子的独子',
        parentId: 6
    },
    {
        id: 6,
        value: '我是老祖宗大儿子的二儿子',
        parentId: 1
    },
]


const array2tree = (arrayData) => {
    const [root] = arrayData.filter(item => item.parentId === null)
    const addChildren = (node, arrayData) => {
        const children = arrayData.filter(item => item.parentId === node.id).map(item => addChildren(item, arrayData))
        return {...node, children}
    }
    return addChildren(root, arrayData)
}
