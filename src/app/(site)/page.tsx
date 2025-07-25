import InvitationForm from "@/components/InvitationForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            結婚式のご案内
          </h1>
          <p className="text-lg text-gray-600">
            大切な皆様へ感謝の気持ちを込めて
          </p>
        </div>

        <InvitationForm />
      </div>
    </div>
  );
}
