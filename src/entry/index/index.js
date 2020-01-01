const tree = [
  {
    id: 0,
    name: "超级管理员",
    children: [
      {
        id: 1,
        name: "技术boss",
        children: [
          {
            id: 100,
            name: "技术中心",
            children: [
              {
                id: 1000,
                name: "技术一部",
                children: [
                  {
                    id: 10000,
                    name: "前端组",
                    children: [
                      { id: 100000, name: "前端开发工程师A", children: [] },
                      { id: 100001, name: "前端开发工程师B", children: [] }
                    ]
                  }
                ]
              }
            ]
          },
          { id: 101, name: "研发中心", children: [] }
        ]
      },
      {
        id: 2,
        name: "产品boss",
        children: [{ id: 200, name: "产品一部主管", children: [] }]
      },
      { id: 3, name: "运营boss", children: [] }
    ]
  }
];

/**
 * 深度遍历树
 *
 * @param {*} list
 * @param {*} id
 */
function depthTraversal(list, id) {
  let val = null;
  try {
    (function getId(list, id) {
      if (list.length === 0) return [];
      for (let i = 0; i < list.length; i++) {
        console.log("深度遍历", list[i].id, id);
        if (list[i].id === id) {
          throw list[i];
        } else if (list[i].children.length !== 0) {
          getId(list[i].children, id);
        }
      }
    })(list, id);
  } catch (target) {
    val = target;
  } finally {
    return val;
  }
}

console.log(depthTraversal(tree, 100000));
