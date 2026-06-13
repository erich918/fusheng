import {
  Heart,
  CalendarDays,
  ScrollText,
  Sparkles,
  Moon,
  Hand,
  Baby,
  Coins,
  Flower2,
  type LucideIcon,
} from 'lucide-react'

export type Gate = {
  slug: string
  title: string
  desc: string
  icon: LucideIcon
  href: string
}

export const GATES: Gate[] = [
  {
    slug: 'qifu',
    title: '为家人祈福',
    desc: '点一盏灯，挂家人之名，愿心愿成就，福寿安康。',
    icon: Heart,
    href: '/qifu',
  },
  {
    slug: 'huangli',
    title: '今日黄历',
    desc: '宜忌吉凶，时辰方位，循古法择吉而行。',
    icon: CalendarDays,
    href: '/huangli',
  },
  {
    slug: 'jiemeng',
    title: '周公解梦',
    desc: '夜来一梦，吉凶难辨，师父为你析其深意。',
    icon: Moon,
    href: '/jiemeng',
  },
  {
    slug: 'lingqian',
    title: '关帝灵签',
    desc: '心诚则灵，求得一签，听师父解签开示。',
    icon: ScrollText,
    href: '/lingqian',
  },
  {
    slug: 'bazi',
    title: '八字精批',
    desc: '以《渊海子平》为据，排盘批命，点明运势。',
    icon: Sparkles,
    href: '/bazi',
  },
  {
    slug: 'liuyao',
    title: '六爻占卜',
    desc: '一事一卦，以铜钱起卦，师父解卦指迷津。',
    icon: Coins,
    href: '/liuyao',
  },
  {
    slug: 'shouxiang',
    title: '手相图解',
    desc: '掌纹之中藏命数，三大主线，细看人生走向。',
    icon: Hand,
    href: '/shouxiang',
  },
  {
    slug: 'qiming',
    title: '宝宝起名',
    desc: '依五行八字，取吉祥好名，寓意深远绵长。',
    icon: Baby,
    href: '/qiming',
  },
  {
    slug: 'chanzuo',
    title: '静心禅坐',
    desc: '调息观心，静坐片刻，让浮躁归于宁静。',
    icon: Flower2,
    href: '/chanzuo',
  },
]

export type MasterKey = 'huiming' | 'mingxin' | 'xuanzhen'

export type Master = {
  key: MasterKey
  name: string
  title: string
  emoji: string
  style: string
  desc: string
}

export const MASTERS: Master[] = [
  {
    key: 'huiming',
    name: '慧明长老',
    title: '古寺住持',
    emoji: '🧘',
    style: '庄重持重，引经据典',
    desc: '通读《渊海子平》《滴天髓》，言语稳重克制。适合希望深度解读、看古籍出处的施主。',
  },
  {
    key: 'mingxin',
    name: '明心师父',
    title: '尼众法师',
    emoji: '🙏',
    style: '慈悲温柔，劝人向善',
    desc: '语调温和，慈悲为怀。适合家庭、感情、亲人祈福场景。',
  },
  {
    key: 'xuanzhen',
    name: '玄真道长',
    title: '山中道人',
    emoji: '☯️',
    style: '直爽通透，说大白话',
    desc: '山中道人，不爱绕弯子。把命理讲成大白话，适合急性子。',
  },
]

export type Relation = { id: string; label: string }

export const RELATIONS: Relation[] = [
  { id: 'father', label: '父亲' },
  { id: 'mother', label: '母亲' },
  { id: 'lover', label: '爱人' },
  { id: 'child', label: '孩子' },
  { id: 'grandchild', label: '孙辈' },
  { id: 'friend', label: '朋友' },
  { id: 'self', label: '自己' },
]

export type PrayerLamp = {
  id: string
  name: string
  desc: string
}

export const PRAYER_LAMPS: PrayerLamp[] = [
  { id: 'qingxin', name: '清心灯', desc: '祈愿身心安宁、烦恼消解' },
  { id: 'zhihui', name: '智慧灯', desc: '祈愿学业精进、心智明朗' },
  { id: 'changshou', name: '长寿灯', desc: '祈愿身体康健、福寿绵长' },
  { id: 'pingan', name: '平安灯', desc: '祈愿出入平安、家宅安宁' },
  { id: 'yinyuan', name: '姻缘灯', desc: '祈愿良缘早至、感情和顺' },
  { id: 'caifu', name: '财福灯', desc: '祈愿财源广进、生意顺遂' },
]

export type PrayerDuration = {
  id: string
  label: string
  price: number
}

export const PRAYER_DURATIONS: PrayerDuration[] = [
  { id: 'month', label: '一月供奉', price: 3.9 },
  { id: 'hundred', label: '百日供奉', price: 5.9 },
  { id: 'year', label: '一年供奉', price: 9.9 },
  { id: 'forever', label: '永久长明', price: 19.9 },
]

export const SHICHEN = [
  '子时 (23:00-01:00)',
  '丑时 (01:00-03:00)',
  '寅时 (03:00-05:00)',
  '卯时 (05:00-07:00)',
  '辰时 (07:00-09:00)',
  '巳时 (09:00-11:00)',
  '午时 (11:00-13:00)',
  '未时 (13:00-15:00)',
  '申时 (15:00-17:00)',
  '酉时 (17:00-19:00)',
  '戌时 (19:00-21:00)',
  '亥时 (21:00-23:00)',
]

export const CLASSICS = [
  '渊海子平',
  '三命通会',
  '滴天髓',
  '穷通宝鉴',
  '子平真诠',
  '周易',
]

export type LotterySign = {
  number: number
  signType: string
  signName: string
  verse: string
}

export const LOTTERY_SIGNS: LotterySign[] = [
  { number: 1, signType: '上签', signName: '渭水访贤', verse: '巍巍独步向云间，玉殿千官第一班；富贵荣华天付汝，福如东海寿如山。' },
  { number: 7, signType: '上签', signName: '相如完璧', verse: '一片彩霞当面来，乘风车马上天台；前途路上多亨泰，万里风云去复回。' },
  { number: 13, signType: '中签', signName: '武吉遇师', verse: '一江春水向东流，须问归舟早转头；莫待狂风波浪起，扁舟难过水悠悠。' },
  { number: 19, signType: '中签', signName: '子陵归山', verse: '云开月出正分明，不用谋为不用求；恰似浮云遮月色，待他风扫一天清。' },
  { number: 24, signType: '中签', signName: '苏秦背剑', verse: '宽心且看月中桂，云开万里见嫦娥；前途自有通霄路，何必碌碌怨蹉跎。' },
  { number: 33, signType: '下签', signName: '陶渊归隐', verse: '欲求胜事可非常，争奈亲姑不主张；积善之门生贵子，时来终遇得明良。' },
  { number: 41, signType: '下签', signName: '苏武牧羊', verse: '今行到手实难推，间隔中间多阻碍；若得贵人来指引，那时财帛亦丰隆。' },
  { number: 60, signType: '上签', signName: '蟠桃献寿', verse: '镜内观形不用猜，雕成宝鉴出尘埃；天边自有龙门路，且向其中款款来。' },
]

export type BlessingType = { id: string; label: string }

export const blessingTypes: BlessingType[] = [
  { id: 'health', label: '身体安康' },
  { id: 'peace', label: '阖家平安' },
  { id: 'study', label: '学业有成' },
  { id: 'career', label: '事业顺遂' },
  { id: 'wealth', label: '财运亨通' },
  { id: 'love', label: '姻缘美满' },
]

export const ZEN_QUOTES = [
  '善念起于心，福缘自然生。一念清净，万物皆宁。',
  '菩提本无树，明镜亦非台。本来无一物，何处惹尘埃。',
  '命自我立，福自我求。诸恶莫作，众善奉行。',
]

// 解梦 —— 分类
export type DreamCategory = { emoji: string; label: string }

export const DREAM_CATEGORIES: DreamCategory[] = [
  { emoji: '👥', label: '人物' },
  { emoji: '🫀', label: '身体' },
  { emoji: '🐎', label: '动物' },
  { emoji: '🌿', label: '植物' },
  { emoji: '🌤', label: '天象自然' },
  { emoji: '📿', label: '物品' },
  { emoji: '🏠', label: '房舍宅院' },
  { emoji: '🕯', label: '生死婚丧' },
  { emoji: '🚶', label: '行为' },
  { emoji: '🙏', label: '鬼神宗教' },
  { emoji: '💰', label: '财运钱帛' },
]

// 解梦 —— 热门梦境
export type DreamEntry = { title: string; rating: string; desc: string }

export const DREAM_ENTRIES: DreamEntry[] = [
  { title: '梦见贵人', rating: '上上', desc: '事业上将遇贵人扶持，或得到上级器重。' },
  { title: '梦见父母', rating: '上吉', desc: '近期家中诸事顺遂，家人安康。若双亲已故，则提示需多缅怀祭祀。' },
  { title: '梦见孩子', rating: '中吉', desc: '象征新的开始与希望。怀孕者梦此为胎气稳固，未孕者主未来三月有喜事。' },
  { title: '梦见已故亲人', rating: '上吉', desc: '已故亲人入梦多为思念所致，亦为先祖庇佑之兆。若亡者面色和悦，家中将逢喜事。' },
  { title: '梦见僧人', rating: '上吉', desc: '象征心灵将得开悟，迷茫之事将有指引。亦为虔诚信佛者之吉兆。' },
  { title: '梦见自己死了', rating: '上上', desc: '梦中死亡是"重生"的象征，旧的告一段落，新的将启。莫怕。' },
  { title: '梦见亲戚', rating: '中吉', desc: '近期可能有久未联系之亲戚相聚。彼此应多走动，互相扶持。' },
  { title: '梦见陌生人', rating: '中平', desc: '提示生活中将有新缘分到来，可能是贵人或新友。需明辨善恶。' },
  { title: '梦见头发', rating: '中平', desc: '白发主长寿与智慧；脱发反而是烦恼脱落、轻装前行之意。' },
  { title: '梦见掉牙', rating: '中平', desc: '传统认为掉牙主长辈安康。现代心理学解为压力释放或对衰老的担忧，不必过虑。' },
  { title: '梦见眼睛', rating: '中吉', desc: '象征对事物有新洞察。若梦中视物不清，则提示当下判断需谨慎。' },
  { title: '梦见流血', rating: '上吉', desc: '鲜血在解梦学中反主财运将至，尤其大量流血更佳。莫被字面吓到。' },
]

// 起名 —— 风格偏好
export const NAMING_STYLES = ['诗意', '刚毅', '儒雅', '清逸', '典雅', '温润']

// 起名 —— 卖点
export const NAMING_HIGHLIGHTS = [
  '真排八字 · 平衡五行：补喜忌、避冲克',
  '字字考究 · 古籍典出：《诗经》《楚辞》《论语》',
  '音韵铿锵 · 笔画吉数：避同音、忌生僻',
  '完整 30 个候选：每名附释义 / 五行 / 出处',
]

// 静心禅坐 —— 禅音曲库
export type ZenTrack = { emoji: string; title: string; sub: string; meta: string }

export const ZEN_TRACKS: ZenTrack[] = [
  { emoji: '🪷', title: '菩提苑主题曲', sub: '金光普照·寺院庄严', meta: '2:57 · 项目原创' },
  { emoji: '🌿', title: '菩提苑', sub: '苑中清雅·万缘澄定', meta: '2:51 · 项目原创' },
  { emoji: '🪷', title: '菩提苑·轻音乐', sub: '轻柔禅意·心境清明', meta: '3:15 · 项目原创' },
  { emoji: '🛶', title: '菩提苑·渡尘缘', sub: '渡过尘缘·返照本心', meta: '3:39 · 项目原创' },
  { emoji: '🌅', title: '宝殿晨曦', sub: '晨钟初响·佛光初临', meta: '2:48 · 项目原创' },
  { emoji: '🧘', title: '禅坐', sub: '结跏趺坐·身心安住', meta: '2:36 · 项目原创' },
  { emoji: '☯️', title: '禅意', sub: '万象皆禅·处处是道场', meta: '3:12 · 项目原创' },
  { emoji: '🌕', title: '琉璃月', sub: '月光琉璃·照见五蕴', meta: '3:31 · 项目原创' },
  { emoji: '🙏', title: '大悲咒', sub: '观音大悲·消业除障', meta: '4:06 · 传统佛曲' },
  { emoji: '📿', title: '心经', sub: '般若智慧·照见空性', meta: '3:55 · 传统佛曲' },
]

// 静心禅坐 —— 禅修引导
export type ZenGuide = { title: string; level: string; minutes: string; steps: string[] }

export const ZEN_GUIDES: ZenGuide[] = [
  {
    title: '十分钟入门',
    level: '适合初学者',
    minutes: '10 分钟',
    steps: [
      '盘腿端坐，背挺直',
      '深呼吸三次，吸气数 4 秒，呼气数 6 秒',
      '把注意力放在鼻尖呼吸的进出',
      '杂念升起时不评判，温柔回到呼吸',
      '结束时双手合掌，回向众生',
    ],
  },
  {
    title: '二十分钟正念',
    level: '进阶练习',
    minutes: '20 分钟',
    steps: [
      '三下吐纳调息',
      '观呼吸：注意力锁定鼻尖出入气',
      '扫描身体：从头顶到脚趾，依次放松每一处',
      '观念头来去：见妄念升起即知见，不跟随',
      '回向：愿一切众生离苦得乐',
    ],
  },
  {
    title: '南无阿弥陀佛',
    level: '持名念佛',
    minutes: '15 分钟',
    steps: [
      '盘坐，掐念珠或合掌',
      '心中默念或低声出声「南无阿弥陀佛」六字',
      '字字分明、心心相续',
      '杂念起时不理会，回到佛号',
      '收摄身心，回向法界众生',
    ],
  },
]

// 上香 —— 香品
export const INCENSE_TYPES = ['檀香', '沉香', '安神香']

// 上香 —— 功德榜
export type MeritRankItem = { rank: number; name: string; merit: number; level: string }

export const MERIT_RANKS: MeritRankItem[] = [
  { rank: 1, name: '善***2', merit: 320, level: '居士' },
  { rank: 2, name: '善***0', merit: 125, level: '居士' },
  { rank: 3, name: '善***1', merit: 60, level: '善信' },
  { rank: 4, name: '善***0', merit: 60, level: '善信' },
  { rank: 5, name: '善***9', merit: 30, level: '善信' },
  { rank: 6, name: '善***9', merit: 30, level: '善信' },
  { rank: 7, name: '善***1', merit: 15, level: '善信' },
  { rank: 8, name: '善***0', merit: 15, level: '善信' },
  { rank: 9, name: '善***6', merit: 15, level: '善信' },
  { rank: 10, name: '善***0', merit: 15, level: '善信' },
]
