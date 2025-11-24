export default function ServicesStatsSection({ section }) {
  if (!section) return null;
  const stats = [
    {
      label: 'Years in Software Development ',
      value: section.years_software_development,
    },
    {
      label: 'Software Projects Delivered',
      value: section.software_projects_delivered,
    },
    {
      label: 'Certified Technology Professionals',
      value: section.certified_technology_professionals,
    },
    {
      label: 'Client Retention Rate',
      value: section.client_retention_rate,
    },
  ];
  return (
    <div >
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 10,
        justifyItems: 'center',
        alignItems: 'center',
        margin: '40px 0',
      }}>
        {stats.map((stat, idx) => stat.value && (
          <div key={idx} style={{
            background: '#fff',
            borderRadius: 8,
            boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
            padding: 10,
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
