import { useState, createContext, useContext, useEffect } from "react";

/* ─── THEME CONTEXT ─────────────────────────────────── */
const ThemeCtx = createContext();
const useTheme = () => useContext(ThemeCtx);

const themes = {
  light: {
    name: "light",
    sidebar:    "#0369a1",
    sidebarText:"#fff",
    sidebarSub: "rgba(255,255,255,.75)",
    sidebarHover:"rgba(255,255,255,.15)",
    sidebarActive:"rgba(255,255,255,.25)",
    bg:         "#f1f5f9",
    surface:    "#ffffff",
    surface2:   "#f8fafc",
    border:     "#e2e8f0",
    text:       "#0f172a",
    textSub:    "#64748b",
    shadow:     "0 2px 8px rgba(0,0,0,.08)",
    shadowLg:   "0 10px 25px rgba(0,0,0,.12)",
    inputBg:    "#ffffff",
    tablehead:  "#f8fafc",
    toggle:     "#e2e8f0",
    toggleThumb:"#ffffff",
  },
  dark: {
    name: "dark",
    sidebar:    "#0f172a",
    sidebarText:"#f1f5f9",
    sidebarSub: "rgba(241,245,249,.6)",
    sidebarHover:"rgba(255,255,255,.08)",
    sidebarActive:"rgba(99,179,237,.2)",
    bg:         "#0f172a",
    surface:    "#1e293b",
    surface2:   "#253347",
    border:     "#334155",
    text:       "#f1f5f9",
    textSub:    "#94a3b8",
    shadow:     "0 2px 8px rgba(0,0,0,.4)",
    shadowLg:   "0 10px 25px rgba(0,0,0,.5)",
    inputBg:    "#1e293b",
    tablehead:  "#253347",
    toggle:     "#334155",
    toggleThumb:"#63b3ed",
  },
};

const accent = {
  primary: "#0369a1",
  success: "#16a34a",
  accent:  "#ea580c",
  warning: "#f59e0b",
  danger:  "#ef4444",
};

/* ─── DATA ───────────────────────────────────────────── */
const students = [
  { id:"1", name:"Ramesh Kumar",  roll:1, std:"Class 3", sec:"A", av:"RK", col:"#3b82f6" },
  { id:"2", name:"Priya Sharma",  roll:2, std:"Class 3", sec:"A", av:"PS", col:"#ec4899" },
  { id:"3", name:"Arun Sivan",    roll:3, std:"Class 3", sec:"A", av:"AS", col:"#f59e0b" },
  { id:"4", name:"Maya Singh",    roll:4, std:"Class 3", sec:"A", av:"MS", col:"#8b5cf6" },
  { id:"5", name:"Vikram Patel",  roll:5, std:"Class 3", sec:"A", av:"VP", col:"#06b6d4" },
  { id:"6", name:"Kavya Ravi",    roll:6, std:"Class 3", sec:"B", av:"KR", col:"#10b981" },
];

const feesData = [
  { id:"1", sid:"1", month:"June",  amount:500, paid:500, status:"paid"    },
  { id:"2", sid:"2", month:"June",  amount:500, paid:0,   status:"pending" },
  { id:"3", sid:"3", month:"June",  amount:500, paid:250, status:"partial" },
  { id:"4", sid:"4", month:"May",   amount:500, paid:0,   status:"pending" },
  { id:"5", sid:"5", month:"June",  amount:500, paid:500, status:"paid"    },
];

/* ─── ATOMS ─────────────────────────────────────────── */
const Avatar = ({ initials, color, size = 40 }) => (
  <div style={{
    width:size, height:size, borderRadius:"50%", background:color,
    color:"#fff", display:"flex", alignItems:"center", justifyContent:"center",
    fontWeight:700, fontSize:size*0.35, flexShrink:0,
  }}>{initials}</div>
);

const Btn = ({ children, color=accent.primary, onClick, full, small, ghost, style={} }) => {
  const { t } = useTheme();
  return (
    <button onClick={onClick} style={{
      padding: small ? "6px 12px" : "11px 18px",
      background: ghost ? "transparent" : color,
      color: ghost ? t.text : "#fff",
      border: ghost ? `1px solid ${t.border}` : "none",
      borderRadius:7, fontWeight:600, cursor:"pointer",
      fontSize: small ? 12 : 14,
      minHeight: small ? "auto" : 44,
      width: full ? "100%" : "auto",
      transition:"all .15s",
      ...style,
    }}
      onMouseEnter={e => e.currentTarget.style.opacity=".82"}
      onMouseLeave={e => e.currentTarget.style.opacity="1"}
    >{children}</button>
  );
};

const Card = ({ children, style={} }) => {
  const { t } = useTheme();
  return (
    <div style={{
      background:t.surface, border:`1px solid ${t.border}`,
      borderRadius:12, padding:20, boxShadow:t.shadow, ...style,
    }}>{children}</div>
  );
};

const MetricCard = ({ label, value, color=accent.primary, desc, progress }) => {
  const { t } = useTheme();
  return (
    <Card>
      <div style={{ fontSize:11, color:t.textSub, fontWeight:700, textTransform:"uppercase", letterSpacing:.6, marginBottom:6 }}>{label}</div>
      <div style={{ fontSize:30, fontWeight:800, color, marginBottom:6 }}>{value}</div>
      {progress!==undefined && (
        <div style={{ height:6, background:t.surface2, borderRadius:3, overflow:"hidden", marginBottom:6 }}>
          <div style={{ height:"100%", width:`${progress}%`, background:color, borderRadius:3, transition:"width .5s ease" }} />
        </div>
      )}
      {desc && <div style={{ fontSize:12, color:t.textSub }}>{desc}</div>}
    </Card>
  );
};

const Badge = ({ children, bg, color }) => (
  <span style={{ padding:"5px 10px", borderRadius:6, fontSize:12, fontWeight:600, background:bg, color }}>{children}</span>
);

const SectionTitle = ({ children }) => {
  const { t } = useTheme();
  return <h2 style={{ fontSize:16, fontWeight:700, marginBottom:14, color:t.text, marginTop:0 }}>{children}</h2>;
};

const FormField = ({ label, type="text", options, defaultValue, placeholder }) => {
  const { t } = useTheme();
  const inputStyle = {
    width:"100%", padding:"9px 12px", border:`1px solid ${t.border}`,
    borderRadius:7, fontSize:14, background:t.inputBg, color:t.text,
    outline:"none", boxSizing:"border-box",
  };
  return (
    <div>
      <label style={{ display:"block", fontSize:13, fontWeight:600, marginBottom:6, color:t.text }}>{label}</label>
      {type==="select"
        ? <select style={inputStyle}>{options.map(o=><option key={o}>{o}</option>)}</select>
        : <input type={type} defaultValue={defaultValue} placeholder={placeholder} style={inputStyle} />
      }
    </div>
  );
};

/* ─── LOGIN SCREEN ──────────────────────────────────── */
const LoginScreen = ({ onSelectRole, themeName }) => {
  const t = themes[themeName];
  const roles = [
    { id:"headmaster", icon:"👑", label:"Headmaster", desc:"Full access to all features", color:"#0369a1" },
    { id:"teacher", icon:"👨‍🏫", label:"Teacher", desc:"Attendance, Students, Reports", color:"#16a34a" },
    { id:"student", icon:"🎓", label:"Student", desc:"View fees & progress", color:"#ea580c" },
  ];
  return (
    <div style={{
      display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh",
      background:t.bg, padding:20,
    }}>
      <div style={{
        background:t.surface, border:`1px solid ${t.border}`,
        borderRadius:16, padding:40, maxWidth:500, boxShadow:t.shadowLg,
      }}>
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <div style={{ fontSize:48, marginBottom:16 }}>📚</div>
          <h1 style={{ fontSize:28, fontWeight:800, color:t.text, marginBottom:8 }}>Silambam Tracker</h1>
          <p style={{ fontSize:14, color:t.textSub, margin:0 }}>Select your role to continue</p>
        </div>
        <div style={{ display:"grid", gap:12 }}>
          {roles.map(role=>(
            <button key={role.id} onClick={()=>onSelectRole(role.id)} style={{
              display:"flex", alignItems:"center", gap:16, padding:20,
              background:t.surface2, border:`1.5px solid ${t.border}`,
              borderRadius:10, cursor:"pointer", transition:"all .2s",
              textAlign:"left",
            }}
              onMouseEnter={e=>{
                e.currentTarget.style.background=role.color+"15";
                e.currentTarget.style.borderColor=role.color;
              }}
              onMouseLeave={e=>{
                e.currentTarget.style.background=t.surface2;
                e.currentTarget.style.borderColor=t.border;
              }}
            >
              <div style={{ fontSize:40 }}>{role.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, fontSize:16, color:t.text }}>{role.label}</div>
                <div style={{ fontSize:13, color:t.textSub }}>{role.desc}</div>
              </div>
              <div style={{ fontSize:20, opacity:.5 }}>→</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─── PAGES ─────────────────────────────────────────── */
const Dashboard = ({ nav }) => {
  const { t } = useTheme();
  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:28 }}>
        <Avatar initials="AM" color={accent.primary} size={52} />
        <div>
          <div style={{ fontSize:20, fontWeight:800, color:t.text }}>Good Morning, Mr. Ambikapathi 👋</div>
          <div style={{ fontSize:13, color:t.textSub }}>Headmaster · Sri Vidya Primary School</div>
        </div>
      </div>

      <div style={{ background:"#fff5f5", border:`1px solid ${accent.danger}`, borderRadius:10, padding:"14px 16px", marginBottom:24, display:"flex", gap:10 }}>
        <span style={{ fontSize:20 }}>⚠️</span>
        <div>
          <div style={{ fontWeight:700, fontSize:13, color:"#7f1d1d" }}>12 pending fee collections</div>
          <div style={{ fontSize:12, color:"#ef4444" }}>Action needed today</div>
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns: window.innerWidth < 768 ? "1fr" : "repeat(4,1fr)", gap:16, marginBottom:28 }}>
        <MetricCard label="Total Students"     value="248"    color={accent.primary} desc="5 standards, 3 sections" />
        <MetricCard label="Today's Attendance" value="94.2%"  color={accent.success} desc="235 of 248 present" />
        <MetricCard label="Fee Collection"     value="87%"    color={accent.success} progress={87} />
        <MetricCard label="Pending Items"      value="12"     color={accent.accent}  desc="Require attention" />
      </div>

      <SectionTitle>Quick Actions</SectionTitle>
      <div style={{ display:"grid", gridTemplateColumns: window.innerWidth < 768 ? "1fr 1fr" : "repeat(4,1fr)", gap:12, marginBottom:28 }}>
        <Btn color={accent.primary} onClick={()=>nav("attendance")}>📋 Attendance</Btn>
        <Btn color={accent.success} onClick={()=>nav("fees")}>💳 Collect Fees</Btn>
        <Btn color={accent.accent}  onClick={()=>nav("reports")}>📊 Reports</Btn>
        <Btn color="#6b7280"        onClick={()=>nav("students")}>👥 Students</Btn>
      </div>

      <SectionTitle>Recent Activity</SectionTitle>
      <Card>
        {[
          { icon:"✓", txt:"Attendance marked — Class 3-A (45 students)", time:"2 hrs ago",  col:accent.success },
          { icon:"💰", txt:"Fee collected — Ramesh Kumar ₹500",            time:"4 hrs ago",  col:accent.primary },
          { icon:"👤", txt:"New student enrolled — Kavya Ravi",             time:"1 day ago",  col:accent.accent  },
          { icon:"📊", txt:"Monthly report generated — May 2024",           time:"2 days ago", col:"#6b7280"       },
        ].map((a,i,arr)=>(
          <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"13px 0", borderBottom:i<arr.length-1?`1px solid ${t.border}`:"none" }}>
            <div style={{ width:34, height:34, borderRadius:"50%", background:a.col+"22", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, flexShrink:0 }}>{a.icon}</div>
            <div style={{ flex:1, fontSize:14, color:t.text }}>{a.txt}</div>
            <div style={{ fontSize:12, color:t.textSub, whiteSpace:"nowrap" }}>{a.time}</div>
          </div>
        ))}
      </Card>
    </div>
  );
};

const Attendance = ({ showToast }) => {
  const { t } = useTheme();
  const [att, setAtt] = useState({});
  const mark = (id, s) => setAtt(p => ({ ...p, [id]: p[id]===s ? null : s }));
  const cnt = { present:0, absent:0, leave:0 };
  Object.values(att).forEach(s => s && cnt[s]++);

  const rowBg     = { present:"#f0fdf4", absent:"#fef2f2", leave:"#fffbeb" };
  const rowBgDark = { present:"#14532d33", absent:"#7f1d1d33", leave:"#78350f33" };
  const rowBrd    = { present:accent.success, absent:accent.danger, leave:accent.warning };

  return (
    <div>
      <h1 style={{ fontSize:24, fontWeight:800, marginBottom:20, color:t.text }}>Mark Attendance</h1>
      <Card style={{ marginBottom:20 }}>
        <div style={{ display:"grid", gridTemplateColumns: window.innerWidth < 768 ? "1fr" : "1fr 1fr 1fr", gap:16 }}>
          <FormField label="Standard" type="select" options={["Class 1","Class 2","Class 3","Class 4","Class 5"]} />
          <FormField label="Section"  type="select" options={["Section A","Section B","Section C"]} />
          <FormField label="Date"     type="date"   defaultValue="2024-06-21" />
        </div>
      </Card>

      <div style={{ display:"flex", gap:10, marginBottom:20, flexWrap:"wrap" }}>
        <Badge bg="#dcfce7" color="#166534">✓ Present: {cnt.present}</Badge>
        <Badge bg="#fee2e2" color="#7f1d1d">✕ Absent: {cnt.absent}</Badge>
        <Badge bg="#fef3c7" color="#78350f">L Leave: {cnt.leave}</Badge>
        <Badge bg="#dbeafe" color="#1e40af">— Unmarked: {students.length - cnt.present - cnt.absent - cnt.leave}</Badge>
      </div>

      <div style={{ display:"grid", gap:10, marginBottom:20 }}>
        {students.map(s => {
          const st = att[s.id];
          return (
            <div key={s.id} style={{
              background: st ? (t.name==="dark" ? rowBgDark[st] : rowBg[st]) : t.surface,
              border:`1px solid ${st ? rowBrd[st] : t.border}`,
              borderRadius:8, padding:"14px 16px",
              display:"flex", alignItems:"center", gap:14, transition:"all .2s",
            }}>
              <Avatar initials={s.av} color={s.col} />
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:600, fontSize:14, color:t.text }}>{s.name}</div>
                <div style={{ fontSize:12, color:t.textSub }}>Roll: {s.roll} | {s.std}-{s.sec}</div>
              </div>
              <div style={{ display:"flex", gap:6 }}>
                {[["present","✓",accent.success],["absent","✕",accent.danger],["leave","L",accent.warning]].map(([key,lbl,col])=>(
                  <button key={key} onClick={()=>mark(s.id,key)} style={{
                    width:36, height:36, borderRadius:5, fontWeight:700, fontSize:14, cursor:"pointer",
                    background: att[s.id]===key ? col : t.surface2,
                    color: att[s.id]===key ? "#fff" : t.textSub,
                    border: att[s.id]===key ? "none" : `1px solid ${t.border}`,
                    transition:"all .15s",
                  }}>{lbl}</button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <Btn full color={accent.primary} onClick={()=>showToast(`✓ Attendance submitted for ${students.length} students!`)}>
        ✓ Submit Attendance for {students.length} Students
      </Btn>
    </div>
  );
};

const Fees = ({ showToast }) => {
  const { t } = useTheme();
  const collected = feesData.reduce((s,f)=>s+f.paid,0);
  const total     = feesData.reduce((s,f)=>s+f.amount,0);
  const rate      = ((collected/total)*100).toFixed(1);
  const pending   = feesData.filter(f=>f.status!=="paid");
  const stStyle   = { paid:{bg:"#dcfce7",color:"#166534"}, pending:{bg:"#fef3c7",color:"#78350f"}, partial:{bg:"#fee2e2",color:"#7f1d1d"} };

  return (
    <div>
      <h1 style={{ fontSize:24, fontWeight:800, marginBottom:20, color:t.text }}>Fee Collection</h1>
      <div style={{ display:"grid", gridTemplateColumns: window.innerWidth < 768 ? "1fr" : "repeat(3,1fr)", gap:16, marginBottom:24 }}>
        <MetricCard label="Collected"       value={`₹${collected}`}       color={accent.success} />
        <MetricCard label="Pending"         value={`₹${total-collected}`} color={accent.danger}  />
        <MetricCard label="Collection Rate" value={`${rate}%`}            color={accent.success} progress={Number(rate)} />
      </div>

      <Card style={{ background: t.name==="dark"?"#14532d22":"#f0fdf4", border:`2px solid ${accent.success}`, marginBottom:24 }}>
        <SectionTitle>Collect Fee</SectionTitle>
        <div style={{ display:"grid", gridTemplateColumns: window.innerWidth < 768 ? "1fr" : "repeat(2,1fr)", gap:16, marginBottom:16 }}>
          <FormField label="Student"        type="select" options={students.map(s=>s.name)} />
          <FormField label="Month"          type="select" options={["June 2024","May 2024","April 2024"]} />
          <FormField label="Amount (₹)"     type="number" defaultValue="500" />
          <FormField label="Payment Method" type="select" options={["Cash","Check","UPI","Bank Transfer"]} />
        </div>
        <Btn full color={accent.success} onClick={()=>showToast("✓ Fee collected & receipt generated!")}>💾 Collect Fee</Btn>
      </Card>

      <SectionTitle>Pending Fees ({pending.length})</SectionTitle>
      <Card style={{ padding:0, overflow:"hidden" }}>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead style={{ background:t.tablehead }}>
            <tr>
              {["Student","Month","Amount","Paid","Status","Action"].map(h=>(
                <th key={h} style={{ padding:"12px 16px", textAlign:"left", fontSize:11, fontWeight:700, color:t.textSub, textTransform:"uppercase", letterSpacing:.5 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pending.map((f,i)=>{
              const s=students.find(x=>x.id===f.sid);
              const st=stStyle[f.status];
              return (
                <tr key={f.id} style={{ borderTop:`1px solid ${t.border}` }}>
                  <td style={{ padding:"14px 16px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <Avatar initials={s.av} color={s.col} size={28} />
                      <span style={{ fontWeight:600, fontSize:14, color:t.text }}>{s.name}</span>
                    </div>
                  </td>
                  <td style={{ padding:"14px 16px", fontSize:14, color:t.text }}>{f.month} 2024</td>
                  <td style={{ padding:"14px 16px", fontSize:14, color:t.text }}>₹{f.amount}</td>
                  <td style={{ padding:"14px 16px", fontSize:14, color:t.text }}>₹{f.paid}</td>
                  <td style={{ padding:"14px 16px" }}><Badge bg={st.bg} color={st.color}>{f.status.charAt(0).toUpperCase()+f.status.slice(1)}</Badge></td>
                  <td style={{ padding:"14px 16px" }}><Btn small color={accent.success} onClick={()=>showToast(`✓ Fee collected for ${s.name}`)}>Collect</Btn></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

const MyFees = ({ showToast }) => {
  const { t } = useTheme();
  const myFees = feesData.filter(f=>f.sid==="1");
  const stStyle   = { paid:{bg:"#dcfce7",color:"#166534"}, pending:{bg:"#fef3c7",color:"#78350f"}, partial:{bg:"#fee2e2",color:"#7f1d1d"} };

  return (
    <div>
      <h1 style={{ fontSize:24, fontWeight:800, marginBottom:20, color:t.text }}>My Fees</h1>
      <div style={{ display:"grid", gridTemplateColumns: window.innerWidth < 768 ? "1fr" : "repeat(2,1fr)", gap:16, marginBottom:24 }}>
        <MetricCard label="Total Payable" value="₹1,000" color={accent.primary} desc="June & May 2024" />
        <MetricCard label="Amount Paid" value="₹500" color={accent.success} progress={50} desc="50% complete" />
      </div>
      
      <SectionTitle>Fee Details</SectionTitle>
      <Card style={{ padding:0, overflow:"hidden" }}>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead style={{ background:t.tablehead }}>
            <tr>
              {["Month","Amount","Paid","Status","Action"].map(h=>(
                <th key={h} style={{ padding:"12px 16px", textAlign:"left", fontSize:11, fontWeight:700, color:t.textSub, textTransform:"uppercase", letterSpacing:.5 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {myFees.map((f,i)=>{
              const st=stStyle[f.status];
              return (
                <tr key={f.id} style={{ borderTop:`1px solid ${t.border}` }}>
                  <td style={{ padding:"14px 16px", fontSize:14, color:t.text }}>{f.month} 2024</td>
                  <td style={{ padding:"14px 16px", fontSize:14, color:t.text }}>₹{f.amount}</td>
                  <td style={{ padding:"14px 16px", fontSize:14, color:t.text }}>₹{f.paid}</td>
                  <td style={{ padding:"14px 16px" }}><Badge bg={st.bg} color={st.color}>{f.status.charAt(0).toUpperCase()+f.status.slice(1)}</Badge></td>
                  <td style={{ padding:"14px 16px" }}><Btn small color={accent.success} onClick={()=>showToast("✓ Payment initiated")}>Pay</Btn></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

const Students = ({ showToast }) => {
  const { t } = useTheme();
  const [search, setSearch] = useState("");
  const filtered = students.filter(s=>s.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <h1 style={{ fontSize:24, fontWeight:800, marginBottom:20, color:t.text }}>Student Management</h1>
      <div style={{ display:"flex", gap:12, marginBottom:20 }}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search students..."
          style={{ flex:1, padding:"10px 14px", border:`1px solid ${t.border}`, borderRadius:7, fontSize:14, background:t.inputBg, color:t.text, outline:"none" }} />
        <Btn color={accent.primary} onClick={()=>showToast("➕ Add Student form coming soon!")}>➕ Add Student</Btn>
      </div>
      <div style={{ marginBottom:14 }}>
        <Badge bg="#dbeafe" color="#1e40af">{filtered.length} of {students.length} students</Badge>
      </div>
      <div style={{ display:"grid", gap:10 }}>
        {filtered.map(s=>(
          <Card key={s.id} style={{ padding:"14px 16px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <Avatar initials={s.av} color={s.col} />
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:600, fontSize:14, marginBottom:4, color:t.text }}>{s.name}</div>
                <div style={{ fontSize:12, color:t.textSub }}>Roll: {s.roll} | {s.std}-{s.sec}</div>
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <Btn small color={accent.primary} onClick={()=>showToast(`✏️ Edit ${s.name}`)}>Edit</Btn>
                <Btn small color={accent.danger}  onClick={()=>showToast(`🗑️ Deleted ${s.name}`)}>Delete</Btn>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const MyProgress = () => {
  const { t } = useTheme();
  return (
    <div>
      <h1 style={{ fontSize:24, fontWeight:800, marginBottom:20, color:t.text }}>My Progress</h1>
      <div style={{ display:"grid", gridTemplateColumns: window.innerWidth < 768 ? "1fr" : "repeat(2,1fr)", gap:16, marginBottom:24 }}>
        <MetricCard label="Attendance" value="92.5%" color={accent.success} progress={92} desc="Excellent" />
        <MetricCard label="Progress" value="8.5/10" color={accent.primary} progress={85} desc="Good performance" />
      </div>

      <SectionTitle>Monthly Attendance</SectionTitle>
      <Card>
        {["June","May","April","March"].map((month,i)=>(
          <div key={month} style={{ paddingBottom:14, borderBottom:i<3?`1px solid ${t.border}`:"none", marginBottom:i<3?14:0 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
              <span style={{ fontWeight:600, fontSize:14, color:t.text }}>{month} 2024</span>
              <span style={{ fontSize:14, color:accent.success, fontWeight:700 }}>{92+i}%</span>
            </div>
            <div style={{ height:6, background:t.surface2, borderRadius:3, overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${92+i}%`, background:accent.success, borderRadius:3 }} />
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
};

const Reports = () => {
  const { t } = useTheme();
  const weeklyData = [85,92,89,94];
  const maxH = 150;
  return (
    <div>
      <h1 style={{ fontSize:24, fontWeight:800, marginBottom:20, color:t.text }}>Reports & Analytics</h1>
      <div style={{ display:"grid", gridTemplateColumns: window.innerWidth < 768 ? "1fr 1fr" : "repeat(4,1fr)", gap:16, marginBottom:24 }}>
        <MetricCard label="Avg. Attendance"  value="92.3%" color={accent.success} desc="↑ 2% from last month" />
        <MetricCard label="Total Enrollment" value="248"   color={accent.primary} desc="↑ 5 new students" />
        <MetricCard label="Fee Collection"   value="87%"   color={accent.success} progress={87} desc="↑ 3% from last month" />
        <MetricCard label="Classes"          value="5"     color={accent.accent}  desc="15 sections total" />
      </div>

      <Card style={{ marginBottom:24 }}>
        <SectionTitle>Attendance Trend (Last 4 Weeks)</SectionTitle>
        <div style={{ display:"flex", alignItems:"flex-end", gap:16, height:maxH+60, paddingBottom:28 }}>
          {weeklyData.map((pct,i)=>(
            <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", height:"100%", justifyContent:"flex-end" }}>
              <div style={{ fontSize:13, fontWeight:700, color:i===3?accent.success:accent.primary, marginBottom:6 }}>{pct}%</div>
              <div style={{ width:"80%", height:(pct/100)*maxH, background:i===3?accent.success:accent.primary, borderRadius:"5px 5px 0 0", transition:"height .4s ease", opacity:.9 }} />
              <div style={{ fontSize:12, color:t.textSub, marginTop:8 }}>Week {i+1}</div>
            </div>
          ))}
        </div>
      </Card>

      <div style={{ display:"grid", gridTemplateColumns: window.innerWidth < 768 ? "1fr" : "1fr 1fr", gap:20 }}>
        <Card>
          <SectionTitle>Class-wise Attendance</SectionTitle>
          {[["Class 1","91.2%",91,accent.success],
            ["Class 3","93.5%",93,accent.success],
            ["Class 5","91.8%",91,accent.success]].map(([cls,pct,n,col],i,a)=>(
            <div key={cls} style={{ paddingBottom:i<a.length-1?14:0, borderBottom:i<a.length-1?`1px solid ${t.border}`:"none", marginBottom:i<a.length-1?14:0 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                <span style={{ fontWeight:600, fontSize:14, color:t.text }}>{cls}</span>
                <span style={{ fontSize:14, color:col, fontWeight:700 }}>{pct}</span>
              </div>
              <div style={{ height:6, background:t.surface2, borderRadius:3, overflow:"hidden" }}>
                <div style={{ height:"100%", width:`${n}%`, background:col, borderRadius:3 }} />
              </div>
            </div>
          ))}
        </Card>

        <Card>
          <SectionTitle>Fee Status Summary</SectionTitle>
          {[["Collected","₹87,500","82.9%",accent.success],
            ["Pending",  "₹18,000","17.1%",accent.danger ],
            ["Partial",  "5 students","",  accent.warning ]].map(([lbl,val,pct,col],i,a)=>(
            <div key={lbl} style={{ paddingBottom:i<a.length-1?14:0, borderBottom:i<a.length-1?`1px solid ${t.border}`:"none", marginBottom:i<a.length-1?14:0 }}>
              <div style={{ fontWeight:600, fontSize:14, marginBottom:4, color:t.text }}>{lbl}</div>
              <div style={{ fontSize:14, color:col, fontWeight:700 }}>{val} {pct && <span style={{ fontWeight:400, color:t.textSub }}>({pct})</span>}</div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

/* ─── APP SHELL ─────────────────────────────────────── */
export default function App() {
  const [themeName, setThemeName] = useState("light");
  const [role, setRole] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [toast, setToast] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const t = themes[themeName];

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Role-based navigation
  const roleNavConfig = {
    headmaster: [
      { id:"dashboard",  label:"📊", full:"Dashboard"  },
      { id:"attendance", label:"✓",  full:"Attendance" },
      { id:"fees",       label:"💰", full:"Fees"        },
      { id:"students",   label:"👥", full:"Students"    },
      { id:"reports",    label:"📈", full:"Reports"     },
    ],
    teacher: [
      { id:"attendance", label:"✓",  full:"Attendance" },
      { id:"students",   label:"👥", full:"Students"    },
      { id:"reports",    label:"📈", full:"Reports"     },
    ],
    student: [
      { id:"fees",       label:"💳", full:"My Fees"     },
      { id:"progress",   label:"📈", full:"My Progress" },
    ],
  };

  const roleColors = {
    headmaster: "#0369a1",
    teacher: "#16a34a",
    student: "#ea580c",
  };

  const navItems = roleNavConfig[role] || [];
  const sidebarColor = roleColors[role] || "#0369a1";

  // If no role selected, show login
  if (!role) {
    return <LoginScreen onSelectRole={setRole} themeName={themeName} />;
  }

  return (
    <ThemeCtx.Provider value={{ themeName, setThemeName, t }}>
      <div style={{ display:"flex", height:"100vh", overflow:"hidden", fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif", background:t.bg, transition:"background .3s, color .3s", flexDirection: isMobile ? "column" : "row" }}>

        {/* ── SIDEBAR ── */}
        <div style={{ 
          width: isMobile ? "100%" : 220, 
          flexShrink:0, 
          background:sidebarColor, 
          display: isMobile && !mobileMenuOpen ? "none" : "flex",
          flexDirection:"column", 
          padding:"20px 12px", 
          transition:"all .3s",
          position: isMobile ? "absolute" : "relative",
          height: isMobile ? "auto" : "100vh",
          zIndex: isMobile ? 999 : "auto",
          maxHeight: isMobile ? "calc(100vh - 60px)" : "100vh",
          overflowY: isMobile ? "auto" : "auto",
          top: isMobile ? 60 : 0,
          left: 0,
        }}>
          {/* Logo */}
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:28, paddingBottom:16, borderBottom:"1px solid rgba(255,255,255,.15)" }}>
            <div style={{ width:36, height:36, background:"rgba(255,255,255,.18)", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>📚</div>
            <span style={{ color:"#fff", fontWeight:700, fontSize: isMobile ? 14 : 16 }}>SchoolERP</span>
          </div>

          {/* Nav Items */}
          <nav style={{ flex:1 }}>
            {navItems.map(item=>(
              <button key={item.id} onClick={()=>{setPage(item.id); if(isMobile) setMobileMenuOpen(false);}} style={{
                display:"flex", alignItems:"center", gap:10, width:"100%",
                textAlign:"left", padding:"11px 14px", marginBottom:4,
                background: page===item.id ? "rgba(255,255,255,.25)" : "transparent",
                color: page===item.id ? "#fff" : "rgba(255,255,255,.75)",
                border:"none", borderRadius:7, fontSize: isMobile ? 13 : 14,
                fontWeight: page===item.id ? 700 : 400,
                cursor:"pointer", transition:"all .15s",
              }}
                onMouseEnter={e=>{ if(page!==item.id) e.currentTarget.style.background="rgba(255,255,255,.08)"; }}
                onMouseLeave={e=>{ if(page!==item.id) e.currentTarget.style.background="transparent"; }}
              >
                <span style={{ fontSize:16 }}>{item.label}</span>
                <span>{item.full}</span>
              </button>
            ))}
          </nav>

          {/* Switch Role & Theme Toggle */}
          <div style={{ paddingTop:16, borderTop:"1px solid rgba(255,255,255,.15)", display:"grid", gap:8 }}>
            <button onClick={()=>{setRole(null); setPage("dashboard"); setMobileMenuOpen(false);}} style={{
              display:"flex", alignItems:"center", gap:10, width:"100%",
              padding:"11px 14px", background:"rgba(255,255,255,.12)",
              color:"#fff", border:"none", borderRadius:7,
              fontSize: isMobile ? 13 : 14, fontWeight:600, cursor:"pointer", transition:"all .2s",
            }}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.2)"}
              onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,.12)"}
            >
              <span style={{ fontSize:16 }}>🔄</span>
              <span>Switch Role</span>
            </button>
            <button onClick={()=>setThemeName(p=>p==="light"?"dark":"light")} style={{
              display:"flex", alignItems:"center", gap:10, width:"100%",
              padding:"11px 14px", background:"rgba(255,255,255,.12)",
              color:"#fff", border:"none", borderRadius:7,
              fontSize: isMobile ? 13 : 14, fontWeight:600, cursor:"pointer", transition:"all .2s",
            }}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.2)"}
              onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,.12)"}
            >
              <span style={{ fontSize:18 }}>{themeName==="dark"?"☀️":"🌙"}</span>
              <span>{themeName==="dark" ? "Light Mode" : "Dark Mode"}</span>
            </button>
          </div>
        </div>

        {/* ── MAIN ── */}
        <div style={{ flex:1, overflowY:"auto", background:t.bg, transition:"background .3s", display:"flex", flexDirection:"column" }}>
          {/* Top bar */}
          <div style={{ position:"sticky", top:0, zIndex:100, background:t.surface, borderBottom:`1px solid ${t.border}`, padding: isMobile ? "12px 16px" : "14px 28px", display:"flex", alignItems:"center", justifyContent:"space-between", boxShadow:t.shadow, minHeight: isMobile ? 60 : "auto" }}>
            {isMobile && (
              <button onClick={()=>setMobileMenuOpen(!mobileMenuOpen)} style={{
                background:"none", border:"none", fontSize:24, cursor:"pointer", padding:0, color:t.text
              }}>
                ☰
              </button>
            )}
            <div style={{ fontSize: isMobile ? 14 : 18, fontWeight:700, color:t.text, flex:1, marginLeft: isMobile ? 8 : 0 }}>
              {navItems.find(n=>n.id===page)?.full}
            </div>
            {!isMobile && (
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ fontSize:13, color:t.textSub }}>June 21, 2026</div>
                <div style={{ width:1, height:20, background:t.border }} />
                <Avatar initials={role==="student"?"RK":"AM"} color={sidebarColor} size={32} />
              </div>
            )}
            {isMobile && (
              <Avatar initials={role==="student"?"RK":"AM"} color={sidebarColor} size={28} />
            )}
          </div>

          {/* Page Content */}
          <div style={{ padding: isMobile ? "16px 12px" : "28px 28px", flex:1, overflowY:"auto" }}>
            {role==="headmaster" && page==="dashboard"  && <Dashboard  nav={setPage} />}
            {page==="attendance" && <Attendance showToast={showToast} />}
            {page==="fees"       && (role==="student" ? <MyFees showToast={showToast} /> : <Fees showToast={showToast} />)}
            {page==="students"   && <Students   showToast={showToast} />}
            {page==="progress"   && <MyProgress />}
            {page==="reports"    && <Reports />}
          </div>
        </div>

        {/* ── TOAST ── */}
        {toast && (
          <div style={{
            position:"fixed", bottom: isMobile ? 70 : 24, right:24, zIndex:999,
            background:accent.success, color:"#fff",
            padding:"14px 20px", borderRadius:10,
            boxShadow:"0 8px 24px rgba(0,0,0,.2)",
            fontSize: isMobile ? 12 : 14, fontWeight:600,
            animation:"fadein .3s ease",
          }}>{toast}</div>
        )}
      </div>
    </ThemeCtx.Provider>
  );
}
