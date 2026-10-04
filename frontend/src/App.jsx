import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Map,
  Siren,
  BarChart3,
  Users,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  Plus,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  UserRound,
} from "lucide-react";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [complaints, setComplaints] = useState([
    {
      id: "CS-1024",
      title: "Large pothole near school",
      description:
        "Large pothole reported near school entrance creating a possible safety risk.",
      location: "Gomti Nagar, Lucknow",
      category: "Roads & Infrastructure",
      department: "Roads & Public Works",
      priority: "High",
      severity: "High",
      status: "Assigned",
      assignedTo: "Rahul Sharma",
    },
    {
      id: "CS-1023",
      title: "Garbage accumulation",
      description: "Garbage has accumulated near the residential area.",
      location: "Aliganj, Lucknow",
      category: "Waste Management",
      department: "Sanitation",
      priority: "Medium",
      severity: "Moderate",
      status: "Pending",
      assignedTo: "Unassigned",
    },
    {
      id: "CS-1022",
      title: "Street light not working",
      description:
        "Street light has not been functioning for several days.",
      location: "Hazratganj, Lucknow",
      category: "Street Lighting",
      department: "Electrical Services",
      priority: "Low",
      severity: "Low",
      status: "Resolved",
      assignedTo: "Amit Verma",
    },
  ]);

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Complaints", icon: FileText },
    { name: "Worker Dashboard", icon: UserRound },
    { name: "Citizen Verification", icon: CheckCircle },
    { name: "Civic Hotspots", icon: Map },
    { name: "Disaster Center", icon: Siren },
    { name: "Analytics", icon: BarChart3 },
    { name: "Volunteers", icon: Users },
    { name: "Settings", icon: Settings },
  ];

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <div className="logo-box">C</div>

          {sidebarOpen && (
            <div>
              <h2>CivicSphere</h2>
              <span>Smart Governance</span>
            </div>
          )}
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={`nav-item ${activePage === item.name ? "active" : ""
                  }`}
                onClick={() => setActivePage(item.name)}
              >
                <Icon size={20} />

                {sidebarOpen && <span>{item.name}</span>}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          {sidebarOpen && (
            <div className="user-card">
              <div className="avatar">GS</div>

              <div>
                <strong>Gaurav</strong>
                <span>Administrator</span>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main */}
      <main className="main-content">
        {/* Topbar */}
        <header className="topbar">
          <button
            className="icon-button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="topbar-search">
            <Search size={18} />
            <input placeholder="Search complaints, users, locations..." />
          </div>

          <button className="notification-button">
            <Bell size={20} />
            <span className="notification-dot"></span>
          </button>
        </header>

        <section className="page-content">
          {activePage === "Dashboard" && (
            <DashboardPage complaints={complaints} />
          )}

          {activePage === "Complaints" && (
            <ComplaintsPage
              complaints={complaints}
              setComplaints={setComplaints}
            />
          )}
          {activePage === "Worker Dashboard" && (
            <WorkerDashboard
              complaints={complaints}
              setComplaints={setComplaints}
            />
          )}

          {activePage === "Citizen Verification" && (
            <CitizenVerification
              complaints={complaints}
              setComplaints={setComplaints}
            />
          )}

          {activePage === "Civic Hotspots" && (
            <CivicHotspots complaints={complaints} />
          )}

          {activePage === "Disaster Center" && (
            <DisasterCenter />
          )}

          {activePage === "Analytics" && (
            <PlaceholderPage
              title="Analytics"
              description="Civic performance and SLA analytics."
              icon={<BarChart3 size={40} />}
            />
          )}

          {activePage === "Volunteers" && (
            <VolunteerManagement />
          )}

          {activePage === "Settings" && (
            <PlaceholderPage
              title="Settings"
              description="Platform configuration and administration."
              icon={<Settings size={40} />}
            />
          )}
        </section>
      </main>
    </div>
  );
}

/* =========================
   DASHBOARD
========================= */

function DashboardPage({ complaints }) {
  const totalComplaints = complaints.length + 1281;

  const openComplaints = complaints.filter(
    (complaint) =>
      complaint.status === "Pending" ||
      complaint.status === "Assigned" ||
      complaint.status === "In Progress"
  ).length;

  const resolvedComplaints = complaints.filter(
    (complaint) => complaint.status === "Resolved"
  ).length;

  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>Dashboard</h1>
          <p>Overview of CivicSphere governance operations.</p>
        </div>

        <div className="status-badge">
          <span></span>
          System Operational
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Total Complaints"
          value={totalComplaints.toLocaleString()}
          icon={<FileText size={22} />}
        />

        <StatCard
          title="Open Issues"
          value={openComplaints + 344}
          icon={<AlertTriangle size={22} />}
        />

        <StatCard
          title="Resolved"
          value={resolvedComplaints + 891}
          icon={<CheckCircle size={22} />}
        />

        <StatCard
          title="SLA Compliance"
          value="94.6%"
          icon={<Clock size={22} />}
        />
      </div>

      <div className="dashboard-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h2>Complaint Overview</h2>
              <p>Current civic issue distribution</p>
            </div>
          </div>

          <div className="overview-bars">
            <OverviewBar label="Roads & Infrastructure" value={78} />
            <OverviewBar label="Waste Management" value={61} />
            <OverviewBar label="Water Supply" value={48} />
            <OverviewBar label="Street Lighting" value={35} />
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h2>AI Insights</h2>
              <p>Automated civic intelligence</p>
            </div>
          </div>

          <div className="insight">
            <AlertTriangle size={20} />
            <div>
              <strong>Road complaints increasing</strong>
              <p>
                Road-related complaints are showing higher activity in
                residential zones.
              </p>
            </div>
          </div>

          <div className="insight">
            <MapPin size={20} />
            <div>
              <strong>Potential hotspot detected</strong>
              <p>
                Multiple complaints have been reported around Gomti Nagar.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="panel recent-panel">
        <div className="panel-header">
          <div>
            <h2>Recent Complaints</h2>
            <p>Latest civic issues reported by citizens</p>
          </div>
        </div>

        <div className="complaint-table">
          {complaints.map((complaint) => (
            <div className="table-row" key={complaint.id}>
              <div>
                <strong>{complaint.id}</strong>
                <span>{complaint.title}</span>
              </div>

              <span>{complaint.category}</span>

              <span
                className={`status status-${complaint.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {complaint.status}
              </span>

              <span>{complaint.priority}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================
   COMPLAINTS
========================= */

function ComplaintsPage({ complaints, setComplaints }) {
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("General Civic Issue");

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  function analyzeComplaint() {
    setIsAnalyzing(true);
    setAnalysis(null);

    setTimeout(() => {
      const text = `${title} ${description}`.toLowerCase();

      let result = {
        category: "General Civic Issue",
        department: "Municipal Services",
        priority: "Medium",
        severity: "Moderate",
        summary:
          "The complaint requires municipal review and appropriate field action.",
        reasoning:
          "The complaint does not match a specific predefined civic category.",
      };

      if (
        text.includes("pothole") ||
        text.includes("road") ||
        text.includes("street")
      ) {
        result = {
          category: "Roads & Infrastructure",
          department: "Roads & Public Works",
          priority: "High",
          severity: "High",
          summary:
            "The complaint appears to involve road infrastructure and may create a public safety concern.",
          reasoning:
            "Road-related keywords were detected. Infrastructure issues with potential safety impact are prioritized for faster action.",
        };
      } else if (
        text.includes("garbage") ||
        text.includes("waste") ||
        text.includes("trash")
      ) {
        result = {
          category: "Waste Management",
          department: "Sanitation",
          priority: "Medium",
          severity: "Moderate",
          summary:
            "The complaint concerns waste accumulation requiring sanitation intervention.",
          reasoning:
            "Waste-related keywords were detected and routed to the sanitation department.",
        };
      } else if (
        text.includes("water") ||
        text.includes("leak") ||
        text.includes("pipeline")
      ) {
        result = {
          category: "Water Supply",
          department: "Water & Utilities",
          priority: "High",
          severity: "High",
          summary:
            "The complaint appears to concern a water supply or pipeline issue.",
          reasoning:
            "Water-related keywords were detected. Supply disruptions and leaks can affect public services and therefore receive higher priority.",
        };
      } else if (
        text.includes("light") ||
        text.includes("lamp") ||
        text.includes("electricity")
      ) {
        result = {
          category: "Street Lighting",
          department: "Electrical Services",
          priority: "Low",
          severity: "Low",
          summary:
            "The complaint concerns a street lighting or electrical service issue.",
          reasoning:
            "Lighting-related keywords were detected and routed to electrical services.",
        };
      }

      setAnalysis(result);
      setIsAnalyzing(false);
    }, 1000);
  }

  function submitComplaint() {
    if (!title || !description || !location) {
      alert("Please fill in title, description and location.");
      return;
    }

    if (!analysis) {
      alert("Please run AI analysis first.");
      return;
    }

    const newComplaint = {
      id: `CS-${1025 + complaints.length}`,
      title,
      description,
      location,
      category: analysis.category,
      department: analysis.department,
      priority: analysis.priority,
      severity: analysis.severity,
      status: "Pending",
      assignedTo: "Unassigned",
    };

    setComplaints((previous) => [newComplaint, ...previous]);

    setTitle("");
    setDescription("");
    setLocation("");
    setCategory("General Civic Issue");
    setAnalysis(null);
    setShowForm(false);
  }

  function assignComplaint(id) {
    setComplaints((previous) =>
      previous.map((complaint) =>
        complaint.id === id
          ? {
            ...complaint,
            status: "Assigned",
            assignedTo: "Rahul Sharma",
          }
          : complaint
      )
    );
  }

  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>Complaints</h1>
          <p>Manage and analyze citizen complaints.</p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus size={18} />
          Report Complaint
        </button>
      </div>

      {showForm && (
        <div className="panel complaint-form-panel">
          <h2>Report Civic Issue</h2>

          <div className="form-grid">
            <div className="form-group">
              <label>Complaint Title</label>

              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Example: Large pothole near school"
              />
            </div>

            <div className="form-group">
              <label>Location</label>

              <input
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="Example: Gomti Nagar, Lucknow"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Describe the civic issue..."
              rows="5"
            />
          </div>

          <div className="form-group">
            <label>Category</label>

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option>General Civic Issue</option>
              <option>Roads & Infrastructure</option>
              <option>Waste Management</option>
              <option>Water Supply</option>
              <option>Street Lighting</option>
            </select>
          </div>

          <button
            className="secondary-button"
            onClick={analyzeComplaint}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? "Analyzing..." : "Analyze with Civic AI"}
          </button>

          {analysis && (
            <div className="ai-result">
              <div className="ai-result-header">
                <CheckCircle size={20} />
                <strong>AI Analysis Complete</strong>
              </div>

              <div className="ai-grid">
                <div>
                  <span>Category</span>
                  <strong>{analysis.category}</strong>
                </div>

                <div>
                  <span>Department</span>
                  <strong>{analysis.department}</strong>
                </div>

                <div>
                  <span>Priority</span>
                  <strong>{analysis.priority}</strong>
                </div>

                <div>
                  <span>Severity</span>
                  <strong>{analysis.severity}</strong>
                </div>
              </div>

              <p>
                <strong>Summary:</strong> {analysis.summary}
              </p>

              <p>
                <strong>Reasoning:</strong> {analysis.reasoning}
              </p>

              <small>
                Hackathon MVP: this analysis currently uses controlled local
                intelligence. It can be replaced by Gemini API integration in
                the next phase.
              </small>

              <button
                className="primary-button"
                onClick={submitComplaint}
              >
                Submit Complaint
              </button>
            </div>
          )}
        </div>
      )}

      <div className="complaint-list">
        {complaints.map((complaint) => (
          <div className="complaint-card" key={complaint.id}>
            <div className="complaint-card-main">
              <span className="complaint-id">{complaint.id}</span>

              <h3>{complaint.title}</h3>

              <p>{complaint.description}</p>

              <div className="complaint-meta">
                <span>
                  <MapPin size={15} />
                  {complaint.location}
                </span>

                <span>{complaint.category}</span>

                <span>{complaint.department}</span>
              </div>
            </div>

            <div className="complaint-card-side">
              <span className="priority-badge">
                {complaint.priority}
              </span>

              <span
                className={`status status-${complaint.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {complaint.status}
              </span>

              <div className="assigned-worker">
                <UserRound size={16} />
                {complaint.assignedTo}
              </div>

              {["Pending", "Reopened"].includes(complaint.status) && (
                <button
                  className="secondary-button"
                  onClick={() => assignComplaint(complaint.id)}
                >
                  Assign Worker
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================
   REUSABLE COMPONENTS
========================= */

function StatCard({ title, value, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>

      <div>
        <span>{title}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function OverviewBar({ label, value }) {
  return (
    <div className="overview-item">
      <div className="overview-label">
        <span>{label}</span>
        <strong>{value}%</strong>
      </div>

      <div className="progress-bar">
        <div style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
}
function WorkerDashboard({ complaints, setComplaints }) {
  const assignedComplaints = complaints.filter(
    (complaint) =>
      complaint.assignedTo !== "Unassigned" &&
      complaint.status !== "Resolved"
  );

  function updateStatus(id, newStatus) {
    setComplaints((previous) =>
      previous.map((complaint) =>
        complaint.id === id
          ? {
            ...complaint,
            status: newStatus,
          }
          : complaint
      )
    );
  }

  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>Worker Dashboard</h1>
          <p>Manage assigned civic issues and field resolutions.</p>
        </div>

        <div className="status-badge">
          <span></span>
          Field Operations Active
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Assigned Issues"
          value={assignedComplaints.length}
          icon={<FileText size={22} />}
        />

        <StatCard
          title="In Progress"
          value={
            assignedComplaints.filter(
              (complaint) => complaint.status === "In Progress"
            ).length
          }
          icon={<Clock size={22} />}
        />

        <StatCard
          title="Resolved"
          value={
            complaints.filter(
              (complaint) => complaint.status === "Resolved"
            ).length
          }
          icon={<CheckCircle size={22} />}
        />

        <StatCard
          title="Field Worker"
          value="Rahul"
          icon={<UserRound size={22} />}
        />
      </div>

      <div className="complaint-list">
        {assignedComplaints.length === 0 ? (
          <div className="panel">
            <h3>No assigned complaints</h3>
            <p>
              New complaints assigned by officers will appear here.
            </p>
          </div>
        ) : (
          assignedComplaints.map((complaint) => (
            <div className="complaint-card" key={complaint.id}>
              <div className="complaint-card-main">
                <span className="complaint-id">
                  {complaint.id}
                </span>

                <h3>{complaint.title}</h3>

                <p>{complaint.description}</p>

                <div className="complaint-meta">
                  <span>
                    <MapPin size={15} />
                    {complaint.location}
                  </span>

                  <span>{complaint.category}</span>

                  <span>{complaint.department}</span>
                </div>
              </div>

              <div className="complaint-card-side">
                <span className="priority-badge">
                  {complaint.priority} Priority
                </span>

                <span
                  className={`status status-${complaint.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {complaint.status}
                </span>

                {complaint.status === "Assigned" && (
                  <button
                    className="secondary-button"
                    onClick={() =>
                      updateStatus(complaint.id, "In Progress")
                    }
                  >
                    Start Work
                  </button>
                )}

                {complaint.status === "In Progress" && (
                  <button
                    className="primary-button"
                    onClick={() =>
                      updateStatus(complaint.id, "Resolved")
                    }
                  >
                    Mark Resolved
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
function CitizenVerification({ complaints, setComplaints }) {
  const pendingVerification = complaints.filter(
    (complaint) =>
      complaint.status === "Resolved" &&
      complaint.verificationStatus !== "Verified"
  );

  function verifyResolution(id) {
    setComplaints((previous) =>
      previous.map((complaint) =>
        complaint.id === id
          ? {
            ...complaint,
            status: "Citizen Verified",
            verificationStatus: "Verified",
          }
          : complaint
      )
    );
  }

  function reopenIssue(id) {
    setComplaints((previous) =>
      previous.map((complaint) =>
        complaint.id === id
          ? {
            ...complaint,
            status: "Reopened",
            verificationStatus: "Rejected",
            assignedTo: "Unassigned",
          }
          : complaint
      )
    );
  }

  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>Citizen Verification</h1>
          <p>
            Citizens can verify completed civic work or reopen an unresolved
            issue.
          </p>
        </div>

        <div className="status-badge">
          <CheckCircle size={16} />
          Citizen Review
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Awaiting Verification"
          value={pendingVerification.length}
          icon={<Clock size={22} />}
        />

        <StatCard
          title="Verified Issues"
          value={
            complaints.filter(
              (complaint) => complaint.verificationStatus === "Verified"
            ).length
          }
          icon={<CheckCircle size={22} />}
        />

        <StatCard
          title="Reopened Issues"
          value={
            complaints.filter(
              (complaint) => complaint.verificationStatus === "Rejected"
            ).length
          }
          icon={<AlertTriangle size={22} />}
        />

        <StatCard
          title="Citizen Review"
          value="Active"
          icon={<UserRound size={22} />}
        />
      </div>

      <div className="complaint-list">
        {pendingVerification.length === 0 ? (
          <div className="panel">
            <h3>No complaints awaiting verification</h3>
            <p>
              Resolved complaints will appear here for citizen confirmation.
            </p>
          </div>
        ) : (
          pendingVerification.map((complaint) => (
            <div className="complaint-card" key={complaint.id}>
              <div className="complaint-card-main">
                <span className="complaint-id">{complaint.id}</span>

                <h3>{complaint.title}</h3>

                <p>{complaint.description}</p>

                <div className="complaint-meta">
                  <span>
                    <MapPin size={15} />
                    {complaint.location}
                  </span>

                  <span>{complaint.category}</span>
                  <span>{complaint.department}</span>
                </div>
              </div>

              <div className="complaint-card-side">
                <span className="status status-resolved">
                  Resolved
                </span>

                <button
                  className="primary-button"
                  onClick={() => verifyResolution(complaint.id)}
                >
                  <CheckCircle size={16} />
                  Verify Resolution
                </button>

                <button
                  className="secondary-button"
                  onClick={() => reopenIssue(complaint.id)}
                >
                  <AlertTriangle size={16} />
                  Reopen Issue
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
function CivicHotspots({ complaints }) {
  const areas = ["Gomti Nagar", "Aliganj", "Hazratganj"];

  const hotspotData = areas.map((area) => {
    const areaComplaints = complaints.filter((complaint) =>
      complaint.location.toLowerCase().includes(area.toLowerCase())
    );

    const complaintCount = areaComplaints.length;

    const highSeverityCount = areaComplaints.filter(
      (complaint) => complaint.severity === "High"
    ).length;

    const mediumSeverityCount = areaComplaints.filter(
      (complaint) => complaint.severity === "Moderate"
    ).length;

    const categoryCounts = {};

    areaComplaints.forEach((complaint) => {
      categoryCounts[complaint.category] =
        (categoryCounts[complaint.category] || 0) + 1;
    });

    const recurringCategory =
      Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0];

    const frequencyScore = Math.min(complaintCount * 20, 40);
    const severityScore = Math.min(
      highSeverityCount * 20 + mediumSeverityCount * 10,
      30
    );
    const recurrenceScore = recurringCategory
      ? Math.min(recurringCategory[1] * 10, 20)
      : 0;

    const hotspotScore = Math.min(
      frequencyScore + severityScore + recurrenceScore,
      100
    );

    let severity = "Low";

    if (hotspotScore >= 70) {
      severity = "High";
    } else if (hotspotScore >= 40) {
      severity = "Moderate";
    }

    const reason =
      complaintCount === 0
        ? "No complaints have been recorded in this area yet."
        : `${complaintCount} complaint${complaintCount !== 1 ? "s" : ""
        } detected. ${highSeverityCount > 0
          ? `${highSeverityCount} high-severity issue${highSeverityCount !== 1 ? "s" : ""
          } contribute to the hotspot score. `
          : ""
        }${recurringCategory
          ? `${recurringCategory[0]} is the most frequently reported category.`
          : ""
        }`;

    return {
      area,
      complaints: complaintCount,
      category: recurringCategory
        ? recurringCategory[0]
        : "No dominant category",
      severity,
      score: hotspotScore,
      reason,
    };
  });

  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>Civic Hotspots</h1>
          <p>
            Identify areas with concentrated and recurring civic complaints.
          </p>
        </div>

        <div className="status-badge">
          <Map size={16} />
          Predictive Analysis
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Hotspot Areas"
          value={hotspotData.filter((item) => item.complaints > 0).length}
          icon={<Map size={22} />}
        />

        <StatCard
          title="High Severity Areas"
          value={hotspotData.filter((item) => item.severity === "High").length}
          icon={<AlertTriangle size={22} />}
        />

        <StatCard
          title="Tracked Complaints"
          value={complaints.length}
          icon={<FileText size={22} />}
        />

        <StatCard
          title="Analysis Status"
          value="Active"
          icon={<CheckCircle size={22} />}
        />
      </div>
      <div className="panel hotspot-map-panel">
        <div className="panel-header">
          <div>
            <h3>Hotspot Map</h3>
            <p>Geographic concentration of reported civic issues</p>
          </div>

          <Map size={22} />
        </div>

        <div className="hotspot-map">
          {hotspotData.map((hotspot) => (
            <div
              className={`hotspot-marker hotspot-${hotspot.severity.toLowerCase()}`}
              key={hotspot.area}
            >
              <div className="hotspot-dot"></div>

              <div className="hotspot-label">
                <strong>{hotspot.area}</strong>
                <span>{hotspot.complaints} complaints</span>
                <small>Score: {hotspot.score}/100</small>
              </div>
            </div>
          ))}
        </div>

        <div className="map-legend">
          <span>
            <i className="legend-dot low"></i>
            Low
          </span>

          <span>
            <i className="legend-dot moderate"></i>
            Moderate
          </span>

          <span>
            <i className="legend-dot high"></i>
            High
          </span>
        </div>
      </div>
      <div className="complaint-list">
        {hotspotData.map((hotspot) => (
          <div className="complaint-card" key={hotspot.area}>
            <div className="complaint-card-main">
              <span className="complaint-id">HOTSPOT</span>

              <h3>{hotspot.area}</h3>

              <p>{hotspot.reason}</p>

              <div className="complaint-meta">
                <span>
                  <MapPin size={15} />
                  {hotspot.area}, Lucknow
                </span>

                <span>{hotspot.category}</span>

                <span>
                  {hotspot.complaints} complaint
                  {hotspot.complaints !== 1 ? "s" : ""}
                </span>
              </div>
            </div>

            <div className="complaint-card-side">
              <span className="priority-badge">
                {hotspot.severity} Severity
              </span>

              <span className="status status-in-progress">
                Hotspot Detected
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="panel">
        <h3>How Civic Hotspots Are Identified</h3>

        <p>
          CivicSphere analyzes complaint frequency, geographic concentration,
          category, severity, recurrence, and time trends to identify areas
          requiring additional attention.
        </p>

        <p>
          Hotspot identification is an analytical assistance feature and does
          not guarantee that a future civic incident will occur.
        </p>
      </div>
    </div>
  );
}
function DisasterCenter() {
  const [emergencyActive, setEmergencyActive] = useState(false);

  const emergency = {
    type: "Urban Flood",
    location: "Gomti Nagar, Lucknow",
    affectedPeople: 1250,
    affectedZone: "Gomti Nagar & Nearby Areas",
    riskLevel: "High",
    responsePriority: "Critical",
    zoneStatus: "Affected",
  };
  const shelters = [
    {
      name: "Gomti Nagar Community Hall",
      location: "Gomti Nagar",
      capacity: 500,
      occupied: 320,
    },
    {
      name: "Government Inter College",
      location: "Vibhuti Khand",
      capacity: 400,
      occupied: 280,
    },
    {
      name: "Municipal Relief Center",
      location: "Indira Nagar",
      capacity: 300,
      occupied: 150,
    },
    {
      name: "City Emergency Shelter",
      location: "Aliganj",
      capacity: 250,
      occupied: 90,
    },
  ];

  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>Disaster Command Center</h1>
          <p>
            Coordinate emergency incidents, affected zones, shelters,
            volunteers and resources.
          </p>
        </div>

        <div className="status-badge">
          <Siren size={16} />
          {emergencyActive ? "Emergency Active" : "Monitoring"}
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Active Incidents"
          value={emergencyActive ? 1 : 0}
          icon={<Siren size={22} />}
        />

        <StatCard
          title="Affected People"
          value={emergencyActive ? emergency.affectedPeople : 0}
          icon={<Users size={22} />}
        />

        <StatCard
          title="Shelters Available"
          value="4"
          icon={<MapPin size={22} />}
        />

        <StatCard
          title="Resources Ready"
          value="18"
          icon={<CheckCircle size={22} />}
        />
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <h3>Emergency Control</h3>
            <p>Activate emergency coordination for the current incident.</p>
          </div>

          <span
            className={`status ${emergencyActive ? "status-in-progress" : "status-pending"
              }`}
          >
            {emergencyActive ? "ACTIVE" : "STANDBY"}
          </span>
        </div>

        <div className="emergency-card">
          <div>
            <span className="complaint-id">EMERGENCY INCIDENT</span>
            <h2>{emergency.type}</h2>

            <p>
              <MapPin size={15} />
              {emergency.location}
            </p>

            <div className="complaint-meta">
              <span>
                Affected Zone: {emergency.affectedZone}
              </span>

              <span>
                Estimated People: {emergency.affectedPeople}
              </span>
            </div>
          </div>

          <button
            className={emergencyActive ? "secondary-button" : "primary-button"}
            onClick={() => setEmergencyActive(!emergencyActive)}
          >
            <Siren size={16} />
            {emergencyActive
              ? "Deactivate Emergency"
              : "Activate Emergency"}
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="panel">
          <h3>Affected Zone</h3>

          <p>{emergency.affectedZone}</p>

          <div className="complaint-meta">
            <span>
              Population: {emergency.affectedPeople}
            </span>

            <span>
              Risk: {emergency.riskLevel}
            </span>

            <span>
              Priority: {emergency.responsePriority}
            </span>
          </div>

          <span
            className={`status ${emergencyActive
              ? "status-in-progress"
              : "status-pending"
              }`}
          >
            {emergencyActive
              ? emergency.zoneStatus
              : "Monitoring"}
          </span>
        </div>

        <div className="panel">
          <h3>Shelters</h3>
          <p>
            4 designated shelters are available for emergency coordination.
          </p>
          <span className="status status-resolved">
            4 Available
          </span>
        </div>

        <div className="panel">
          <h3>Volunteers</h3>
          <p>
            Trained volunteers can be assigned based on skills,
            availability and location.
          </p>
          <span className="status status-in-progress">
            12 Available
          </span>
        </div>

        <div className="panel">
          <h3>Resources</h3>
          <p>
            Rescue vehicles, medical kits, water supplies and generators
            are ready for allocation.
          </p>
          <span className="status status-resolved">
            18 Ready
          </span>
        </div>
      </div>
      <div className="panel">
        <div className="panel-header">
          <div>
            <h3>Emergency Shelters</h3>
            <p>Available shelters for affected citizens.</p>
          </div>

          <MapPin size={22} />
        </div>

        <div className="complaint-list">
          {shelters.map((shelter) => {
            const available = shelter.capacity - shelter.occupied;

            const occupancyPercentage = Math.round(
              (shelter.occupied / shelter.capacity) * 100
            );

            return (
              <div className="complaint-card" key={shelter.name}>
                <div className="complaint-card-main">
                  <span className="complaint-id">SHELTER</span>

                  <h3>{shelter.name}</h3>

                  <p>
                    <MapPin size={15} />
                    {shelter.location}
                  </p>

                  <div className="complaint-meta">
                    <span>Capacity: {shelter.capacity}</span>
                    <span>Occupied: {shelter.occupied}</span>
                    <span>Available: {available}</span>
                  </div>
                </div>

                <div className="complaint-card-side">
                  <span className="priority-badge">
                    {occupancyPercentage}% Occupied
                  </span>

                  <span
                    className={`status ${available > 0
                      ? "status-resolved"
                      : "status-pending"
                      }`}
                  >
                    {available > 0 ? "Available" : "Full"}
                  </span>
                </div>
              </div>
            );
          })}

        </div>
      </div>

      {/* =========================
          EMERGENCY RESOURCES
      ========================= */}

      <div className="panel">
        <div className="panel-header">
          <div>
            <h3>Emergency Resources</h3>
            <p>Monitor and coordinate emergency response resources.</p>
          </div>

          <CheckCircle size={22} />
        </div>

        <div className="complaint-list">

          <div className="complaint-card">
            <div className="complaint-card-main">
              <span className="complaint-id">RESOURCE</span>

              <h3>Rescue Vehicles</h3>

              <p>
                Emergency vehicles available for evacuation and rescue
                operations.
              </p>

              <div className="complaint-meta">
                <span>Available: 6</span>
                <span>Assigned: 2</span>
                <span>Total: 8</span>
              </div>
            </div>

            <div className="complaint-card-side">
              <span className="priority-badge">
                6 Available
              </span>

              <span className="status status-resolved">
                Ready
              </span>
            </div>
          </div>

          <div className="complaint-card">
            <div className="complaint-card-main">
              <span className="complaint-id">RESOURCE</span>

              <h3>Medical Kits</h3>

              <p>
                Medical supplies prepared for emergency treatment and
                first-aid support.
              </p>

              <div className="complaint-meta">
                <span>Available: 120</span>
                <span>Assigned: 35</span>
                <span>Total: 155</span>
              </div>
            </div>

            <div className="complaint-card-side">
              <span className="priority-badge">
                120 Available
              </span>

              <span className="status status-resolved">
                Ready
              </span>
            </div>
          </div>

          <div className="complaint-card">
            <div className="complaint-card-main">
              <span className="complaint-id">RESOURCE</span>

              <h3>Water Supplies</h3>

              <p>
                Drinking water supplies available for affected citizens
                and emergency shelters.
              </p>

              <div className="complaint-meta">
                <span>Available: 500</span>
                <span>Assigned: 180</span>
                <span>Total: 680</span>
              </div>
            </div>

            <div className="complaint-card-side">
              <span className="priority-badge">
                500 Available
              </span>

              <span className="status status-resolved">
                Ready
              </span>
            </div>
          </div>

          <div className="complaint-card">
            <div className="complaint-card-main">
              <span className="complaint-id">RESOURCE</span>

              <h3>Generators</h3>

              <p>
                Backup power generators available for shelters and
                emergency operations.
              </p>

              <div className="complaint-meta">
                <span>Available: 8</span>
                <span>Assigned: 3</span>
                <span>Total: 11</span>
              </div>
            </div>

            <div className="complaint-card-side">
              <span className="priority-badge">
                8 Available
              </span>

              <span className="status status-resolved">
                Ready
              </span>
            </div>
          </div>

        </div>
      </div>

    </div>

  );

}
/* =========================
   VOLUNTEER MANAGEMENT
========================= */

function VolunteerManagement() {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [skill, setSkill] = useState("");
  const [location, setLocation] = useState("");
  const [editingVolunteer, setEditingVolunteer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSkill, setFilterSkill] = useState("All");
  const [filterAvailability, setFilterAvailability] = useState("All");
  const [volunteers, setVolunteers] = useState([
    {
      id: "VOL-001",
      name: "Ankit Verma",
      skill: "Medical Support",
      location: "Gomti Nagar",
      availability: "Available",
      assigned: "Emergency Shelter",
    },
    {
      id: "VOL-002",
      name: "Priya Singh",
      skill: "Food Distribution",
      location: "Aliganj",
      availability: "Available",
      assigned: "Unassigned",
    },
    {
      id: "VOL-003",
      name: "Rahul Kumar",
      skill: "Rescue Support",
      location: "Vibhuti Khand",
      availability: "Assigned",
      assigned: "Urban Flood Response",
    },
    {
      id: "VOL-004",
      name: "Neha Sharma",
      skill: "First Aid",
      location: "Hazratganj",
      availability: "Available",
      assigned: "Unassigned",
    },
    {
      id: "VOL-005",
      name: "Aman Gupta",
      skill: "Logistics",
      location: "Indira Nagar",
      availability: "Unavailable",
      assigned: "Unassigned",
    },
  ]);

  function assignVolunteer(id) {
    setVolunteers((previous) =>
      previous.map((volunteer) =>
        volunteer.id === id
          ? {
            ...volunteer,
            availability: "Assigned",
            assigned: "Emergency Response",
          }
          : volunteer
      )
    );
  }

  function addVolunteer() {
    if (!name || !skill || !location) {
      alert("Please fill in all volunteer details.");
      return;
    }

    const newVolunteer = {
      id: `VOL-${String(volunteers.length + 1).padStart(3, "0")}`,
      name,
      skill,
      location,
      availability: "Available",
      assigned: "Unassigned",
    };

    setVolunteers((previous) => [...previous, newVolunteer]);

    setName("");
    setSkill("");
    setLocation("");
    setShowForm(false);
  }

  function editVolunteer(volunteer) {
    setEditingVolunteer(volunteer);
    setName(volunteer.name);
    setSkill(volunteer.skill);
    setLocation(volunteer.location);
    setShowForm(true);
  }

  function updateVolunteer() {
    if (!name || !skill || !location || !editingVolunteer) {
      alert("Please fill in all volunteer details.");
      return;
    }

    setVolunteers((previous) =>
      previous.map((volunteer) =>
        volunteer.id === editingVolunteer.id
          ? {
            ...volunteer,
            name,
            skill,
            location,
          }
          : volunteer
      )
    );

    setName("");
    setSkill("");
    setLocation("");
    setEditingVolunteer(null);
    setShowForm(false);
  }
  function deleteVolunteer(id) {
    const confirmed = window.confirm(
      "Are you sure you want to remove this volunteer?"
    );

    if (!confirmed) {
      return;
    }

    setVolunteers((previous) =>
      previous.filter((volunteer) => volunteer.id !== id)
    );
  }


  const availableVolunteers = volunteers.filter(
    (volunteer) => volunteer.availability === "Available"
  ).length;

  const assignedVolunteers = volunteers.filter(
    (volunteer) => volunteer.availability === "Assigned"
  ).length;

  const unavailableVolunteers = volunteers.filter(
    (volunteer) => volunteer.availability === "Unavailable"
  ).length;
  const filteredVolunteers = volunteers.filter((volunteer) => {
    const matchesSearch =
      volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSkill =
      filterSkill === "All" || volunteer.skill === filterSkill;

    const matchesAvailability =
      filterAvailability === "All" ||
      volunteer.availability === filterAvailability;

    return (
      matchesSearch &&
      matchesSkill &&
      matchesAvailability
    );
  });


  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>Volunteer Management</h1>
          <p>
            Manage volunteers, skills, availability and emergency
            assignments.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus size={18} />
          Add Volunteer
        </button>

        <div className="status-badge">
          <Users size={16} />
          Volunteer Coordination
        </div>
      </div>

      {showForm && (
        <div className="panel complaint-form-panel">
          <h2>
            {editingVolunteer ? "Edit Volunteer" : "Register Volunteer"}
          </h2>

          <div className="form-grid">
            <div className="form-group">
              <label>Volunteer Name</label>

              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Example: Rohan Sharma"
              />
            </div>

            <div className="form-group">
              <label>Skill / Specialization</label>

              <input
                value={skill}
                onChange={(event) => setSkill(event.target.value)}
                placeholder="Example: Medical Support"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Location</label>

            <input
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Example: Gomti Nagar"
            />
          </div>

          <button
            className="primary-button"
            onClick={editingVolunteer ? updateVolunteer : addVolunteer}
          >
            <CheckCircle size={18} />
            {editingVolunteer ? "Update Volunteer" : "Register Volunteer"}
          </button>
        </div>
      )}
      <div className="stats-grid">
        <StatCard
          title="Total Volunteers"
          value={volunteers.length}
          icon={<Users size={22} />}
        />

        <StatCard
          title="Available"
          value={availableVolunteers}
          icon={<CheckCircle size={22} />}
        />

        <StatCard
          title="Assigned"
          value={assignedVolunteers}
          icon={<FileText size={22} />}
        />

        <StatCard
          title="Unavailable"
          value={unavailableVolunteers}
          icon={<Clock size={22} />}
        />
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <h3>Volunteer Directory</h3>
            <p>
              View volunteer skills, locations and current assignments.
            </p>
          </div>

          <Users size={22} />
        </div>
        <div className="volunteer-filters">
          <div className="form-group">
            <label>Search Volunteers</label>

            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by name or location"
            />
          </div>

          <div className="form-group">
            <label>Skill</label>

            <select
              value={filterSkill}
              onChange={(event) => setFilterSkill(event.target.value)}
            >
              <option value="All">All Skills</option>
              <option value="Medical Support">Medical Support</option>
              <option value="Food Distribution">Food Distribution</option>
              <option value="Rescue Support">Rescue Support</option>
              <option value="First Aid">First Aid</option>
              <option value="Logistics">Logistics</option>
            </select>
          </div>

          <div className="form-group">
            <label>Availability</label>

            <select
              value={filterAvailability}
              onChange={(event) =>
                setFilterAvailability(event.target.value)
              }
            >
              <option value="All">All Status</option>
              <option value="Available">Available</option>
              <option value="Assigned">Assigned</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>
        </div>
        <div className="complaint-list">
          {filteredVolunteers.length === 0 ? (
            <div className="empty-state">
              <Users size={32} />
              <h3>No volunteers found</h3>
              <p>
                Try changing your search or filter options.
              </p>
            </div>
          ) : (
            filteredVolunteers.map((volunteer) => (
              <div className="complaint-card" key={volunteer.id}>
                <div className="complaint-card-main">
                  <span className="complaint-id">
                    {volunteer.id}
                  </span>

                  <h3>{volunteer.name}</h3>

                  <p>
                    <UserRound size={15} />
                    {volunteer.skill}
                  </p>

                  <div className="complaint-meta">
                    <span>
                      <MapPin size={15} />
                      {volunteer.location}
                    </span>

                    <span>
                      Assigned: {volunteer.assigned}
                    </span>
                  </div>
                </div>

                <div className="complaint-card-side">
                  <span
                    className={`status ${volunteer.availability === "Available"
                      ? "status-resolved"
                      : volunteer.availability === "Assigned"
                        ? "status-in-progress"
                        : "status-pending"
                      }`}
                  >
                    {volunteer.availability}
                  </span>

                  {volunteer.availability === "Available" && (
                    <button
                      className="primary-button"
                      onClick={() => assignVolunteer(volunteer.id)}
                    >
                      Assign Volunteer
                    </button>
                  )}

                  {volunteer.availability === "Assigned" && (
                    <span className="priority-badge">
                      On Assignment
                    </span>
                  )}
                  <button
                    className="primary-button"
                    onClick={() => editVolunteer(volunteer)}
                  >
                    Edit
                  </button>
                  <button
                    className="primary-button"
                    onClick={() => deleteVolunteer(volunteer.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )))}
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <h3>Volunteer Coordination</h3>
            <p>
              Volunteers can be assigned based on skills, availability
              and geographic location.
            </p>
          </div>

          <MapPin size={22} />
        </div>

        <div className="complaint-meta">
          <span>Skills-based Assignment</span>
          <span>Location-based Coordination</span>
          <span>Availability Tracking</span>
        </div>
      </div>
    </div>
  );
}
function PlaceholderPage({ title, description, icon }) {
  return (
    <div className="placeholder-page">
      <div className="placeholder-icon">{icon}</div>

      <h1>{title}</h1>

      <p>{description}</p>

      <span>Module coming in the next development phase.</span>
    </div>
  );
}

export default App;