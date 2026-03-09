import { AuthGuard } from "@/app/(auth)/components/auth-guard";
import ItineraryForm from "../components/itinerary-form";

export default function CreateItineraryPage() {
  return (
    <AuthGuard>
      <div>
        <ItineraryForm />
      </div>
    </AuthGuard>
  );
}
