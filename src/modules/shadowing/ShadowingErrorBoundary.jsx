import React from 'react';

/**
 * ShadowingErrorBoundary — Catches runtime errors in the Shadowing station
 * and displays a fallback UI instead of crashing the entire app.
 */
export default class ShadowingErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('[Shadowing] Caught error:', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) this.props.onReset();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-center">
          <div className="text-rose-500 text-5xl mb-3">!</div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">
            {this.props.isVi ? 'Da xay ra loi' : 'Something went wrong'}
          </h3>
          <p className="text-sm text-slate-500 mb-4">
            {this.props.isVi
              ? 'Trang shadowing gap loi. Bam nut ben duoi de thu lai.'
              : 'The shadowing page encountered an error. Click below to retry.'}
          </p>
          <button
            onClick={this.handleReset}
            className="px-4 py-2 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-colors"
          >
            {this.props.isVi ? 'Thu lai' : 'Retry'}
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
