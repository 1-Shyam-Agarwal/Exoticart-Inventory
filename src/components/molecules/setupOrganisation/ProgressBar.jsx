import Timeline from "@mui/lab/Timeline"
import TimelineItem from "@mui/lab/TimelineItem"
import TimelineSeparator from "@mui/lab/TimelineSeparator"
import TimelineConnector from "@mui/lab/TimelineConnector"
import TimelineDot from "@mui/lab/TimelineDot"

export default function ProgressBar({ currentStep, steps }) {
  return (
    <Timeline
      sx={{
        p: 0,
        m: 0,
        width: "auto",
        minWidth: 0,
        [`& .MuiTimelineItem-root`]: {
          minHeight: 64,
          "&:before": {
            display: "none",
          },
        },
        [`& .MuiTimelineContent-root`]: {
          display: "none",
        },
      }}
    >
      {steps.map((step, index) => {
        const isActive = index === currentStep
        const isCompleted = index < currentStep
        const isLast = index === steps.length - 1

        return (
          <TimelineItem key={step.id}>
            <TimelineSeparator>
              {index > 0 && (
                <TimelineConnector
                  sx={{
                    bgcolor: isCompleted || isActive ? "primary.main" : "grey.300",
                  }}
                />
              )}
              <TimelineDot
                color={isActive || isCompleted ? "primary" : "grey"}
                variant={isActive ? "filled" : "outlined"}
                sx={{ m: 0 }}
              >
                {step.icon}
              </TimelineDot>
              {!isLast && (
                <TimelineConnector
                  sx={{
                    bgcolor: isCompleted ? "primary.main" : "grey.300",
                  }}
                />
              )}
            </TimelineSeparator>
          </TimelineItem>
        )
      })}
    </Timeline>
  )
}
