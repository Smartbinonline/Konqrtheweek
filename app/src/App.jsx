/* AUTO-GENERATED from konqr_app_markup.html by scripts/transform.mjs — edit the template + rerun, or edit carefully. */
import React from "react";
import { PlannerLogic } from "./logic.js";
import { css } from "./css.js";

export default class App extends PlannerLogic {
  render() {
    const v = this.renderVals();
    return (
      <React.Fragment>
      <div style={css("position:relative;min-height:100vh;display:flex;flex-direction:column;background:#06080C;color:#E7E9EC;font-family:'Instrument Sans','Segoe UI',sans-serif;overflow-x:hidden")}>
        <div style={v.liquidLayerStyle}>
          <div style={css("position:absolute;top:-18%;left:-10%;width:70vw;height:70vw;border-radius:50%;filter:blur(90px);opacity:.55;background:radial-gradient(circle at 35% 35%,#4C3BEE,rgba(76,59,238,0) 68%);animation:lq1 26s ease-in-out infinite")} />
          <div style={css("position:absolute;bottom:-26%;right:-14%;width:66vw;height:66vw;border-radius:50%;filter:blur(100px);opacity:.5;background:radial-gradient(circle at 55% 45%,#0E9F94,rgba(14,159,148,0) 66%);animation:lq2 34s ease-in-out infinite")} />
          <div style={css("position:absolute;top:22%;right:12%;width:44vw;height:44vw;border-radius:50%;filter:blur(110px);opacity:.42;background:radial-gradient(circle at 50% 50%,#C0466F,rgba(192,70,111,0) 64%);animation:lq3 30s ease-in-out infinite")} />
          <div style={css("position:absolute;bottom:6%;left:16%;width:40vw;height:40vw;border-radius:50%;filter:blur(120px);opacity:.35;background:radial-gradient(circle at 50% 50%,#8FA3B8,rgba(143,163,184,0) 62%);animation:lq4 38s ease-in-out infinite")} />
          <div style={css("position:absolute;inset:0;background:linear-gradient(180deg,rgba(6,8,12,.42),rgba(6,8,12,.78) 55%,rgba(6,8,12,.92))")} />
          <div style={css("position:absolute;inset:0;background:radial-gradient(120% 60% at 50% -10%,rgba(255,255,255,.10),rgba(255,255,255,0) 60%)")} />
        </div>
        {(v.toast) ? (
          <React.Fragment>
          <div style={css("position:fixed;top:70px;left:50%;transform:translateX(-50%);background:linear-gradient(180deg,rgba(255,255,255,.14),rgba(255,255,255,.05));border:1px solid rgba(255,255,255,.16);backdrop-filter:blur(20px) saturate(150%);color:#F2F4F7;padding:10px 20px;border-radius:11px;font-size:12.5px;font-weight:500;z-index:1200;box-shadow:0 18px 40px -18px rgba(0,0,0,.9)")}>
            {v.toast}
          </div>
          </React.Fragment>
        ) : null}
        <header style={css("position:sticky;top:0;z-index:100;display:flex;align-items:center;gap:14px;padding:13px 22px;background:rgba(12,15,21,.55);backdrop-filter:blur(24px) saturate(160%);border-bottom:1px solid rgba(255,255,255,.08);box-shadow:inset 0 1px 0 rgba(255,255,255,.06)")}>
          <div style={css("display:flex;align-items:baseline;gap:9px")}>
            <h1 style={css("font-size:19px;font-weight:700;letter-spacing:-0.01em;color:#F4F6F8")}>
              Weekly Planner
            </h1>
            <span style={v.brandDotStyle} />
            <span style={css("font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:rgba(231,233,236,.42);font-weight:600")}>
              KONQR
            </span>
          </div>
          <div style={css("margin-left:auto;display:flex;align-items:center;gap:8px")}>
            <span style={css("font-size:11px;color:rgba(231,233,236,.45)")}>
              {v.clockLabel}
            </span>
            <button onClick={v.onFilePill} title="Cloud sync" style={css("padding:5px 11px;border-radius:8px;border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.04);color:{{ filePillColor }};font-size:10.5px;cursor:pointer")}>
              {v.filePill}
            </button>
            <button onClick={v.onReset} style={css("padding:5px 11px;border-radius:8px;border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.04);color:rgba(231,233,236,.5);font-size:10.5px;cursor:pointer")}>
              Reset
            </button>
          </div>
        </header>
        <div style={css("display:flex;flex:1;min-height:0;position:relative;z-index:1")}>
          {(v.showNav) ? (
            <React.Fragment>
            <nav style={v.navStyle}>
              {(v.navItems).map(function(n, i0) { return (
                <React.Fragment key={i0}>
                <div onMouseEnter={n.onEnter} onMouseLeave={n.onLeave} style={n.wrapStyle}>
                  <button onClick={n.onClick} title={n.label} style={n.style}>
                    <span style={n.iconStyle}>
                      {n.icon}
                    </span>
                    {(n.showCaption) ? (
                      <React.Fragment>
                      <span style={n.captionStyle}>
                        {n.short}
                      </span>
                      </React.Fragment>
                    ) : null}
                  </button>
                  {(n.showFlyout) ? (
                    <React.Fragment>
                    <div style={n.flyoutStyle}>
                      {n.label}
                    </div>
                    </React.Fragment>
                  ) : null}
                </div>
                </React.Fragment>
              ); })}
            </nav>
            </React.Fragment>
          ) : null}
          <main style={css("flex:1;min-width:0;min-height:0;overflow-y:auto;padding:20px 22px 34px")}>
            {(v.isCalendar) ? (
              <React.Fragment>
              <div>
                <div style={css("display:flex;align-items:center;gap:7px;margin-bottom:14px;flex-wrap:wrap")}>
                  <button onClick={v.onNewTask} style={css("padding:7px 13px;border-radius:9px;border:1px solid rgba(255,255,255,.12);background:linear-gradient(180deg,rgba(255,255,255,.10),rgba(255,255,255,.03));color:#E7E9EC;font-size:11.5px;font-weight:600;cursor:pointer")}>
                    + Task
                  </button>
                  <button onClick={v.onNewAppt} style={css("padding:7px 13px;border-radius:9px;border:1px solid rgba(220,38,38,.4);background:linear-gradient(180deg,rgba(220,38,38,.26),rgba(220,38,38,.10));color:#FFE4E4;font-size:11.5px;font-weight:600;cursor:pointer")}>
                    + Appt
                  </button>
                  <button onClick={v.onUndo} style={v.undoStyle}>
                    {v.undoLabel}
                  </button>
                  <button onClick={v.onClear} style={css("padding:7px 13px;border-radius:9px;border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.04);color:rgba(255,190,190,.9);font-size:11.5px;cursor:pointer")}>
                    Clear
                  </button>
                  <button onClick={v.onAuto} style={v.primaryBtnStyle}>
                    Auto Schedule
                  </button>
                  <button onClick={v.onRoll} style={css("padding:7px 13px;border-radius:9px;border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.04);color:#E7E9EC;font-size:11.5px;cursor:pointer")}>
                    Roll
                  </button>
                  <div style={css("margin-left:auto;display:flex;align-items:center;gap:7px")}>
                    <h2 style={v.weekLabelStyle}>
                      {v.weekLabel}
                    </h2>
                    <button onClick={v.onPrev} style={css("width:30px;height:30px;border-radius:9px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);color:#E7E9EC;font-size:14px;cursor:pointer")}>
                      ‹
                    </button>
                    <button onClick={v.onToday} style={v.primaryBtnStyle}>
                      Current Week
                    </button>
                    <button onClick={v.onNext} style={css("width:30px;height:30px;border-radius:9px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);color:#E7E9EC;font-size:14px;cursor:pointer")}>
                      ›
                    </button>
                  </div>
                </div>
                {(v.showRotateHint) ? (
                  <React.Fragment>
                  <div style={css("display:flex;align-items:center;gap:8px;margin-bottom:10px;padding:8px 12px;border-radius:10px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.09);font-size:11px;color:rgba(231,233,236,.6)")}>
                    <span style={css("font-size:13px")}>
                      ↻
                    </span>
                    <span>
                      Rotate to landscape to see the whole week
                    </span>
                  </div>
                  </React.Fragment>
                ) : null}
                <div style={v.calRowStyle}>
                  {(v.showSideCol) ? (
                    <React.Fragment>
                    <div style={v.sideColStyle}>
                      <div style={css("background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.09);backdrop-filter:blur(20px) saturate(150%);border-radius:14px;padding:13px;box-shadow:inset 0 1px 0 rgba(255,255,255,.07),0 20px 40px -30px rgba(0,0,0,.9)")}>
                        <div style={css("font-size:9.5px;font-weight:700;letter-spacing:.14em;color:rgba(231,233,236,.38);margin-bottom:9px")}>
                          THIS WEEK'S GOALS
                        </div>
                        {(v.wgRows).map(function(g, i1) { return (
                          <React.Fragment key={i1}>
                          <div style={css("display:flex;align-items:center;gap:8px;margin-bottom:6px")}>
                            <button onClick={g.onCheck} style={g.checkStyle}>
                              {g.mark}
                            </button>
                            {(g.editing) ? (
                              <React.Fragment>
                              <input value={g.draft ?? ""} onChange={g.onDraft} onBlur={g.onCommit} onKeyDown={g.onKey} autoFocus={true} style={css("flex:1;min-width:0;padding:4px 7px;border-radius:7px;border:1px solid rgba(255,255,255,.24);background:rgba(255,255,255,.07);font-size:11.5px;outline:none")} />
                              </React.Fragment>
                            ) : null}
                            {(g.notEditing) ? (
                              <React.Fragment>
                              <div onClick={g.onEdit} style={g.textStyle}>
                                {g.text}
                              </div>
                              </React.Fragment>
                            ) : null}
                          </div>
                          </React.Fragment>
                        ); })}
                      </div>
                      <div style={v.parkingPanelStyle}>
                        <div style={css("font-size:9.5px;font-weight:700;letter-spacing:.14em;color:rgba(231,233,236,.38);margin-bottom:9px")}>
                          {v.parkingTitle}
                        </div>
                        {(v.showPlFilter) ? (
                          <React.Fragment>
                          <select value={v.plFilter ?? ""} onChange={v.onPlFilter} style={css("width:100%;padding:5px 7px;border-radius:8px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);font-size:10.5px;margin-bottom:8px")}>
                            {(v.plOptions).map(function(o, i2) { return (
                              <React.Fragment key={i2}>
                              <option value={o.value ?? ""}>
                                {o.label}
                              </option>
                              </React.Fragment>
                            ); })}
                          </select>
                          </React.Fragment>
                        ) : null}
                        {(v.unschedList).map(function(t, i3) { return (
                          <React.Fragment key={i3}>
                          <div draggable={true} onDragStart={t.onDragStart} onClick={t.onClick} style={t.style}>
                            <div style={css("font-weight:600;font-size:11.5px")}>
                              {t.name}
                            </div>
                            <div style={css("font-size:9.5px;opacity:.75;margin-top:2px")}>
                              {t.meta}
                            </div>
                          </div>
                          </React.Fragment>
                        ); })}
                        {(v.noUnsched) ? (
                          <React.Fragment>
                          <p style={css("font-size:10.5px;color:rgba(231,233,236,.3);padding:4px")}>
                            All scheduled
                          </p>
                          </React.Fragment>
                        ) : null}
                        {(v.hasParked) ? (
                          <React.Fragment>
                          <div style={css("margin-top:12px;border-top:1px solid rgba(255,255,255,.09);padding-top:10px")}>
                            <div style={css("font-size:9.5px;font-weight:700;letter-spacing:.14em;color:rgba(231,233,236,.38);margin-bottom:8px")}>
                              {v.parkedTitle}
                            </div>
                            {(v.parkedList).map(function(t, i4) { return (
                              <React.Fragment key={i4}>
                              <div onClick={t.onClick} style={t.style}>
                                <div style={css("display:flex;align-items:center;gap:6px")}>
                                  <span>
                                    {t.icon}
                                  </span>
                                  <span style={css("font-weight:600;font-size:11px")}>
                                    {t.name}
                                  </span>
                                </div>
                                <div style={css("font-size:9.5px;opacity:.7;margin-top:2px")}>
                                  {t.meta}
                                </div>
                              </div>
                              </React.Fragment>
                            ); })}
                          </div>
                          </React.Fragment>
                        ) : null}
                      </div>
                    </div>
                    </React.Fragment>
                  ) : null}
                  <div onDragOver={v.onGridDragOver} style={css("flex:1;min-width:0;overflow-x:auto;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:8px 10px 12px;backdrop-filter:blur(22px) saturate(150%);box-shadow:inset 0 1px 0 rgba(255,255,255,.07),0 28px 60px -40px rgba(0,0,0,1)")}>
                    <div style={v.gridStyle}>
                      <div style={css("padding:6px")} />
                      {(v.colHeads).map(function(c, i5) { return (
                        <React.Fragment key={i5}>
                        <div style={c.style}>
                          <div style={css("font-size:11.5px;font-weight:700;letter-spacing:.02em;color:#EEF1F4")}>
                            {c.day}
                          </div>
                          <div style={css("font-size:9.5px;color:rgba(231,233,236,.4);font-weight:500")}>
                            {c.date}
                          </div>
                        </div>
                        </React.Fragment>
                      ); })}
                      {(v.rows).map(function(r, i7) { return (
                        <React.Fragment key={i7}>
                        <div style={css("display:contents")}>
                          <div style={r.timeStyle}>
                            {r.label}
                          </div>
                          {(r.cells).map(function(cell, i6) { return (
                            <React.Fragment key={i6}>
                            <div onDragOver={cell.onDragOver} onDrop={cell.onDrop} onClick={cell.onClick} style={cell.style}>
                              {(cell.todayStyle) ? (
                                <React.Fragment>
                                <div style={cell.todayStyle} />
                                </React.Fragment>
                              ) : null}
                              {(cell.nowStyle) ? (
                                <React.Fragment>
                                <div style={cell.nowStyle} />
                                </React.Fragment>
                              ) : null}
                              {(cell.meal) ? (
                                <React.Fragment>
                                <div style={css("position:absolute;top:0;left:0;right:0;height:0;border-top:1px dashed rgba(224,176,80,.5);z-index:0;pointer-events:none")}>
                                  <span style={css("position:absolute;left:3px;top:-1px;font-size:7.5px;letter-spacing:.06em;color:rgba(240,200,120,.75);line-height:1")}>
                                    {cell.meal}
                                  </span>
                                </div>
                                </React.Fragment>
                              ) : null}
                              {(cell.appt) ? (
                                <React.Fragment>
                                <div onClick={cell.appt.onClick} style={cell.appt.style}>
                                  {cell.appt.label}
                                </div>
                                </React.Fragment>
                              ) : null}
                              {(cell.task) ? (
                                <React.Fragment>
                                <div draggable={true} onDragStart={cell.task.onDragStart} onClick={cell.task.onClick} onMouseEnter={cell.task.onEnter} onMouseLeave={cell.task.onLeave} style={cell.task.style}>
                                  <div>
                                    <span style={cell.task.nameStyle}>
                                      {cell.task.name}
                                    </span>
                                    <div style={css("position:absolute;top:2px;right:3px;display:flex;gap:4px;z-index:2")}>
                                      {(cell.task.showDup) ? (
                                        <React.Fragment>
                                        <button onClick={cell.task.onDup} title="Duplicate" style={css("width:20px;height:20px;border-radius:6px;border:1px solid rgba(255,255,255,.55);background:linear-gradient(180deg,rgba(255,255,255,.3),rgba(255,255,255,.10));color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;box-shadow:inset 0 1px 0 rgba(255,255,255,.5)")}>
                                          <svg width={11} height={11} viewBox={"0 0 16 16"} fill="none" aria-hidden="true">
                                            <rect x="5.5" y="1.5" width={9} height={9} rx="2" stroke="#fff" strokeWidth="1.7" />
                                            <path d="M10.5 13.2A1.8 1.8 0 0 1 8.7 15H3.3A1.8 1.8 0 0 1 1.5 13.2V7.8A1.8 1.8 0 0 1 3.3 6" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" />
                                          </svg>
                                        </button>
                                        </React.Fragment>
                                      ) : null}
                                      <button onClick={cell.task.onDone} title="Complete" style={cell.task.doneStyle}>
                                        <svg width={12} height={12} viewBox={"0 0 16 16"} fill="none" aria-hidden="true">
                                          <path d="M3 8.6L6.2 11.8L13 4.8" stroke={cell.task.checkStroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                  {(cell.task.showSub) ? (
                                    <React.Fragment>
                                    <div style={css("font-size:8.5px;opacity:.75")}>
                                      {cell.task.sub}
                                    </div>
                                    </React.Fragment>
                                  ) : null}
                                  <div onMouseDown={cell.task.onResize} title="Drag to resize" style={css("position:absolute;left:0;right:0;bottom:0;height:10px;cursor:ns-resize;display:flex;align-items:center;justify-content:center;z-index:2")}>
                                    <div style={css("width:26px;height:4px;border-radius:3px;background:linear-gradient(180deg,rgba(255,255,255,.85),rgba(255,255,255,.42));box-shadow:0 1px 2px rgba(0,0,0,.4)")} />
                                  </div>
                                </div>
                                </React.Fragment>
                              ) : null}
                            </div>
                            </React.Fragment>
                          ); })}
                        </div>
                        </React.Fragment>
                      ); })}
                    </div>
                  </div>
                </div>
              </div>
              </React.Fragment>
            ) : null}
            {(v.isMission) ? (
              <React.Fragment>
              <div style={css("max-width:760px")}>
                <div style={css("display:flex;justify-content:space-between;align-items:center;margin-bottom:18px")}>
                  <h2 style={css("font-size:26px;font-weight:700;letter-spacing:-0.02em;color:#F4F6F8")}>
                    Mission & Goals
                  </h2>
                  <button onClick={v.mv.onToggle} style={v.primaryBtnStyle}>
                    {v.mv.btnLabel}
                  </button>
                </div>
                <div style={v.mv.heroStyle}>
                  <label style={css("font-size:9.5px;font-weight:700;letter-spacing:.16em;opacity:.7;display:block;margin-bottom:10px")}>
                    MISSION STATEMENT
                  </label>
                  {(v.mv.editing) ? (
                    <React.Fragment>
                    <textarea rows={5} value={v.mv.draft ?? ""} onChange={v.mv.onDraft} style={css("width:100%;padding:10px 12px;border-radius:10px;background:rgba(0,0,0,.28);border:1px solid rgba(255,255,255,.24);color:#fff;font-size:14px;line-height:1.7;resize:vertical")} />
                    </React.Fragment>
                  ) : null}
                  {(v.mv.notEditing) ? (
                    <React.Fragment>
                    <p style={css("line-height:1.8;font-size:15px;white-space:pre-wrap;color:#F4F6F8")}>
                      {v.mission}
                    </p>
                    </React.Fragment>
                  ) : null}
                </div>
                <div style={css("background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.09);backdrop-filter:blur(20px) saturate(150%);border-radius:16px;padding:20px;box-shadow:inset 0 1px 0 rgba(255,255,255,.07)")}>
                  {(v.mv.editing) ? (
                    <React.Fragment>
                    <div style={css("display:flex;flex-direction:column;gap:8px")}>
                      {(v.mv.goalDrafts).map(function(g, i8) { return (
                        <React.Fragment key={i8}>
                        <div style={css("display:flex;gap:8px")}>
                          <input value={g.value ?? ""} onChange={g.onChange} style={css("flex:1;padding:9px 12px;border-radius:9px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);font-size:13.5px")} />
                          <button onClick={g.onDel} style={css("padding:6px 11px;border-radius:9px;border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.04);color:#FF9B9B;cursor:pointer")}>
                            ✕
                          </button>
                        </div>
                        </React.Fragment>
                      ); })}
                      <button onClick={v.mv.onAdd} style={css("align-self:flex-start;padding:7px 13px;border-radius:9px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);color:#E7E9EC;font-size:12px;cursor:pointer")}>
                        + Add
                      </button>
                    </div>
                    </React.Fragment>
                  ) : null}
                  {(v.mv.notEditing) ? (
                    <React.Fragment>
                    <div style={css("display:flex;flex-direction:column;gap:8px")}>
                      {(v.mv.goals).map(function(g, i9) { return (
                        <React.Fragment key={i9}>
                        <div style={css("display:flex;align-items:center;gap:14px;padding:12px 16px;border-radius:11px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07)")}>
                          <span style={g.numStyle}>
                            {g.n}
                          </span>
                          <span style={css("font-size:13.5px;color:#E7E9EC")}>
                            {g.text}
                          </span>
                        </div>
                        </React.Fragment>
                      ); })}
                    </div>
                    </React.Fragment>
                  ) : null}
                </div>
              </div>
              </React.Fragment>
            ) : null}
            {(v.isGroups) ? (
              <React.Fragment>
              <div style={css("max-width:860px")}>
                <div style={css("display:flex;justify-content:space-between;align-items:center;margin-bottom:18px")}>
                  <h2 style={css("font-size:26px;font-weight:700;letter-spacing:-0.02em;color:#F4F6F8")}>
                    Groups
                  </h2>
                  <button onClick={v.gv.onNew} style={v.primaryBtnStyle}>
                    + New
                  </button>
                </div>
                <div style={css("display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:14px")}>
                  {(v.gv.items).map(function(g, i10) { return (
                    <React.Fragment key={i10}>
                    <div onClick={g.onClick} style={g.style}>
                      <div style={css("font-weight:700;font-size:15px;color:#fff")}>
                        {g.name}
                      </div>
                      <div style={css("font-size:11px;color:rgba(255,255,255,.72);margin-top:3px")}>
                        {g.count}
                      </div>
                      <div style={css("font-size:11px;color:rgba(255,255,255,.72)")}>
                        {g.doneLabel}
                      </div>
                    </div>
                    </React.Fragment>
                  ); })}
                </div>
              </div>
              </React.Fragment>
            ) : null}
            {(v.isTasks) ? (
              <React.Fragment>
              <div style={css("max-width:900px")}>
                <div style={css("display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:10px")}>
                  <h2 style={css("font-size:26px;font-weight:700;letter-spacing:-0.02em;color:#F4F6F8")}>
                    Tasks
                  </h2>
                  <div style={css("display:flex;gap:6px;flex-wrap:wrap")}>
                    {(v.tv.filters).map(function(f, i11) { return (
                      <React.Fragment key={i11}>
                      <button onClick={f.onClick} style={f.style}>
                        {f.label}
                      </button>
                      </React.Fragment>
                    ); })}
                    <select value={v.tv.groupFilter ?? ""} onChange={v.tv.onGroupFilter} style={css("padding:6px 9px;border-radius:9px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);font-size:11.5px")}>
                      {(v.tv.groupOpts).map(function(o, i12) { return (
                        <React.Fragment key={i12}>
                        <option value={o.value ?? ""}>
                          {o.label}
                        </option>
                        </React.Fragment>
                      ); })}
                    </select>
                    <button onClick={v.tv.onNew} style={v.primaryBtnStyle}>
                      + New
                    </button>
                  </div>
                </div>
                <div style={css("display:flex;flex-direction:column;gap:6px")}>
                  {(v.tv.rows).map(function(t, i13) { return (
                    <React.Fragment key={i13}>
                    <div style={t.style}>
                      <button onClick={t.onToggle} style={t.checkStyle}>
                        {t.mark}
                      </button>
                      <div onClick={t.onEdit} style={css("flex:1;cursor:pointer;min-width:0")}>
                        <div style={t.nameStyle}>
                          {t.name}
                        </div>
                        <div style={css("font-size:10.5px;color:rgba(255,255,255,.75);margin-top:3px")}>
                          {t.meta}
                        </div>
                      </div>
                      <button onClick={t.onDel} style={css("border:none;background:none;color:rgba(255,255,255,.5);font-size:11px;cursor:pointer;padding:2px 6px")}>
                        ✕
                      </button>
                    </div>
                    </React.Fragment>
                  ); })}
                </div>
              </div>
              </React.Fragment>
            ) : null}
            {(v.isPriority) ? (
              <React.Fragment>
              <div>
                <h2 style={css("font-size:26px;font-weight:700;letter-spacing:-0.02em;color:#F4F6F8;margin-bottom:5px")}>
                  Priority Matrix
                </h2>
                <p style={css("font-size:12px;color:rgba(231,233,236,.45);margin-bottom:16px")}>
                  Drag tasks between quadrants to reassign priority
                </p>
                <div style={css("display:grid;grid-template-columns:repeat(2,1fr);gap:14px")}>
                  {(v.pv.quads).map(function(q, i15) { return (
                    <React.Fragment key={i15}>
                    <div onDragOver={q.onDragOver} onDrop={q.onDrop} style={q.style}>
                      <div style={q.headStyle}>
                        <div style={css("font-weight:700;font-size:13px;color:#fff")}>
                          {q.title}
                        </div>
                        <div style={q.badgeStyle}>
                          {q.count}
                        </div>
                      </div>
                      <div style={css("padding:10px;max-height:280px;overflow-y:auto;display:flex;flex-direction:column;gap:6px")}>
                        {(q.rows).map(function(t, i14) { return (
                          <React.Fragment key={i14}>
                          <div draggable={true} onDragStart={t.onDragStart} style={t.style}>
                            <button onClick={t.onToggle} style={t.checkStyle}>
                              {t.mark}
                            </button>
                            <div onClick={t.onEdit} style={css("flex:1;cursor:pointer;min-width:0")}>
                              <div style={t.nameStyle}>
                                {t.name}
                              </div>
                              <div style={css("font-size:10.5px;color:rgba(255,255,255,.75);margin-top:3px")}>
                                {t.meta}
                              </div>
                            </div>
                          </div>
                          </React.Fragment>
                        ); })}
                      </div>
                    </div>
                    </React.Fragment>
                  ); })}
                </div>
              </div>
              </React.Fragment>
            ) : null}
            {(v.isAppts) ? (
              <React.Fragment>
              <div style={css("max-width:760px")}>
                <div style={css("display:flex;justify-content:space-between;align-items:center;margin-bottom:18px")}>
                  <h2 style={css("font-size:26px;font-weight:700;letter-spacing:-0.02em;color:#F4F6F8")}>
                    Appointments
                  </h2>
                  <button onClick={v.av.onNew} style={v.primaryBtnStyle}>
                    + New
                  </button>
                </div>
                <div style={css("display:flex;flex-direction:column;gap:8px")}>
                  {(v.av.items).map(function(a, i16) { return (
                    <React.Fragment key={i16}>
                    <div onClick={a.onClick} style={a.style}>
                      <div style={css("flex:1")}>
                        <div style={css("font-weight:700;font-size:14px;color:#fff")}>
                          {a.name}
                        </div>
                        <div style={css("font-size:11px;color:rgba(255,255,255,.78);margin-top:2px")}>
                          {a.meta}
                        </div>
                      </div>
                      <button onClick={a.onDel} style={css("border:none;background:none;color:rgba(255,255,255,.6);cursor:pointer;font-size:12px")}>
                        ✕
                      </button>
                    </div>
                    </React.Fragment>
                  ); })}
                </div>
              </div>
              </React.Fragment>
            ) : null}
            {(v.isPrefs) ? (
              <React.Fragment>
              <div style={css("max-width:780px")}>
                <div style={css("display:flex;justify-content:space-between;align-items:center;margin-bottom:18px")}>
                  <h2 style={css("font-size:26px;font-weight:700;letter-spacing:-0.02em;color:#F4F6F8")}>
                    Preferences
                  </h2>
                  <button onClick={v.prv.onToggle} style={v.primaryBtnStyle}>
                    {v.prv.btnLabel}
                  </button>
                </div>
                <div style={css("background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.09);backdrop-filter:blur(20px) saturate(150%);border-radius:16px;padding:18px;margin-bottom:14px;box-shadow:inset 0 1px 0 rgba(255,255,255,.07)")}>
                  <label style={css("font-size:9.5px;font-weight:700;letter-spacing:.14em;color:rgba(231,233,236,.38);display:block;margin-bottom:10px")}>
                    TIME BLOCKS
                  </label>
                  <div style={css("display:flex;flex-direction:column;gap:7px")}>
                    {(v.prv.blocks).map(function(b, i20) { return (
                      <React.Fragment key={i20}>
                      <div style={b.style}>
                        {(v.prv.editing) ? (
                          <React.Fragment>
                          <div style={css("display:flex;gap:7px;flex-wrap:wrap;align-items:center")}>
                            <input value={b.label ?? ""} onChange={b.onLabel} style={css("width:140px;padding:6px 9px;border-radius:8px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);font-size:12px")} />
                            <select value={b.start ?? ""} onChange={b.onStart} style={css("width:82px;padding:6px;border-radius:8px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);font-size:11px")}>
                              {(v.prv.slotOpts).map(function(s, i17) { return (
                                <React.Fragment key={i17}>
                                <option value={s.value ?? ""}>
                                  {s.label}
                                </option>
                                </React.Fragment>
                              ); })}
                            </select>
                            <span style={css("font-size:11px;color:rgba(231,233,236,.5)")}>
                              to
                            </span>
                            <select value={b.end ?? ""} onChange={b.onEnd} style={css("width:82px;padding:6px;border-radius:8px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);font-size:11px")}>
                              {(v.prv.slotOpts).map(function(s, i18) { return (
                                <React.Fragment key={i18}>
                                <option value={s.value ?? ""}>
                                  {s.label}
                                </option>
                                </React.Fragment>
                              ); })}
                            </select>
                            <select value={b.pri ?? ""} onChange={b.onPri} style={css("width:78px;padding:6px;border-radius:8px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);font-size:11px")}>
                              {(v.prv.priOpts).map(function(o, i19) { return (
                                <React.Fragment key={i19}>
                                <option value={o.value ?? ""}>
                                  {o.label}
                                </option>
                                </React.Fragment>
                              ); })}
                            </select>
                          </div>
                          </React.Fragment>
                        ) : null}
                        {(v.prv.notEditing) ? (
                          <React.Fragment>
                          <div>
                            <div style={css("font-weight:700;font-size:13px;color:#EEF1F4")}>
                              {b.label}
                            </div>
                            <div style={css("font-size:11px;color:rgba(231,233,236,.45);margin-top:2px")}>
                              {b.meta}
                            </div>
                          </div>
                          </React.Fragment>
                        ) : null}
                      </div>
                      </React.Fragment>
                    ); })}
                  </div>
                </div>
                <div style={css("display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px")}>
                  <div style={css("background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.09);backdrop-filter:blur(20px);border-radius:16px;padding:18px")}>
                    <label style={css("font-size:9.5px;font-weight:700;letter-spacing:.14em;color:rgba(231,233,236,.38);display:block;margin-bottom:10px")}>
                      MAX CONTINUOUS HOURS
                    </label>
                    {(v.prv.editing) ? (
                      <React.Fragment>
                      <input type="number" min="0.5" step="0.5" value={v.prv.maxH ?? ""} onChange={v.prv.onMaxH} style={css("width:100%;padding:9px 12px;border-radius:9px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);font-size:14px")} />
                      </React.Fragment>
                    ) : null}
                    {(v.prv.notEditing) ? (
                      <React.Fragment>
                      <div style={v.prv.maxHStyle}>
                        {v.prv.maxHLabel}
                      </div>
                      </React.Fragment>
                    ) : null}
                  </div>
                  <div style={css("background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.09);backdrop-filter:blur(20px);border-radius:16px;padding:18px")}>
                    <label style={css("font-size:9.5px;font-weight:700;letter-spacing:.14em;color:rgba(231,233,236,.38);display:block;margin-bottom:10px")}>
                      WORK DAYS
                    </label>
                    <div style={css("display:flex;gap:5px;flex-wrap:wrap")}>
                      {(v.prv.days).map(function(d, i21) { return (
                        <React.Fragment key={i21}>
                        <button onClick={d.onClick} style={d.style}>
                          {d.label}
                        </button>
                        </React.Fragment>
                      ); })}
                    </div>
                  </div>
                </div>
                <div style={css("background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.09);backdrop-filter:blur(20px);border-radius:16px;padding:18px;margin-bottom:14px")}>
                  <label style={css("font-size:9.5px;font-weight:700;letter-spacing:.14em;color:rgba(231,233,236,.38);display:block;margin-bottom:10px")}>
                    TIMEZONE
                  </label>
                  {(v.prv.editing) ? (
                    <React.Fragment>
                    <select value={v.prv.tz ?? ""} onChange={v.prv.onTz} style={css("width:100%;padding:9px 12px;border-radius:9px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);font-size:13.5px")}>
                      {(v.prv.tzOpts).map(function(o, i22) { return (
                        <React.Fragment key={i22}>
                        <option value={o.value ?? ""}>
                          {o.label}
                        </option>
                        </React.Fragment>
                      ); })}
                    </select>
                    </React.Fragment>
                  ) : null}
                  {(v.prv.notEditing) ? (
                    <React.Fragment>
                    <div style={v.prv.tzStyle}>
                      {v.prv.tz}
                    </div>
                    </React.Fragment>
                  ) : null}
                  <div style={css("font-size:11px;color:rgba(231,233,236,.42);margin-top:6px")}>
                    {v.prv.nowLabel}
                  </div>
                </div>
                <div style={css("background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.09);backdrop-filter:blur(20px);border-radius:16px;padding:18px")}>
                  <label style={css("font-size:9.5px;font-weight:700;letter-spacing:.14em;color:rgba(231,233,236,.38);display:block;margin-bottom:10px")}>
                    CLOUD SYNC
                  </label>
                  <div style={css("display:flex;gap:10px")}>
                    <div style={css("width:100%;margin-bottom:10px")}>
                      <div style={css("font-size:11px;font-weight:600;color:{{ prv.fileStatusColor }};margin-bottom:4px")}>
                        {v.prv.fileStatusText}
                      </div>
                      <div style={css("font-size:11px;color:rgba(231,233,236,.5);line-height:1.5;margin-bottom:8px")}>
                        {v.prv.fileHelp}
                      </div>
                      <button onClick={v.prv.onSyncBtn} style={v.primaryBtnStyle}>
                        {v.prv.syncBtnLabel}
                      </button>
                      {(v.prv.authed) ? (
                        <React.Fragment>
                        <button onClick={v.prv.onSignOut} style={css("padding:7px 13px;border-radius:9px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);color:rgba(255,190,190,.9);font-size:12px;cursor:pointer;margin-left:6px")}>
                          Sign out
                        </button>
                        </React.Fragment>
                      ) : null}
                    </div>
                    <button onClick={v.prv.onExport} style={v.primaryBtnStyle}>
                      Export
                    </button>
                    <button onClick={v.prv.onImport} style={css("padding:7px 13px;border-radius:9px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);color:#E7E9EC;font-size:12px;cursor:pointer")}>
                      Import
                    </button>
                  </div>
                </div>
              </div>
              </React.Fragment>
            ) : null}
          </main>
        </div>
        {(v.showFabs) ? (
          <React.Fragment>
          <div style={css("position:fixed;right:14px;bottom:86px;z-index:120;display:flex;flex-direction:column;gap:10px;align-items:flex-end")}>
            <button onClick={v.onToggleDrawer} title="Goals & Parking Lot" style={v.drawerFabStyle}>
              <span style={css("font-size:15px;line-height:1")}>
                ☰
              </span>
              <span style={css("font-size:9px;font-weight:700;letter-spacing:.06em")}>
                PARK
              </span>
            </button>
            <button onClick={v.onNewAppt} title="New appointment" style={css("width:52px;height:52px;border-radius:16px;border:1px solid rgba(220,38,38,.5);background:linear-gradient(180deg,rgba(255,255,255,.28),rgba(255,255,255,.04) 46%,rgba(0,0,0,.16)),#DC2626;color:#fff;font-size:18px;cursor:pointer;box-shadow:inset 0 1px 0 rgba(255,255,255,.45),0 14px 28px -12px rgba(0,0,0,1)")}>
              ☼
            </button>
            <button onClick={v.onNewTask} title="New task" style={v.addFabStyle}>
              +
            </button>
          </div>
          </React.Fragment>
        ) : null}
        {(v.modal) ? (
          <React.Fragment>
          <div onClick={v.onCloseModal} style={css("position:fixed;inset:0;background:rgba(4,6,10,.62);backdrop-filter:blur(6px);z-index:1000;display:flex;align-items:center;justify-content:center;padding:18px")}>
            <div onClick={v.stopProp} style={css("width:100%;max-width:580px;max-height:90vh;overflow-y:auto;border-radius:20px;padding:24px;background:linear-gradient(180deg,rgba(30,34,42,.92),rgba(16,19,25,.94));border:1px solid rgba(255,255,255,.14);box-shadow:inset 0 1px 0 rgba(255,255,255,.12),0 40px 90px -30px rgba(0,0,0,1)")}>
              <div style={css("display:flex;justify-content:space-between;align-items:center;margin-bottom:18px")}>
                <h3 style={css("font-size:17px;font-weight:700;color:#F4F6F8")}>
                  {v.modal.title}
                </h3>
                <button onClick={v.onCloseModal} style={css("width:28px;height:28px;border-radius:8px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);color:#E7E9EC;cursor:pointer;font-size:13px")}>
                  ✕
                </button>
              </div>
              {(v.modal.isTask) ? (
                <React.Fragment>
                <div style={css("display:flex;flex-direction:column;gap:13px")}>
                  <div>
                    <label style={css("font-size:9.5px;font-weight:700;letter-spacing:.14em;color:rgba(231,233,236,.42);display:block;margin-bottom:5px")}>
                      NAME
                    </label>
                    <input value={v.modal.d.name ?? ""} onChange={v.modal.onName} style={css("width:100%;padding:10px 12px;border-radius:10px;border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.06);font-size:14px")} />
                  </div>
                  <div>
                    <label style={css("font-size:9.5px;font-weight:700;letter-spacing:.14em;color:rgba(231,233,236,.42);display:block;margin-bottom:5px")}>
                      DESCRIPTION
                    </label>
                    <textarea rows={2} value={v.modal.d.description ?? ""} onChange={v.modal.onDesc} style={css("width:100%;padding:10px 12px;border-radius:10px;border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.06);font-size:13.5px;resize:vertical")} />
                  </div>
                  <div style={css("display:grid;grid-template-columns:1fr 1fr;gap:11px")}>
                    <div>
                      <label style={css("font-size:9.5px;font-weight:700;letter-spacing:.14em;color:rgba(231,233,236,.42);display:block;margin-bottom:5px")}>
                        GROUP
                      </label>
                      <select value={v.modal.d.groupId ?? ""} onChange={v.modal.onGroup} style={css("width:100%;padding:10px 12px;border-radius:10px;border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.06);font-size:13.5px")}>
                        {(v.modal.groupOpts).map(function(o, i23) { return (
                          <React.Fragment key={i23}>
                          <option value={o.value ?? ""}>
                            {o.label}
                          </option>
                          </React.Fragment>
                        ); })}
                      </select>
                    </div>
                    <div>
                      <label style={css("font-size:9.5px;font-weight:700;letter-spacing:.14em;color:rgba(231,233,236,.42);display:block;margin-bottom:5px")}>
                        PRIORITY
                      </label>
                      <select value={v.modal.d.priority ?? ""} onChange={v.modal.onPriority} style={css("width:100%;padding:10px 12px;border-radius:10px;border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.06);font-size:13.5px")}>
                        {(v.modal.priOpts).map(function(o, i24) { return (
                          <React.Fragment key={i24}>
                          <option value={o.value ?? ""}>
                            {o.label}
                          </option>
                          </React.Fragment>
                        ); })}
                      </select>
                    </div>
                  </div>
                  <div style={css("display:grid;grid-template-columns:1fr 1fr;gap:11px")}>
                    <div>
                      <label style={css("font-size:9.5px;font-weight:700;letter-spacing:.14em;color:rgba(231,233,236,.42);display:block;margin-bottom:5px")}>
                        HOURS
                      </label>
                      <input type="number" min="0.5" step="0.5" value={v.modal.d.estimatedHours ?? ""} onChange={v.modal.onHours} style={css("width:100%;padding:10px 12px;border-radius:10px;border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.06);font-size:13.5px")} />
                    </div>
                    <div>
                      <label style={css("font-size:9.5px;font-weight:700;letter-spacing:.14em;color:rgba(231,233,236,.42);display:block;margin-bottom:5px")}>
                        RECURRING
                      </label>
                      <select value={v.modal.d.recurring ?? ""} onChange={v.modal.onRecurring} style={css("width:100%;padding:10px 12px;border-radius:10px;border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.06);font-size:13.5px")}>
                        {(v.modal.recOpts).map(function(o, i25) { return (
                          <React.Fragment key={i25}>
                          <option value={o.value ?? ""}>
                            {o.label}
                          </option>
                          </React.Fragment>
                        ); })}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label style={css("font-size:9.5px;font-weight:700;letter-spacing:.14em;color:rgba(231,233,236,.42);display:block;margin-bottom:7px")}>
                      STATUS
                    </label>
                    <div style={css("display:flex;gap:7px;flex-wrap:wrap")}>
                      {(v.modal.statusBtns).map(function(s, i26) { return (
                        <React.Fragment key={i26}>
                        <button onClick={s.onClick} style={s.style}>
                          {s.label}
                        </button>
                        </React.Fragment>
                      ); })}
                    </div>
                    {(v.modal.statusNote) ? (
                      <React.Fragment>
                      <div style={v.modal.statusNoteStyle}>
                        {v.modal.statusNote}
                      </div>
                      </React.Fragment>
                    ) : null}
                  </div>
                  {(v.modal.splitWarn) ? (
                    <React.Fragment>
                    <div style={css("border-radius:11px;padding:10px 13px;font-size:12px;background:rgba(109,90,240,.18);border:1px solid rgba(109,90,240,.45);color:#D8D3FF")}>
                      {v.modal.splitWarn}
                    </div>
                    </React.Fragment>
                  ) : null}
                  <div style={css("display:flex;gap:9px;justify-content:flex-end;margin-top:4px")}>
                    {(v.modal.canDelete) ? (
                      <React.Fragment>
                      <button onClick={v.modal.onDelete} style={css("padding:8px 14px;border-radius:9px;border:1px solid rgba(255,120,120,.3);background:rgba(220,38,38,.16);color:#FFB4B4;font-size:12.5px;cursor:pointer")}>
                        Delete
                      </button>
                      </React.Fragment>
                    ) : null}
                    <button onClick={v.onCloseModal} style={css("padding:8px 14px;border-radius:9px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);color:#E7E9EC;font-size:12.5px;cursor:pointer")}>
                      Cancel
                    </button>
                    <button onClick={v.modal.onSave} style={v.primaryBtnStyle}>
                      {v.modal.saveLabel}
                    </button>
                  </div>
                </div>
                </React.Fragment>
              ) : null}
              {(v.modal.isGroup) ? (
                <React.Fragment>
                <div style={css("display:flex;flex-direction:column;gap:14px")}>
                  <div>
                    <label style={css("font-size:9.5px;font-weight:700;letter-spacing:.14em;color:rgba(231,233,236,.42);display:block;margin-bottom:5px")}>
                      NAME
                    </label>
                    <input value={v.modal.d.name ?? ""} onChange={v.modal.onName} style={css("width:100%;padding:10px 12px;border-radius:10px;border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.06);font-size:14px")} />
                  </div>
                  <div>
                    <label style={css("font-size:9.5px;font-weight:700;letter-spacing:.14em;color:rgba(231,233,236,.42);display:block;margin-bottom:7px")}>
                      COLOUR
                    </label>
                    <div style={css("display:flex;gap:9px;flex-wrap:wrap")}>
                      {(v.modal.swatches).map(function(s, i27) { return (
                        <React.Fragment key={i27}>
                        <button onClick={s.onClick} style={s.style} />
                        </React.Fragment>
                      ); })}
                    </div>
                  </div>
                  <div style={css("display:flex;gap:9px;justify-content:flex-end")}>
                    {(v.modal.canDelete) ? (
                      <React.Fragment>
                      <button onClick={v.modal.onDelete} style={css("padding:8px 14px;border-radius:9px;border:1px solid rgba(255,120,120,.3);background:rgba(220,38,38,.16);color:#FFB4B4;font-size:12.5px;cursor:pointer")}>
                        Delete
                      </button>
                      </React.Fragment>
                    ) : null}
                    <button onClick={v.onCloseModal} style={css("padding:8px 14px;border-radius:9px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);color:#E7E9EC;font-size:12.5px;cursor:pointer")}>
                      Cancel
                    </button>
                    <button onClick={v.modal.onSave} style={v.primaryBtnStyle}>
                      {v.modal.saveLabel}
                    </button>
                  </div>
                </div>
                </React.Fragment>
              ) : null}
              {(v.modal.isAppt) ? (
                <React.Fragment>
                <div style={css("display:flex;flex-direction:column;gap:13px")}>
                  <div>
                    <label style={css("font-size:9.5px;font-weight:700;letter-spacing:.14em;color:rgba(231,233,236,.42);display:block;margin-bottom:5px")}>
                      NAME
                    </label>
                    <input value={v.modal.d.name ?? ""} onChange={v.modal.onName} style={css("width:100%;padding:10px 12px;border-radius:10px;border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.06);font-size:14px")} />
                  </div>
                  <div>
                    <label style={css("font-size:9.5px;font-weight:700;letter-spacing:.14em;color:rgba(231,233,236,.42);display:block;margin-bottom:7px")}>
                      DAY(S)
                    </label>
                    <div style={css("display:flex;gap:5px;flex-wrap:wrap")}>
                      {(v.modal.dayBtns).map(function(d, i28) { return (
                        <React.Fragment key={i28}>
                        <button onClick={d.onClick} style={d.style}>
                          {d.label}
                        </button>
                        </React.Fragment>
                      ); })}
                    </div>
                  </div>
                  <div style={css("display:grid;grid-template-columns:1fr 1fr;gap:11px")}>
                    <div>
                      <label style={css("font-size:9.5px;font-weight:700;letter-spacing:.14em;color:rgba(231,233,236,.42);display:block;margin-bottom:5px")}>
                        TIME
                      </label>
                      <select value={v.modal.d.time ?? ""} onChange={v.modal.onTime} style={css("width:100%;padding:10px 12px;border-radius:10px;border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.06);font-size:13.5px")}>
                        {(v.modal.slotOpts).map(function(o, i29) { return (
                          <React.Fragment key={i29}>
                          <option value={o.value ?? ""}>
                            {o.label}
                          </option>
                          </React.Fragment>
                        ); })}
                      </select>
                    </div>
                    <div>
                      <label style={css("font-size:9.5px;font-weight:700;letter-spacing:.14em;color:rgba(231,233,236,.42);display:block;margin-bottom:5px")}>
                        DURATION
                      </label>
                      <input type="number" min="0.5" step="0.5" value={v.modal.d.duration ?? ""} onChange={v.modal.onDuration} style={css("width:100%;padding:10px 12px;border-radius:10px;border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.06);font-size:13.5px")} />
                    </div>
                  </div>
                  <div>
                    <label style={css("font-size:9.5px;font-weight:700;letter-spacing:.14em;color:rgba(231,233,236,.42);display:block;margin-bottom:7px")}>
                      COLOUR
                    </label>
                    <div style={css("display:flex;gap:9px")}>
                      {(v.modal.swatches).map(function(s, i30) { return (
                        <React.Fragment key={i30}>
                        <button onClick={s.onClick} style={s.style} />
                        </React.Fragment>
                      ); })}
                    </div>
                  </div>
                  <div>
                    <label style={css("font-size:9.5px;font-weight:700;letter-spacing:.14em;color:rgba(231,233,236,.42);display:block;margin-bottom:5px")}>
                      NOTES
                    </label>
                    <input value={v.modal.d.notes ?? ""} onChange={v.modal.onNotes} style={css("width:100%;padding:10px 12px;border-radius:10px;border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.06);font-size:13.5px")} />
                  </div>
                  <div style={css("display:flex;gap:9px;justify-content:flex-end")}>
                    {(v.modal.canDelete) ? (
                      <React.Fragment>
                      <button onClick={v.modal.onDelete} style={css("padding:8px 14px;border-radius:9px;border:1px solid rgba(255,120,120,.3);background:rgba(220,38,38,.16);color:#FFB4B4;font-size:12.5px;cursor:pointer")}>
                        Delete
                      </button>
                      </React.Fragment>
                    ) : null}
                    <button onClick={v.onCloseModal} style={css("padding:8px 14px;border-radius:9px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);color:#E7E9EC;font-size:12.5px;cursor:pointer")}>
                      Cancel
                    </button>
                    <button onClick={v.modal.onSave} style={v.primaryBtnStyle}>
                      {v.modal.saveLabel}
                    </button>
                  </div>
                </div>
                </React.Fragment>
              ) : null}
              {(v.modal.isLogin) ? (
                <React.Fragment>
                <div style={css("display:flex;flex-direction:column;gap:13px")}>
                  <p style={css("font-size:12.5px;color:rgba(231,233,236,.55);line-height:1.5")}>
                    {v.modal.help}
                  </p>
                  <div>
                    <label style={css("font-size:9.5px;font-weight:700;letter-spacing:.14em;color:rgba(231,233,236,.42);display:block;margin-bottom:5px")}>
                      SERVER URL
                    </label>
                    <input value={v.modal.d.url ?? ""} onChange={v.modal.onUrl} placeholder="https://your-name.duckdns.org" style={css("width:100%;padding:10px 12px;border-radius:10px;border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.06);font-size:14px")} />
                  </div>
                  <div>
                    <label style={css("font-size:9.5px;font-weight:700;letter-spacing:.14em;color:rgba(231,233,236,.42);display:block;margin-bottom:5px")}>
                      EMAIL
                    </label>
                    <input type="email" value={v.modal.d.email ?? ""} onChange={v.modal.onEmail} style={css("width:100%;padding:10px 12px;border-radius:10px;border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.06);font-size:14px")} />
                  </div>
                  <div>
                    <label style={css("font-size:9.5px;font-weight:700;letter-spacing:.14em;color:rgba(231,233,236,.42);display:block;margin-bottom:5px")}>
                      PASSWORD
                    </label>
                    <input type="password" value={v.modal.d.pass ?? ""} onChange={v.modal.onPass} style={css("width:100%;padding:10px 12px;border-radius:10px;border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.06);font-size:14px")} />
                  </div>
                  {(v.modal.err) ? (
                    <React.Fragment>
                    <div style={v.modal.errStyle}>
                      {v.modal.err}
                    </div>
                    </React.Fragment>
                  ) : null}
                  <div style={css("display:flex;gap:9px;justify-content:flex-end")}>
                    <button onClick={v.onCloseModal} style={css("padding:8px 14px;border-radius:9px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);color:#E7E9EC;font-size:12.5px;cursor:pointer")}>
                      Cancel
                    </button>
                    <button onClick={v.modal.onSave} style={v.primaryBtnStyle}>
                      {v.modal.saveLabel}
                    </button>
                  </div>
                </div>
                </React.Fragment>
              ) : null}
              {(v.modal.isSplit) ? (
                <React.Fragment>
                <div style={css("display:flex;flex-direction:column;gap:13px")}>
                  <p style={css("font-size:13px;color:rgba(231,233,236,.6)")}>
                    {v.modal.intro}
                  </p>
                  <div style={v.modal.previewStyle}>
                    All sub-tasks share this colour
                  </div>
                  {(v.modal.parts).map(function(p, i31) { return (
                    <React.Fragment key={i31}>
                    <div style={css("display:flex;gap:7px;align-items:center")}>
                      <div style={p.chipStyle} />
                      <input value={p.name ?? ""} onChange={p.onName} style={css("flex:1;padding:9px 12px;border-radius:10px;border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.06);font-size:13px")} />
                      <input type="number" min="0.5" step="0.5" value={p.hours ?? ""} onChange={p.onHours} style={css("width:66px;padding:9px;border-radius:10px;border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.06);font-size:13px")} />
                      <span style={css("font-size:11px;color:rgba(231,233,236,.45)")}>
                        h
                      </span>
                      {(p.canRemove) ? (
                        <React.Fragment>
                        <button onClick={p.onRemove} style={css("padding:4px 9px;border-radius:8px;border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.04);color:#FF9B9B;cursor:pointer;font-size:12px")}>
                          ✕
                        </button>
                        </React.Fragment>
                      ) : null}
                    </div>
                    </React.Fragment>
                  ); })}
                  <button onClick={v.modal.onAddPart} style={css("align-self:flex-start;padding:7px 13px;border-radius:9px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);color:#E7E9EC;font-size:12px;cursor:pointer")}>
                    + Add Sub-Task
                  </button>
                  <div style={v.modal.totalStyle}>
                    <span style={css("font-size:12px")}>
                      {v.modal.totalLabel}
                    </span>
                    <span style={css("font-size:11px;opacity:.7")}>
                      {v.modal.partCount}
                    </span>
                  </div>
                  <div style={css("display:flex;gap:9px;justify-content:flex-end")}>
                    <button onClick={v.onCloseModal} style={css("padding:8px 14px;border-radius:9px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);color:#E7E9EC;font-size:12.5px;cursor:pointer")}>
                      Cancel
                    </button>
                    <button onClick={v.modal.onSave} style={v.primaryBtnStyle}>
                      {v.modal.saveLabel}
                    </button>
                  </div>
                </div>
                </React.Fragment>
              ) : null}
            </div>
          </div>
          </React.Fragment>
        ) : null}
      </div>
      </React.Fragment>
    );
  }
}
