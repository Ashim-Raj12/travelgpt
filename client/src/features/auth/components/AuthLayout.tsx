import { ReactNode } from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

interface AuthLayoutProps {
  children: ReactNode
  title: string
  description?: string
  imageSrc?: string
}

export const AuthLayout = ({ 
  children, 
  title, 
  description,
  imageSrc = "/images/dest_swiss_1784370021031.png"
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 bg-background">
      {/* Image / Branding Side */}
      <div className="hidden md:block md:col-span-1 lg:col-span-2 relative overflow-hidden bg-muted">
        <img 
          src={imageSrc} 
          alt="Travel Inspiration" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-between p-10 lg:p-12 text-white">
          <div className="flex items-center gap-2 font-serif text-2xl font-bold">
            <Sparkles className="h-6 w-6 text-primary" />
            TravelGPT
          </div>
          
          <div className="max-w-md">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl lg:text-4xl font-serif font-bold mb-4"
            >
              Discover the world with AI-curated itineraries.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-white/80"
            >
              Join thousands of travelers who are experiencing seamless, hyper-personalized luxury journeys.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Form Side */}
      <div className="md:col-span-1 lg:col-span-3 flex items-center justify-center p-6 sm:p-12 relative">
        <div className="absolute top-6 left-6 md:hidden flex items-center gap-2 font-serif text-xl font-bold">
          <Sparkles className="h-5 w-5 text-primary" />
          TravelGPT
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h1>
            {description && (
              <p className="text-sm text-muted-foreground mt-2">{description}</p>
            )}
          </div>
          
          <div className="bg-card md:bg-transparent p-6 md:p-0 rounded-2xl border md:border-none shadow-sm md:shadow-none">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
