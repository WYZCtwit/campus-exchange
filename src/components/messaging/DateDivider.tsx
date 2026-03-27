interface DateDividerProps {
  date: string
}

/**
 * DateDivider - 日期分割线组件
 *
 * 在消息列表中显示日期分割，用于区分不同日期的消息
 * 对齐 chat.html UI 模板中的日期分割线样式
 */
function DateDivider({ date }: DateDividerProps) {
  return (
    <div className="flex justify-center my-4">
      <span className="px-4 py-1 bg-surface-container-low text-on-surface-variant text-xs font-bold rounded-full uppercase tracking-widest">
        {date}
      </span>
    </div>
  )
}

export default DateDivider
