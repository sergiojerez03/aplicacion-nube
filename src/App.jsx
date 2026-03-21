import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  ShieldCheck, 
  Server, 
  Database, 
  Cloud, 
  Zap, 
  Lock, 
  FileText, 
  Activity, 
  Bell, 
  HelpCircle,
  Search,
  Command,
  Plus,
  MoreHorizontal,
  ChevronDown,
  RefreshCw,
  Globe,
  Cpu,
  Terminal,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const BAR_DATA = [
  { name: 'Ene', actual: 8200, previo: 7100 },
  { name: 'Feb', actual: 7500, previo: 8200 },
  { name: 'Mar', actual: 9100, previo: 7600 },
  { name: 'Abr', actual: 8800, previo: 9400 },
  { name: 'May', actual: 9800, previo: 8100 },
  { name: 'Jun', actual: 9200, previo: 8900 },
];

const LINE_DATA = [
  { name: '10:00', cpu: 45, memoria: 62, red: 38, io: 24 },
  { name: '11:00', cpu: 62, memoria: 58, red: 45, io: 32 },
  { name: '12:00', cpu: 51, memoria: 55, red: 72, io: 48 },
  { name: '13:00', cpu: 82, memoria: 65, red: 88, io: 62 },
  { name: '14:00', cpu: 94, memoria: 78, red: 92, io: 84 },
  { name: '15:00', cpu: 65, memoria: 72, red: 54, io: 38 },
];

const AUDIT_LOGS = [
  { id: 'TRAIL-921', fecha: '21 Mar, 2026', status: [1,1,1,1,1,1,1,0,0,0], tipo: 'Cifrado', msg: 'Validación AES-256 en S3' },
  { id: 'TRAIL-919', fecha: '21 Mar, 2026', status: [1,1,1,1,1,0,0,0,0,0], tipo: 'Red', msg: 'Protocolo TLS 1.2 Verificado' },
  { id: 'TRAIL-915', fecha: '21 Mar, 2026', status: [1,1,1,1,1,1,1,1,1,1], tipo: 'Identidad', msg: 'IAM: Mínimo Privilegio Activo' },
  { id: 'TRAIL-912', fecha: '20 Mar, 2026', status: [1,1,1,1,0,0,0,0,0,0], tipo: 'Cumplimiento', msg: 'Auditoría MinTIC 2021 Ejecutada' },
  { id: 'TRAIL-908', fecha: '20 Mar, 2026', status: [1,1,1,0,0,0,0,0,0,0], tipo: 'Gobernanza', msg: 'Logs CloudTrail Inalterables' },
];

export default function App() {
  const [metrics, setMetrics] = useState({ cpu: 94, latencia: 198, usuarios: 10000 });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        cpu: Math.floor(85 + Math.random() * 10),
        latencia: Math.floor(180 + Math.random() * 20),
        usuarios: Math.floor(9800 + Math.random() * 400)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen bg-white font-sans text-zinc-950">
      
      {/* SIDEBAR - Localizado */}
      <aside className="w-[240px] border-r border-zinc-200 flex flex-col h-screen sticky top-0 bg-white z-50">
        <div className="p-4 flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-zinc-950 rounded flex items-center justify-center text-white">
              <Cloud size={18} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold tracking-tight">CloudControl</span>
              <span className="text-[10px] text-zinc-400 font-medium truncate">Arquitectura AA6</span>
            </div>
          </div>
          <div className="p-1 border border-zinc-200 rounded cursor-pointer hover:bg-zinc-50 transition-colors">
            <MoreHorizontal size={14} className="text-zinc-400" />
          </div>
        </div>

        <nav className="flex-1 px-3 space-y-1 overflow-y-auto scrollbar-hide">
          <SidebarLabel label="Principal" />
          <NavItem icon={<LayoutDashboard size={18} />} label="Vista General" active />
          <NavItem icon={<Server size={18} />} label="Infraestructura" />
          <NavItem icon={<Database size={18} />} label="Datos y SQL" />
          <NavItem icon={<ShieldCheck size={18} />} label="Seguridad Hub" hasSub />

          <SidebarLabel label="Análisis" />
          <NavItem icon={<Activity size={18} />} label="Carga en Tiempo Real" />
          <NavItem icon={<FileText size={18} />} label="Auditoría MinTIC" />

          <SidebarLabel label="Sistema" />
          <NavItem icon={<Terminal size={18} />} label="Logs CloudTrail" />
          <NavItem icon={<Zap size={18} />} label="Auto-Escalado" />
          <NavItem icon={<Lock size={18} />} label="Políticas IAM" />
        </nav>

        <div className="p-4 border-t border-zinc-200">
          <div className="flex items-center justify-between group cursor-pointer hover:bg-zinc-50 p-2 -m-2 rounded-lg transition-all">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-zinc-950 text-white rounded-full flex items-center justify-center text-[10px] font-black">SJ</div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold truncate">Sergio A. Jerez P.</span>
                <span className="text-[10px] text-zinc-400 font-medium truncate">sergio@uni.edu.co</span>
              </div>
            </div>
            <div className="text-zinc-400">
               <RefreshCw size={14} className="animate-spin-slow group-hover:text-zinc-950" />
            </div>
          </div>
        </div>
      </aside>

      {/* PANEL PRINCIPAL */}
      <main className="flex-1 min-w-0 flex flex-col bg-[#fafafa]">
        {/* CABECERA */}
        <header className="h-[52px] border-b border-zinc-200 flex items-center justify-between px-6 bg-white sticky top-0 z-40">
          <div className="flex items-center gap-3 text-sm font-semibold text-zinc-950">
            <LayoutDashboard size={18} className="text-zinc-400" />
            <span className="text-zinc-400 font-medium">Infraestructura</span>
            <span className="text-zinc-300">/</span>
            <span>Panel de Control</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group hidden md:block">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input 
                type="text" 
                placeholder="Buscar recursos, logs..." 
                className="w-[300px] h-9 bg-zinc-50/50 border border-zinc-200 rounded-md pl-10 pr-12 text-xs focus:ring-1 focus:ring-zinc-200 focus:outline-none focus:bg-white transition-all"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 border border-zinc-200 px-1 rounded bg-white">
                 <Command size={10} className="text-zinc-400" />
                 <span className="text-[10px] text-zinc-400 font-bold">K</span>
              </div>
            </div>
            <div className="flex items-center gap-2 border-l border-zinc-100 pl-4">
               <ButtonIcon icon={<Bell size={18} />} count="2" />
               <ButtonIcon icon={<HelpCircle size={18} />} />
            </div>
          </div>
        </header>

        {/* CONTENIDO */}
        <div className="p-8 space-y-8 max-w-[1600px] mx-auto w-full">
          
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* GRÁFICO PRINCIPAL: RAJAMMAL 2025 */}
            <div className="xl:col-span-3 border border-zinc-200 rounded-xl bg-white p-8 shadow-sm">
              <div className="flex justify-between items-start mb-12">
                <div className="space-y-1">
                  <h2 className="text-3xl font-black tracking-tight text-zinc-950">{metrics.usuarios.toLocaleString()} Pet/s</h2>
                  <p className="text-[11px] text-zinc-400 font-black uppercase tracking-[0.2em]">Escalado Dinámico (Rajammal et al. 2025)</p>
                </div>
                <div className="flex items-center gap-8">
                   <LegendItem color="#09090b" label="Demanda en Tiempo Real" />
                   <LegendItem color="#e4e4e7" label="Capacidad del Sistema" />
                   <div className="h-8 w-px bg-zinc-100 mx-2" />
                   <MoreHorizontal size={16} className="text-zinc-300 cursor-pointer hover:text-zinc-950 transition-colors" />
                </div>
              </div>

              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={BAR_DATA} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="0" stroke="#f4f4f5" vertical={false} />
                    <XAxis dataKey="name" hide />
                    <YAxis axisLine={false} tickLine={false} fontSize={10} fontWeight={800} stroke="#cbd5e1" />
                    <Tooltip cursor={{ fill: '#fafafa' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="actual" fill="#09090b" radius={[4, 4, 0, 0]} barSize={14} />
                    <Bar dataKey="previo" fill="#f4f4f5" radius={[4, 4, 0, 0]} barSize={14} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* MÉTRICAS KPI */}
            <div className="flex flex-col gap-6">
              <KPIMetric title="Carga del CPU" value={metrics.cpu + "%"} trend="+4.2%" type="up" sub="Máxima Capacidad" />
              <KPIMetric title="Latencia Media" value={metrics.latencia + " ms"} trend="-12ms" type="up" sub="Optimización P99" />
              <KPIMetric title="Tasa de Error" value="0.02%" trend="Estable" type="down" sub="Nodos de Borde" />
              <KPIMetric title="Nivel de Auditoría" value="100%" trend="MinTIC" type="up" sub="Cumplimiento Validado" />
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* GRÁFICO DE RENDIMIENTO DE INFRAESTRUCTURA */}
            <div className="xl:col-span-3 border border-zinc-200 rounded-xl bg-white p-8 shadow-sm text-zinc-950">
              <div className="flex justify-between items-start mb-12">
                <div className="space-y-1">
                  <h3 className="text-lg font-black tracking-tight">Rendimiento de la Infraestructura</h3>
                  <div className="flex items-center gap-10 mt-4">
                     <DataPoint color="#09090b" label="Uso de CPU" value="94%" />
                     <DataPoint color="#71717a" label="Memoria RAM" value="78%" />
                     <DataPoint color="#d4d4d8" label="Tráfico de Red" value="1.2 Gb/s" />
                  </div>
                </div>
                <div className="flex gap-1 border border-zinc-100 p-1 rounded-lg bg-zinc-50/50">
                   <button className="px-4 py-1.5 text-[10px] font-black bg-white shadow-sm rounded-md border border-zinc-200 uppercase tracking-widest">Tiempo Real</button>
                   <button className="px-4 py-1.5 text-[10px] font-black text-zinc-400 uppercase tracking-widest hover:text-zinc-600 transition-colors">Histórico</button>
                </div>
              </div>

              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={LINE_DATA} margin={{ top: 0, right: 20, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#09090b" stopOpacity={0.05}/>
                        <stop offset="95%" stopColor="#09090b" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" vertical={false} />
                    <XAxis dataKey="name" hide />
                    <YAxis axisLine={false} tickLine={false} fontSize={10} fontWeight={800} stroke="#cbd5e1" />
                    <Tooltip contentStyle={{ borderRadius: '12px' }} />
                    <Area type="monotone" dataKey="cpu" stroke="#09090b" strokeWidth={3} fillOpacity={1} fill="url(#colorCpu)" />
                    <Area type="monotone" dataKey="red" stroke="#71717a" strokeWidth={2} fill="transparent" strokeDasharray="4 4" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* TABLA DE PROTOCOLOS DE AUDITORÍA */}
            <div className="border border-zinc-200 rounded-xl bg-white p-8 shadow-sm flex flex-col">
              <div className="flex justify-between items-center mb-10 pb-4 border-b border-zinc-50">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em]">Protocolos de Auditoría</h3>
                <div className="flex gap-4">
                  <RefreshCw size={14} className="text-zinc-300 cursor-pointer hover:rotate-180 transition-transform duration-500" />
                  <MoreHorizontal size={14} className="text-zinc-300 cursor-pointer" />
                </div>
              </div>
              <div className="space-y-6 flex-1 overflow-y-auto scrollbar-hide">
                <div className="grid grid-cols-4 text-[10px] font-black text-zinc-300 uppercase tracking-widest pb-2">
                  <div>Ref</div>
                  <div className="pl-4">Cumplimiento</div>
                  <div className="pl-8">Estado</div>
                  <div className="text-right">Val</div>
                </div>
                {AUDIT_LOGS.map((row) => (
                  <div key={row.id} className="grid grid-cols-4 items-center group cursor-default">
                    <div className="text-[10px] font-bold text-zinc-400 group-hover:text-zinc-950 transition-colors uppercase">{row.id}</div>
                    <div className="pl-4 flex flex-col">
                       <span className="text-[10px] font-extrabold text-zinc-950 uppercase leading-none">{row.tipo}</span>
                       <span className="text-[8px] text-zinc-400 font-medium truncate w-[60px]">{row.msg}</span>
                    </div>
                    <div className="flex gap-0.5 pl-8">
                       {row.status.map((s, i) => (
                         <div key={i} className={cn("h-1.5 w-1 rounded-full", s ? "bg-zinc-950" : "bg-zinc-100")} />
                       ))}
                    </div>
                    <div className="text-right text-[10px] font-black text-zinc-300 group-hover:text-zinc-950">100</div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-zinc-50">
                 <button className="w-full py-3 bg-zinc-950 text-white rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg shadow-zinc-200 hover:translate-y-[-2px] transition-all active:translate-y-0">
                   Generar Reporte AA6
                 </button>
              </div>
            </div>
          </div>

          {/* FOOTER DE MÉTRICAS DEL PROYECTO */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
             <FooterCard title="Arquitectura" value="Serverless" sub="Lambda + S3 + CloudFront" />
             <FooterCard title="Cifrado" value="AES-256" sub="Bases de Datos & Capa S3" />
             <FooterCard title="Gestión de Tráfico" value="ELB Dinámico" sub="Auto-escalado Habilitado" />
             <FooterCard title="Gobernanza" value="MinTIC 2021" sub="Trazas de Auditoría Certificadas" />
          </div>

        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false, hasSub = false }) {
  return (
    <div className={cn(
      "flex items-center gap-3 px-3 py-2.5 text-[13px] font-semibold text-zinc-500 rounded-md transition-all cursor-pointer group",
      active ? "bg-zinc-100 text-zinc-950 shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]" : "hover:text-zinc-950 hover:bg-zinc-50"
    )}>
      <span className={cn(active ? "text-zinc-950" : "text-zinc-400 group-hover:text-zinc-950")}>{icon}</span>
      <span className="flex-1 tracking-tight">{label}</span>
      {hasSub && <ChevronDown size={14} className="text-zinc-300" />}
    </div>
  );
}

function SidebarLabel({ label }) {
  return (
    <p className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.2em] px-3 mb-2 mt-8 first:mt-2">
      {label}
    </p>
  );
}

function ButtonIcon({ icon, count }) {
  return (
    <div className="p-2 relative hover:bg-zinc-50 rounded-lg transition-colors cursor-pointer text-zinc-400 hover:text-zinc-950">
      {icon}
      {count && (
        <span className="absolute top-1 right-1 h-3.5 w-3.5 bg-zinc-950 text-white text-[8px] font-black rounded-full flex items-center justify-center border-2 border-white">
          {count}
        </span>
      )}
    </div>
  );
}

function KPIMetric({ title, value, trend, type, sub }) {
  return (
    <div className="border border-zinc-200 p-6 rounded-xl bg-white flex flex-col justify-between shadow-sm group hover:border-zinc-300 transition-all">
      <div className="flex justify-between items-center mb-6">
        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{title}</span>
        <MoreHorizontal size={14} className="text-zinc-300 group-hover:text-zinc-950" />
      </div>
      <div className="space-y-1">
        <h4 className="text-2xl font-black tracking-tighter text-zinc-950">{value}</h4>
        <div className="flex items-center justify-between">
           <p className={cn("text-[10px] font-black uppercase tracking-tight", type === 'up' ? "text-zinc-950" : "text-zinc-400")}>
             {trend} <span className="text-zinc-300 font-bold ml-1">Tendencia</span>
           </p>
           <span className="text-[9px] text-zinc-300 font-bold uppercase">{sub}</span>
        </div>
      </div>
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{label}</span>
    </div>
  );
}

function DataPoint({ color, label, value }) {
  return (
    <div className="flex flex-col gap-1">
       <div className="flex items-center gap-2">
          <div className="h-1 w-3 rounded-full" style={{ backgroundColor: color }} />
          <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest leading-none">{label}</span>
       </div>
       <span className="text-sm font-black text-zinc-950 pl-5">{value}</span>
    </div>
  );
}

function FooterCard({ title, value, sub }) {
  return (
    <div className="p-6 border border-zinc-100 rounded-xl bg-white hover:border-zinc-200 transition-all shadow-premium group">
      <h5 className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-300 mb-2 group-hover:text-zinc-950 transition-colors">{title}</h5>
      <p className="text-sm font-black text-zinc-950 mb-1">{value}</p>
      <p className="text-[10px] text-zinc-400 font-bold">{sub}</p>
    </div>
  );
}
