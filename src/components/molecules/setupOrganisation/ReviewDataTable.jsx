import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"

const headCellSx = {
  fontSize: "0.75rem",
  fontWeight: 500,
  color: "text.secondary",
  borderColor: "border.main",
  whiteSpace: "nowrap",
}

const bodyCellSx = {
  fontSize: "0.875rem",
  color: "text.primary",
  borderColor: "border.main",
  verticalAlign: "top",
}

function CellValue({ value }) {
  if (Array.isArray(value)) {
    if (value.length === 0) return "—"

    return (
      <Stack spacing={0.5}>
        {value.map((item, index) => (
          <Box key={index}>{item}</Box>
        ))}
      </Stack>
    )
  }

  return value || "—"
}

export default function ReviewDataTable({ columns, rows }) {
  return (
    <TableContainer
      sx={{
        border: "1px solid",
        borderColor: "border.main",
        borderRadius: 1,
      }}
    >
      <Table size="small">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.key} sx={headCellSx}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-of-type td": { borderBottom: 0 } }}
            >
              {columns.map((column) => (
                <TableCell key={column.key} sx={bodyCellSx}>
                  {column.render ? (
                    column.render(row[column.key], row)
                  ) : (
                    <CellValue value={row[column.key]} />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
