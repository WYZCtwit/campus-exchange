import { useRef, useCallback } from 'react'

interface ImageUploaderProps {
  images: string[]
  onImagesChange: (images: string[]) => void
  maxImages?: number
}

function ImageUploader({ images, onImagesChange, maxImages = 6 }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = useCallback(
    (files: FileList | null) => {
      if (!files) return

      const newImages: string[] = []
      const remainingSlots = maxImages - images.length
      const filesToProcess = Math.min(files.length, remainingSlots)

      for (let i = 0; i < filesToProcess; i++) {
        const file = files[i]
        if (file.type.startsWith('image/')) {
          const reader = new FileReader()
          reader.onload = (e) => {
            if (e.target?.result) {
              newImages.push(e.target.result as string)
              if (newImages.length === filesToProcess) {
                onImagesChange([...images, ...newImages])
              }
            }
          }
          reader.readAsDataURL(file)
        }
      }
    },
    [images, maxImages, onImagesChange]
  )

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onImagesChange(newImages)
  }

  const renderSlot = (index: number) => {
    const hasImage = index < images.length
    const isCover = index === 0

    if (hasImage) {
      return (
        <div
          key={index}
          className={`
            relative aspect-square rounded-lg overflow-hidden cursor-pointer group
            ${isCover ? 'col-span-2 row-span-2' : ''}
          `}
          onClick={handleClick}
        >
          <img
            src={images[index]}
            alt={`Upload ${index + 1}`}
            className="w-full h-full object-cover"
          />
          {/* Delete button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleRemoveImage(index)
            }}
            className="absolute top-1 right-1 bg-black/40 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <span className="material-symbols-outlined text-white text-xs">close</span>
          </button>
          {/* Cover label */}
          {isCover && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/40 px-2 py-1">
              <span className="text-white text-xs font-medium">封面</span>
            </div>
          )}
        </div>
      )
    }

    // Empty slot
    return (
      <div
        key={index}
        onClick={handleClick}
        className={`
          aspect-square rounded-lg flex items-center justify-center cursor-pointer
          transition-all
          ${isCover
            ? 'col-span-2 row-span-2 bg-surface-container-lowest border-2 border-dashed border-outline-variant/30 hover:border-primary/50 flex-col gap-3 group'
            : 'bg-surface-container-low hover:bg-surface-container'
          }
        `}
      >
        {isCover ? (
          <>
            <div className="bg-surface-container-low p-3 rounded-full group-hover:bg-primary-container/20 transition-colors">
              <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">
                add_a_photo
              </span>
            </div>
            <span className="text-sm font-semibold text-on-surface-variant group-hover:text-primary">
              添加封面
            </span>
            <p className="text-xs text-outline">第一张图将作为主图展示</p>
          </>
        ) : (
          <span className="material-symbols-outlined text-outline-variant">add</span>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
        {/* Render all slots up to maxImages */}
        {Array.from({ length: Math.min(maxImages, 5) }).map((_, index) => renderSlot(index))}
        {/* Additional small slots if maxImages > 5 */}
        {maxImages > 5 &&
          images.length >= 5 &&
          Array.from({ length: maxImages - 5 }).map((_, index) => renderSlot(5 + index))}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFileSelect(e.target.files)}
      />

      {/* Helper text */}
      <p className="text-xs text-on-surface-variant">
        最多上传 {maxImages} 张图片，支持 JPG、PNG 格式
      </p>
    </div>
  )
}

export default ImageUploader
