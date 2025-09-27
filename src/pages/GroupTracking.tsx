import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, AlertTriangle, Shield, Navigation, Plus } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useGroupTracking } from '../hooks/useGroupTracking';

export const GroupTracking: React.FC = () => {
  const [groupId, setGroupId] = useState<string>('');
  const [showMap, setShowMap] = useState(false);
  const { members, loading, updateLocation, sendSOSAlert, createDemoGroup } = useGroupTracking(groupId);

  const handleCreateDemo = async () => {
    const demoId = await createDemoGroup();
    setGroupId(demoId);
    setShowMap(true);
  };

  const handleSOS = async (userId: string) => {
    // Simulate current location
    const location = { lat: 40.7128 + (Math.random() - 0.5) * 0.01, lng: -74.0060 + (Math.random() - 0.5) * 0.01 };
    await sendSOSAlert(userId, location);
    alert('SOS Alert sent! Emergency contacts have been notified.');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-500';
      case 'offline': return 'text-gray-500';
      case 'sos': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <Shield className="h-4 w-4" />;
      case 'offline': return <Users className="h-4 w-4" />;
      case 'sos': return <AlertTriangle className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Group Tracking
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Keep your travel group connected and safe with real-time location sharing and emergency alerts.
          </p>
        </motion.div>

        {!groupId ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-md mx-auto"
          >
            <Card className="p-8 text-center">
              <Users className="h-16 w-16 text-sky-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Start Group Tracking
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Create a demo group to see how real-time tracking works with your travel companions.
              </p>
              <Button onClick={handleCreateDemo} size="lg" className="w-full">
                <Plus className="h-5 w-5 mr-2" />
                Create Demo Group
              </Button>
            </Card>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Group Members */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <Card className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Group Members
                </h2>
                
                {loading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="animate-pulse">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                          <div className="flex-1">
                            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {members.map((member) => (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-emerald-400 flex items-center justify-center text-white font-semibold`}>
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {member.name}
                            </h3>
                            <div className={`flex items-center space-x-1 text-sm ${getStatusColor(member.status)}`}>
                              {getStatusIcon(member.status)}
                              <span className="capitalize">{member.status}</span>
                            </div>
                          </div>
                        </div>
                        
                        {member.status !== 'sos' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSOS(member.id)}
                            className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                          >
                            SOS
                          </Button>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}

                <div className="mt-6 p-4 bg-sky-50 dark:bg-sky-900/20 rounded-lg">
                  <div className="flex items-center space-x-2 text-sky-700 dark:text-sky-400 mb-2">
                    <Shield className="h-4 w-4" />
                    <span className="font-semibold">Safety Status</span>
                  </div>
                  <p className="text-sm text-sky-600 dark:text-sky-300">
                    All members are within safe zones. Emergency contacts are on standby.
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Map View */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-2"
            >
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Live Map
                  </h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Live Updates</span>
                  </div>
                </div>
                
                {/* Mock Map Interface */}
                <div className="relative bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg h-96 overflow-hidden">
                  {/* Map Background */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="grid grid-cols-8 grid-rows-6 h-full">
                      {Array.from({ length: 48 }).map((_, i) => (
                        <div key={i} className="border border-gray-300 dark:border-gray-600"></div>
                      ))}
                    </div>
                  </div>

                  {/* Member Markers */}
                  {members.map((member, index) => (
                    <motion.div
                      key={member.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.2 }}
                      className="absolute"
                      style={{
                        left: `${20 + index * 25}%`,
                        top: `${30 + index * 15}%`
                      }}
                    >
                      <div className={`relative ${member.status === 'sos' ? 'animate-pulse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold ${
                          member.status === 'online' ? 'bg-green-500' :
                          member.status === 'sos' ? 'bg-red-500' :
                          'bg-gray-500'
                        }`}>
                          {member.name.charAt(0)}
                        </div>
                        {member.status === 'sos' && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                        )}
                      </div>
                      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-2 py-1 rounded shadow-lg text-xs whitespace-nowrap">
                        {member.name}
                      </div>
                    </motion.div>
                  ))}

                  {/* Safety Zones */}
                  <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Legend</h4>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700 dark:text-gray-300">Online</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                        <span className="text-gray-700 dark:text-gray-300">Offline</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-gray-700 dark:text-gray-300">SOS Alert</span>
                      </div>
                    </div>
                  </div>

                  {/* Center Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute bottom-4 right-4 bg-white dark:bg-gray-800"
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Center Map
                  </Button>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {members.filter(m => m.status === 'online').length}
                    </div>
                    <div className="text-sm text-green-700 dark:text-green-300">Online</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                      {members.filter(m => m.status === 'offline').length}
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-300">Offline</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {members.filter(m => m.status === 'sos').length}
                    </div>
                    <div className="text-sm text-red-700 dark:text-red-300">SOS Alerts</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};