import { useNavigate } from 'react-router-dom'
import {
  ProfileTopBar,
  ProfileHeader,
  BentoGrid,
  StatsOverview,
  SkillsSection,
  ParticipationsSection,
} from './ProfileComponents'

// Mock data - 后续从 API 获取
const profileData = {
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBOYcCBF98Y2F1MqSAXIS4fsAHnHlKv05DRAbbpKiRK7o4ieU7zRUKnFCdV2dXNq9P0NWxZDjjYId5x73YBjyzWWOx_HKey6Vo_MCVRD_uIXX2Lpr4cs3NVErXMt6Ff3bch9SYHsw41Vc-ECgsoGsO_SHVLjYPydvXATYfK8MPjl3UpMsSY7UW0M3k6n5-lEykJGLZx54S9kpYw3I8itljQ9QN7g79QJRmAbJmA1kscviZ2A-b8tx0TEM-GIeA0H1GOl4J8ZJ0b0l_',
  name: 'Captain Chen',
  bio: '一名热爱全栈开发和竞赛的程序员。',
  major: '计算机科学',
  concentration: '系统架构',
  graduationYear: 2025,
  grade: '大四',
  stats: [
    { value: 12, label: '项目' },
    { value: '450+', label: 'LeetCode' },
    { value: 3, label: '实习' },
    { value: 18, label: '奖项' },
  ],
  skills: [
    { name: 'C++ 专家', color: 'primary' as const },
    { name: '算法策略', color: 'secondary' as const },
    { name: '前端开发', color: 'tertiary' as const },
    { name: '后端工程师', color: 'error' as const },
  ],
  participations: [
    {
      id: '1',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCyKg1pVPFbqOQVVADpsfWg9JYDZX0RO_idNR0QJfvefRrQppJNfcSaKPqACvSgYzQpsHswOsiSfPWcIU9X3YwJT-v7yuByF43ZMn7FE5cDQoUaVIafsx7OfvGltL-_A-29bYS8Ig7fH-qUA5Jk7b5wKjbyZ2R4XAyOMl63mcheDWFaCprZNQZgUNcDiLR1cMVU3vgwYPLc_2eLKBXW3igMK6ainfI48h0sxjtW_1TBFy-Nf9782nlHbQB8AM8Z2X8OGQEMJGuf5P1',
      type: '比赛',
      typeColor: 'primary' as const,
      title: 'ACM 国际大学生程序设计竞赛',
      role: '队长',
      location: '区域赛',
    },
    {
      id: '2',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmJGAzMMHLZNczwqSeCK1z2GV_hj1ZZLoEfGM93iYKCPkl3wFiNZY7Rfii9stPMsvuGltVS2WOgW4EOGbXFtte0eFpohIxS6VvVw1f3dvESrvC0XWkzmuu7niTyiAb-HIOY2Bt8GZDD9698DhWTDpmKfqeOfZxgPHPQW473muHzhaBfLx2kXk9FVki3JTnFnvSvDmzOiyKU4B0Ezlww7GFKbMFLIgjvSlYAAB2PIDSldDie-SbBcbu9Cees16Jgc6xCJivKDLhKyox',
      type: '案例研究',
      typeColor: 'secondary' as const,
      title: '全球商业战略挑战赛',
      role: '技术顾问',
      location: '国际',
    },
  ],
}

function Profile() {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  const handleSettings = () => {
    // TODO: Navigate to settings page
    console.log('Navigate to settings')
  }

  const handleViewCerts = () => {
    // TODO: Navigate to certificates page
    console.log('Navigate to certificates')
  }

  return (
    <>
      <ProfileTopBar onBack={handleBack} onSettings={handleSettings} />
      <main className="pt-24 px-6 pb-32 max-w-5xl mx-auto space-y-10">
        <ProfileHeader
          avatarUrl={profileData.avatarUrl}
          name={profileData.name}
          bio={profileData.bio}
        />
        <BentoGrid
          major={profileData.major}
          concentration={profileData.concentration}
          graduationYear={profileData.graduationYear}
          grade={profileData.grade}
        />
        <StatsOverview stats={profileData.stats} />
        <SkillsSection skills={profileData.skills} onViewCerts={handleViewCerts} />
        <ParticipationsSection participations={profileData.participations} />
      </main>
    </>
  )
}

export default Profile
