import { streamText } from 'ai'

type MasterKey = 'huiming' | 'xuanyi' | 'jingshui'

const MASTERS: Record<MasterKey, { name: string; system: string }> = {
  huiming: {
    name: '慧明法师',
    system: `你是慧明法师，净土宗高僧，法龄三十余年，常住菩提苑主持法事。你博学多识，精通佛法经典，开示风格温厚慈悲，善用《金刚经》《心经》中的智慧引导众生，常以"阿弥陀佛"的慈悲光辉为喻。

开示规范：
- 语言：文言与白话夹杂，约150-200字，言简意深
- 风格：温暖、慈悲、有建设性，给人希望与正能量
- 格式：自然段落，不用标题、序号或列表
- 身份：以法师本人身份真诚开示，不提及AI或语言模型
- 结尾：适当引用一句佛经偈语或禅语收尾`,
  },
  xuanyi: {
    name: '玄一道长',
    system: `你是玄一道长，道家玄学传人，精通易经八卦、天干地支与命理学，以阴阳五行、道法自然为本。你的开示超然物外，深邃如山涧流水，善引《道德经》《周易》之言。

开示规范：
- 语言：文言为主，白话辅助，约150-200字
- 风格：超然、深邃、哲理性，引导顺势而为，无为而治
- 格式：自然段落，不用标题、序号或列表
- 身份：以道长本人身份真诚开示，不提及AI
- 结尾：引用一句《道德经》或《易经》原文收尾`,
  },
  jingshui: {
    name: '静水师太',
    system: `你是静水师太，禅宗比丘尼，心如止水，禅定功深。你的开示细腻入微，善用生活禅机与禅宗公案，语气温柔而有力，如月映千江，以简洁平实之语道出深刻智慧。

开示规范：
- 语言：白话为主，清晰易懂，约150-200字
- 风格：平静、智慧、贴近生活，充满禅意
- 格式：自然段落，不用标题、序号或列表
- 身份：以师太本人身份真诚开示，不提及AI
- 结尾：以一句简短的禅语或比喻收尾`,
  },
}

function buildPrompt(type: string, data: Record<string, string>): string {
  switch (type) {
    case 'lottery':
      return `有信众前来求签，得第${data.number}签（${data.signType ?? ''}），签名为「${data.signName ?? ''}」，签诗云：
「${data.verse ?? ''}」

信众所问之事为：${data.question || '前程运势与当下困惑'}。

请结合签诗含义，为这位信众解签开示，给出具体的人生指引。`

    case 'bazi':
      return `有信众前来问命，生于${data.year}年${data.month}月${data.day}日${data.hour ? data.hour + '时' : ''}，${data.gender === 'female' ? '女命' : '男命'}。请批其八字命理，点明当下运势、性格特点与近期吉凶，给出实用建议。`

    case 'dream':
      return `有信众前来解梦，其昨夜（或近日）梦境如下：
「${data.dream}」

请为其解梦，分析此梦的吉凶征兆与深层心理含义，给出相应的人生指引。`

    case 'naming':
      return `有信众新添${data.gender === 'girl' ? '千金' : '麟儿'}，姓${data.surname}，希望名字寓意：${data.wishes || '平安健康、前程锦绣'}。请赐予三个吉祥好名，每个名字后简述其字义、寓意与五行特点。`

    case 'divination':
      return `有信众以六爻法起卦，所问之事：${data.question || ''}。以卦象${data.hexagram || ''}为据，请解卦开示，分析卦象含义，指明应对之道。`

    case 'palmistry':
      return `有信众前来看手相，其掌纹描述如下：${data.description || ''}。请据此分析其命运走向、性格特质与人生注意事项，给出具体指引。`

    default:
      return data.question || '请为信众开示一句充满智慧的话，鼓励其在生活中保持正念，积善行德。'
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json() as {
      type?: string
      data?: Record<string, string>
      masterKey?: string
    }

    const { type = 'general', data = {}, masterKey = 'huiming' } = body
    const validKey = (masterKey in MASTERS ? masterKey : 'huiming') as MasterKey
    const master = MASTERS[validKey]
    const prompt = buildPrompt(type, data)

    const result = streamText({
      model: 'openai/gpt-4o-mini',
      system: master.system,
      prompt,
      maxOutputTokens: 450,
      temperature: 0.8,
    })

    return result.toTextStreamResponse()
  } catch {
    return new Response('开示暂时无法送达，愿您保持平静之心，稍后再问。', { status: 500 })
  }
}
