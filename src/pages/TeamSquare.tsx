import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TeamCard, { type TeamCardProps } from '../components/TeamCard'
import FilterBar from '../components/FilterBar'
import ApplyModal from '../components/ApplyModal'

// Mock data based on team-up.html UI template
const mockTeams: TeamCardProps[] = [
  {
    id: 1,
    title: 'ACM 国际大学生程序设计竞赛',
    type: 'competition',
    description:
      '参加ACM国际大学生程序设计竞赛，目标是冲击区域赛银牌。目前已有2人，需要算法强手和前端开发者。',
    deadline: '2024-11-15',
    rolesNeeded: ['C++ 高手', '算法策略师', '前端开发'],
    currentCount: 2,
    targetCount: 3,
    author: {
      id: 'user-1',
      nickname: 'Captain Chen',
      avatarUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCpGHuMr8T-ZQSav-MLzFCYD4I0uT0ZVS7Rnbq2nQum2FX6WIL3FrFU_nilnmNw-FrBJ7NEsAT9RhwHN1DxLhS8kc7Evfll3p4KVtOn75_AWOEwzcoiIqaXwZQaM_WpqhBg-cEmg7VStJWfbC2ccs7m3JpBb_ko4xWqvd4kdLPxYg45SnHp1nq6fclZNgwFyqLsYz97640DxVCUjXZCd53Oknu7-volEvAnJGO5wJ9d3boNrpsF-6ezotn18_KvPBNrDXkGX14PYPxC',
      department: '计算机科学',
      grade: '2025',
    },
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDdTU28qBBHmkhxiCFAY7JyPeF6BboRUkCiMeH6M5vuPKEDvOJQ9g0Yb-jME8t9GUvwsJfp8ho8zGpwZhtfj7lsBD9SQk4fomuPRLlOZzmDyn522eK2qJcsOIXiHuSu97w4rrPOUu4wnMoE0D5mi3tws6dsqa20n73OmanP_bk6lmwQqBXFLfP-dDlRSGJZ5ccvemngbbJRilKLrZbJ23SVOMueC4iDoi6CE2XiUp_-V6mPZeF5Dbr24Jw4V0Q58TKRLnkxZlO9hyVy',
  },
  {
    id: 2,
    title: '校园十佳歌手大赛 - 组合组队',
    type: 'activity',
    description: '参加校园十佳歌手大赛组合组比赛，已有主唱和吉他手，寻找键盘手和伴唱。',
    deadline: '2024-11-28',
    rolesNeeded: ['键盘手/钢琴', '伴唱/和声', '编曲指导'],
    currentCount: 2,
    targetCount: 4,
    author: {
      id: 'user-2',
      nickname: 'MusicLover_Xiao',
      avatarUrl: null,
      department: '艺术学院',
      grade: '2026',
    },
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDJOHHaqEhYz8dD7PBdXU834UXQLah5gwfsBOnP2RwnfyFxvreGWyJCFm_LTPW_G6yalmTZ8t8li6M7plx4-6BDlBQug_0L2W9wP6jWNaBSdLUDTiddEklrRteGIaf5VlYSILp7Ppfywbm2db5VYMjp5H5vAoQOsBPGa3kCJhlYoB1TCInOiKo47-TIF4Z1AoxdXbn9Buhqu18S3Bt7GEoDfnKgx73M15THOooGQvEP8ed2eHc9npi5ASVBxj--uf8JOU3kPjZDB0bX',
  },
  {
    id: 3,
    title: '创新创业项目 - 智慧校园App',
    type: 'project',
    description: '开发一款智慧校园App，参加互联网+创新创业大赛。需要产品设计、后端开发成员。',
    deadline: '2024-12-01',
    rolesNeeded: ['产品经理', '后端开发', 'UI设计师'],
    currentCount: 3,
    targetCount: 5,
    author: {
      id: 'user-3',
      nickname: 'StartupDreamer',
      avatarUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDhPBgJr3yttgvuvUcSCyzjYRSs2-5qR5GJ9pJZz5kiX19rajaCI7RHd1jlF2IQW7_CNYgWF2zQsAdi_TRTmX_BjOrpVj9C7rmjeDnHraCZbwtL4w6JTQgt97U9psRcuEo0B_h0gcg8kPazF2zmLEa-sIHJuAlGQNuZOqOYWM8xzX9OyVOVpnaFlllOKjcGHDVQ6h7kC35nzgf6R7i-iPg3kMjLJ0cf2PZRKzyPs7O7lL1ZvVjaSABvMKJ38sgi6xrExm9WW6Oq6LNm',
      department: '软件工程',
      grade: '2024',
    },
    imageUrl: null,
  },
  {
    id: 4,
    title: '数学建模国赛',
    type: 'competition',
    description: '参加全国大学生数学建模竞赛，需要擅长数学推导和论文写作的队友。',
    deadline: '2024-09-10',
    rolesNeeded: ['数学推导', '论文写作', 'MATLAB编程'],
    currentCount: 1,
    targetCount: 3,
    author: {
      id: 'user-4',
      nickname: 'MathGeek_Li',
      avatarUrl: null,
      department: '数学系',
      grade: '2025',
    },
    imageUrl: null,
  },
]

const filterOptions = [
  { value: 'all', label: '全部类型' },
  { value: 'competition', label: '竞赛' },
  { value: 'activity', label: '活动' },
  { value: 'project', label: '项目' },
]

const sortOptions = [
  { value: 'newest', label: '最新发布' },
  { value: 'deadline', label: '截止日期' },
  { value: 'members', label: '人数最多' },
]

function TeamSquare() {
  const navigate = useNavigate()
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [selectedSort, setSelectedSort] = useState('newest')
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState<TeamCardProps | null>(null)

  // Filter teams
  const filteredTeams =
    selectedFilter === 'all' ? mockTeams : mockTeams.filter((team) => team.type === selectedFilter)

  // Sort teams
  const sortedTeams = [...filteredTeams].sort((a, b) => {
    switch (selectedSort) {
      case 'deadline':
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      case 'members':
        return b.currentCount - a.currentCount
      case 'newest':
      default:
        return b.id - a.id
    }
  })

  const handleCardClick = (team: TeamCardProps) => {
    navigate(`/teams/${team.id}`)
  }

  const handleApplyClick = (team: TeamCardProps) => {
    setSelectedTeam(team)
    setModalOpen(true)
  }

  const handleApplySubmit = (data: { reason: string; role: string; wechatContact: string }) => {
    console.log('Apply submitted:', { teamId: selectedTeam?.id, ...data })
    // TODO: Submit application to database
    setModalOpen(false)
    // Show success toast or notification
  }

  return (
    <div className="px-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-on-surface mb-2 font-headline">
            组队广场
          </h1>
          <p className="text-on-surface-variant font-medium">
            寻找志同道合的队友，共赴学术、竞赛与活动之约
          </p>
        </div>
        <FilterBar
          filterOptions={filterOptions}
          sortOptions={sortOptions}
          selectedFilter={selectedFilter}
          selectedSort={selectedSort}
          onFilterChange={setSelectedFilter}
          onSortChange={setSelectedSort}
        />
      </header>

      {/* Team List */}
      <section className="space-y-6 pb-8">
        {sortedTeams.length === 0 ? (
          <div className="text-center py-16">
            <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 mb-4 block">
              search
            </span>
            <p className="text-on-surface-variant">暂无符合条件的组队信息</p>
          </div>
        ) : (
          sortedTeams.map((team) => (
            <TeamCard
              key={team.id}
              {...team}
              onClick={() => handleCardClick(team)}
              onApply={() => handleApplyClick(team)}
            />
          ))
        )}
      </section>

      {/* Apply Modal */}
      {selectedTeam && (
        <ApplyModal
          isOpen={modalOpen}
          teamTitle={selectedTeam.title}
          rolesNeeded={selectedTeam.rolesNeeded}
          onClose={() => setModalOpen(false)}
          onSubmit={handleApplySubmit}
        />
      )}
    </div>
  )
}

export default TeamSquare
