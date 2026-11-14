
"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: "▦" },
  { id: "requests", label: "Tracking Requests", icon: "▤" },
  { id: "couriers", label: "Courier Performance", icon: "♧" },
  { id: "failures", label: "Failure Analysis", icon: "⚠" },
  { id: "activity", label: "Recent Activity", icon: "◷" },
  { id: "settings", label: "Settings", icon: "⚙" },
];

function EmptyState({ icon = "▤", title, description }) {
  return (
    <div className="flex min-h-52 flex-col items-center justify-center px-5 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF0E8] text-2xl text-[#8B0000]">
        {icon}
      </div>
      <h4 className="font-semibold text-gray-700">{title}</h4>
      <p className="mt-2 max-w-md text-sm leading-6 text-gray-400">
        {description}
      </p>
    </div>
  );
}

function SectionHeading({ title, description }) {
  return (
    <div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
  );
}

function formatDate(date) {
  if (!date) return "—";

  return new Date(date).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatResponseTime(milliseconds) {
  if (milliseconds == null) return "—";
  return `${milliseconds.toLocaleString()} ms`;
}

export default function AdminDashboard({
  adminEmail = "Administrator",
}) {
  const router = useRouter();

  // Navigation state
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dashboard filters
  const [period, setPeriod] = useState("30");
  const [selectedCourier, setSelectedCourier] = useState("all");
  const [search, setSearch] = useState("");

  // Analytics state
  const [analytics, setAnalytics] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [analyticsError, setAnalyticsError] = useState("");

  // Courier management state
  const [managedCouriers, setManagedCouriers] = useState([]);
  const [couriersLoading, setCouriersLoading] = useState(false);
  const [couriersError, setCouriersError] = useState("");
  const [savingCourierId, setSavingCourierId] = useState("");
  const [courierMessage, setCourierMessage] = useState("");

  // Logout state
  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  const activeItem = menuItems.find(
    (item) => item.id === activeMenu
  );

  // Load analytics
  useEffect(() => {
    const controller = new AbortController();

    async function loadAnalytics() {
      setAnalyticsLoading(true);
      setAnalyticsError("");

      try {
        const params = new URLSearchParams({
          days: period,
        });

        if (selectedCourier !== "all") {
          params.set("courier", selectedCourier);
        }

        const response = await fetch(
          `/api/admin/analytics?${params.toString()}`,
          {
            method: "GET",
            cache: "no-store",
            signal: controller.signal,
          }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Unable to load analytics."
          );
        }

        setAnalytics(result);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Analytics loading error:", error);
          setAnalyticsError(error.message);
          setAnalytics(null);
        }
      } finally {
        if (!controller.signal.aborted) {
          setAnalyticsLoading(false);
        }
      }
    }

    loadAnalytics();

    return () => controller.abort();
  }, [period, selectedCourier]);

  // Load managed couriers
  const loadManagedCouriers = useCallback(async () => {
    setCouriersLoading(true);
    setCouriersError("");

    try {
      const response = await fetch("/api/admin/couriers", {
        method: "GET",
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to load couriers."
        );
      }

      setManagedCouriers(result.couriers || []);
    } catch (error) {
      console.error("Courier loading error:", error);
      setCouriersError(error.message);
    } finally {
      setCouriersLoading(false);
    }
  }, []);

  // Load couriers when their section is opened
  useEffect(() => {
    if (activeMenu === "couriers") {
      loadManagedCouriers();
    }
  }, [activeMenu, loadManagedCouriers]);

  // Change dashboard section
  function changeSection(id) {
    setActiveMenu(id);
    setSearch("");
    setMobileMenuOpen(false);
    setCourierMessage("");
  }

  // Admin logout
  async function handleLogout() {
    if (loggingOut) return;

    setLoggingOut(true);
    setLogoutError("");

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      router.replace("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Admin logout error:", error);
      setLogoutError("Unable to sign out. Please try again.");
      setLoggingOut(false);
    }
  }

  // Enable or disable a courier
  async function toggleCourier(courier) {
    if (savingCourierId) return;

    setSavingCourierId(courier.id);
    setCourierMessage("");
    setCouriersError("");

    try {
      const response = await fetch("/api/admin/couriers", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courierId: courier.id,
          enabled: !courier.enabled,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to update courier."
        );
      }

      setManagedCouriers((current) =>
        current.map((item) =>
          item.id === courier.id
            ? { ...item, enabled: result.enabled }
            : item
        )
      );

      setCourierMessage(
        `${courier.name} has been ${
          result.enabled ? "enabled" : "disabled"
        }.`
      );
    } catch (error) {
      console.error("Courier update error:", error);
      setCouriersError(error.message);
    } finally {
      setSavingCourierId("");
    }
  }

  // Dashboard content
  function renderDashboard() {
    const overview = analytics?.overview;
    const couriers = analytics?.couriers || [];
    const failureReasons = analytics?.failureReasons || [];
    const recentActivity = analytics?.recentActivity || [];
    const dailyTrend = analytics?.dailyTrend || [];

    const maxDailyRequests = Math.max(
      1,
      ...dailyTrend.map((day) => day.total)
    );

    const successfulRequests =
      overview?.successfulRequests || 0;
    const failedRequests = overview?.failedRequests || 0;
    const totalRequests = overview?.totalRequests || 0;

    const successPercentage = totalRequests
      ? (successfulRequests / totalRequests) * 100
      : 0;

    const failurePercentage = totalRequests
      ? (failedRequests / totalRequests) * 100
      : 0;

    const topCouriers = [...couriers]
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);

    const topFailures = failureReasons.slice(0, 5);
    const latestActivity = recentActivity.slice(0, 5);

    const stats = [
      {
        label: "Total Requests",
        value: overview
          ? totalRequests.toLocaleString()
          : "—",
        icon: "▤",
        color: "bg-blue-50 text-blue-700",
      },
      {
        label: "Successful Requests",
        value: overview
          ? successfulRequests.toLocaleString()
          : "—",
        icon: "✓",
        color: "bg-green-50 text-green-700",
      },
      {
        label: "Failed Requests",
        value: overview
          ? failedRequests.toLocaleString()
          : "—",
        icon: "×",
        color: "bg-red-50 text-red-700",
      },
      {
        label: "Success Rate",
        value: overview
          ? `${overview.successRate}%`
          : "—",
        icon: "%",
        color: "bg-orange-50 text-orange-700",
      },
    ];

    return (
      <div className="space-y-7">
        {analyticsError && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            {analyticsError}
          </div>
        )}

        {/* Dashboard heading and filters */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold">
              Welcome to your dashboard
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Monitor tracking activity and courier performance.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <select
              value={period}
              onChange={(event) => setPeriod(event.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold outline-none focus:border-[#8B0000]"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">Last 12 months</option>
            </select>

            <select
              value={selectedCourier}
              onChange={(event) =>
                setSelectedCourier(event.target.value)
              }
              className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold outline-none focus:border-[#8B0000]"
            >
              <option value="all">All Couriers</option>
              {analytics?.availableCouriers?.map((courier) => (
                <option key={courier.id} value={courier.id}>
                  {courier.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Overview statistics */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-gray-500">
                  {stat.label}
                </p>
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl font-bold ${stat.color}`}
                >
                  {stat.icon}
                </span>
              </div>

              <p className="mt-5 text-3xl font-extrabold">
                {stat.value}
              </p>

              <p className="mt-2 text-xs text-gray-400">
                {analyticsLoading
                  ? "Loading analytics..."
                  : analyticsError
                    ? "Analytics unavailable"
                    : "Within selected period"}
              </p>
            </div>
          ))}
        </div>

        {/* Request distribution */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="font-bold">Request Distribution</h3>
          <p className="mt-1 text-xs text-gray-500">
            Successful versus failed tracking requests.
          </p>

          {analyticsLoading ? (
            <p className="py-8 text-center text-sm text-gray-500">
              Loading distribution...
            </p>
          ) : !overview || totalRequests === 0 ? (
            <EmptyState
              icon="◉"
              title="No distribution data"
              description="A success and failure breakdown will appear here when tracking requests are recorded."
            />
          ) : (
            <div className="mt-6 space-y-5">
              <div className="flex h-4 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="bg-green-600 transition-all"
                  style={{ width: `${successPercentage}%` }}
                />
                <div
                  className="bg-red-600 transition-all"
                  style={{ width: `${failurePercentage}%` }}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-green-600" />
                    <span className="text-sm text-gray-600">
                      Successful Requests
                    </span>
                  </div>
                  <p className="mt-2 text-2xl font-bold text-green-700">
                    {successfulRequests.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    {successPercentage.toFixed(1)}% of requests
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-600" />
                    <span className="text-sm text-gray-600">
                      Failed Requests
                    </span>
                  </div>
                  <p className="mt-2 text-2xl font-bold text-red-700">
                    {failedRequests.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    {failurePercentage.toFixed(1)}% of requests
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Daily tracking trend */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-bold">Daily Tracking Trend</h3>
              <p className="mt-1 text-xs text-gray-500">
                Daily successful and failed tracking requests.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 text-xs font-medium text-gray-600">
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-sm bg-green-600" />
                Successful
              </span>
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-sm bg-red-600" />
                Failed
              </span>
            </div>
          </div>

          {analyticsLoading ? (
            <p className="py-12 text-center text-sm text-gray-500">
              Loading daily trend...
            </p>
          ) : dailyTrend.length === 0 ? (
            <EmptyState
              icon="▥"
              title="No daily trend data"
              description="Daily tracking activity will appear here when requests are recorded."
            />
          ) : (
            <div className="mt-6 overflow-x-auto pb-2">
              <div
                className="flex min-w-full items-end gap-2"
                style={{
                  minWidth: `${Math.max(
                    dailyTrend.length * 44,
                    600
                  )}px`,
                }}
              >
                {dailyTrend.map((day) => {
                  const totalHeight =
                    (day.total / maxDailyRequests) * 100;

                  const successfulHeight = day.total
                    ? (day.successful / day.total) * 100
                    : 0;

                  const failedHeight = day.total
                    ? (day.failed / day.total) * 100
                    : 0;

                  const dateLabel = new Date(
                    `${day.date}T00:00:00Z`
                  ).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    timeZone: "UTC",
                  });

                  return (
                    <div
                      key={day.date}
                      className="flex min-w-0 flex-1 flex-col items-center"
                      title={`${day.date}\nTotal: ${day.total}\nSuccessful: ${day.successful}\nFailed: ${day.failed}`}
                    >
                      <span className="mb-2 text-[10px] font-semibold text-gray-600">
                        {day.total}
                      </span>

                      <div className="flex h-40 w-full items-end justify-center">
                        <div
                          className="flex w-6 flex-col-reverse overflow-hidden rounded-t-md bg-gray-100 transition-all"
                          style={{
                            height: day.total
                              ? `${Math.max(totalHeight, 2)}%`
                              : "3px",
                          }}
                        >
                          {day.total > 0 && (
                            <>
                              <div
                                className="w-full bg-green-600"
                                style={{
                                  height: `${successfulHeight}%`,
                                }}
                              />
                              <div
                                className="w-full bg-red-600"
                                style={{
                                  height: `${failedHeight}%`,
                                }}
                              />
                            </>
                          )}
                        </div>
                      </div>

                      <span className="mt-3 whitespace-nowrap text-[10px] text-gray-500">
                        {dateLabel}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Courier performance */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 p-6">
            <h3 className="font-bold">Top Courier Performance</h3>
            <p className="mt-1 text-xs text-gray-500">
              Couriers ranked by tracking attempts.
            </p>
          </div>

          {analyticsLoading ? (
            <p className="p-8 text-center text-sm text-gray-500">
              Loading courier performance...
            </p>
          ) : topCouriers.length === 0 ? (
            <EmptyState
              icon="♧"
              title="No courier statistics yet"
              description="Courier comparisons will appear here after tracking attempts are recorded."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                  <tr>
                    <th className="px-6 py-4">Courier</th>
                    <th className="px-6 py-4">Attempts</th>
                    <th className="px-6 py-4">Success Rate</th>
                    <th className="px-6 py-4">Avg. Response</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {topCouriers.map((courier) => (
                    <tr key={courier.courierId}>
                      <td className="px-6 py-4 font-semibold text-gray-800">
                        {courier.courierName}
                      </td>
                      <td className="px-6 py-4">
                        {courier.total.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 font-semibold">
                        {courier.successRate}%
                      </td>
                      <td className="px-6 py-4">
                        {formatResponseTime(
                          courier.averageResponseTime
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Failure reasons and recent activity */}
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="font-bold">Common Failure Reasons</h3>

            {analyticsLoading ? (
              <p className="py-8 text-center text-sm text-gray-500">
                Loading failure reasons...
              </p>
            ) : topFailures.length === 0 ? (
              <EmptyState
                icon="⚠"
                title="No failure data"
                description="Common tracking errors will appear here."
              />
            ) : (
              <div className="mt-5 space-y-4">
                {topFailures.map((failure, index) => (
                  <div
                    key={failure.reason}
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-50 text-sm font-bold text-red-700">
                        {index + 1}
                      </span>
                      <span className="truncate text-sm text-gray-700">
                        {failure.reason}
                      </span>
                    </div>
                    <span className="shrink-0 text-sm font-bold text-gray-900">
                      {failure.count.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="font-bold">Recent Tracking Activity</h3>

            {analyticsLoading ? (
              <p className="py-8 text-center text-sm text-gray-500">
                Loading recent activity...
              </p>
            ) : latestActivity.length === 0 ? (
              <EmptyState
                icon="◷"
                title="No recent activity"
                description="The latest tracking attempts will appear here."
              />
            ) : (
              <div className="mt-5 space-y-4">
                {latestActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between gap-3 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-gray-800">
                        {activity.courierName}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {formatDate(activity.attemptedAt)}
                        {" · "}
                        {activity.attemptType}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                        activity.success
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {activity.success ? "Successful" : "Failed"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Tracking requests section
  function renderRequests() {
    return (
      <div className="space-y-6">
        <SectionHeading
          title="Tracking Requests"
          description="Review and search logical tracking requests received by your platform."
        />

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search requests..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#8B0000]"
            />

            <select
              value={period}
              onChange={(event) => setPeriod(event.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">Last 12 months</option>
            </select>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-4 py-4">Request ID</th>
                  <th className="px-4 py-4">Date</th>
                  <th className="px-4 py-4">Method</th>
                  <th className="px-4 py-4">Courier</th>
                  <th className="px-4 py-4">Result</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="5">
                    <EmptyState
                      title="No requests available"
                      description="Request records will be loaded from Supabase here."
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // Courier management section
  function renderCouriers() {
    const enabledCount = managedCouriers.filter(
      (courier) => courier.enabled
    ).length;

    const disabledCount =
      managedCouriers.length - enabledCount;

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Courier Management
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage which couriers users can select for manual tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">Total Couriers</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">
              {managedCouriers.length}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">Enabled</p>
            <p className="mt-2 text-2xl font-bold text-green-600">
              {enabledCount}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">Disabled</p>
            <p className="mt-2 text-2xl font-bold text-red-600">
              {disabledCount}
            </p>
          </div>
        </div>

        {courierMessage && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
            {courierMessage}
          </div>
        )}

        {couriersError && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <p>{couriersError}</p>
            <button
              type="button"
              onClick={loadManagedCouriers}
              className="mt-2 font-semibold underline"
            >
              Try again
            </button>
          </div>
        )}

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-5 py-4">
            <h3 className="font-semibold text-gray-900">
              Available Couriers
            </h3>
          </div>

          {couriersLoading ? (
            <div className="p-10 text-center text-sm text-gray-500">
              Loading couriers...
            </div>
          ) : managedCouriers.length === 0 ? (
            <div className="p-10 text-center text-sm text-gray-500">
              No couriers found.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {managedCouriers.map((courier) => (
                <div
                  key={courier.id}
                  className="flex flex-wrap items-center justify-between gap-4 px-5 py-4"
                >
                  <div>
                    <p className="font-semibold text-gray-900">
                      {courier.name}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      ID: {courier.id}
                    </p>
                    <span
                      className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        courier.enabled
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {courier.enabled ? "Enabled" : "Disabled"}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleCourier(courier)}
                    disabled={savingCourierId === courier.id}
                    className={`rounded-lg px-4 py-2 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50 ${
                      courier.enabled
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {savingCourierId === courier.id
                      ? "Saving..."
                      : courier.enabled
                        ? "Disable"
                        : "Enable"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Failure analysis section
  function renderFailures() {
    const failedAttempts =
      analytics?.overview?.failedAttempts ?? 0;

    const failureReasons = analytics?.failureReasons || [];

    const mostCommonFailure = failureReasons.length
      ? failureReasons[0]
      : null;

    return (
      <div className="space-y-6">
        <SectionHeading
          title="Failure Analysis"
          description="Understand why tracking attempts fail and identify recurring issues."
        />

        {analyticsError && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            {analyticsError}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Total Failed Attempts
            </p>
            <p className="mt-4 text-3xl font-bold text-red-700">
              {analytics
                ? failedAttempts.toLocaleString()
                : "—"}
            </p>
            <p className="mt-2 text-xs text-gray-400">
              Within selected filters
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Different Failure Reasons
            </p>
            <p className="mt-4 text-3xl font-bold">
              {analytics
                ? failureReasons.length.toLocaleString()
                : "—"}
            </p>
            <p className="mt-2 text-xs text-gray-400">
              Most common reasons returned by analytics
            </p>
          </div>
        </div>

        {mostCommonFailure && (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
            <p className="text-sm font-semibold text-red-800">
              Most Common Failure
            </p>
            <p className="mt-2 text-lg font-bold text-gray-900">
              {mostCommonFailure.reason}
            </p>
            <p className="mt-1 text-sm text-gray-600">
              {mostCommonFailure.count.toLocaleString()} occurrences
            </p>
          </div>
        )}

        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 p-6">
            <h3 className="font-bold">Failure Reasons</h3>
            <p className="mt-1 text-xs text-gray-500">
              Most frequently reported tracking errors.
            </p>
          </div>

          {analyticsLoading ? (
            <div className="p-10 text-center text-sm text-gray-500">
              Loading failure analysis...
            </div>
          ) : failureReasons.length === 0 ? (
            <EmptyState
              icon="⚠"
              title="No failure records available"
              description="Failure reasons and their frequency will appear here when failed tracking attempts are recorded."
            />
          ) : (
            <div className="space-y-5 p-6">
              {failureReasons.map((item, index) => {
                const percentage = failedAttempts > 0
                  ? Math.min(
                      (item.count / failedAttempts) * 100,
                      100
                    )
                  : 0;

                return (
                  <div key={item.reason}>
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-sm font-bold text-red-700">
                          {index + 1}
                        </span>
                        <span className="text-sm font-medium text-gray-800">
                          {item.reason}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-bold text-gray-900">
                          {item.count.toLocaleString()}
                        </span>
                        <span className="ml-2 text-xs text-gray-500">
                          {percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-[#8B0000] transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Recent activity section
  function renderActivity() {
    const activities = analytics?.recentActivity || [];

    const filteredActivities = activities.filter((activity) => {
      const searchText = search.trim().toLowerCase();

      if (!searchText) return true;

      return [
        activity.courierName,
        activity.attemptType,
        activity.success ? "success successful" : "failed failure",
        activity.failureReason,
        activity.requestId,
      ]
        .filter(Boolean)
        .some((value) =>
          String(value).toLowerCase().includes(searchText)
        );
    });

    return (
      <div className="space-y-6">
        <SectionHeading
          title="Recent Activity"
          description="Review the latest individual tracking attempts."
        />

        {analyticsError && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            {analyticsError}
          </div>
        )}

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search courier, status, failure reason..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#8B0000]"
            />

            <select
              value={period}
              onChange={(event) => setPeriod(event.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">Last 12 months</option>
            </select>
          </div>

          <div className="mt-6 overflow-x-auto">
            {analyticsLoading ? (
              <div className="p-10 text-center text-sm text-gray-500">
                Loading recent activity...
              </div>
            ) : filteredActivities.length === 0 ? (
              <EmptyState
                icon="◷"
                title={
                  activities.length
                    ? "No matching activity"
                    : "No recent tracking activity"
                }
                description={
                  activities.length
                    ? "Try another search term."
                    : "Individual tracking attempts, courier names, timestamps and results will appear here."
                }
              />
            ) : (
              <table className="w-full min-w-[950px] text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                  <tr>
                    <th className="px-4 py-4">Date &amp; Time</th>
                    <th className="px-4 py-4">Courier</th>
                    <th className="px-4 py-4">Attempt Type</th>
                    <th className="px-4 py-4">Status</th>
                    <th className="px-4 py-4">Response Time</th>
                    <th className="px-4 py-4">Failure Reason</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredActivities.map((activity) => (
                    <tr
                      key={activity.id}
                      className="hover:bg-gray-50"
                    >
                      <td className="whitespace-nowrap px-4 py-4 text-gray-600">
                        {formatDate(activity.attemptedAt)}
                      </td>
                      <td className="px-4 py-4 font-semibold text-gray-800">
                        {activity.courierName}
                      </td>
                      <td className="px-4 py-4 capitalize text-gray-600">
                        {activity.attemptType}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            activity.success
                              ? "bg-green-50 text-green-700"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          {activity.success ? "Successful" : "Failed"}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-gray-600">
                        {formatResponseTime(activity.responseTime)}
                      </td>
                      <td className="max-w-xs px-4 py-4 text-gray-600">
                        {activity.failureReason || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {!analyticsLoading && filteredActivities.length > 0 && (
            <p className="mt-4 text-xs text-gray-500">
              Showing {filteredActivities.length} of{" "}
              {activities.length} recent attempts.
            </p>
          )}
        </div>
      </div>
    );
  }

  // Settings section
  function renderSettings() {
    return (
      <div className="space-y-6">
        <SectionHeading
          title="Admin Settings"
          description="Review your administrator account and dashboard configuration."
        />

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="font-bold">Administrator Account</h3>
          <p className="mt-1 text-sm text-gray-500">
            Your currently authenticated account.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase text-gray-400">
                Email Address
              </p>
              <p className="mt-1 break-all text-sm font-medium">
                {adminEmail}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden text-sm text-gray-500 sm:block">
                Administrator
              </span>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8B0000] font-bold text-white">
                A
              </div>

              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-[#8B0000] transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loggingOut ? "Signing out..." : "Sign Out"}
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="font-bold">Security</h3>
          <p className="mt-2 text-sm leading-6 text-gray-500">
            Password recovery is available from the admin login page.
            Use the Forgot Password option to request a reset link.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="font-bold">Dashboard Configuration</h3>
          <p className="mt-2 text-sm text-gray-500">
            Analytics date range and courier filters are available
            throughout the connected dashboard.
          </p>
        </div>
      </div>
    );
  }

  // Select content based on active section
  function renderContent() {
    switch (activeMenu) {
      case "dashboard":
        return renderDashboard();
      case "requests":
        return renderRequests();
      case "couriers":
        return renderCouriers();
      case "failures":
        return renderFailures();
      case "activity":
        return renderActivity();
      case "settings":
        return renderSettings();
      default:
        return renderDashboard();
    }
  }

  // Main dashboard layout
  return (
    <main className="min-h-screen bg-[#FFF8ED] text-[#171717]">
      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-gray-200 bg-white lg:flex lg:flex-col">
          <div className="border-b border-gray-200 px-6 py-7">
            <h1 className="text-xl font-extrabold tracking-tight">
              Track<span className="text-[#8B0000]">All</span>InOne
            </h1>
            <p className="mt-1 text-xs text-gray-500">
              Administration Panel
            </p>
          </div>

          <nav className="flex-1 space-y-2 px-4 py-6">
            <p className="mb-4 px-3 text-xs font-bold uppercase tracking-widest text-gray-400">
              Workspace
            </p>

            {menuItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => changeSection(item.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                  activeMenu === item.id
                    ? "bg-[#8B0000] text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span className="w-5 text-center text-lg">
                  {item.icon}
                </span>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="border-t border-gray-200 p-5">
            <p className="text-xs text-gray-400">Signed in as</p>
            <p className="mt-1 truncate text-sm font-semibold">
              {adminEmail}
            </p>
          </div>
        </aside>

        {/* Mobile Sidebar */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/50"
            />

            <aside className="relative flex h-full w-72 max-w-[85%] flex-col bg-white shadow-xl">
              <div className="flex items-center justify-between border-b border-gray-200 px-5 py-6">
                <h2 className="font-extrabold">
                  Track<span className="text-[#8B0000]">All</span>InOne
                </h2>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-100"
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              <nav className="flex-1 space-y-2 px-4 py-6">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => changeSection(item.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold ${
                      activeMenu === item.id
                        ? "bg-[#8B0000] text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span className="w-5 text-center">
                      {item.icon}
                    </span>
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="border-t border-gray-200 p-5">
                <p className="text-xs text-gray-400">Administrator</p>
                <p className="mt-1 truncate text-sm font-semibold">
                  {adminEmail}
                </p>
              </div>
            </aside>
          </div>
        )}

        {/* Main Area */}
        <section className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-white px-4 py-4 md:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="rounded-lg border border-gray-200 px-3 py-2 text-lg lg:hidden"
                aria-label="Open navigation"
              >
                ☰
              </button>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#8B0000]">
                  TrackAllInOne Admin
                </p>
                <h2 className="mt-1 text-lg font-bold md:text-xl">
                  {activeItem?.label}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden text-sm text-gray-500 sm:block">
                Administrator
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8B0000] font-bold text-white">
                A
              </div>
            </div>
          </header>

          <div className="space-y-7 p-4 md:p-8">
            {logoutError && (
              <p
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
              >
                {logoutError}
              </p>
            )}

            {renderContent()}

            <footer className="border-t border-gray-200 pt-5 text-center text-xs text-gray-400">
              TrackAllInOne Administration · Dashboard
            </footer>
          </div>
        </section>
      </div>
    </main>
  );
}
