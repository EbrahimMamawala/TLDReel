interface TopicButtonProps {
    content: string
    rowIndex: number
    isSelected: boolean
    onClick: () => void
  }
  
  const getBgColor = (rowIndex: number, isSelected: boolean) => {
    if (!isSelected) return "bg-transparent"
    switch (rowIndex) {
      case 0:
        return "bg-green-100"
      case 1:
        return "bg-yellow-100"
      case 2:
        return "bg-pink-100"
      default:
        return "bg-gray-100"
    }
  }
  
  export function TopicButton({ content, rowIndex, isSelected, onClick }: TopicButtonProps) {
    return (
      <button
        onClick={onClick}
        className={`
          flex-none px-6 py-2 rounded-full border-2 
          transition-colors duration-200
          ${getBgColor(rowIndex, isSelected)}
          ${isSelected ? "border-primary" : "border-muted hover:border-muted-foreground"}
        `}
      >
        <span className="flex items-center gap-2">
          {content}
          <span className={`text-lg ${isSelected ? "text-primary" : "text-muted-foreground"}`}>+</span>
        </span>
      </button>
    )
  }
  
  