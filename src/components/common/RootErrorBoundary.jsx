import React from 'react';

export class RootErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[RootErrorBoundary] Caught unhandled rendering error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/week/33/hub/1';
  };

  render() {
    if (this.state.hasError) {
      const errorMsg = this.state.error?.message || String(this.state.error || 'Unknown rendering error');
      const errorStack = this.state.error?.stack || '';
      return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center space-y-4">
          <div className="text-5xl animate-bounce">🦊</div>
          <div className="space-y-1 max-w-md">
            <h1 className="text-lg font-black text-amber-400">Lexio Screen Recovery</h1>
            <p className="text-xs text-rose-300 font-mono bg-slate-950 p-2 rounded-lg border border-rose-900/50 break-all text-left">
              {errorMsg}
            </p>
            {errorStack && (
              <details className="text-left text-[10px] text-slate-400 font-mono bg-slate-950/80 p-2 rounded-lg max-h-36 overflow-y-auto">
                <summary className="cursor-pointer text-slate-300 font-bold mb-1">Stack Trace</summary>
                <pre className="whitespace-pre-wrap">{errorStack}</pre>
              </details>
            )}
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={this.handleReload}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition"
            >
              🔄 Reload Page
            </button>
            <button
              onClick={this.handleGoHome}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs rounded-xl shadow-lg transition"
            >
              🗺️ Back to Map
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default RootErrorBoundary;
