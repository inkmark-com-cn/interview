// GitHub 用户类型
interface GitHubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
}

export interface GitHubIssue {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: GitHubUser;
  labels: any[]; // 可以根据实际需要进一步定义 labels 的类型
  state: string;
  locked: boolean;
  assignee: null;
  assignees: any[];
  milestone: null;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: null;
  author_association: string;
  active_lock_reason: null;
  sub_issues_summary: any;
  issue_dependencies_summary: any;
  body: string;
  closed_by: null;
  reactions: any;
  timeline_url: string;
  performed_via_github_app: null;
  state_reason: null;
}

export const mockIssueList: GitHubIssue[] = [
  {
    url: "https://api.github.com/repos/inkmark-com-cn/ai/issues/2",
    repository_url: "https://api.github.com/repos/inkmark-com-cn/ai",
    labels_url:
      "https://api.github.com/repos/inkmark-com-cn/ai/issues/2/labels{/name}",
    comments_url:
      "https://api.github.com/repos/inkmark-com-cn/ai/issues/2/comments",
    events_url:
      "https://api.github.com/repos/inkmark-com-cn/ai/issues/2/events",
    html_url: "https://github.com/inkmark-com-cn/ai/issues/2",
    id: 3437671909,
    node_id: "I_kwDOPz0GZc7M5rXl",
    number: 2,
    title: "什么是 BPE 算法",
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
      events_url:
        "https://api.github.com/users/inkmark-com-cn/events{/privacy}",
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
    created_at: "2025-09-21T00:51:23Z",
    updated_at: "2025-09-21T00:51:23Z",
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
    body: '⭐⭐⭐⭐⭐ 题目 ⭐⭐⭐⭐⭐\n\n什么是 BPE 算法\n\n⭐⭐⭐⭐⭐ 答案 ⭐⭐⭐⭐⭐\n\nBPE（Byte Pair Encoding，字节对编码）是一种广泛应用于自然语言处理（尤其是大语言模型）中的子词分词算法，其核心思想是通过迭代合并最频繁出现的字节对（或子词单元），生成新的子词单元，从而平衡词汇表大小和编码效率。\n\n### 工作原理（以英文为例）：\n1. **初始词汇表**：将文本拆分为最小单元（通常是单个字符），并加入特殊符号（如`</w>`表示词尾）。  \n   例如，"low" "lower" "newest" "widest" 初始拆分为：  \n   `l o w</w>`, `l o w e r</w>`, `n e w e s t</w>`, `w i d e s t</w>`\n\n2. **迭代合并最频繁的字节对**：  \n   - 统计所有相邻单元的出现频率，找到出现次数最多的一对（如"e"和"s"），将其合并为新单元（"es"）。  \n   - 更新词汇表，加入新单元，并重复此过程，直到达到预设的词汇表大小或迭代次数。\n\n3. **最终分词效果**：  \n   经过多轮合并后，上述例子可能被拆分为：`low</w>`, `low e r</w>`, `new es t</w>`, `wid es t</w>`，既保留了高频子词（如"es"），又避免了生僻词的未登录问题。\n\n### 优势：\n- **平衡词汇表大小**：相比单字符编码（词汇表小但序列长）和整词编码（词汇表大且易遗漏生僻词），BPE生成的子词单元能在两者间取得平衡。  \n- **处理未登录词**：生僻词或组合词可通过已有子词拼接（如"unhappiness"可拆分为"un-happi-ness"）。  \n- **适配多语言**：无需针对不同语言设计特殊规则，适用于混合语言场景。\n\n### 应用：\nBPE是Transformer、GPT、BERT等主流大语言模型的核心分词技术（如GPT使用的ByteLevel-BPE），也是机器翻译、语音识别等任务中处理词汇的重要工具。',
    closed_by: null,
    reactions: {
      url: "https://api.github.com/repos/inkmark-com-cn/ai/issues/2/reactions",
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
      "https://api.github.com/repos/inkmark-com-cn/ai/issues/2/timeline",
    performed_via_github_app: null,
    state_reason: null,
  },
  {
    url: "https://api.github.com/repos/inkmark-com-cn/ai/issues/1",
    repository_url: "https://api.github.com/repos/inkmark-com-cn/ai",
    labels_url:
      "https://api.github.com/repos/inkmark-com-cn/ai/issues/1/labels{/name}",
    comments_url:
      "https://api.github.com/repos/inkmark-com-cn/ai/issues/1/comments",
    events_url:
      "https://api.github.com/repos/inkmark-com-cn/ai/issues/1/events",
    html_url: "https://github.com/inkmark-com-cn/ai/issues/1",
    id: 3437666101,
    node_id: "I_kwDOPz0GZc7M5p81",
    number: 1,
    title: "为什么说，现在的 AI 都是基于概率的？",
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
      events_url:
        "https://api.github.com/users/inkmark-com-cn/events{/privacy}",
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
    created_at: "2025-09-21T00:39:05Z",
    updated_at: "2025-09-21T00:39:05Z",
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
    body: "⭐⭐⭐⭐⭐ 题目 ⭐⭐⭐⭐⭐\n\n为什么说，现在的 AI 都是基于概率的？\n\n⭐⭐⭐⭐⭐ 答案 ⭐⭐⭐⭐⭐\n\n现在的AI都是基于概率的，这可以从其底层原理的多个方面进行解释：\n\n- **机器学习的核心是概率建模**：现代 AI 的智能本质就是对概率分布的建模与优化。无论是生成式模型还是强化学习系统，其核心都在于通过大规模参数和数据，逼近复杂数据分布。例如，在自然语言处理中，语言模型如 GPT 生成文本时，是基于前文预测下一个词的概率分布，通过最小化交叉熵损失，模型学会捕捉训练数据中的统计模式。在图像生成领域，DALL·E 通过去噪过程优化图像像素的分布，也是在对概率分布进行建模。\n\n- **神经网络的训练与推理基于概率**：神经网络在训练阶段，会根据输入数据和对应的标签，通过反向传播算法来调整神经元之间的连接权重，这个过程的目标是让模型在给定输入时，能够以最高的概率输出正确的结果。在推理阶段，当输入新的数据时，模型会根据训练学到的参数，计算出不同输出的概率，然后选择概率最高的输出作为结果。例如，一个图像识别模型在识别一张图片是猫还是狗时，会计算出图片属于猫和狗的概率，哪个概率高就将其识别为哪种动物。\n\n- **概率用于处理不确定性**：现实世界中的信息往往是不确定的，AI 需要能够处理这种不确定性。概率模型为 AI 提供了一种量化不确定性的方法，使 AI 能够在不确定的情况下做出决策。例如，在自动驾驶中，自动驾驶系统需要根据传感器接收到的不完整、有噪声的数据来做出决策，如是否加速、减速或转弯等。系统会使用概率图模型来估计不同行动的后果的概率，并基于这些估计来做出决策。\n\n- **强化学习中的概率策略**：在强化学习中，模型通过优化奖励函数来学习策略，模型会根据当前状态选择一个动作，这个动作的选择通常是基于概率的。例如，AlphaGo 在进行围棋对弈时，会根据当前棋盘状态计算每个可能走法的概率，然后选择一个概率较高的走法进行落子。通过不断地与环境交互并根据奖励反馈调整策略的概率分布，模型逐渐学会在特定任务中采取最优的行动策略。",
    closed_by: null,
    reactions: {
      url: "https://api.github.com/repos/inkmark-com-cn/ai/issues/1/reactions",
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
      "https://api.github.com/repos/inkmark-com-cn/ai/issues/1/timeline",
    performed_via_github_app: null,
    state_reason: null,
  },
].sort((a, b) => a.id - b.id);

export const mockBody = mockIssueList[0].body;
