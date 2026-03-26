function Chat() {
  return (
    <div className="px-6 space-y-6 max-w-3xl mx-auto min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <h1 className="font-headline font-bold text-xl text-on-surface">
          Messages
        </h1>
      </div>

      {/* Search */}
      <div className="relative">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <span className="material-symbols-outlined text-outline">search</span>
        </div>
        <input
          className="w-full bg-surface-container-lowest border-none h-14 pl-12 pr-4 rounded-lg shadow-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-on-surface-variant/50"
          placeholder="Search chats, skills, or textbooks..."
          type="text"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        <button className="px-5 py-2 rounded-full bg-primary text-on-primary font-semibold text-sm whitespace-nowrap">
          All Chats
        </button>
        <button className="px-5 py-2 rounded-full bg-surface-container-low text-on-surface-variant font-semibold text-sm whitespace-nowrap hover:bg-surface-container-high transition-colors">
          Unread
        </button>
        <button className="px-5 py-2 rounded-full bg-surface-container-low text-on-surface-variant font-semibold text-sm whitespace-nowrap hover:bg-surface-container-high transition-colors">
          Skill Swap
        </button>
        <button className="px-5 py-2 rounded-full bg-surface-container-low text-on-surface-variant font-semibold text-sm whitespace-nowrap hover:bg-surface-container-high transition-colors">
          Marketplace
        </button>
      </div>

      {/* Conversation List Placeholder */}
      <div className="space-y-4">
        <p className="text-on-surface-variant text-center py-12">
          会话列表将在这里显示...
        </p>
      </div>
    </div>
  )
}

export default Chat
