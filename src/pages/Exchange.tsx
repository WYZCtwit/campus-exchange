import { useNavigate } from 'react-router-dom'

interface MockItemCard {
  id: string
  image: string
  title: string
  price: number
  originalPrice: number | null
  condition: string
  location: string
  author: { avatar: string; name: string }
  postedAt: string
}

const mockItemCards: MockItemCard[] = [
  {
    id: '1',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD9yIyGImOd1Dh5_cFtls66e6bAkeA27cXQ7VxRoX4-Gi8DQS4ERcIIHPRwpejIS5V8cDpq_09tMYQatMgBVsQ_VJpqDaxxbyn8YA2luLnsqUMsZ0oFP2ikL0S9UyY1vJYtCVidyoJ0sLRiPPF75BIEz590OOLvLDSkqMYYnwcJBQkfjZs_nSVCQimgQE5b_m0U17urf3giPVedjuaiKfCjiYnCA994Lo2wbgrVkDF4Z0HGtLFYHfDZqH2c5mSdqQgKcTyv95F1DGW-',
    title: 'MacBook Pro 2021 M1 Pro 14寸',
    price: 6800,
    originalPrice: 14999,
    condition: '良好',
    location: '主图书馆',
    author: {
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDhPBgJr3yttgvuvUcSCyzjYRSs2-5qR5GJ9pJZz5kiX19rajaCI7RHd1jlF2IQW7_CNYgWF2zQsAdi_TRTmX_BjOrpVj9C7rmjeDnHraCZbwtL4w6JTQgt97U9psRcuEo0B_h0gcg8kPazF2zmLEa-sIHJuAlGQNuZOqOYWM8xzX9OyVOVpnaFlllOKjcGHDVQ6h7kC35nzgf6R7i-iPg3kMjLJ0cf2PZRKzyPs7O7lL1ZvVjaSABvMKJ38sgi6xrExm9WW6Oq6LNm',
      name: '王小明',
    },
    postedAt: '2小时前',
  },
  {
    id: '2',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCLPRnsTBvOnplI90r3RopPXkZvRLAk5aFEoZbOJfn2sQOeS2louXD8UIUKgs1uh6heiYLedj8EVza1mXeuDJKcWroTjL5s3Ci4qgOCd87pzjY_QErAi679df72ftQcRQACROzIPG9QsLWxWuoO3BWzKlyPaDxrKOhnetg8m4ma3Z9nGlzKnBHp14aC8sYQRVIn54wB0np8HgdurbdOpU7cAtUrjio_QeIz3VY0HR8cZ6tod9Fq0Rmgka0pZhEcA0jawa7CzoSczw-G',
    title: '考研英语全套教材',
    price: 120,
    originalPrice: 380,
    condition: '一般',
    location: '南区宿舍',
    author: {
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBWhWypK4EFR10fsUzyFPPTHiVL2KngtrWJaQEzyrjDsygG8xkm3bO6KTa0v9ouzEDEpmk4bvFLtbw5arSBs4BL6EEbMLu8gVnjSyO-evTvROmeDC_ZtM-54ckxNlomD0IoLTCBtRYPQT7cNzwkezhshEsSVIMBgbqwaMB3oSfaZpwsm7ip987eQoBo3_QABdaGGzamJ4qiGXQu84r_KlMPSKInHt1UG1t0j_DkvFWOEt2GNHIt3x5EfTyvnzC_KCJ3oyoXMImxV2nx',
      name: 'Elena_Studying',
    },
    postedAt: '5小时前',
  },
]

const conditionColors: Record<string, string> = {
  '全新': 'bg-secondary-container text-on-secondary-fixed',
  '良好': 'bg-primary-container text-on-primary-fixed',
  '一般': 'bg-tertiary-container text-on-tertiary-fixed',
}

function Exchange() {
  const navigate = useNavigate()

  return (
    <div className="px-6 space-y-8 max-w-2xl mx-auto">
      {/* Hero Section */}
      <section className="space-y-2">
        <h2 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight">
          校园集市
        </h2>
        <p className="text-on-surface-variant font-body">
          二手好物，等你来淘。
        </p>
      </section>

      {/* Item Cards */}
      <div className="space-y-4">
        {mockItemCards.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/item/${item.id}`)}
            className="group flex bg-surface-container-lowest rounded-lg p-4 gap-4 shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer"
          >
            {/* Image */}
            <div className="w-28 h-28 flex-shrink-0 rounded-md overflow-hidden">
              <img
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                src={item.image}
                alt={item.title}
              />
            </div>

            {/* Content */}
            <div className="flex-grow flex flex-col justify-between py-1">
              <div>
                <h3 className="text-base font-headline font-bold text-on-surface leading-tight mb-2 line-clamp-2">
                  {item.title}
                </h3>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-lg font-extrabold text-error">¥{item.price}</span>
                  {item.originalPrice && (
                    <span className="text-xs text-on-surface-variant line-through">
                      ¥{item.originalPrice}
                    </span>
                  )}
                </div>
                <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${conditionColors[item.condition] || 'bg-surface-variant text-on-surface-variant'}`}>
                  {item.condition}
                </span>
              </div>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-surface-container-high border border-white shadow-sm overflow-hidden">
                    <img className="w-full h-full object-cover" src={item.author.avatar} alt={item.author.name} />
                  </div>
                  <span className="text-[11px] text-on-surface-variant">{item.author.name}</span>
                </div>
                <span className="text-[10px] text-outline">{item.postedAt}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Exchange
