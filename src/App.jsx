import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  ShieldCheck, 
  Server, 
  Database, 
  Cloud, 
  LayoutDashboard, 
  AlertTriangle,
  Lock,
  Zap,
  RefreshCw
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes (Plain JS)
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Simulated data according to Rajammal (2025) and MinTIC 2021
const INITIAL_LOGS = [
  { id: 1, time: "12:35:01", event: "API Gateway established TLS 1.2 handshake", type: "security" },
  { id: 2, time: "12:35:10", event: "IAM Role validated for Lambda ExecuteAccess", type: "auth" },
  { id: 3, time: "12:36:00", event: "CloudFront Edge Location: Bogota (Active)", type: "network" },
  { id: 4, time: "12:37:05", event: "RDS Instance: AES-256 Encryption verified", type: "security" },
];

export default function App() {
  const [data, setData] = useState([]);
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [activeUsers, setActiveUsers] = useState(100);
  const [cpuLoad, setCpuLoad] = useState(12);
  const [latency, setLatency] = useState(45);

  // Simulation logic for Rajammal (2025) Dynamic Load Balancing
  useEffect(() => {
    let tick = 0;
    const interval = setInterval(() => {
      tick++;
      
      // Simulate traffic spikes and auto-scaling
      const newUsers = Math.floor(100 + Math.sin(tick / 5) * 50 + (tick % 20 > 15 ? 8000 : 0));
      const simulatedCpu = Math.min(95, Math.max(5, (newUsers / 10000) * 80 + Math.random() * 10));
      const simulatedLatency = Math.floor(30 + (simulatedCpu / 2) + Math.random() * 10);

      setActiveUsers(newUsers);
      setCpuLoad(Math.round(simulatedCpu));
      setLatency(simulatedLatency);

      setData(prev => {
        const newData = [...prev, { time: tick, users: newUsers, cpu: simulatedCpu }].slice(-20);
        return newData;
      });

      // Add random security logs
      if (Math.random() > 0.95) {
        const logId = Date.now();
        const securityEvents = [
          "WAF blocked suspicious SQL injection attempt",
          "IAM session token rotated (MinTIC Compliance)",
          "Auto-scaling group: Launched new Lambda instance",
          "ELB health check: Node latency synchronized"
        ];
        const event = securityEvents[Math.floor(Math.random() * securityEvents.length)];
        setLogs(prev => [{ id: logId, time: new Date().toLocaleTimeString(), event, type: "system" }, ...prev].slice(0, 8));
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-500/30">
      {/* Sidebar / Navigation */}
      <nav className="fixed left-0 top-0 h-full w-20 border-r border-slate-800 bg-slate-950/50 backdrop-blur-xl flex flex-col items-center py-8 gap-8 z-50">
        <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/20">
          <Cloud size={24} className="text-white" />
        </div>
        <div className="flex flex-col gap-6 mt-8">
          <LayoutDashboard size={24} className="text-blue-400" />
          <Server size={24} className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer" />
          <Database size={24} className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer" />
          <ShieldCheck size={24} className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer" />
        </div>
        <div className="mt-auto">
          <RefreshCw size={24} className="text-slate-500 animate-spin-slow" />
        </div>
      </nav>

      {/* Main Content */}
      <main className="pl-24 pr-8 py-8 max-w-[1440px] mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Cloud <span className="gradient-text">Resource Manager</span>
            </h1>
            <p className="text-slate-400 text-sm flex items-center gap-2">
              <Lock size={14} className="text-green-500" /> 
              Cumplimiento Normativo MinTIC 2021 | Arquitectura AWS Serverless
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end mr-4">
              <span className="text-xs text-slate-500 uppercase font-bold tracking-widest">Responsable</span>
              <span className="text-sm font-medium">Sergio Andres Jerez Pinzón</span>
            </div>
            <div className="h-12 w-12 rounded-full border-2 border-slate-700 p-1">
              <div className="h-full w-full bg-slate-800 rounded-full flex items-center justify-center font-bold text-blue-400">
                SJ
              </div>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Carga de CPU" 
            value={cpuLoad + "%"} 
            icon={<Activity className="text-blue-500" />} 
            trend={cpuLoad > 80 ? "Critical" : "Optimal"}
            color={cpuLoad > 80 ? "text-red-400" : "text-blue-400"}
          />
          <StatCard 
            title="Usuarios Concurrentes" 
            value={activeUsers.toLocaleString()} 
            icon={<Zap className="text-yellow-500" />} 
            trend={activeUsers > 5000 ? "High Load" : "Steady"} 
            color="text-yellow-400"
          />
          <StatCard 
            title="Latencia Promedio" 
            value={latency + " ms"} 
            icon={<Activity className="text-purple-500" />} 
            trend={latency < 200 ? "Sub-200ms" : "Review"} 
            color="text-purple-400"
          />
          <StatCard 
            title="Estado MinTIC" 
            value="100%" 
            icon={<ShieldCheck className="text-green-500" />} 
            trend="Compliant" 
            color="text-green-400"
          />
        </div>

        {/* Main Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Charts Section */}
          <div className="xl:col-span-2 space-y-8">
            <div className="glass p-6 rounded-3xl overflow-hidden card-gradient">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold">Dynamic Scaling (Rajammal 2025)</h3>
                  <p className="text-xs text-slate-500">Métricas de auto-escalado en tiempo real</p>
                </div>
                <div className="flex gap-2">
                  <div className="px-3 py-1 bg-blue-500/20 rounded-full text-[10px] items-center flex gap-1 border border-blue-500/30">
                    <span className="h-2 w-2 bg-blue-500 rounded-full animate-pulse" /> Usuarios
                  </div>
                  <div className="px-3 py-1 bg-purple-500/20 rounded-full text-[10px] items-center flex gap-1 border border-purple-500/30">
                    <span className="h-2 w-2 bg-purple-500 rounded-full animate-pulse" /> CPU %
                  </div>
                </div>
              </div>
              
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="time" hide />
                    <YAxis stroke="#475569" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
                      itemStyle={{ color: '#f8fafc' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="users" 
                      stroke="#3b82f6" 
                      fillOpacity={1} 
                      fill="url(#colorUsers)" 
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Architecture Stack */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ResourceItem title="S3 Frontend" status="Active" icon={<Cloud size={20} />} />
              <ResourceItem title="Lambda Engine" status="Scaling" icon={<Zap size={20} />} />
              <ResourceItem title="RDS Database" status="Secure" icon={<Database size={20} />} />
            </div>
          </div>

          {/* Sidebar Section: Logs & Compliance */}
          <div className="space-y-6">
            <div className="glass p-6 rounded-3xl h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold flex items-center gap-2">
                  <Activity size={18} className="text-blue-400" />
                  CloudTrail Audit Logs
                </h3>
                <span className="text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-400">MinTIC 2021</span>
              </div>
              <div className="flex-1 space-y-4">
                {logs.map((log) => (
                  <div key={log.id} className="group flex gap-3 items-start border-l-2 border-slate-800 pl-4 py-1 hover:border-blue-500 transition-colors">
                    <span className="text-[10px] font-mono text-slate-500 mt-1">{log.time}</span>
                    <p className="text-xs text-slate-300 leading-relaxed group-hover:text-white transition-colors">
                      {log.event}
                    </p>
                  </div>
                ))}
              </div>
              <button className="mt-8 py-3 w-full bg-slate-900 border border-slate-800 rounded-xl text-xs font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                Descargar Reporte Completo (PDF)
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon, trend, color }) {
  return (
    <div className="glass p-6 rounded-3xl hover:-translate-y-1 transition-all group overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform">
        {React.cloneElement(icon, { size: 64 })}
      </div>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-slate-900 rounded-xl">{icon}</div>
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{title}</span>
      </div>
      <div className={cn("text-3xl font-black mb-1", color)}>{value}</div>
      <div className="text-[10px] font-bold text-slate-400 bg-slate-900/50 w-fit px-2 py-1 rounded-full border border-slate-800">
        {trend}
      </div>
    </div>
  );
}

function ResourceItem({ title, status, icon }) {
  return (
    <div className="glass p-4 rounded-2xl flex items-center gap-4 hover:bg-white/5 transition-colors border border-white/5">
      <div className="p-2 bg-slate-900 rounded-lg text-slate-400">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-bold">{title}</span>
        <span className="text-[10px] text-slate-500 flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> {status}
        </span>
      </div>
    </div>
  );
}
