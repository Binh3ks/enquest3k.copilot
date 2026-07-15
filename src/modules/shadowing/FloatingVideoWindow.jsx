import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, GripVertical, Minus, Maximize2, ArrowDownToLine } from 'lucide-react';
import YouTubeEmbed from './YouTubeEmbed';

/**
 * FloatingVideoWindow — Draggable, resizable video popup.
 * Default position: top-left of viewport, 576×324 (16:9 ratio).
 * Draggable by header, resizable from corner.
 * Minimize/restore + pop-back (to inline) + close buttons.
 */
const DEFAULT_W = 576;
const DEFAULT_H = 324;
const MIN_W = 320;
const MIN_H = 240;

export default function FloatingVideoWindow({ videoId, onClose, onPopBack, title, onPlayerReady, onPlayerUnloaded }) {
  const [pos, setPos] = useState({ x: 24, y: 24 });
  const [size, setSize] = useState({ w: DEFAULT_W, h: DEFAULT_H });
  const [minimized, setMinimized] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [preMaxSize, setPreMaxSize] = useState(null);

  const dragRef = useRef(null);
  const resizeRef = useRef(null);
  const headerRef = useRef(null);

  // Drag handlers — use document-level mousemove (more reliable than window)
  useEffect(() => {
    const handle = dragRef.current;
    if (!handle) return;

    let startX = 0, startY = 0, originX = 0, originY = 0, dragging = false;

    const onDown = (e) => {
      // Only respond to left mouse button
      if (e.button !== 0) return;
      dragging = true;
      startX = e.clientX;
      startY = e.clientY;
      originX = pos.x;
      originY = pos.y;
      e.preventDefault();
      e.stopPropagation();
    };
    const onMove = (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      const maxX = window.innerWidth - 100;
      const maxY = window.innerHeight - 60;
      setPos({
        x: Math.max(0, Math.min(maxX, originX + dx)),
        y: Math.max(0, Math.min(maxY, originY + dy)),
      });
    };
    const onUp = () => { dragging = false; };

    handle.addEventListener('mousedown', onDown);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    return () => {
      handle.removeEventListener('mousedown', onDown);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
  }, [pos]);

  // Resize handlers
  useEffect(() => {
    if (!resizeRef.current) return;
    const handle = resizeRef.current;
    let startX = 0, startY = 0, originW = 0, originH = 0, resizing = false;

    const onDown = (e) => {
      resizing = true;
      startX = e.clientX;
      startY = e.clientY;
      originW = size.w;
      originH = size.h;
      e.preventDefault();
      e.stopPropagation();
    };
    const onMove = (e) => {
      if (!resizing) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      setSize({
        w: Math.max(MIN_W, originW + dx),
        h: Math.max(MIN_H, originH + dy),
      });
    };
    const onUp = () => { resizing = false; };

    handle.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      handle.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [size]);

  if (!videoId) return null;

  // Maximize
  const handleMaximize = () => {
    if (maximized) {
      if (preMaxSize) setSize(preMaxSize.size);
      if (preMaxSize) setPos(preMaxSize.pos);
      setMaximized(false);
    } else {
      setPreMaxSize({ size: { ...size }, pos: { ...pos } });
      setSize({ w: window.innerWidth - 40, h: window.innerHeight - 80 });
      setPos({ x: 20, y: 20 });
      setMaximized(true);
    }
  };

  return (
    <div
      className="fixed z-[10000] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
      style={{
        left: pos.x,
        top: pos.y,
        width: size.w,
        height: minimized ? 48 : size.h,
        transition: minimized ? 'height 0.2s' : 'none',
      }}
    >
      {/* Header — drag handle (uses mousedown to start drag) */}
      <div
        ref={(el) => {
          headerRef.current = el;
          dragRef.current = el;  // Header is the drag target
        }}
        className="flex items-center justify-between px-3 py-2 bg-slate-100 border-b border-slate-200 cursor-move select-none"
        style={{ touchAction: 'none' }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <GripVertical className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="text-xs font-bold text-slate-600 truncate">
            {title || 'YouTube Video'}
          </span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {onPopBack && (
            <button
              onClick={onPopBack}
              className="p-1 rounded hover:bg-blue-100 text-blue-500"
              title="Pop back to inline"
            >
              <ArrowDownToLine className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={() => setMinimized(!minimized)}
            className="p-1 rounded hover:bg-slate-200 text-slate-500"
            title={minimized ? 'Restore' : 'Minimize'}
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleMaximize}
            className="p-1 rounded hover:bg-slate-200 text-slate-500"
            title={maximized ? 'Restore' : 'Maximize'}
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-rose-100 hover:text-rose-600 text-slate-500"
            title="Close"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Video */}
      {!minimized && (
        <div className="flex-1 relative bg-black">
          <YouTubeEmbed videoId={videoId} onPlayerReady={onPlayerReady} onPlayerUnloaded={onPlayerUnloaded} />
        </div>
      )}

      {/* Resize handle (bottom-right) */}
      {!minimized && (
        <div
          ref={resizeRef}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize"
          style={{ background: 'linear-gradient(135deg, transparent 50%, #94a3b8 50%)' }}
          title="Drag to resize"
        />
      )}
    </div>
  );
}
