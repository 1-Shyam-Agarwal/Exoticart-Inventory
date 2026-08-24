import Timeline from "@mui/lab/Timeline"
import TimelineItem from "@mui/lab/TimelineItem"
import TimelineSeparator from "@mui/lab/TimelineSeparator"
import TimelineConnector from "@mui/lab/TimelineConnector"
import TimelineContent from "@mui/lab/TimelineContent"
import TimelineDot from "@mui/lab/TimelineDot"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"

const DOT_SIZE = 32
/** 50% of previous 5.5rem step pitch */
const CONNECTOR_HEIGHT = 32

export default function ProgressBar({ currentStep, steps }) {
  return (
    <Box
      sx={{width: "14rem"}}
    >
      <Timeline
        sx={{
          p: 0,
          m: 0,
          [`& .MuiTimelineItem-root`]: {
            display: "flex",
            alignItems: "flex-start",
            minHeight: 0,
            "&:before": {
              display: "none",
            },
          },
    
          [`& .MuiTimelineConnector-root`]: {
            width: "2px",
            flexGrow: 0,
            minHeight: CONNECTOR_HEIGHT,
            height: CONNECTOR_HEIGHT,
          },
          [`& .MuiTimelineContent-root`]: {
            display: "flex",
            alignItems: "center",
            minHeight: DOT_SIZE,
            py: 0,
            px: 2,
            mt: 0,
          },
        }}
      >
        {steps.map((step, index) => {
          const isActive = index === currentStep
          const isCompleted = index < currentStep
          const isLast = index === steps.length - 1
          const connectorDone = index < currentStep

          return (
            <TimelineItem key={step.id}>
              <TimelineSeparator>
                <TimelineDot
                  variant={isActive ? "filled" : "outlined"}
                  sx={{
                    m: 0,
                    width: DOT_SIZE,
                    height: DOT_SIZE,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 1,
                    ...(isActive
                      ? {
                          bgcolor: "primary.main",
                          borderColor: "primary.main",
                          color: "primary.contrastText",
                        }
                      : isCompleted
                        ? {
                            bgcolor: "transparent",
                            borderColor: "primary.main",
                            color: "primary.main",
                          }
                        : {
                            bgcolor: "transparent",
                            borderColor: "border.main",
                            color: "text.disabled",
                          }),
                    "& .MuiSvgIcon-root": {
                      fontSize: 16,
                    },
                  }}
                >
                  {step.icon}
                </TimelineDot>

                {!isLast ? (
                  <TimelineConnector
                    sx={{
                      bgcolor: connectorDone ? "primary.main" : "border.main",
                    }}
                  />
                ) : null}
              </TimelineSeparator>

              <TimelineContent>
                <Typography
                  sx={{
                    fontSize: "0.875rem",
                    lineHeight: `${DOT_SIZE}px`,
                    fontWeight: isActive ? 500 : 400,
                    color: isActive
                      ? "primary.main"
                      : isCompleted
                        ? "text.primary"
                        : "text.disabled",
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                    cursor: "default",
                  }}
                >
                  {step.title}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          )
        })}
      </Timeline>
    </Box>
  )
}
