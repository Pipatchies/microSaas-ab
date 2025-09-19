import { ApiTestButton } from "@/components/api-test-button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Test de Connexion API</h1>
          <p className="text-muted-foreground">
            Testez la connexion à votre API et vérifiez l&apos;état de la base de données.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-6">
          <ApiTestButton />

          {/* <ApiTestButton
            endpoint="/api/health"
            buttonText="Vérifier l'état du serveur"
            title="État du Serveur"
            description="Connexion à la base de données et services"
            className="w-64"
          /> */}

          {/* <ApiTestButton
            buttonText="Test rapide"
            showResultCard={false}
            onSuccess={(data) => alert(`Succès: ${data.message}`)}
            onError={(error) => alert(`Erreur: ${error}`)}
          /> */}
        </div>
      </div>
    </div>
  )
}