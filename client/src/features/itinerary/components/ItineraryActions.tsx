import { Share2, Download, Pencil, Save, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useState } from "react"

interface Props {
  onSave?: () => Promise<void>;
}

export const ItineraryActions = ({ onSave }: Props) => {
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const handlePrint = () => {
    window.print()
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success("Link copied to clipboard!")
  }

  const handleEdit = () => {
    toast.info("Edit mode coming soon!")
  }

  const handleSave = async () => {
    if (onSave) {
      setIsSaving(true)
      try {
        await onSave()
        setIsSaved(true)
      } catch (error) {
        // Error handled in parent
      } finally {
        setIsSaving(false)
      }
    }
  }

  return (
    <div className="flex items-center gap-2 print:hidden">
      <Button variant="outline" size="sm" onClick={handleShare} className="bg-background/80 backdrop-blur hidden sm:flex">
        <Share2 className="mr-2 h-4 w-4" /> Share
      </Button>
      <Button variant="outline" size="sm" onClick={handlePrint} className="bg-background/80 backdrop-blur hidden sm:flex">
        <Download className="mr-2 h-4 w-4" /> Export
      </Button>
      {onSave && (
        <Button 
          variant={isSaved ? "secondary" : "default"} 
          size="sm" 
          onClick={handleSave} 
          disabled={isSaving || isSaved}
        >
          {isSaved ? (
            <><CheckCircle2 className="mr-2 h-4 w-4" /> Saved</>
          ) : (
            <><Save className="mr-2 h-4 w-4" /> Save Trip</>
          )}
        </Button>
      )}
    </div>
  )
}
