
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PitchDeck = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-white/10">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Link to="/">
              <Button variant="ghost" size="icon" className="mr-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <span className="font-light tracking-[0.25em] text-base uppercase">Pitch Deck</span>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            The Alerts Company Pitch Deck
          </h1>
          
          {/* Slide 1: Problem */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-4 text-primary">The Problem</h2>
            <div className="bg-secondary p-8 rounded-xl border border-white/5">
              <p className="text-xl mb-4">Today's alerting systems are:</p>
              <ul className="list-disc pl-6 space-y-2 text-lg">
                <li>Generating alert fatigue</li>
                <li>Missing critical issues</li>
                <li>Lacking context for quick resolution</li>
                <li>Difficult to maintain and tune</li>
                <li>Not learning from past incidents</li>
              </ul>
            </div>
          </div>
          
          {/* Slide 2: Solution */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Our Solution</h2>
            <div className="bg-secondary p-8 rounded-xl border border-white/5">
              <p className="text-xl mb-4">The Alerts Company provides:</p>
              <ul className="list-disc pl-6 space-y-2 text-lg">
                <li>Intelligent alert prioritization</li>
                <li>Rich context for faster resolution</li>
                <li>Smart deferability with follow-up tracking</li>
                <li>Seamless integration with existing tools</li>
                <li>Continuous improvement through analytics</li>
              </ul>
            </div>
          </div>
          
          {/* Slide 3: Market */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Market Opportunity</h2>
            <div className="bg-secondary p-8 rounded-xl border border-white/5">
              <p className="text-xl mb-4">Target customers:</p>
              <ul className="list-disc pl-6 space-y-2 text-lg">
                <li>SRE and DevOps teams at mid-to-large tech companies</li>
                <li>Cloud-native organizations running complex infrastructure</li>
                <li>Companies with 24/7 operations and on-call rotations</li>
              </ul>
              <p className="text-xl mt-4">Market size: $2.5B by 2025</p>
            </div>
          </div>
          
          {/* Slide 4: Business Model */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Business Model</h2>
            <div className="bg-secondary p-8 rounded-xl border border-white/5">
              <p className="text-xl mb-4">SaaS subscription model:</p>
              <ul className="list-disc pl-6 space-y-2 text-lg">
                <li>Starter: $10/user/month (up to 10 users)</li>
                <li>Team: $20/user/month (up to 50 users)</li>
                <li>Enterprise: Custom pricing</li>
              </ul>
              <p className="text-xl mt-4">Additional revenue from premium integrations and consulting services</p>
            </div>
          </div>
          
          {/* Slide 5: Team */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Our Team</h2>
            <div className="bg-secondary p-8 rounded-xl border border-white/5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Jane Smith, CEO</h3>
                  <p className="text-lg">Former SRE lead at CloudCorp with 15+ years in DevOps and systems reliability</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">John Doe, CTO</h3>
                  <p className="text-lg">Ex-Google SRE, built monitoring systems serving 1M+ alerts daily</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Alice Johnson, COO</h3>
                  <p className="text-lg">Former VP of Operations at AlertCo, scaled to 500+ enterprise customers</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Bob Brown, Head of Sales</h3>
                  <p className="text-lg">10+ years in enterprise B2B sales for DevOps tools</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Contact Us</h2>
            <div className="bg-secondary p-8 rounded-xl border border-white/5">
              <p className="text-xl">Ready to transform your alert management?</p>
              <div className="mt-6">
                <Button className="px-8 py-6 text-lg">
                  <Link to="/#waitlist">Join Our Waitlist</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitchDeck;
