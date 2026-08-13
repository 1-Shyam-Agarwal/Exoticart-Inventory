import { STEP_FIELDS, stepSchemas } from "./constants"

function pickStepValues(stepIndex, values) {
  return Object.fromEntries(
    STEP_FIELDS[stepIndex].map((field) => [field, values[field]]),
  )
}

function applyStepErrors(setError, clearErrors, stepIndex, result) {
  clearErrors(STEP_FIELDS[stepIndex])

  if (result.success) return

  for (const issue of result.error.issues) {
    const field = issue.path[0]
    if (field == null) continue
    setError(String(field), {
      type: "validation",
      message: issue.message,
    })
  }
}

export function validateStep(stepIndex, values, setError, clearErrors) {
  const result = stepSchemas[stepIndex].safeParse(
    pickStepValues(stepIndex, values),
  )

  applyStepErrors(setError, clearErrors, stepIndex, result)

  return result
}
