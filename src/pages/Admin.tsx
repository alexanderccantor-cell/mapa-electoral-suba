import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import {
  Save,
  Trash2,
  Edit3,
  Plus,
  MapPin,
  AlertTriangle,
  X,
  Check,
  Loader2,
  List,
  LayoutGrid,
  MousePointerClick,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MapaSuba } from '@/components/MapaSuba';
import type { MapaSubaHandle } from '@/components/MapaSuba';
import { usePines } from '@/hooks/usePines';
import { upzData } from '@/data/upz-data';
import type { Pin } from '@/types';

interface FormData {
  titulo: string;
  descripcion: string;
  latitud: string;
  longitud: string;
  upz: string;
  barrio: string;
  direccion_referencia: string;
  imagen_url: string;
  imagen_descarga_url: string;
  video_url: string;
}

const emptyForm: FormData = {
  titulo: '',
  descripcion: '',
  latitud: '',
  longitud: '',
  upz: '',
  barrio: '',
  direccion_referencia: '',
  imagen_url: '',
  imagen_descarga_url: '',
  video_url: '',
};

export function Admin() {
  const { isSignedIn, isLoaded, openSignIn } = useAuth();
  const { pines, loading, addPin, editPin, removePin } = usePines();

  const [form, setForm] = useState<FormData>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tab, setTab] = useState<'form' | 'list'>('form');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const mapaRef = useRef<MapaSubaHandle>(null);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      openSignIn();
    }
  }, [isLoaded, isSignedIn, openSignIn]);

  const showMessage = useCallback((type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  }, []);

  const handleMapClick = useCallback((lat: number, lng: number) => {
    setForm((prev) => ({
      ...prev,
      latitud: lat.toFixed(6),
      longitud: lng.toFixed(6),
    }));
    showMessage('success', `Coordenadas capturadas: ${lat.toFixed(6)}, ${lng.toFixed(6)}`);
  }, [showMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const pinData = {
        titulo: form.titulo,
        descripcion: form.descripcion,
        latitud: parseFloat(form.latitud),
        longitud: parseFloat(form.longitud),
        upz: form.upz,
        barrio: form.barrio,
        direccion_referencia: form.direccion_referencia || undefined,
        imagen_url: form.imagen_url,
        imagen_descarga_url: form.imagen_descarga_url,
        video_url: form.video_url,
      };

      if (editingId) {
        const result = await editPin(editingId, pinData);
        if (result) {
          showMessage('success', 'Pin actualizado correctamente');
          setEditingId(null);
          setForm(emptyForm);
        } else {
          showMessage('error', 'Error al actualizar el pin');
        }
      } else {
        const result = await addPin(pinData);
        if (result) {
          showMessage('success', 'Pin creado correctamente');
          setForm(emptyForm);
        } else {
          showMessage('error', 'Error al crear el pin. Verifica las variables de entorno de Supabase.');
        }
      }
    } catch (err) {
      showMessage('error', err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (pin: Pin) => {
    setForm({
      titulo: pin.titulo,
      descripcion: pin.descripcion,
      latitud: pin.latitud.toString(),
      longitud: pin.longitud.toString(),
      upz: pin.upz,
      barrio: pin.barrio,
      direccion_referencia: pin.direccion_referencia || '',
      imagen_url: pin.imagen_url,
      imagen_descarga_url: pin.imagen_descarga_url,
      video_url: pin.video_url,
    });
    setEditingId(pin.id);
    setTab('form');
  };

  const handleDelete = async (id: string) => {
    const success = await removePin(id);
    if (success) {
      showMessage('success', 'Pin eliminado correctamente');
      setShowDeleteConfirm(null);
      if (editingId === id) {
        setEditingId(null);
        setForm(emptyForm);
      }
    } else {
      showMessage('error', 'Error al eliminar el pin');
    }
  };

  const getUPZBarrios = (upzNombre: string) => {
    const upz = upzData.find((u) => u.nombre === upzNombre);
    return upz?.barrios || [];
  };

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-400">Cargando...</p>
        </div>
      </div>
    );
  }

    // Login desactivado temporalmente - V21 funcional
  // if (!isSignedIn) { return (login screen); }
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-cyan-500/20 flex items-center justify-center mx-auto mb-4">
            <LayoutGrid className="w-8 h-8 text-cyan-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-200 mb-2">
            Panel de Administracion
          </h2>
          <p className="text-sm text-slate-400 mb-6">
            Debes iniciar sesion para acceder al panel de administracion.
          </p>
          <Button
            onClick={() => openSignIn()}
            className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold"
          >
            Iniciar Sesion
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-slate-950 pt-16">
      {/* Alert Messages */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-20 right-4 z-[2000] px-4 py-3 rounded-lg border shadow-lg flex items-center gap-2 ${
              message.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-500/30 text-emerald-400'
                : 'bg-red-950/90 border-red-500/30 text-red-400'
            }`}
          >
            {message.type === 'success' ? (
              <Check className="w-4 h-4" />
            ) : (
              <AlertTriangle className="w-4 h-4" />
            )}
            <span className="text-sm">{message.text}</span>
            <button onClick={() => setMessage(null)} className="ml-2">
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-950 border-r border-cyan-500/20 flex-shrink-0 hidden lg:flex flex-col">
          <div className="p-4 border-b border-slate-800">
            <h2 className="text-sm font-semibold text-slate-300">Administracion</h2>
            <p className="text-xs text-slate-500 mt-1">Gestion de pines del mapa</p>
          </div>
          <nav className="p-2 space-y-1">
            <button
              onClick={() => setTab('form')}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                tab === 'form'
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <MapPin className="w-4 h-4" />
              {editingId ? 'Editar Pin' : 'Nuevo Pin'}
            </button>
            <button
              onClick={() => setTab('list')}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                tab === 'list'
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <List className="w-4 h-4" />
              Lista de Pines
              <span className="ml-auto text-xs bg-slate-800 px-2 py-0.5 rounded-full">
                {pines.length}
              </span>
            </button>
          </nav>

          <div className="mt-auto p-4 border-t border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <MousePointerClick className="w-3 h-3" />
              <span>Haz clic en el mapa para capturar coordenadas</span>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {/* Mobile Tabs */}
          <div className="lg:hidden flex border-b border-slate-800">
            <button
              onClick={() => setTab('form')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm ${
                tab === 'form'
                  ? 'text-cyan-400 border-b-2 border-cyan-400'
                  : 'text-slate-400'
              }`}
            >
              <MapPin className="w-4 h-4" />
              Formulario
            </button>
            <button
              onClick={() => setTab('list')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm ${
                tab === 'list'
                  ? 'text-cyan-400 border-b-2 border-cyan-400'
                  : 'text-slate-400'
              }`}
            >
              <List className="w-4 h-4" />
              Lista ({pines.length})
            </button>
          </div>

          {tab === 'form' ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-0">
              {/* Map */}
              <div className="h-[50vh] xl:h-[calc(100vh-4rem)] relative">
                <MapaSuba
                  ref={mapaRef}
                  pines={pines}
                  pinSeleccionado={null}
                  onPinSelect={() => {}}
                  onMapClick={handleMapClick}
                  isAdmin={true}
                />
                <div className="absolute top-2 left-2 z-[1000] bg-slate-950/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-cyan-500/20">
                  <p className="text-xs text-cyan-400 flex items-center gap-1.5">
                    <MousePointerClick className="w-3 h-3" />
                    Modo Admin: Clic en el mapa para capturar coordenadas
                  </p>
                </div>
              </div>

              {/* Form */}
              <div className="p-4 xl:p-6 overflow-y-auto">
                <div className="max-w-lg mx-auto">
                  <div className="flex items-center gap-2 mb-6">
                    {editingId ? (
                      <>
                        <Edit3 className="w-5 h-5 text-cyan-400" />
                        <h2 className="text-lg font-bold text-slate-200">Editar Pin</h2>
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5 text-cyan-400" />
                        <h2 className="text-lg font-bold text-slate-200">Nuevo Pin</h2>
                      </>
                    )}
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label className="text-slate-300 text-xs">Titulo *</Label>
                      <Input
                        value={form.titulo}
                        onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                        placeholder="Ej: Parque Principal de Suba"
                        required
                        className="bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/50"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-slate-300 text-xs">Descripcion</Label>
                      <Textarea
                        value={form.descripcion}
                        onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                        placeholder="Describe este lugar..."
                        rows={3}
                        className="bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/50 resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label className="text-slate-300 text-xs">Latitud *</Label>
                        <Input
                          type="number"
                          step="any"
                          value={form.latitud}
                          onChange={(e) => setForm({ ...form, latitud: e.target.value })}
                          placeholder="4.743100"
                          required
                          className="bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/50 font-mono text-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-slate-300 text-xs">Longitud *</Label>
                        <Input
                          type="number"
                          step="any"
                          value={form.longitud}
                          onChange={(e) => setForm({ ...form, longitud: e.target.value })}
                          placeholder="-74.074000"
                          required
                          className="bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/50 font-mono text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-slate-300 text-xs">UPZ *</Label>
                      <Select
                        value={form.upz}
                        onValueChange={(value) => setForm({ ...form, upz: value, barrio: '' })}
                      >
                        <SelectTrigger className="bg-slate-900 border-slate-700 text-slate-200 focus:border-cyan-500/50">
                          <SelectValue placeholder="Selecciona una UPZ" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-slate-700 max-h-60">
                          {upzData.map((upz) => (
                            <SelectItem
                              key={upz.id}
                              value={upz.nombre}
                              className="text-slate-200 focus:bg-slate-800 focus:text-cyan-400"
                            >
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-2 h-2 rounded-full"
                                  style={{ background: upz.colorNeon }}
                                />
                                {upz.nombre}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-slate-300 text-xs">Barrio *</Label>
                      <Select
                        value={form.barrio}
                        onValueChange={(value) => setForm({ ...form, barrio: value })}
                        disabled={!form.upz}
                      >
                        <SelectTrigger className="bg-slate-900 border-slate-700 text-slate-200 focus:border-cyan-500/50">
                          <SelectValue
                            placeholder={
                              form.upz
                                ? 'Selecciona un barrio'
                                : 'Primero selecciona una UPZ'
                            }
                          />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-slate-700 max-h-60">
                          {getUPZBarrios(form.upz).map((barrio) => (
                            <SelectItem
                              key={barrio}
                              value={barrio}
                              className="text-slate-200 focus:bg-slate-800 focus:text-cyan-400"
                            >
                              {barrio}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-slate-300 text-xs">Direccion de Referencia</Label>
                      <Input
                        value={form.direccion_referencia}
                        onChange={(e) => setForm({ ...form, direccion_referencia: e.target.value })}
                        placeholder="Ej: Calle 145 # 91-23"
                        className="bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/50"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-slate-300 text-xs">URL de Imagen *</Label>
                      <Input
                        type="url"
                        value={form.imagen_url}
                        onChange={(e) => setForm({ ...form, imagen_url: e.target.value })}
                        placeholder="https://ejemplo.com/imagen.jpg"
                        required
                        className="bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/50"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-slate-300 text-xs">URL de Descarga de Imagen *</Label>
                      <Input
                        type="url"
                        value={form.imagen_descarga_url}
                        onChange={(e) => setForm({ ...form, imagen_descarga_url: e.target.value })}
                        placeholder="https://ejemplo.com/imagen.jpg?download"
                        required
                        className="bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/50"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-slate-300 text-xs">URL de Video (YouTube o MP4)</Label>
                      <Input
                        type="url"
                        value={form.video_url}
                        onChange={(e) => setForm({ ...form, video_url: e.target.value })}
                        placeholder="https://youtube.com/watch?v=..."
                        className="bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/50"
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold"
                      >
                        {isSubmitting ? (
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        ) : editingId ? (
                          <Edit3 className="w-4 h-4 mr-2" />
                        ) : (
                          <Save className="w-4 h-4 mr-2" />
                        )}
                        {editingId ? 'Actualizar Pin' : 'Guardar Pin'}
                      </Button>
                      {editingId && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => { setEditingId(null); setForm(emptyForm); }}
                          className="border-slate-700 text-slate-400 hover:bg-slate-800"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancelar
                        </Button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            /* List View */
            <div className="p-4 xl:p-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
                  <List className="w-5 h-5 text-cyan-400" />
                  Lista de Pines
                  <span className="text-sm font-normal text-slate-500">
                    ({pines.length} registrados)
                  </span>
                </h2>

                {pines.length === 0 ? (
                  <div className="text-center py-12 bg-slate-900/50 rounded-xl border border-slate-800">
                    <MapPin className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                    <p className="text-slate-500">No hay pines registrados</p>
                    <Button
                      variant="outline"
                      onClick={() => setTab('form')}
                      className="mt-4 border-cyan-500/30 text-cyan-400"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Agregar el primer pin
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {pines.map((pin) => (
                      <motion.div
                        key={pin.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-slate-200 truncate">
                              {pin.titulo}
                            </h3>
                            <div className="flex flex-wrap gap-2 mt-1.5">
                              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                                {pin.upz}
                              </span>
                              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                                {pin.barrio}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">
                              {pin.descripcion}
                            </p>
                            <p className="text-xs text-slate-600 mt-1 font-mono">
                              {pin.latitud.toFixed(6)}, {pin.longitud.toFixed(6)}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(pin)}
                              className="text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10"
                            >
                              <Edit3 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setShowDeleteConfirm(pin.id)}
                              className="text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {showDeleteConfirm === pin.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-3"
                          >
                            <p className="text-xs text-red-400 flex-1">
                              Eliminar este pin permanentemente?
                            </p>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setShowDeleteConfirm(null)}
                              className="border-slate-700 text-slate-400"
                            >
                              Cancelar
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(pin.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              <Trash2 className="w-3 h-3 mr-1" />
                              Eliminar
                            </Button>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
