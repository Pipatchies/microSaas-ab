"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, CheckCircle, XCircle, Activity } from "lucide-react"

interface ApiResponse {
  status: "ok" | "error"
  message: string
}

interface ApiHealthButtonProps {
  endpoint?: string
  buttonText?: string
  title?: string
  description?: string
  className?: string
  onSuccess?: (data: ApiResponse) => void
  onError?: (error: string) => void
  showResultCard?: boolean
}

export function ApiTestButton({
  endpoint = "/api/test_db",
  buttonText = "Tester la connexion API",
  title = "Test de connexion API",
  description = "Vérifiez l'état de votre API et de la base de données",
  className = "",
  onSuccess,
  onError,
  showResultCard = true,
}: ApiHealthButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<ApiResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  const testConnection = async () => {
    setIsLoading(true)
    setResult(null)
    setError(null)

    try {
      const response = await fetch(`${apiUrl}${endpoint}`)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data: ApiResponse = await response.json()
      setResult(data)

      if (data.status === "ok") {
        onSuccess?.(data)
      } else {
        onError?.(data.message)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erreur inconnue"
      setError(errorMessage)
      onError?.(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIcon = () => {
    if (isLoading) return <Loader2 className="h-4 w-4 animate-spin" />
    if (result?.status === "ok") return <CheckCircle className="h-4 w-4" />
    if (error || result?.status === "error") return <XCircle className="h-4 w-4" />
    return <Activity className="h-4 w-4" />
  }

  const getStatusBadge = () => {
    if (isLoading) return <Badge variant="secondary">Test en cours...</Badge>
    if (result?.status === "ok") return <Badge className="bg-green-500 hover:bg-green-600">Succès</Badge>
    if (error || result?.status === "error") return <Badge variant="destructive">Erreur</Badge>
    return null
  }

  return (
    <div className="space-y-4">
      <Button
        onClick={testConnection}
        disabled={isLoading}
        className={`bg-[#E44821] hover:bg-[#D63E1C] text-white ${className}`}
      >
        {getStatusIcon()}
        {isLoading ? "Test en cours..." : buttonText}
      </Button>

      {showResultCard && (result || error) && (
        <Card className="w-full max-w-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{title}</CardTitle>
              {getStatusBadge()}
            </div>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-sm font-medium">Réponse de l&apos;API :</div>
              <pre className="bg-muted p-3 rounded-md text-sm overflow-x-auto">
                {error ? JSON.stringify({ status: "error", message: error }, null, 2) : JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
