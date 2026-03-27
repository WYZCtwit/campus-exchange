interface ResourceCardProps {
  title: string
  subtitle?: string
  icon?: string
  onClick?: () => void
}

/**
 * ResourceCard - 资源卡片组件
 *
 * 用于在聊天中显示分享的文件、链接等资源
 * 对齐 chat.html UI 模板中的资源卡片样式
 */
function ResourceCard({ title, subtitle, icon = 'description', onClick }: ResourceCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white border border-outline-variant/20 rounded-xl p-3 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      {/* Icon container */}
      <div className="w-12 h-12 bg-tertiary-container rounded-lg flex items-center justify-center text-on-tertiary-container flex-shrink-0">
        <span className="material-symbols-outlined">{icon}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="font-bold text-sm truncate text-on-surface">{title}</p>
        {subtitle && (
          <p className="text-xs text-on-surface-variant">{subtitle}</p>
        )}
      </div>

      {/* Download/View icon */}
      <span className="material-symbols-outlined text-on-surface-variant flex-shrink-0">
        download
      </span>
    </div>
  )
}

export default ResourceCard
