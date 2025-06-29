
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Tv, 
  Smartphone, 
  Users, 
  LogOut, 
  User, 
  Zap, 
  Wifi, 
  Crown, 
  Bell 
} from 'lucide-react';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface MobileHomeProps {
  user: SupabaseUser | null;
  onCreateRoom: () => void;
  onJoinRoom: () => void;
  onSignOut: () => void;
}

export const MobileHome = ({ user, onCreateRoom, onJoinRoom, onSignOut }: MobileHomeProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-8 py-16">
        {/* Mobile Home Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-4 mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              FireSync
            </h1>
          </div>
          <p className="text-2xl text-gray-300 mb-4">Fire TV Stick App</p>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Transform your Fire TV into the ultimate watch party hub. Host synchronized streaming experiences for your family.
          </p>
        </div>

        {/* Main CTA Buttons */}
        <div className="text-center mb-16">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-12 py-6 text-2xl flex-1"
            onClick={onCreateRoom}
          >
            <Tv className="w-8 h-8 mr-4" />
            Host a Watch Party
          </Button>
          <p className="text-gray-400 mt-4">Create a room and invite your family to join</p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-white/5 backdrop-blur-lg border-white/10 p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Easy Room Creation</h3>
            <p className="text-gray-400">Generate a 6-digit code for family to join instantly</p>
          </Card>
          
          <Card className="bg-white/5 backdrop-blur-lg border-white/10 p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Perfect Sync</h3>
            <p className="text-gray-400">All Fire TVs play content at identical timestamps</p>
          </Card>
          
          <Card className="bg-white/5 backdrop-blur-lg border-white/10 p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Wifi className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Auto-Discovery</h3>
            <p className="text-gray-400">Automatically finds all Fire TVs on your WiFi</p>
          </Card>
        </div>

        {/* Device Info Card */}
        <Card className="bg-white/5 backdrop-blur-lg border-white/10 p-8">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
            <Tv className="w-6 h-6" />
            Device Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <Label className="text-gray-400">Device</Label>
              <p className="text-white font-semibold">Fire TV Stick 4K Max</p>
            </div>
            <div>
              <Label className="text-gray-400">Network</Label>
              <p className="text-white font-semibold">Home_WiFi_5G</p>
            </div>
            <div>
              <Label className="text-gray-400">Status</Label>
              <Badge className="bg-green-500/20 text-green-400">Connected</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
