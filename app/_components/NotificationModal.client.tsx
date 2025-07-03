'use client';
import { useEffect, useRef, useState } from 'react';
import { useAuthStore } from '@/store';
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { NotificationApi } from '@/api';
import { toast } from 'react-toastify';

export default function NotificationModal() {
  function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  const { token } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isAlreadySubscribed, setIsAlreadySubscribed] = useState(false);
  const [isServiceWorkerSupported, setIsServiceWorkerSupported] = useState(false);
  const registration = useRef<ServiceWorkerRegistration>(null);

  const subscribe = async () => {
    if (!registration.current) return;
    try {
      const permission = await Notification.requestPermission();
      console.log('permission', permission);
      if (permission !== 'granted') return;

      const convertedVapidKey = urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!);
      const subscription = await registration.current.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey,
      });
      const response = await NotificationApi.subscribe(subscription);
      setIsAlreadySubscribed(true);
      toast.success('Subscribed successfully');
    } catch (error) {
      console.log(error);
    } finally {
      setIsOpen(false);
    }
  };

  const registerServiceWorker = async () => {
    try {
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        await navigator.serviceWorker.register('/sw.js');
        registration.current = await navigator.serviceWorker.ready;
        setIsServiceWorkerSupported(true);

        const existing = await registration.current.pushManager.getSubscription();
        console.log('existing', existing);
        if (existing) {
          setIsAlreadySubscribed(true);
        } else {
          setIsOpen(true); // Prompt dialog
        }
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!token) return;
    registerServiceWorker();
  }, [token]);

  if (!isServiceWorkerSupported || isAlreadySubscribed) return null;

  return (
    <Dialog open={isOpen} onOpenChange={open => setIsOpen(open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Notifications</DialogTitle>
          <DialogDescription>Allows notifications</DialogDescription>

          <div className="flex gap-2 mt-4">
            <Button onClick={subscribe} className="flex-1">
              Allow
            </Button>
            <Button onClick={() => setIsOpen(false)} variant="outline" className="flex-1">
              Cancel
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
