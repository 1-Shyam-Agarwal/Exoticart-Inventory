import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

export default function ReviewSection({ title, rows, table, onEdit, extra }) {
  return (
    <Box
      component="section"
      sx={{
        pb: 4,
        borderBottom: "1px solid",
        borderColor: "border.main",
        "&:last-of-type": {
          pb: 0,
          borderBottom: 0,
        },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: 2 }}
      >
        <Typography
          component="h3"
          sx={{
            fontFamily: (theme) => theme.typography.main,
            fontSize: "1.25rem",
            fontWeight: 400,
            color: "text.primary",
          }}
        >
          {title}
        </Typography>
        <IconButton
          type="button"
          size="small"
          onClick={onEdit}
          aria-label={`Edit ${title}`}
          sx={{ color: "primary.main" }}
        >
          <EditOutlinedIcon fontSize="small" />
        </IconButton>
      </Stack>

      {table ?? (
        <Stack component="dl" spacing={1.5} sx={{ m: 0 }}>
          {rows.map((row) => (
            <Box
              key={row.label}
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "8rem 1fr",
                  sm: "10rem 1fr",
                },
                gap: 1.5,
                fontSize: "0.875rem",
              }}
            >
              <Typography
                component="dt"
                sx={{ m: 0, color: "text.secondary", fontSize: "inherit" }}
              >
                {row.label}
              </Typography>
              <Typography
                component="dd"
                sx={{
                  m: 0,
                  color: "text.primary",
                  fontSize: "inherit",
                  wordBreak: "break-word",
                }}
              >
                {row.value}
              </Typography>
            </Box>
          ))}
        </Stack>
      )}

      {extra}
    </Box>
  )
}
