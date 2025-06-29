
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ChatMessage } from '@/types/chat';

interface SyncEvent {
  id: string;
  room_id: string;
  user_id: string;
  event_type: string;
  event_data: any;
  timestamp_ms: number;
  created_at: string;
}

interface Room {
  id: string;
  code: string;
  name: string;
  status: string;
  current_position: number;
  is_playing: boolean;
  current_content_url?: string;
}

export const useRealtimeSync = (roomId: string | null) => {
  const [room, setRoom] = useState<Room | null>(null);
  const [participants, setParticipants] = useState<any[]>([]);
  const [syncEvents, setSyncEvents] = useState<SyncEvent[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (!roomId) return;

    // Subscribe to room changes
    const roomChannel = supabase
      .channel('room-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'rooms',
          filter: `id=eq.${roomId}`,
        },
        (payload) => {
          console.log('Room updated:', payload.new);
          setRoom(payload.new as Room);
        }
      )
      .subscribe();

    // Subscribe to participant changes
    const participantChannel = supabase
      .channel('participant-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'participants',
          filter: `room_id=eq.${roomId}`,
        },
        async () => {
          console.log('Participants changed, refetching...');
          // Refetch participants when changes occur
          const { data } = await supabase
            .from('participants')
            .select('*')
            .eq('room_id', roomId)
            .order('joined_at', { ascending: true });
          
          if (data) {
            setParticipants(data);
          }
        }
      )
      .subscribe();

    // Subscribe to sync events
    const syncChannel = supabase
      .channel('sync-events')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'sync_events',
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => {
          console.log('New sync event:', payload.new);
          setSyncEvents(prev => [...prev, payload.new as SyncEvent]);
        }
      )
      .subscribe();

    // Subscribe to chat messages
    const chatChannel = supabase
      .channel('chat-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => {
          console.log('New chat message:', payload.new);
          const newMessage = payload.new as any;
          // Ensure message_type is properly typed
          const typedMessage: ChatMessage = {
            ...newMessage,
            message_type: newMessage.message_type as ChatMessage['message_type'] || 'text'
          };
          setChatMessages(prev => [...prev, typedMessage]);
        }
      )
      .subscribe();

    // Initial data fetch
    const fetchInitialData = async () => {
      console.log('Fetching initial data for room:', roomId);
      
      const [roomResult, participantsResult, chatResult] = await Promise.all([
        supabase.from('rooms').select('*').eq('id', roomId).single(),
        supabase.from('participants').select('*').eq('room_id', roomId).order('joined_at', { ascending: true }),
        supabase.from('chat_messages').select('*').eq('room_id', roomId).order('created_at', { ascending: true }),
      ]);

      if (roomResult.data) {
        console.log('Room data:', roomResult.data);
        setRoom(roomResult.data);
      }
      if (participantsResult.data) {
        console.log('Participants data:', participantsResult.data);
        setParticipants(participantsResult.data);
      }
      if (chatResult.data) {
        console.log('Chat messages data:', chatResult.data);
        // Ensure all messages have proper typing
        const typedMessages: ChatMessage[] = chatResult.data.map(msg => ({
          ...msg,
          message_type: msg.message_type as ChatMessage['message_type'] || 'text'
        }));
        setChatMessages(typedMessages);
      }
    };

    fetchInitialData();

    return () => {
      supabase.removeChannel(roomChannel);
      supabase.removeChannel(participantChannel);
      supabase.removeChannel(syncChannel);
      supabase.removeChannel(chatChannel);
    };
  }, [roomId]);

  const sendSyncEvent = async (eventType: string, eventData: any) => {
    if (!roomId) return;

    try {
      console.log('Sending sync event:', { eventType, eventData });
      
      const { data, error } = await supabase.functions.invoke('sync-playback', {
        body: {
          roomId,
          eventType,
          eventData,
          timestampMs: Date.now(),
        },
      });

      if (error) {
        console.error('Sync event error:', error);
        throw error;
      }

      console.log('Sync event sent successfully:', data);
    } catch (error) {
      console.error('Failed to send sync event:', error);
    }
  };

  return {
    room,
    participants,
    syncEvents,
    chatMessages,
    sendSyncEvent,
  };
};
