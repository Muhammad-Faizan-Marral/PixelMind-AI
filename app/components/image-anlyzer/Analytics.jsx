"use client";
import { ArrowDownToLine, BarChart3, Info, Search, SlidersHorizontal, TrendingUp, Tag, Zap } from "lucide-react";
import React, { useState, useMemo } from "react";

const getConfidenceColor = (confidence) => {
  if (confidence >= 75) return { bar: "bg-emerald-400", text: "text-emerald-400", glow: "shadow-emerald-400/30" };
  if (confidence >= 50) return { bar: "bg-sky-400", text: "text-sky-400", glow: "shadow-sky-400/30" };
  if (confidence >= 25) return { bar: "bg-amber-400", text: "text-amber-400", glow: "shadow-amber-400/30" };
  return { bar: "bg-rose-400", text: "text-rose-400", glow: "shadow-rose-400/30" };
};

const getConfidenceLabel = (confidence) => {
  if (confidence >= 75) return "High";
  if (confidence >= 50) return "Medium";
  if (confidence >= 25) return "Low";
  return "Trace";
};

const TagPill = ({ tag, confidence, index }) => {
  const colors = getConfidenceColor(confidence);
  return (
    <div
      className="group relative flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-default"
      style={{ animationDelay: `${index * 20}ms` }}
      title={`${confidence.toFixed(1)}% confidence`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${colors.bar} flex-shrink-0`} />
      <span className="text-xs text-text-primary font-medium capitalize">{tag}</span>
      <span className={`text-[10px] font-mono ${colors.text} opacity-70`}>{confidence.toFixed(0)}%</span>
    </div>
  );
};

const ConfidenceBar = ({ tag, confidence, index, maxConfidence }) => {
  const colors = getConfidenceColor(confidence);
  const widthPercent = (confidence / maxConfidence) * 100;
  return (
    <div
      className="group flex items-center gap-3 py-1.5 animate-in fade-in slide-in-from-left-4"
      style={{ animationDelay: `${index * 40}ms`, animationDuration: "400ms", animationFillMode: "both" }}
    >
      <span className="text-xs text-text-secondary w-28 truncate capitalize text-right font-medium group-hover:text-text-primary transition-colors">
        {tag}
      </span>
      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${colors.bar} transition-all duration-700 ease-out shadow-sm ${colors.glow}`}
          style={{ width: `${widthPercent}%`, transitionDelay: `${index * 30}ms` }}
        />
      </div>
      <div className="flex items-center gap-1.5 w-20">
        <span className={`text-xs font-mono font-semibold ${colors.text}`}>
          {confidence.toFixed(1)}%
        </span>
        <span className={`text-[9px] px-1.5 py-0.5 rounded-full border ${
          confidence >= 75 ? "border-emerald-400/30 text-emerald-400 bg-emerald-400/10" :
          confidence >= 50 ? "border-sky-400/30 text-sky-400 bg-sky-400/10" :
          confidence >= 25 ? "border-amber-400/30 text-amber-400 bg-amber-400/10" :
          "border-rose-400/30 text-rose-400 bg-rose-400/10"
        } font-medium uppercase tracking-wide`}>
          {getConfidenceLabel(confidence)}
        </span>
      </div>
    </div>
  );
};

const VIEWS = { bars: "bars", pills: "pills" };
const FILTERS = { all: "all", high: "high", medium: "medium", low: "low" };

const Analytics = ({ AnalysisData, isLoading }) => {
  const [view, setView] = useState(VIEWS.bars);
  const [filter, setFilter] = useState(FILTERS.all);
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);

  const stats = useMemo(() => {
    if (!AnalysisData?.length) return null;
    const high = AnalysisData.filter(d => d.confidence >= 75).length;
    const medium = AnalysisData.filter(d => d.confidence >= 50 && d.confidence < 75).length;
    const low = AnalysisData.filter(d => d.confidence < 50).length;
    const avg = AnalysisData.reduce((s, d) => s + d.confidence, 0) / AnalysisData.length;
    const top = AnalysisData[0];
    return { high, medium, low, avg, top, total: AnalysisData.length };
  }, [AnalysisData]);

  const filtered = useMemo(() => {
    if (!AnalysisData) return [];
    let data = [...AnalysisData];
    if (search) data = data.filter(d => d.tag.en.toLowerCase().includes(search.toLowerCase()));
    if (filter === FILTERS.high) data = data.filter(d => d.confidence >= 75);
    else if (filter === FILTERS.medium) data = data.filter(d => d.confidence >= 50 && d.confidence < 75);
    else if (filter === FILTERS.low) data = data.filter(d => d.confidence < 50);
    return data;
  }, [AnalysisData, search, filter]);

  const displayed = showAll ? filtered : filtered.slice(0, 15);
  const maxConfidence = filtered[0]?.confidence || 100;

  const handleDownload = () => {
    if (!AnalysisData) return;
    const csv = ["Tag,Confidence,Level",
      ...AnalysisData.map(d => `${d.tag.en},${d.confidence.toFixed(2)},${getConfidenceLabel(d.confidence)}`)
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "analysis-results.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full h-full">
      <div className="relative w-full h-full min-h-[400px] lg:h-[36rem] rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col bg-surface-primary/20 backdrop-blur-md">

        {/* Background Orbs */}
        <div className="absolute -top-20 -right-20 w-64 h-64 animate-pulse bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 animate-bounce bg-secondary/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 p-5 sm:p-6 flex flex-col h-full gap-4">

          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <BarChart3 size={18} />
              </div>
              <h2 className="font-display text-lg font-semibold text-text-primary">Analysis Results</h2>
            </div>
            {AnalysisData && !isLoading && (
              <button
                onClick={handleDownload}
                className="p-2 bg-white/5 hover:bg-primary hover:text-white rounded-xl transition-all duration-300 text-text-secondary border border-white/10"
                title="Download CSV"
              >
                <ArrowDownToLine size={16} />
              </button>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col min-h-0">
            {isLoading ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 animate-in fade-in zoom-in duration-500">
                <div className="relative">
                  <div className="w-14 h-14 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
                  </div>
                </div>
                <p className="text-text-secondary font-medium animate-pulse text-sm">Processing image data...</p>
              </div>

            ) : AnalysisData?.length ? (
              <div className="flex flex-col gap-3 h-full min-h-0">

                {/* Stats Row */}
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { icon: <Tag size={12}/>, label: "Total", value: stats.total, color: "text-text-primary" },
                    { icon: <Zap size={12}/>, label: "High", value: stats.high, color: "text-emerald-400" },
                    { icon: <TrendingUp size={12}/>, label: "Avg", value: `${stats.avg.toFixed(0)}%`, color: "text-sky-400" },
                    { icon: <SlidersHorizontal size={12}/>, label: "Top", value: stats.top.tag.en, color: "text-amber-400", truncate: true },
                  ].map((s, i) => (
                    <div key={i} className="p-2.5 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-1">
                      <div className={`flex items-center gap-1 ${s.color} opacity-70`}>{s.icon}<span className="text-[10px] uppercase tracking-wider font-bold">{s.label}</span></div>
                      <span className={`text-sm font-bold font-mono ${s.color} ${s.truncate ? "truncate" : ""}`}>{s.value}</span>
                    </div>
                  ))}
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Search */}
                  <div className="flex items-center gap-2 flex-1 min-w-[120px] px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 focus-within:border-primary/40 transition-colors">
                    <Search size={12} className="text-text-secondary flex-shrink-0" />
                    <input
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      placeholder="Search tags..."
                      className="bg-transparent text-xs text-text-primary placeholder:text-text-secondary/50 outline-none w-full"
                    />
                  </div>

                  {/* Filter Pills */}
                  <div className="flex gap-1">
                    {Object.entries(FILTERS).map(([key, val]) => (
                      <button
                        key={key}
                        onClick={() => setFilter(val)}
                        className={`text-[10px] px-2.5 py-1.5 rounded-lg font-semibold uppercase tracking-wide transition-all ${
                          filter === val
                            ? "bg-primary text-white"
                            : "bg-white/5 text-text-secondary hover:bg-white/10 border border-white/10"
                        }`}
                      >
                        {key}
                      </button>
                    ))}
                  </div>

                  {/* View Toggle */}
                  <div className="flex gap-1 p-0.5 rounded-lg bg-white/5 border border-white/10">
                    <button onClick={() => setView(VIEWS.bars)} className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide transition-all ${view === VIEWS.bars ? "bg-primary text-white" : "text-text-secondary hover:text-text-primary"}`}>
                      Bars
                    </button>
                    <button onClick={() => setView(VIEWS.pills)} className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide transition-all ${view === VIEWS.pills ? "bg-primary text-white" : "text-text-secondary hover:text-text-primary"}`}>
                      Tags
                    </button>
                  </div>
                </div>

                {/* Results count */}
                <div className="text-[10px] text-text-secondary/60 font-mono">
                  Showing {Math.min(displayed.length, filtered.length)} of {filtered.length} results
                  {search && <span className="text-primary ml-1">for &quot;{search}&quot;</span>}
                </div>

                {/* Data Area */}
                <div className="flex-1 overflow-y-auto min-h-0 pr-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                  {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full gap-2 opacity-50">
                      <Search size={24} className="text-text-secondary" />
                      <p className="text-sm text-text-secondary">No tags match your filter</p>
                    </div>
                  ) : view === VIEWS.bars ? (
                    <div className="space-y-0.5">
                      {displayed.map((item, i) => (
                        <ConfidenceBar
                          key={item.tag.en}
                          tag={item.tag.en}
                          confidence={item.confidence}
                          index={i}
                          maxConfidence={maxConfidence}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2 content-start">
                      {displayed.map((item, i) => (
                        <TagPill key={item.tag.en} tag={item.tag.en} confidence={item.confidence} index={i} />
                      ))}
                    </div>
                  )}
                </div>

                {/* Show more/less */}
                {filtered.length > 15 && (
                  <button
                    onClick={() => setShowAll(v => !v)}
                    className="w-full py-2 text-xs text-text-secondary hover:text-primary border border-white/10 hover:border-primary/30 rounded-xl transition-all bg-white/5 hover:bg-primary/5 font-medium"
                  >
                    {showAll ? `Show less ↑` : `Show all ${filtered.length} tags ↓`}
                  </button>
                )}
              </div>

            ) : (
              // Empty State
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 opacity-60">
                <div className="mb-4 text-text-secondary">
                  <Info size={44} strokeWidth={1} />
                </div>
                <h3 className="text-base font-medium text-text-primary mb-2">No Data Yet</h3>
                <p className="text-sm text-text-secondary max-w-[200px] mx-auto">
                  Upload and analyze an image to see the breakdown here.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-white/5">
            <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-text-secondary/50 font-bold">
              <span>PixelMind Engine v1.0</span>
              <span>{AnalysisData ? `${AnalysisData.length} tags detected` : "System Active"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;