import { Controller } from "react-hook-form"
import Autocomplete from "@mui/material/Autocomplete"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import { FieldError } from "./FieldError"
import { FieldLabel } from "./FieldLabel"
import { autocompletePaperSx, underlineFieldSx } from "./fieldStyles"

export function UnderlineAutocomplete({
  name,
  control,
  errors,
  label,
  htmlFor,
  required = false,
  options,
  placeholder,
  rules,
  getOptionLabel = (option) => option,
  isOptionEqualToValue = (option, value) => option === value,
  onChangeExtra,
}) {
  return (
    <Box>
      <FieldLabel htmlFor={htmlFor} required={required}>
        {label}
      </FieldLabel>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value, ref } }) => (
          <Autocomplete
            id={htmlFor}
            options={options}
            value={value || null}
            onChange={(_, newValue) => {
              const next = newValue ?? ""
              onChange(next)
              onChangeExtra?.(next)
            }}
            getOptionLabel={getOptionLabel}
            isOptionEqualToValue={isOptionEqualToValue}
            autoHighlight
            openOnFocus
            slotProps={{
              paper: {
                sx: autocompletePaperSx,
              },
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                inputRef={ref}
                variant="standard"
                placeholder={placeholder}
                error={Boolean(errors?.[name])}
                sx={underlineFieldSx}
              />
            )}
          />
        )}
      />
      <FieldError message={errors?.[name]?.message} />
    </Box>
  )
}
