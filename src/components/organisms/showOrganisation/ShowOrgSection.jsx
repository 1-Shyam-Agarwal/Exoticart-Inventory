import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
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

const EMPTY_STATES = {
  all: {
    title: 'No organizations Found',
    description: 'Create Organisation & manage inventory without hassle',
  },
  draft: {
    title: 'No draft organizations Found',
    description:
      "Organizations you've started setting up but haven't finished will show up here.",
  },
  ready: {
    title: 'No Active organizations',
    description:
      'Complete an organization’s setup to start managing its inventory.',
  },
};

const PAGE_SIZE = 5;
const ROW_HEIGHT = 60;
const PAGINATION_AREA_HEIGHT = 48;

export function ShowOrgSection() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  // --------------------------------
  // TanStack Query
  // --------------------------------

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['organisation-drafts'],
    queryFn: listOrganizationDrafts,
  });

  // Your API returns:
  //
  // {
  //   drafts: [...]
  // }
  //
  // So get the array here.

  const drafts = data?.drafts ?? [];

  // --------------------------------
  // Convert drafts into organizations
  // --------------------------------

  const organizations = useMemo(() => {
    return drafts.map((draft) => ({
      id: draft.data.id,
      name: draft.data.name,
      industry: draft.data.industry,
      status: 'draft',
      draft,
    }));
  }, [drafts]);

  // --------------------------------
  // Counts
  // --------------------------------

  const counts = useMemo(
    () => ({
      all: organizations.length,

      draft: organizations.filter(
        (org) => org.status === 'draft'
      ).length,

      ready: organizations.filter(
        (org) => org.status === 'ready'
      ).length,
    }),
    [organizations]
  );

  // --------------------------------
  // Search + tab filtering
  // --------------------------------

  const filteredOrganizations = useMemo(() => {
    const query = search.trim().toLowerCase();

    return organizations
      .filter(
        (org) =>
          activeTab === 'all' ||
          org.status === activeTab
      )
      .filter(
        (org) =>
          !query ||
          org.name.toLowerCase().includes(query)
      );
  }, [organizations, activeTab, search]);

  // --------------------------------
  // Pagination
  // --------------------------------

  const pageCount = Math.max(
    1,
    Math.ceil(
      filteredOrganizations.length / PAGE_SIZE
    )
  );

  const currentPage = Math.min(page, pageCount);

  const paginatedOrganizations = useMemo(
    () =>
      filteredOrganizations.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
      ),
    [filteredOrganizations, currentPage]
  );

  // --------------------------------
  // Empty state
  // --------------------------------

  const emptyCopy = EMPTY_STATES[activeTab];

  const showEmptyState =
    !isLoading &&
    filteredOrganizations.length === 0;

  // --------------------------------
  // Loading
  // --------------------------------

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // --------------------------------
  // Error
  // --------------------------------

  if (isError) {
    return (
      <div>
        Error: {error?.message || 'Something went wrong'}
      </div>
    );
  }

  // --------------------------------
  // UI
  // --------------------------------

  return (
    <Box component="section">

      <OrganizationsSearchBar
        value={search}
        onChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
      />

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
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 500 }}
        >
          Organizations ({counts.all})
        </Typography>

        <OrganizationsTabs
          value={activeTab}
          onChange={(value) => {
            setActiveTab(value);
            setPage(1);
          }}
          counts={counts}
        />
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

        {/* Empty state */}

        {showEmptyState && (
          <OrganizationsEmptyState
            icon={ApartmentOutlinedIcon}
            title={emptyCopy.title}
            description={emptyCopy.description}
          />
        )}

        {/* Organization list */}

        {paginatedOrganizations.length > 0 && (
          <Stack spacing={0}>

            {paginatedOrganizations.map((org) => (
              <OrganizationListItem
                key={org.id}
                name={org.name}
                industry={org.industry}
                status={org.status}

                logoSrc={
                  org.draft.logoPath
                    ? `local-resource:${encodeURIComponent(
                        org.draft.logoPath
                      )}`
                    : undefined
                }

                updatedAt={org.draft.updatedAt}

                onClick={() =>
                  navigate('/setup-org', {
                    state: {
                      draft: org.draft,
                    },
                  })
                }
              />
            ))}

          </Stack>
        )}

      </Box>

      {/* Pagination */}

      <Stack
        direction="row"
        justifyContent="center"
        sx={{
          mt: 1,
          height: PAGINATION_AREA_HEIGHT,
          alignItems: 'center',
        }}
      >
        {pageCount > 1 && (
          <Pagination
            count={pageCount}
            page={currentPage}
            onChange={(_event, value) => {
              setPage(value);
            }}
            size="small"
            shape="rounded"
          />
        )}
      </Stack>

    </Box>
  );
}