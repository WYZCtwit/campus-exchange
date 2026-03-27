/**
 * TypingIndicator - 打字指示器组件
 *
 * 显示对方正在输入的动画指示器
 * 对齐 chat.html UI 模板中的打字指示器样式
 */
function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 px-11 opacity-60">
      <div className="w-1.5 h-1.5 bg-on-surface-variant rounded-full animate-bounce" />
      <div
        className="w-1.5 h-1.5 bg-on-surface-variant rounded-full animate-bounce"
        style={{ animationDelay: '0.2s' }}
      />
      <div
        className="w-1.5 h-1.5 bg-on-surface-variant rounded-full animate-bounce"
        style={{ animationDelay: '0.4s' }}
      />
    </div>
  )
}

export default TypingIndicator
