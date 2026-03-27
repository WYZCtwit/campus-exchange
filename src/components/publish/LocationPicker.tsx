import { useState } from 'react'

interface LocationPickerProps {
  value: string
  onChange: (location: string) => void
}

// Common campus locations
const commonLocations = [
  '图书馆主馆一楼咖啡厅',
  '学生食堂门口',
  '教学楼大厅',
  '体育馆门口',
  '宿舍楼下',
  '校门口',
]

function LocationPicker({ value, onChange }: LocationPickerProps) {
  const [showInput, setShowInput] = useState(false)
  const [customLocation, setCustomLocation] = useState('')

  const handleSelectCommon = (location: string) => {
    onChange(location)
    setShowInput(false)
  }

  const handleCustomSubmit = () => {
    if (customLocation.trim()) {
      onChange(customLocation.trim())
      setCustomLocation('')
      setShowInput(false)
    }
  }

  return (
    <section className="bg-surface-container-lowest rounded-lg p-6 shadow-card border border-outline-variant/10">
      <div className="flex items-center gap-3 mb-4">
        <span className="material-symbols-outlined text-error">location_on</span>
        <h2 className="text-lg font-headline font-extrabold tracking-tight">自提地点</h2>
      </div>

      {value && !showInput ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-surface-container-low rounded-sm px-4 py-3">
            <span className="font-semibold text-on-surface truncate">{value}</span>
            <button
              onClick={() => setShowInput(true)}
              className="text-primary text-sm font-medium hover:underline"
            >
              更换
            </button>
          </div>
          {/* Quick change options */}
          <div className="flex flex-wrap gap-2">
            {commonLocations.slice(0, 3).map((loc) => (
              <button
                key={loc}
                onClick={() => handleSelectCommon(loc)}
                className={`
                  text-xs px-3 py-1.5 rounded-full transition-colors
                  ${
                    loc === value
                      ? 'bg-primary text-white'
                      : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                  }
                `}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>
      ) : showInput ? (
        <div className="space-y-3">
          <input
            type="text"
            value={customLocation}
            onChange={(e) => setCustomLocation(e.target.value)}
            placeholder="输入自定义地点..."
            className="w-full bg-surface-container-low border-none rounded-sm px-4 py-3 focus:ring-2 focus:ring-primary/30 transition-all text-on-surface"
            autoFocus
          />
          <div className="flex gap-2">
            <button
              onClick={() => setShowInput(false)}
              className="px-4 py-2 rounded-full text-on-surface-variant hover:bg-surface-container transition-colors"
            >
              取消
            </button>
            <button
              onClick={handleCustomSubmit}
              className="px-4 py-2 rounded-full bg-primary text-white font-semibold"
            >
              确定
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Common locations grid */}
          <div className="grid grid-cols-2 gap-2">
            {commonLocations.map((loc) => (
              <button
                key={loc}
                onClick={() => handleSelectCommon(loc)}
                className="text-left px-4 py-3 rounded-sm bg-surface-container-low hover:bg-surface-container transition-colors text-sm font-medium"
              >
                {loc}
              </button>
            ))}
          </div>
          {/* Custom location option */}
          <button
            onClick={() => setShowInput(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-sm border-2 border-dashed border-outline-variant/30 hover:border-primary/50 transition-colors text-on-surface-variant"
          >
            <span className="material-symbols-outlined text-sm">edit_location</span>
            <span className="text-sm font-medium">自定义地点</span>
          </button>
        </div>
      )}
    </section>
  )
}

export default LocationPicker
