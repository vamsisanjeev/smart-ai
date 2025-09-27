import { useState, useEffect } from 'react';
import { ref, onValue, set, push, off } from 'firebase/database';
import { database } from '../config/firebase';
import { GroupMember } from '../types';

export const useGroupTracking = (groupId: string) => {
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!groupId) return;

    const membersRef = ref(database, `groups/${groupId}/members`);
    
    const unsubscribe = onValue(membersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const membersList = Object.entries(data).map(([id, member]: [string, any]) => ({
          id,
          ...member,
          location: {
            ...member.location,
            timestamp: new Date(member.location.timestamp)
          }
        }));
        setMembers(membersList);
      } else {
        setMembers([]);
      }
      setLoading(false);
    });

    return () => {
      off(membersRef);
    };
  }, [groupId]);

  const updateLocation = async (userId: string, location: { lat: number; lng: number }) => {
    if (!groupId) return;

    const memberRef = ref(database, `groups/${groupId}/members/${userId}`);
    await set(memberRef, {
      id: userId,
      name: `User ${userId.slice(0, 8)}`,
      location: {
        lat: location.lat,
        lng: location.lng,
        timestamp: Date.now()
      },
      status: 'online'
    });
  };

  const sendSOSAlert = async (userId: string, location: { lat: number; lng: number }) => {
    if (!groupId) return;

    const alertsRef = ref(database, `groups/${groupId}/alerts`);
    const newAlertRef = push(alertsRef);
    
    await set(newAlertRef, {
      userId,
      type: 'sos',
      location,
      timestamp: Date.now(),
      message: 'Emergency SOS Alert!'
    });

    // Update user status to SOS
    const memberRef = ref(database, `groups/${groupId}/members/${userId}`);
    await set(memberRef, {
      id: userId,
      name: `User ${userId.slice(0, 8)}`,
      location: {
        lat: location.lat,
        lng: location.lng,
        timestamp: Date.now()
      },
      status: 'sos'
    });
  };

  const createDemoGroup = async () => {
    const demoGroupId = 'demo-group-' + Date.now();
    const demoMembers = [
      {
        id: 'user1',
        name: 'Alice Johnson',
        location: { lat: 40.7128, lng: -74.0060, timestamp: Date.now() },
        status: 'online'
      },
      {
        id: 'user2',
        name: 'Bob Smith',
        location: { lat: 40.7589, lng: -73.9851, timestamp: Date.now() },
        status: 'online'
      },
      {
        id: 'user3',
        name: 'Carol Davis',
        location: { lat: 40.7505, lng: -73.9934, timestamp: Date.now() },
        status: 'offline'
      }
    ];

    for (const member of demoMembers) {
      const memberRef = ref(database, `groups/${demoGroupId}/members/${member.id}`);
      await set(memberRef, member);
    }

    return demoGroupId;
  };

  return {
    members,
    loading,
    updateLocation,
    sendSOSAlert,
    createDemoGroup
  };
};