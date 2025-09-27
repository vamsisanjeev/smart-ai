import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, Phone, MapPin, Clock, Users } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const SafetyPage: React.FC = () => {
  const [sosActive, setSosActive] = useState(false);
  const [emergencyContacts, setEmergencyContacts] = useState([
    { name: 'Emergency Services', number: '911', type: 'emergency' },
    { name: 'John Doe (Emergency Contact)', number: '+1-555-0123', type: 'personal' },
    { name: 'Travel Insurance', number: '+1-800-TRAVEL', type: 'insurance' }
  ]);

  const handleSOS = () => {
    setSosActive(true);
    
    // Simulate SOS alert
    setTimeout(() => {
      alert('SOS Alert Sent!\n\n✓ Location shared with emergency contacts\n✓ Local authorities notified\n✓ Travel insurance contacted\n\nHelp is on the way!');
      setSosActive(false);
    }, 3000);
  };

  const safetyTips = [
    {
      icon: Shield,
      title: 'Stay in Safe Areas',
      description: 'Stick to well-lit, populated areas especially at night',
      color: 'text-green-500'
    },
    {
      icon: Users,
      title: 'Travel in Groups',
      description: 'Always inform someone about your whereabouts',
      color: 'text-blue-500'
    },
    {
      icon: Phone,
      title: 'Keep Contacts Updated',
      description: 'Maintain updated emergency contact information',
      color: 'text-purple-500'
    },
    {
      icon: MapPin,
      title: 'Share Your Location',
      description: 'Enable location sharing with trusted contacts',
      color: 'text-orange-500'
    }
  ];

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
            Safety Center
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Your safety is our priority. Access emergency features, safety tips, and real-time assistance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* SOS Emergency Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10"></div>
              
              <motion.div
                animate={sosActive ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 1, repeat: sosActive ? Infinity : 0 }}
                className="relative z-10"
              >
                <div className={`w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center shadow-2xl ${
                  sosActive 
                    ? 'bg-red-600 animate-pulse' 
                    : 'bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                } transition-all duration-300`}>
                  <AlertTriangle className="h-16 w-16 text-white" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Emergency SOS
                </h2>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {sosActive 
                    ? 'Sending emergency alert...' 
                    : 'Press and hold for 3 seconds to send emergency alert with your location'
                  }
                </p>
                
                <Button
                  onClick={handleSOS}
                  disabled={sosActive}
                  size="lg"
                  className={`w-full ${
                    sosActive 
                      ? 'bg-red-600 cursor-not-allowed' 
                      : 'bg-red-500 hover:bg-red-600'
                  } text-white`}
                >
                  {sosActive ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending Alert...
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      Emergency SOS
                    </>
                  )}
                </Button>
              </motion.div>
            </Card>
          </motion.div>

          {/* Emergency Contacts */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Emergency Contacts
              </h2>
              
              <div className="space-y-4">
                {emergencyContacts.map((contact, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        contact.type === 'emergency' ? 'bg-red-100 dark:bg-red-900/20' :
                        contact.type === 'personal' ? 'bg-blue-100 dark:bg-blue-900/20' :
                        'bg-green-100 dark:bg-green-900/20'
                      }`}>
                        <Phone className={`h-5 w-5 ${
                          contact.type === 'emergency' ? 'text-red-600 dark:text-red-400' :
                          contact.type === 'personal' ? 'text-blue-600 dark:text-blue-400' :
                          'text-green-600 dark:text-green-400'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {contact.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {contact.number}
                        </p>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm">
                      Call
                    </Button>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-sky-50 dark:bg-sky-900/20 rounded-lg">
                <div className="flex items-center space-x-2 text-sky-700 dark:text-sky-400 mb-2">
                  <Clock className="h-4 w-4" />
                  <span className="font-semibold">Auto-Alert Status</span>
                </div>
                <p className="text-sm text-sky-600 dark:text-sky-300">
                  If no response within 5 minutes of SOS activation, all emergency contacts will be automatically notified.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Safety Tips */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Safety Tips
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {safetyTips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                >
                  <Card hover className="p-6 text-center h-full">
                    <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center`}>
                      <Icon className={`h-6 w-6 ${tip.color}`} />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {tip.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {tip.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Current Location Status */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-12"
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Location Services Active
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Your location is being monitored for safety purposes
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Last updated</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {new Date().toLocaleTimeString()}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};