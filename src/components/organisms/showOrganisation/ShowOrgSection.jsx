import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Error from '../../molecules/showOrganisation/Error';
import Loader from '../../molecules/showOrganisation/Loader';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';

import { OrganizationsSearchBar } from '../../molecules/showOrganisation/OrganizationsSearchBar';
import { OrganizationsTabs } from '../../molecules/showOrganisation/OrganizationsTabs';
import { OrganizationsEmptyState } from '../../molecules/showOrganisation/OrganizationsEmptyState';
import { DeleteOrganizationDialog } from '../../molecules/showOrganisation/DeleteOrganizationDialog';
import {
  OrganizationListItem,
  ORGANIZATION_ROW_HEIGHT,
} from '../../molecules/showOrganisation/OrganizationListItem';

import {
  deleteOrganizationDraft,
} from '../../../services/organizationDraft';
import { deleteOrganization, listOrganizations } from '../../../services/organization';

import { toast } from 'sonner';

const EMPTY_STATES = {
  all: {
    title: 'No organizations Found',
    description: 'Create Organisation & manage inventory without hassle',
  },
  draft: {
    title: 'No draft organizations',
    description:
      "Organizations you've started setting up but haven't finished will show up here.",
  },
  active: {
    title: 'No Active organizations',
    description:
      'Complete an organization’s setup to start managing its inventory.',
  },
};

const PAGE_SIZE = 4;
const ROW_HEIGHT = ORGANIZATION_ROW_HEIGHT;
const PAGINATION_AREA_HEIGHT = 48;

export function ShowOrgSection() {
  
  const queryClient = useQueryClient()
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);

  function navigateToSetupOrg(org){ navigate('/org/setup', { state: { draft: org.draft } }) }
  function navigateToActiveOrg(org){ navigate(`/org/active/${org.id}`) }

  const {
    data: organizations,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['organizations'],
    queryFn: listOrganizations,
  });

  const deleteMutation = useMutation({
    mutationFn: (target) =>
      target.status === 'draft' ? deleteOrganizationDraft(target.id) : deleteOrganization(target.id),
    onSuccess: (result, target) => {
      if (!result.success) {
        return;
      }
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
      setDeleteTarget(null);
      toast.success(`${target.name} deleted successfully`);
    },
  });

  function onDeleteHandler(org)
  {
      deleteMutation.reset();
      setDeleteTarget(org);
  }

  function onCancelHandler()
  {
      deleteMutation.reset();
      setDeleteTarget(null);
  }

  function onConfirmHandler()
  {
      if (deleteTarget) {
        deleteMutation.mutate(deleteTarget);
      }
  }

  // Findind count for all types of orgs
  const counts = {
      all: organizations?.all.length || 0,
      draft: organizations?.drafts.length || 0,
      active: organizations?.activeOrgs.length || 0
  }

  // Filter functionality
  const filteredOrganizations = useMemo(() => {
    const query = search.trim().toLowerCase();

    const orgs = organizations?.all ?? [];
    const orgsByTabStatus = orgs.filter( (org) => activeTab === 'all' || org.status === activeTab )
    const orgsByQuery = orgsByTabStatus.filter( (org) => org.name.toLowerCase().includes(query) );
    return orgsByQuery
  }, [organizations, activeTab, search]);

  // Pagination
  const pageCount = Math.ceil( filteredOrganizations.length / PAGE_SIZE )
  const currentPage = Math.min(page, pageCount);


  const paginatedOrganizations = useMemo(
    () =>
      filteredOrganizations.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
      ),
    [filteredOrganizations, currentPage]
  );

  // Empty State
  const emptyState = EMPTY_STATES[activeTab];
  const showEmptyState = isLoading === false && filteredOrganizations.length === 0;

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
          my: 1,
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

      <Card
        variant="outlined"
        sx={{
          borderColor: 'border.soft',
          overflow: 'hidden',
          height: PAGE_SIZE * ROW_HEIGHT,
          display: 'flex',
          flexDirection: 'column',
        }}
      >

        {/* Loading state */}
        {isLoading && <Loader/>}

        {/* Empty state */}
        {showEmptyState && (
            <OrganizationsEmptyState
              icon={ApartmentOutlinedIcon}
              title={emptyState.title}
              description={emptyState.description}
            />
        )}

        {/* Error state */}
        {isError && <Error error={error} resetHandler={refetch}/>}

        {/* Organization list */}
        {paginatedOrganizations.length > 0 && (
          <Stack spacing={0}>

            {paginatedOrganizations.map((org) => (
              <OrganizationListItem
                key={org.id}
                name={org.name}
                industry={org.industry}
                status={org.status}
                logoPath={encodeURIComponent(org.logoPath)}
                updatedAt={org.updatedAt}
                onClick={() => {org.status === 'active' ? navigateToActiveOrg(org) : navigateToSetupOrg(org)}}
                onDelete={()=>onDeleteHandler(org)}
              />
            ))}

          </Stack>
        )}

      </Card>

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

      <DeleteOrganizationDialog
        open={Boolean(deleteTarget)}
        organizationName={deleteTarget?.name}
        isDeleting={deleteMutation.isPending}
        errorMessage={deleteMutation.error}
        onCancel={onCancelHandler}
        onConfirm={onConfirmHandler}
      />

    </Box>
  );
}