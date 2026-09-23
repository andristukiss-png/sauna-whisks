export default function Loading() {
  return (
    <div className="loading-screen" role="status" aria-live="polite" aria-atomic="true" aria-busy="true">
      <p>SAUNA WHISKS</p>
      <div className="loading-line" aria-hidden="true" />
      <span>Loading…</span>
    </div>
  );
}
