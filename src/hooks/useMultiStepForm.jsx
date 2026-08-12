import { useState } from "react";
import { useForm } from "react-hook-form";

import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

export const steps = [
  {
    id: 1,
    title: "Organization Identity",
    icon: <BusinessIcon />,
  },
  {
    id: 2,
    title: "Owner Details",
    icon: <PersonIcon />,
  },
  {
    id: 3,
    title: "Location",
    icon: <LocationOnIcon />,
  },
  {
    id: 4,
    title: "Business Details",
    icon: <WorkHistoryIcon />,
  },
  {
    id: 5,
    title: "Bank Details",
    icon: <AccountBalanceIcon />,
  },
];

const defaultValues = {
  // Step 1 — organizationIdentitySchema
  name: "",
  industry: "",
  logoFile: undefined,

  // Step 2 — ownerDetailsSchema
  ownerName: "",
  countryCode: "",
  mobileNumber: "",
  email: "",

  // Step 3 — locationSchema
  country: "",
  state: "",
  currency: "",
  timezone: "",
  street1: "",
  street2: "",
  city: "",
  postalCode: "",

  // Step 4 — businessDetailsSchema
  inventoryStartDate: undefined,
  fiscalYear: "",
  pan: "",
  gst: "",

  // Step 5 — bankDetailsSchema
  accountHolderName: "",
  bankName: "",
  accountNumber: "",
  ifscCode: "",
  accountType: "",
  upiId: "",
  qrFile: undefined,
};

export function useMultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm({
    defaultValues,
    mode: "onTouched",
  });

  const {
    trigger,
    handleSubmit,
    reset,
    getValues,
    formState: {
      errors,
      isSubmitting,
    },
  } = form;

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const goToNextStep = () => {
    if (!isLastStep) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  /**
   * Move to previous step
   */
  const goToPreviousStep = () => {
    if (!isFirstStep) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  /**
   * Go directly to a step
   */
  const goToStep = (step) => {
    if (step >= 0 && step < steps.length) {
      setCurrentStep(step);
    }
  };

  /**
   * Final form submission
   */
  const submitForm = async (data) => {
    try {
      console.log("Form data:", data);

      // API call here
      //
      // const response = await fetch("/api/business", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(data),
      // });
      //
      // if (!response.ok) {
      //   throw new Error("Something went wrong");
      // }
      console.log("Form data submitted:", data);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  /**
   * Reset everything
   */
  const resetForm = () => {
    reset(defaultValues);
    setCurrentStep(0);
    setIsSubmitted(false);
  };

  return {
    // React Hook Form
    ...form,

    // Current step
    currentStep,
    steps,

    // Step state
    isFirstStep,
    isLastStep,

    // Form state
    errors,
    isSubmitting,
    isSubmitted,

    // Navigation
    goToNextStep,
    goToPreviousStep,
    goToStep,

    // Submission
    submitForm,
    handleSubmit,

    // Utilities
    getValues,
    resetForm,
  };
}