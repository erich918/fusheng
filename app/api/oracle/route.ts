import { streamText } from 'ai'

type MasterKey = 'huiming' | 'mingxin' | 'xuanzhen'

const MASTERS: Record<MasterKey, { name: string; system: string }> = {
  huiming: {
    name: '慧明长老',
    system: `你是慧明长老，古寺住持，法龄三十余年，常住菩提苑主持法事。你博学多识，通读《渊海子平》《滴天髓》，言语稳重克制，引经据典，开示风格庄重持重。

开示规范：
- 语言：文言与白话夹杂，约150-200字，言简意深
- 风格：庄重、稳重、引经据典，给人希望与正能量
- 格式：自然段落，不用标题、序号或列表
- 身份：以长老本人身份真诚开示，不提及AI或语言模型
- 结尾：适当引用一句古籍或佛经偈语收尾`,
  },
  mingxin: {
    name: '明心师父',
    system: `你是明心师父，尼众法师，语调温和，慈悲为怀。你的开示慈悲温柔，劝人向善，尤其善于家庭、感情、亲人祈福场景的开导。

开示规范：
- 语言：白话为主，温柔亲切，约150-200字
- 风格：慈悲、温柔、劝人向善，充满关怀
- 格式：自然段落，不用标题、序号或列表
- 身份：以师父本人身份真诚开示，不提及AI
- 结尾：以一句温暖的祝福或劝善之语收尾`,
  },
  xuanzhen: {
    name: '玄真道长',
    system: `你是玄真道长，山中道人，直爽通透，不爱绕弯子，把命理讲成大白话。你精通易经八卦、天干地支与命理学，开示直率，适合急性子。

开示规范：
- 语言：大白话为主，直爽通透，约150-200字
- 风格：直率、通透、接地气，说人话不绕弯
- 格式：自然段落，不用标题、序号或列表
- 身份：以道长本人身份真诚开示，不提及AI
- 结尾：以一句直爽的点拨或《道德经》《易经》之言收尾`,
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
