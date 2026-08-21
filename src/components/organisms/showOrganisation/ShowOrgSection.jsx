import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import { OrganizationsSearchBar } from '../../molecules/showOrganisation/OrganizationsSearchBar';
import { OrganizationsTabs } from '../../molecules/showOrganisation/OrganizationsTabs';
import { OrganizationsEmptyState } from '../../molecules/showOrganisation/OrganizationsEmptyState';
import { OrganizationListItem } from '../../molecules/showOrganisation/OrganizationListItem';
import { listOrganizationDrafts } from '../../../services/organizationDraft';

const EMPTY_STATE_COPY = {
  all: {
    title: 'No organizations yet',
    description: 'Manage inventory without hassle. Create your first organization to get started.',
  },
  draft: {
    title: 'No draft organizations',
    description: "Organizations you've started setting up but haven't finished will show up here.",
  },
  ready: {
    title: 'No ready organizations',
    description: 'Once a draft is fully configured, mark it ready to start managing inventory.',
  },
};

const PAGE_SIZE = 5;
const ROW_HEIGHT = 60;
const PAGINATION_AREA_HEIGHT = 48;

export function ShowOrgSection() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [drafts, setDrafts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let isMounted = true;

    listOrganizationDrafts()
      .then((response) => {
        if (isMounted && response?.success !== false) {
          setDrafts(response?.drafts ?? []);
        }
      })
      .catch((error) => {
        console.error('Failed to load organization drafts:', error);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Ready organizations aren't wired up yet: creating an organization from a
  // draft isn't persisted end-to-end, so this list stays empty for now.
  const organizations = useMemo(() => {
    return drafts.map((draft) => ({
      id: `draft-${draft.id}`,
      name: draft.data?.name?.trim() || 'Untitled organization',
      industry: draft.data?.industry ?? '',
      status: 'draft',
      draft,
    }));
  }, [drafts]);

  const counts = useMemo(
    () => ({
      all: organizations.length,
      draft: organizations.filter((org) => org.status === 'draft').length,
      ready: organizations.filter((org) => org.status === 'ready').length,
    }),
    [organizations],
  );

  const filteredOrganizations = useMemo(() => {
    const query = search.trim().toLowerCase();

    return organizations
      .filter((org) => activeTab === 'all' || org.status === activeTab)
      .filter((org) => !query || org.name.toLowerCase().includes(query));
  }, [organizations, activeTab, search]);

  const [prevFilterKey, setPrevFilterKey] = useState(`${activeTab}|${search}`);
  const filterKey = `${activeTab}|${search}`;
  if (filterKey !== prevFilterKey) {
    setPrevFilterKey(filterKey);
    setPage(1);
  }

  const pageCount = Math.max(1, Math.ceil(filteredOrganizations.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);

  const paginatedOrganizations = useMemo(
    () => filteredOrganizations.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [filteredOrganizations, currentPage],
  );

  const emptyCopy = EMPTY_STATE_COPY[activeTab];
  const showEmptyState = !isLoading && filteredOrganizations.length === 0;

  return (
    <Box component="section">
      <OrganizationsSearchBar value={search} onChange={setSearch} />

      <Stack
        direction="row"
        spacing={1.5}
        sx={{
          mt: 1,
          mb: 1,
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          rowGap: 1,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
          Organizations ({counts.all})
        </Typography>

        <OrganizationsTabs value={activeTab} onChange={setActiveTab} counts={counts} />
      </Stack>

      <Box
        sx={{
          border: '1px solid',
          borderColor: 'border.soft',
          borderRadius: 2,
          bgcolor: 'background.paper',
          overflow: 'hidden',
          minHeight: PAGE_SIZE * ROW_HEIGHT,
        }}
      >
        {showEmptyState ? (
          <OrganizationsEmptyState
            icon={ApartmentOutlinedIcon}
            title={emptyCopy.title}
            description={emptyCopy.description}
            onCreate={() => navigate('/setup-org')}
          />
        ) : null}

        {paginatedOrganizations.length > 0 ? (
          <Stack spacing={0}>
            {paginatedOrganizations.map((org) => (
              <OrganizationListItem
                key={org.id}
                name={org.name}
                industry={org.industry}
                status={org.status}
                logoSrc={
                  org.draft.logoPath ? `local-resource:${encodeURIComponent(org.draft.logoPath)}` : undefined
                }
                updatedAt={org.draft.updatedAt}
                onClick={() => navigate('/setup-org', { state: { draft: org.draft } })}
              />
            ))}
          </Stack>
        ) : null}
      </Box>

      <Stack
        direction="row"
        justifyContent="center"
        sx={{ mt: 1, height: PAGINATION_AREA_HEIGHT, alignItems: 'center' }}
      >
        {pageCount > 1 ? (
          <Pagination
            count={pageCount}
            page={currentPage}
            onChange={(_event, value) => setPage(value)}
            size="small"
            shape="rounded"
          />
        ) : null}
      </Stack>
    </Box>
  );
}
