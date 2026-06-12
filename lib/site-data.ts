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

export type MasterKey = 'huiming' | 'xuanyi' | 'jingshui'

export type Master = {
  key: MasterKey
  name: string
  title: string
  style: string
  desc: string
}

export const MASTERS: Master[] = [
  {
    key: 'huiming',
    name: '慧明法师',
    title: '净土宗 · 稳重派',
    style: '温厚慈悲',
    desc: '法龄三十余年，常住菩提苑主持法事。开示温厚慈悲，善以《金刚经》《心经》智慧引导。',
  },
  {
    key: 'xuanyi',
    name: '玄一道长',
    title: '道家玄学 · 直爽派',
    style: '超然深邃',
    desc: '道家玄学传人，精通易经八卦、天干地支与命理。开示超然物外，引《道德经》《周易》之言。',
  },
  {
    key: 'jingshui',
    name: '静水师太',
    title: '禅宗 · 慈悲派',
    style: '平实智慧',
    desc: '禅宗比丘尼，心如止水，禅定功深。开示细腻入微，善用生活禅机与禅宗公案。',
  },
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
