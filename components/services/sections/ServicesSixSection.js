export default function ServicesSixSection({ section }) {
  if (!section) return null;
  const stats = [
    { label: 'Quality of Service', value: section.quality_of_service },
    { label: 'Time to Market', value: section.time_to_market },
    { label: 'Overall Costs', value: section.overall_costs },
  ];
  return (
    <div style={{
      marginTop: 10,
     
      padding: 24,
      borderRadius: 8,
      textAlign: 'center',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 32,
        justifyItems: 'center',
        alignItems: 'center',
      }}>
        {stats.map((stat, idx) => stat.value && (
          <div key={idx} style={{
            background: '#fff',
            borderRadius: 8,
            boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
            padding: 24,
            minWidth: 160,
            minHeight: 120,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{ fontSize: 32, fontWeight: 700, color: '#1a73e8', marginBottom: 8 }}>{stat.value}</div>
            <div style={{ fontSize: 15, color: '#444' }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
