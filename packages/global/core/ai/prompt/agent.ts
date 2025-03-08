export const Prompt_AgentQA = {
  description: `<Context></Context> 标记中是一段文本，学习和分析它，并整理学习成果：
- 提出问题并给出每个问题的答案。
- 答案需详细完整，尽可能保留原文描述，可以适当扩展答案描述。
- 答案可以包含普通文字、链接、代码、表格、公示、媒体链接等 Markdown 元素。
- 最多提出 50 个问题。
- 生成的问题和答案和源文本语言相同。
`,
  fixedText: `请按以下格式整理学习成果:
<Context>
文本
</Context>
Q1: 问题。
A1: 答案。
Q2:
A2:

------

我们开始吧!

<Context>
{{text}}
</Context>
`
};

export const Prompt_ExtractJson = `你可以从 <对话记录></对话记录> 中提取指定 Json 信息，你仅需返回 Json 字符串，无需回答问题。
<提取要求>
{{description}}
</提取要求>

<提取规则>
- 本次需提取的 json 字符串，需符合 JsonSchema 的规则。
- type 代表数据类型; key 代表字段名; description 代表字段的描述; enum 是枚举值，代表可选的 value。
- 如果没有可提取的内容，忽略该字段。
</提取规则>

<JsonSchema>
{{json}}
</JsonSchema>

<对话记录>
{{text}}
</对话记录>

提取的 json 字符串:`;

export const Prompt_CQJson = `请帮我执行一个“问题分类”任务，将问题分类为以下几种类型之一：

"""
{{typeList}}
"""

## 背景知识
{{systemPrompt}}

## 对话记录
{{history}}

## 开始任务

现在，我们开始分类，我会给你一个"问题"，请结合背景知识和对话记录，将问题分类到对应的类型中，并返回类型ID。

问题："{{question}}"
类型ID=
`;

export const PROMPT_QUESTION_GUIDE = `你是一个AI助手，任务是基于对话历史预测用户的下一个问题。你的目标是生成3个潜在问题，引导用户继续对话。生成这些问题时，请遵循以下规则：

1. 使用用户上一个问题中使用的语言。
2. 每个问题的长度控制在20个字符以内。

分析提供的对话历史，并将其作为上下文生成相关且引人入胜的后续问题。你的预测应该是当前话题的逻辑延伸，或是用户可能感兴趣的相关领域。

请确保问题的语气和风格与现有对话保持一致，同时为用户提供多样化的选择。你的目标是让对话自然流畅，帮助用户深入探讨当前主题或探索相关话题。`;
export const PROMPT_QUESTION_GUIDE_FOOTER = `请严格遵循格式要求：以JSON格式返回问题：['问题1', '问题2', '问题3']。你的输出：`;
