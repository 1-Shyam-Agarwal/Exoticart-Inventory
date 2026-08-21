import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

const TABS = [
  { value: 'all', label: 'All' },
  { value: 'draft', label: 'Draft' },
  { value: 'ready', label: 'Ready' },
];

export function OrganizationsTabs({ value, onChange, counts }) {
  return (
    <Tabs
      value={value}
      onChange={(_event, newValue) => onChange(newValue)}
      aria-label="organizations tabs"
      TabIndicatorProps={{ sx: { display: 'none' } }}
      sx={{
        minHeight: 'auto',
        p: 0.5,
        '& .MuiTabs-indicator': { display: 'none' },
        '& .MuiTabs-flexContainer': { gap: 0.5 },
      }}
    >
      {TABS.map((tab) => {
        const isActive = value === tab.value;
        const count = counts?.[tab.value] ?? 0;
        const label = tab.value === 'all' ? tab.label : `${tab.label} (${count})`;

        return (
          <Tab
            key={tab.value}
            value={tab.value}
            label={label}
            sx={{
              px: 1.25,
              py: 0.25,
              mx: 0.5,
              minWidth: 'auto',
              minHeight: 'auto',
              fontSize: '0.8125rem',
              borderRadius: 999,
              textTransform: 'none',
              fontWeight: isActive ? 600 : 400,
              color: isActive ? 'text.primary' : 'text.secondary',
              border: '1px solid',
              borderColor: isActive ? 'primary.main' : 'transparent',
              bgcolor: 'transparent',
              '&:hover': {
                bgcolor: 'background.muted',
              },
              '&.Mui-selected': {
                color: 'text.primary',
              },
            }}
          />
        );
      })}
    </Tabs>
  );
}
