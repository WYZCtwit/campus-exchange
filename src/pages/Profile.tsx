function Profile() {
  return (
    <div className="px-6 space-y-6 max-w-2xl mx-auto">
      {/* Profile Header */}
      <div className="bg-surface-container-lowest rounded-lg p-6 shadow-card text-center">
        <div className="w-24 h-24 rounded-full bg-surface-container-high mx-auto overflow-hidden ring-4 ring-white shadow-lg">
          <img
            className="w-full h-full object-cover"
            src="/placeholder-avatar.jpg"
            alt="User avatar"
          />
        </div>
        <h2 className="text-2xl font-headline font-bold text-on-surface mt-4">
          Captain Chen
        </h2>
        <p className="text-on-surface-variant mt-2">
          一名热爱全栈开发的程序员
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-surface-container-lowest rounded-lg p-4 text-center shadow-card">
          <div className="text-2xl font-bold text-primary">12</div>
          <div className="text-sm text-on-surface-variant">项目</div>
        </div>
        <div className="bg-surface-container-lowest rounded-lg p-4 text-center shadow-card">
          <div className="text-2xl font-bold text-secondary">28</div>
          <div className="text-sm text-on-surface-variant">交易</div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="bg-surface-container-lowest rounded-lg shadow-card overflow-hidden">
        <MenuItem icon="auto_awesome" label="我的技能服务" />
        <MenuItem icon="inventory_2" label="我的物品" />
        <MenuItem icon="receipt_long" label="我的订单" />
        <MenuItem icon="groups" label="我的组队" />
        <MenuItem icon="settings" label="设置" showDivider={false} />
      </div>
    </div>
  )
}

interface MenuItemProps {
  icon: string
  label: string
  showDivider?: boolean
}

function MenuItem({ icon, label, showDivider = true }: MenuItemProps) {
  return (
    <>
      <button className="w-full flex items-center gap-4 px-6 py-4 hover:bg-surface-container-low active:bg-surface-container transition-colors">
        <span className="material-symbols-outlined text-primary">{icon}</span>
        <span className="font-medium text-on-surface">{label}</span>
        <span className="material-symbols-outlined text-outline ml-auto">chevron_right</span>
      </button>
      {showDivider && <div className="h-px bg-outline-variant/20 mx-6" />}
    </>
  )
}

export default Profile
