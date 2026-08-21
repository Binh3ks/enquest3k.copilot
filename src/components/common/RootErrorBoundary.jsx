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
      return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center space-y-5">
          <div className="text-6xl animate-bounce">🦊</div>
          <div className="space-y-2 max-w-md">
            <h1 className="text-xl font-black text-amber-400">Lexio Adventure Needs a Refresh</h1>
            <p className="text-xs text-slate-300 leading-relaxed font-bold">
              {this.state.error?.message || 'A temporary screen transition error occurred.'}
            </p>
          </div>
          <div className="flex gap-3">
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
