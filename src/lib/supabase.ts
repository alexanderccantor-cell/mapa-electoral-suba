import { createClient } from '@supabase/supabase-js';
import type { Pin } from '@/types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const isConfigured = supabaseUrl.length > 10 && supabaseKey.length > 10;

export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseKey, {
      realtime: { params: { eventsPerSecond: 10 } },
    })
  : (null as any);

function safeCall<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  if (!isConfigured || !supabase) {
    return Promise.resolve(fallback);
  }
  return fn().catch(() => fallback);
}

export async function getPines(): Promise<Pin[]> {
  return safeCall(async () => {
    const { data, error } = await supabase
      .from('pines_mapa')
      .select('*')
      .order('creado_at', { ascending: false });
    if (error) { console.error('Error:', error); return []; }
    return data || [];
  }, []);
}

export async function createPin(pin: Omit<Pin, 'id' | 'creado_at'>): Promise<Pin | null> {
  return safeCall(async () => {
    const { data, error } = await supabase.from('pines_mapa').insert([pin]).select().single();
    if (error) { console.error('Error:', error); return null; }
    return data;
  }, null);
}

export async function updatePin(id: string, pin: Partial<Pin>): Promise<Pin | null> {
  return safeCall(async () => {
    const { data, error } = await supabase.from('pines_mapa').update(pin).eq('id', id).select().single();
    if (error) { console.error('Error:', error); return null; }
    return data;
  }, null);
}

export async function deletePin(id: string): Promise<boolean> {
  return safeCall(async () => {
    const { error } = await supabase.from('pines_mapa').delete().eq('id', id);
    if (error) { console.error('Error:', error); return false; }
    return true;
  }, false);
}

export function subscribeToPines(callback: (payload: any) => void) {
  if (!isConfigured || !supabase) {
    return { unsubscribe: () => {}, on: () => ({}), subscribe: () => ({}) } as any;
  }
  return supabase.channel('pines_mapa_changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'pines_mapa' }, callback)
    .subscribe();
}
