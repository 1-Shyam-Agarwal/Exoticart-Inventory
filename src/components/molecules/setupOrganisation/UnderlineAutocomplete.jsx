import { Controller } from "react-hook-form"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import FormField from "./FormField"
import { autocompletePaperSx, underlineFieldSx } from "./styles"

export default function UnderlineAutocomplete({
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
    <FormField
      htmlFor={htmlFor}
      label={label}
      required={required}
      error={errors?.[name]?.message}
    >
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
    </FormField>
  )
}
