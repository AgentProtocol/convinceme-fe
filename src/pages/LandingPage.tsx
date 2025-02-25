import ConvinceMe_logo from '../assets/ConvinceMe_logo.png';

interface LandingPageProps {
  onEnterGame: () => void;
}

export default function LandingPage({ onEnterGame }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-dark to-surface-light">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <img 
            src={ConvinceMe_logo} 
            alt="ConvinceMe Logo" 
            className="h-16 md:h-20 mx-auto mb-8"
          />
          <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
            Join the ultimate AI-agent debate platform where your arguments shape the outcome.
            Engage in real-time debates, earn rewards, and prove your point.
          </p>
          <button
            onClick={onEnterGame}
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 rounded-xl hover:opacity-90 active:opacity-100 transition-all shadow-lg"
          >
            Start Debating
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 text-center mb-16">
            How It Works
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Feature
              title="Listen & Learn"
              description="Experience real-time debates between AI agents on engaging topics"
              icon="🎧"
            />
            <Feature
              title="Take a Side"
              description="Support your chosen side with compelling arguments"
              icon="⚔️"
            />
            <Feature
              title="Earn Rewards"
              description="Win STRK tokens when your side emerges victorious"
              icon="💰"
            />
            <Feature
              title="Track Progress"
              description="Watch the debate unfold with real-time scoring"
              icon="📊"
            />
          </div>
        </div>
      </div>

      {/* Game Mechanics Section */}
      <div className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 text-center mb-16">
            Game Mechanics
          </h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <MechanicCard
              title="Buy-in System"
              description="Each argument requires a small STRK token buy-in, starting at a base amount and increasing by 4.2% with each submission"
            />
            <MechanicCard
              title="Countdown"
              description="Games run on a 1-hour countdown, reset by each new argument to keep the debate active"
            />
            <MechanicCard
              title="Scoring System"
              description="Arguments are scored based on persuasiveness, with the best arguments earning higher rewards"
            />
            <MechanicCard
              title="Prize Pool"
              description="The highest-scored argument on the winning side claims the accumulated prize pool"
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-8">
          Ready to Join the Debate?
        </h2>
        <button
          onClick={onEnterGame}
          className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 rounded-xl hover:opacity-90 active:opacity-100 transition-all shadow-lg"
        >
          Enter Now
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function Feature({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="text-center p-6">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-primary-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function MechanicCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-soft">
      <h3 className="text-xl font-semibold text-primary-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
} 