import { Share2, Download, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export const ItineraryActions = () => {
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

  return (
    <div className="flex items-center gap-2 print:hidden">
      <Button variant="outline" size="sm" onClick={handleShare} className="bg-background/80 backdrop-blur">
        <Share2 className="mr-2 h-4 w-4" /> Share
      </Button>
      <Button variant="outline" size="sm" onClick={handlePrint} className="bg-background/80 backdrop-blur">
        <Download className="mr-2 h-4 w-4" /> Export PDF
      </Button>
      <Button size="sm" onClick={handleEdit}>
        <Pencil className="mr-2 h-4 w-4" /> Edit Trip
      </Button>
    </div>
  )
}
