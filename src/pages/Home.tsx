import SkillCard, { type SkillCardProps } from '../components/SkillCard'

// Mock data based on home-exchange.html UI template
const mockSkillCards: SkillCardProps[] = [
  {
    id: '1',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPlel69wmZoae5kOP3rda5q5ikArFmG_0gfznm3n1VN7MwtnNu88kT7xrzIie6ZfB6_ZkWhA-3vOuD0Fj1tNCx2cofVMy9rWLI3hIU1ZVF3bP-p1nsV5tH-WpjFdVKUJfYmFEI-fDXPCKNWQEZ87YFUmTkBVN1zwYuoqKnYWv8Gndx4IxAvBNwV-Ni0CV7thR92HT2JmjxuhiZ8y935tF7ExL3m3oaQLhKBBYc7lCkAm_qW6pnLDIeuqXQa_QO5Cp3XVvJ3wuv3Vpa',
    imageAlt: 'Close-up of a high-end laptop showing clean Python code with colorful syntax highlighting in a dark room',
    tags: [
      { label: 'Coding', variant: 'primary' },
      { label: 'Design', variant: 'secondary' },
    ],
    title: 'Python编程 换 UI设计指导',
    offerDescription: '爬虫实战、数据分析',
    wantDescription: 'Figma基础、组件库搭建',
    author: {
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhPBgJr3yttgvuvUcSCyzjYRSs2-5qR5GJ9pJZz5kiX19rajaCI7RHd1jlF2IQW7_CNYgWF2zQsAdi_TRTmX_BjOrpVj9C7rmjeDnHraCZbwtL4w6JTQgt97U9psRcuEo0B_h0gcg8kPazF2zmLEa-sIHJuAlGQNuZOqOYWM8xzX9OyVOVpnaFlllOKjcGHDVQ6h7kC35nzgf6R7i-iPg3kMjLJ0cf2PZRKzyPs7O7lL1ZvVjaSABvMKJ38sgi6xrExm9WW6Oq6LNm',
      name: 'Zhang.Dev',
    },
    postedAt: '2小时前',
  },
  {
    id: '2',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLPRnsTBvOnplI90r3RopPXkZvRLAk5aFEoZbOJfn2sQOeS2louXD8UIUKgs1uh6heiYLedj8EVza1mXeuDJKcWroTjL5s3Ci4qgOCd87pzjY_QErAi679df72ftQcRQACROzIPG9QsLWxWuoO3BWzKlyPaDxrKOhnetg8m4ma3Z9nGlzKnBHp14aC8sYQRVIn54wB0np8HgdurbdOpU7cAtUrjio_QeIz3VY0HR8cZ6tod9Fq0Rmgka0pZhEcA0jawa7CzoSczw-G',
    imageAlt: 'Close-up of organized handwritten academic notes with colorful highlights and a cup of fresh coffee on a wooden table',
    tags: [
      { label: 'Academic', variant: 'tertiary' },
      { label: 'Life', variant: 'primary' },
    ],
    title: '期末笔记 换 冰美式咖啡',
    offerDescription: '微积分/线性代数精编笔记',
    wantDescription: '任意咖啡店大杯冰美式',
    author: {
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWhWypK4EFR10fsUzyFPPTHiVL2KngtrWJaQEzyrjDsygG8xkm3bO6KTa0v9ouzEDEpmk4bvFLtbw5arSBs4BL6EEbMLu8gVnjSyO-evTvROmeDC_ZtM-54ckxNlomD0IoLTCBtRYPQT7cNzwkezhshEsSVIMBgbqwaMB3oSfaZpwsm7ip987eQoBo3_QABdaGGzamJ4qiGXQu84r_KlMPSKInHt1UG1t0j_DkvFWOEt2GNHIt3x5EfTyvnzC_KCJ3oyoXMImxV2nx',
      name: 'Elena_Studying',
    },
    postedAt: '5分钟前',
  },
  {
    id: '3',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcAtRdkeXaEdUghQYXWDvOIqaHtiUlJYaQcMlv36Ffc1lwE4R5jq_3MYu3CZYv96ZHHA9MBmBGk7bEuuK2o_px_sUHPlLx5O3TXol9YREqFkQkTc-6svazC361HEg4yWMuZh4PZXEKHZTWpOyjjubdZm1TortPa4mzglZfLfZwvmqeLEW2WGpSPjVEqTiFRyjZnxSQM7GtJ1YMmKTiUSzfp2VeLTZwPkQ4pw2q9JlDI2NHG76lMtcWas_I4TVVOTgBVdQSSczP-fDC',
    imageAlt: 'Acoustic guitar neck with shallow depth of field in a warm cozy bedroom studio',
    tags: [
      { label: 'Art', variant: 'secondary' },
      { label: 'Media', variant: 'tertiary' },
    ],
    title: '吉他弹唱 换 摄影后期',
    offerDescription: '流行吉他弹唱、和弦入门',
    wantDescription: 'Lightroom/PS调色教程',
    author: {
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2RUIy8datXE58gG5Ls8TxqSsX53JpVIyhoCr1HHaDvcCHoEGBRQwzI4BS2pv-OWisuw5OXK7BzL5jZNTL9LLOynOJspWTeH7S5mGpO9grlGrwYJ_6JY11M8DP9H0T8HwZAIkGvsNQX3jVm7TIEMQ9N4odVIEe20j2KIbl9QQ3UbBRN2Jcvglqieuy8SolClIXKav7eaHY8ex_aU7Dx28SbPrlJKQXPGtl_v1a7TrBvl8wpaNblLeRhRFO0pKEBSYKwb8nS2WtpU9C',
      name: 'Leo_Vibes',
    },
    postedAt: '12:30',
  },
]

function Home() {
  const handleCardClick = (id: string) => {
    console.log('Card clicked:', id)
    // TODO: Navigate to skill detail page
  }

  return (
    <div className="px-6 space-y-8 max-w-2xl mx-auto">
      {/* Hero Section */}
      <section className="space-y-2">
        <h2 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight">
          发现身边的宝藏技能
        </h2>
        <p className="text-on-surface-variant font-body">
          在校园里，每个人都是彼此的老师。
        </p>
      </section>

      {/* Skill Exchange Feed */}
      <div className="space-y-6">
        {mockSkillCards.map((card) => (
          <SkillCard
            key={card.id}
            {...card}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
