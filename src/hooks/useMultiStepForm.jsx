import { useState } from "react"
import BusinessIcon from "@mui/icons-material/Business"
import PersonIcon from "@mui/icons-material/Person"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import WorkHistoryIcon from "@mui/icons-material/WorkHistory"
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"

export const steps = [
    {id: 1, title: "Organization Identity", icon: <BusinessIcon />},
    {id: 2, title: "Owner Details", icon: <PersonIcon />},
    {id: 3, title: "Location", icon: <LocationOnIcon />},
    {id: 4, title: "Business Details", icon: <WorkHistoryIcon />},
    {id: 5, title: "Bank Details", icon: <AccountBalanceIcon />},
]

export function useMultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === steps.length - 1

  const goToNextStep = () => {
    if (!isLastStep){
        setCurrentStep((prev)=>prev + 1)
    }
  }

  const resetForm = () => {
    setFormData({})
    setCurrentStep(0)
    setIsSubmitted(false)
  }

  const goToPreviousStep = () =>{
    if(!isFirstStep){
        setCurrentStep((prev)=>prev - 1)
    }
  }

  const updateFormData = (newData) => {
    setFormData((prev)=>({...prev, ...newData}))
  }

  const submitForm = (data)=>{
    console.log("data is successfully submitted" , data)
    setIsSubmitted(true)
  }

  return {
    currentStep,
    formData,
    isFirstStep,
    isLastStep,
    isSubmitted,
    steps,
    goToNextStep,
    goToPreviousStep,
    submitForm,
    resetForm,
    updateFormData
  }
}
