export const mockBody: string =
  "⭐⭐⭐⭐⭐ 题目 ⭐⭐⭐⭐⭐\n\nJavaScript 中，有多种方法实现数组去重，可以说下都有哪些方法，每个方法的优劣吗？\n\n⭐⭐⭐⭐⭐ 答案 ⭐⭐⭐⭐⭐\n\n在 JavaScript 中，数组去重是常见需求，有多种实现方法，各有优劣。以下是常用方案及分析：\n\n\n### 1. 使用 `Set` + 扩展运算符（最简洁）\n```javascript\nconst arr = [1, 2, 2, 3, 3, 3];\nconst uniqueArr = [...new Set(arr)]; \n// 结果：[1, 2, 3]\n```\n**原理**：`Set` 是 ES6 新增的数据结构，其成员具有唯一性，配合扩展运算符 `...` 可转为数组。\n\n**优势**：\n- 代码简洁，一行实现，可读性高\n- 性能较好（平均时间复杂度接近 O(n)）\n- 支持基本数据类型（Number、String、Boolean、null、undefined）\n\n**劣势**：\n- 无法去重引用类型（如对象、数组），因为 `Set` 认为两个不同引用的对象是不同的\n- 无法自定义去重规则（如根据对象的某个属性去重）\n- 不支持 IE 浏览器（需转译或降级处理）\n\n\n### 2. 使用 `Set` + `Array.from`（兼容性略好）\n```javascript\nconst uniqueArr = Array.from(new Set(arr));\n```\n**原理**：与方法 1 一致，只是通过 `Array.from` 将 `Set` 转为数组。\n\n**优势**：\n- 与方法 1 功能相同，兼容性略优于扩展运算符（在部分旧环境中）\n\n**劣势**：\n- 与方法 1 完全一致\n\n\n### 3. 使用 `indexOf`/`includes` + 循环（传统方案）\n```javascript\nconst uniqueArr = [];\nfor (let i = 0; i < arr.length; i++) {\n  // 若数组中不存在当前元素，则推入\n  if (uniqueArr.indexOf(arr[i]) === -1) { \n    // 或用 includes：!uniqueArr.includes(arr[i])\n    uniqueArr.push(arr[i]);\n  }\n}\n```\n**原理**：遍历原数组，通过 `indexOf` 检查元素是否已存在于结果数组中，不存在则添加。\n\n**优势**：\n- 兼容性好（支持 IE8+）\n- 可手动控制去重逻辑（如添加额外条件）\n\n**劣势**：\n- 性能较差（`indexOf`/`includes` 每次都会遍历结果数组，总时间复杂度 O(n²)）\n- 同样无法直接去重引用类型\n- 代码相对冗长\n\n\n### 4. 使用 `filter` + `indexOf`（函数式风格）\n```javascript\nconst uniqueArr = arr.filter((item, index) => {\n  return arr.indexOf(item) === index;\n});\n```\n**原理**：`filter` 保留数组中**首次出现**的元素（`indexOf` 返回元素第一次出现的索引）。\n\n**优势**：\n- 代码简洁，函数式风格，可读性好\n\n**劣势**：\n- 性能与方法 3 相同（O(n²)）\n- 不支持引用类型去重\n- 若数组中有 `NaN`，会失效（`indexOf(NaN)` 始终返回 -1，因为 `NaN !== NaN`）\n\n\n### 5. 使用对象键值对（适合复杂场景）\n```javascript\nconst uniqueArr = [];\nconst tempObj = {};\nfor (let i = 0; i < arr.length; i++) {\n  const item = arr[i];\n  // 将元素转为字符串作为键（避免类型冲突，如 1 和 '1'）\n  const key = typeof item + JSON.stringify(item);\n  if (!tempObj[key]) {\n    tempObj[key] = true;\n    uniqueArr.push(item);\n  }\n}\n```\n**原理**：利用对象的键唯一性，将数组元素转为字符串作为键存储，避免重复。\n\n**优势**：\n- 性能较好（时间复杂度 O(n)）\n- 可区分基本类型的类型差异（如 `1` 和 `'1'` 会被视为不同）\n- 可扩展为引用类型去重（通过自定义 `key` 生成规则）\n\n**劣势**：\n- 代码较复杂，需要处理键的生成逻辑\n- 对于 `Symbol` 类型支持不佳（`JSON.stringify(Symbol())` 会返回 `undefined`）\n\n\n### 6. 使用 `Map`（ES6+，比对象更灵活）\n```javascript\nconst uniqueArr = [];\nconst map = new Map();\nfor (const item of arr) {\n  // 检查 Map 中是否已存在该元素\n  if (!map.has(item)) {\n    map.set(item, true);\n    uniqueArr.push(item);\n  }\n}\n```\n**原理**：`Map` 的键可以是任意类型（包括对象），利用其 `has` 方法检查是否存在。\n\n**优势**：\n- 性能好（O(n)）\n- 支持引用类型的去重（但需注意：两个不同引用的对象仍会被视为不同键）\n- 支持 `NaN` 和 `undefined` 的正确去重（`Map` 中 `NaN` 被视为相等）\n\n**劣势**：\n- 兼容性依赖 ES6（不支持 IE）\n- 引用类型去重仍需额外处理（如根据对象属性判断）\n\n\n### 7. 引用类型去重（需自定义规则）\n以上方法对引用类型（如对象）效果有限，需根据具体属性去重：\n```javascript\nconst arr = [\n  { id: 1, name: 'a' },\n  { id: 1, name: 'b' },\n  { id: 2, name: 'c' }\n];\n\n// 根据 id 去重\nconst uniqueArr = [];\nconst idSet = new Set();\nfor (const item of arr) {\n  if (!idSet.has(item.id)) {\n    idSet.add(item.id);\n    uniqueArr.push(item);\n  }\n}\n```\n**原理**：提取对象的唯一标识（如 `id`），通过 `Set` 或对象记录已出现的标识。\n\n\n### 总结：如何选择？\n| 场景                     | 推荐方法                          | 理由                                       |\n|--------------------------|-----------------------------------|--------------------------------------------|\n| 简单基本类型去重（ES6+） | `[...new Set(arr)]`               | 简洁高效，一行代码                         |\n| 需兼容旧环境（如 IE）    | `indexOf` + 循环                  | 兼容性最好                                 |\n| 性能优先（大数据量）     | `Map` 或对象键值对                | 时间复杂度 O(n)，效率高                    |\n| 引用类型去重             | 自定义标识 + `Set`/`Map`          | 需根据具体属性手动实现                     |\n| 需区分 `1` 和 `'1'`      | 对象键值对（带类型标识）          | 可通过 `typeof + 值` 生成唯一键            |\n\n实际开发中，`[...new Set(arr)]` 是最常用的方案，简洁且能满足大多数基本类型去重需求；若涉及引用类型，则需结合业务场景自定义去重规则。";

export const mockData = {
  url: "https://api.github.com/repos/inkmark-com-cn/interview/issues/2",
  repository_url: "https://api.github.com/repos/inkmark-com-cn/interview",
  labels_url:
    "https://api.github.com/repos/inkmark-com-cn/interview/issues/2/labels{/name}",
  comments_url:
    "https://api.github.com/repos/inkmark-com-cn/interview/issues/2/comments",
  events_url:
    "https://api.github.com/repos/inkmark-com-cn/interview/issues/2/events",
  html_url: "https://github.com/inkmark-com-cn/interview/issues/2",
  id: 3437081783,
  node_id: "I_kwDOPzbkIc7M3bS3",
  number: 2,
  title: "如何实现数组去重",
  user: {
    login: "inkmark-com-cn",
    id: 60834609,
    node_id: "MDQ6VXNlcjYwODM0NjA5",
    avatar_url: "https://avatars.githubusercontent.com/u/60834609?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/inkmark-com-cn",
    html_url: "https://github.com/inkmark-com-cn",
    followers_url: "https://api.github.com/users/inkmark-com-cn/followers",
    following_url:
      "https://api.github.com/users/inkmark-com-cn/following{/other_user}",
    gists_url: "https://api.github.com/users/inkmark-com-cn/gists{/gist_id}",
    starred_url:
      "https://api.github.com/users/inkmark-com-cn/starred{/owner}{/repo}",
    subscriptions_url:
      "https://api.github.com/users/inkmark-com-cn/subscriptions",
    organizations_url: "https://api.github.com/users/inkmark-com-cn/orgs",
    repos_url: "https://api.github.com/users/inkmark-com-cn/repos",
    events_url: "https://api.github.com/users/inkmark-com-cn/events{/privacy}",
    received_events_url:
      "https://api.github.com/users/inkmark-com-cn/received_events",
    type: "User",
    user_view_type: "public",
    site_admin: false,
  },
  labels: [],
  state: "open",
  locked: false,
  assignee: null,
  assignees: [],
  milestone: null,
  comments: 0,
  created_at: "2025-09-20T12:06:39Z",
  updated_at: "2025-09-20T12:06:39Z",
  closed_at: null,
  author_association: "OWNER",
  active_lock_reason: null,
  sub_issues_summary: {
    total: 0,
    completed: 0,
    percent_completed: 0,
  },
  issue_dependencies_summary: {
    blocked_by: 0,
    total_blocked_by: 0,
    blocking: 0,
    total_blocking: 0,
  },
  body: "⭐⭐⭐⭐⭐ 题目 ⭐⭐⭐⭐⭐\n\nJavaScript 中，有多种方法实现数组去重，可以说下都有哪些方法，每个方法的优劣吗？\n\n⭐⭐⭐⭐⭐ 答案 ⭐⭐⭐⭐⭐\n\n在 JavaScript 中，数组去重是常见需求，有多种实现方法，各有优劣。以下是常用方案及分析：\n\n\n### 1. 使用 `Set` + 扩展运算符（最简洁）\n```javascript\nconst arr = [1, 2, 2, 3, 3, 3];\nconst uniqueArr = [...new Set(arr)]; \n// 结果：[1, 2, 3]\n```\n**原理**：`Set` 是 ES6 新增的数据结构，其成员具有唯一性，配合扩展运算符 `...` 可转为数组。\n\n**优势**：\n- 代码简洁，一行实现，可读性高\n- 性能较好（平均时间复杂度接近 O(n)）\n- 支持基本数据类型（Number、String、Boolean、null、undefined）\n\n**劣势**：\n- 无法去重引用类型（如对象、数组），因为 `Set` 认为两个不同引用的对象是不同的\n- 无法自定义去重规则（如根据对象的某个属性去重）\n- 不支持 IE 浏览器（需转译或降级处理）\n\n\n### 2. 使用 `Set` + `Array.from`（兼容性略好）\n```javascript\nconst uniqueArr = Array.from(new Set(arr));\n```\n**原理**：与方法 1 一致，只是通过 `Array.from` 将 `Set` 转为数组。\n\n**优势**：\n- 与方法 1 功能相同，兼容性略优于扩展运算符（在部分旧环境中）\n\n**劣势**：\n- 与方法 1 完全一致\n\n\n### 3. 使用 `indexOf`/`includes` + 循环（传统方案）\n```javascript\nconst uniqueArr = [];\nfor (let i = 0; i < arr.length; i++) {\n  // 若数组中不存在当前元素，则推入\n  if (uniqueArr.indexOf(arr[i]) === -1) { \n    // 或用 includes：!uniqueArr.includes(arr[i])\n    uniqueArr.push(arr[i]);\n  }\n}\n```\n**原理**：遍历原数组，通过 `indexOf` 检查元素是否已存在于结果数组中，不存在则添加。\n\n**优势**：\n- 兼容性好（支持 IE8+）\n- 可手动控制去重逻辑（如添加额外条件）\n\n**劣势**：\n- 性能较差（`indexOf`/`includes` 每次都会遍历结果数组，总时间复杂度 O(n²)）\n- 同样无法直接去重引用类型\n- 代码相对冗长\n\n\n### 4. 使用 `filter` + `indexOf`（函数式风格）\n```javascript\nconst uniqueArr = arr.filter((item, index) => {\n  return arr.indexOf(item) === index;\n});\n```\n**原理**：`filter` 保留数组中**首次出现**的元素（`indexOf` 返回元素第一次出现的索引）。\n\n**优势**：\n- 代码简洁，函数式风格，可读性好\n\n**劣势**：\n- 性能与方法 3 相同（O(n²)）\n- 不支持引用类型去重\n- 若数组中有 `NaN`，会失效（`indexOf(NaN)` 始终返回 -1，因为 `NaN !== NaN`）\n\n\n### 5. 使用对象键值对（适合复杂场景）\n```javascript\nconst uniqueArr = [];\nconst tempObj = {};\nfor (let i = 0; i < arr.length; i++) {\n  const item = arr[i];\n  // 将元素转为字符串作为键（避免类型冲突，如 1 和 '1'）\n  const key = typeof item + JSON.stringify(item);\n  if (!tempObj[key]) {\n    tempObj[key] = true;\n    uniqueArr.push(item);\n  }\n}\n```\n**原理**：利用对象的键唯一性，将数组元素转为字符串作为键存储，避免重复。\n\n**优势**：\n- 性能较好（时间复杂度 O(n)）\n- 可区分基本类型的类型差异（如 `1` 和 `'1'` 会被视为不同）\n- 可扩展为引用类型去重（通过自定义 `key` 生成规则）\n\n**劣势**：\n- 代码较复杂，需要处理键的生成逻辑\n- 对于 `Symbol` 类型支持不佳（`JSON.stringify(Symbol())` 会返回 `undefined`）\n\n\n### 6. 使用 `Map`（ES6+，比对象更灵活）\n```javascript\nconst uniqueArr = [];\nconst map = new Map();\nfor (const item of arr) {\n  // 检查 Map 中是否已存在该元素\n  if (!map.has(item)) {\n    map.set(item, true);\n    uniqueArr.push(item);\n  }\n}\n```\n**原理**：`Map` 的键可以是任意类型（包括对象），利用其 `has` 方法检查是否存在。\n\n**优势**：\n- 性能好（O(n)）\n- 支持引用类型的去重（但需注意：两个不同引用的对象仍会被视为不同键）\n- 支持 `NaN` 和 `undefined` 的正确去重（`Map` 中 `NaN` 被视为相等）\n\n**劣势**：\n- 兼容性依赖 ES6（不支持 IE）\n- 引用类型去重仍需额外处理（如根据对象属性判断）\n\n\n### 7. 引用类型去重（需自定义规则）\n以上方法对引用类型（如对象）效果有限，需根据具体属性去重：\n```javascript\nconst arr = [\n  { id: 1, name: 'a' },\n  { id: 1, name: 'b' },\n  { id: 2, name: 'c' }\n];\n\n// 根据 id 去重\nconst uniqueArr = [];\nconst idSet = new Set();\nfor (const item of arr) {\n  if (!idSet.has(item.id)) {\n    idSet.add(item.id);\n    uniqueArr.push(item);\n  }\n}\n```\n**原理**：提取对象的唯一标识（如 `id`），通过 `Set` 或对象记录已出现的标识。\n\n\n### 总结：如何选择？\n| 场景                     | 推荐方法                          | 理由                                       |\n|--------------------------|-----------------------------------|--------------------------------------------|\n| 简单基本类型去重（ES6+） | `[...new Set(arr)]`               | 简洁高效，一行代码                         |\n| 需兼容旧环境（如 IE）    | `indexOf` + 循环                  | 兼容性最好                                 |\n| 性能优先（大数据量）     | `Map` 或对象键值对                | 时间复杂度 O(n)，效率高                    |\n| 引用类型去重             | 自定义标识 + `Set`/`Map`          | 需根据具体属性手动实现                     |\n| 需区分 `1` 和 `'1'`      | 对象键值对（带类型标识）          | 可通过 `typeof + 值` 生成唯一键            |\n\n实际开发中，`[...new Set(arr)]` 是最常用的方案，简洁且能满足大多数基本类型去重需求；若涉及引用类型，则需结合业务场景自定义去重规则。",
  closed_by: null,
  reactions: {
    url: "https://api.github.com/repos/inkmark-com-cn/interview/issues/2/reactions",
    total_count: 0,
    "+1": 0,
    "-1": 0,
    laugh: 0,
    hooray: 0,
    confused: 0,
    heart: 0,
    rocket: 0,
    eyes: 0,
  },
  timeline_url:
    "https://api.github.com/repos/inkmark-com-cn/interview/issues/2/timeline",
  performed_via_github_app: null,
  state_reason: null,
};
