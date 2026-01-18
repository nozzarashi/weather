import './skeleton-overlay.css';

export function SkeletonOverlay({ isLoading }: { isLoading: boolean }) {
  if (!isLoading) return null;
  return <div className="skeleton-overlay"></div>;
}
