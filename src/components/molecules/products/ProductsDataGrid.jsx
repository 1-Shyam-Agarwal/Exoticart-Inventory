import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { columns as baseColumns } from '../../../data/productsTableData';

export function ProductsDataGrid({ rows, onEdit, onDelete }) {
  const columns = [
    ...baseColumns,
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 96,
      getActions: (params) => [
        <GridActionsCellItem
          key="edit"
          icon={<EditRoundedIcon fontSize="small" />}
          label="Edit"
          onClick={() => onEdit(params.row)}
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteOutlineRoundedIcon fontSize="small" />}
          label="Delete"
          onClick={() => onDelete(params.row)}
        />,
      ],
    },
  ];

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      getRowClassName={(params) => {
        const zebra = params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd';
        const isLowStock = params.row.availableStock < params.row.reorderStock;
        return isLowStock ? `${zebra} low-stock` : zebra;
      }}
      initialState={{
        pagination: { paginationModel: { pageSize: 20 } },
      }}
      pageSizeOptions={[20, 25, 50, 75, 100]}
      autoHeight
      disableColumnResize
      disableRowSelectionOnClick
      density="compact"
      rowHeight={32}
      showColumnVerticalBorder
      showCellVerticalBorder
      sx={{
        fontSize: '0.8rem',
        '& .MuiDataGrid-columnHeader': {
          borderRight: '1px solid',
          borderColor: 'border.soft',
        },
        '& .MuiDataGrid-columnHeaderTitle': {
          fontSize: '0.78rem',
        },
        '& .MuiDataGrid-cell': {
          borderRight: '1px solid',
          borderColor: 'border.soft',
          py: 0,
        },
        '& .low-stock': {
          bgcolor: 'rgba(255, 138, 101, 0.16)',
        },
        '& .low-stock:hover': {
          bgcolor: 'rgba(255, 138, 101, 0.26)',
        },
        '& .MuiDataGrid-columnHeader[data-field="actions"]': {
          position: 'sticky',
          right: 0,
          zIndex: 3,
        },
        '& .MuiDataGrid-cell[data-field="actions"]': {
          position: 'sticky',
          right: 0,
          zIndex: 2,
          bgcolor: '#17181A',
        },
        '& .low-stock .MuiDataGrid-cell[data-field="actions"]': {
          bgcolor: '#3a231d',
        },
        '& .low-stock:hover .MuiDataGrid-cell[data-field="actions"]': {
          bgcolor: '#472a22',
        },
      }}
    />
  );
}
