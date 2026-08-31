import { z } from 'zod';







const blankNumber = z.union([z.number(), z.nan(), z.literal('')]);
const isRealNumber = (v) => typeof v === 'number' && !Number.isNaN(v);

const numberField = (message) => blankNumber.refine(isRealNumber, message);

const optionalNumberField = () =>
  blankNumber.optional().transform((v) => (isRealNumber(v) ? v : undefined));

export const productSchema = z.object({
  name: z
  .string()
  .trim()
  .min(1, 'Required')
  .min(2, 'Must be at least 2 characters'),

  type: z.enum(['goods', 'service']),

  category: z.string().optional(),
  brand: z.string().optional(),
  manufacturer: z.string().optional(),

  images: z.array(z.string()).max(3, 'Up to 3 images allowed').optional(),

  unit: z.string().min(1, 'Required'),
  boxType: z.string().optional(),
  sku: z.string().optional(),

  reorderPoint: numberField('Invalid Number')
                 .refine((v) => !isRealNumber(v) || v >= 0, 'cannot be negative'),

  description: z.string().optional(),

  currency: z.string().min(1,'Required'),
  sellingPrice: numberField('Invalid Selling Price'),
  costPrice: numberField('Invalid Cost Price'),
  returnable: z.boolean(),

  length: optionalNumberField(),
  width: optionalNumberField(),
  height: optionalNumberField(),
  dimensionUnit: z.string().optional(),
  weight: optionalNumberField(),
  weightUnit: z.string().optional(),
})
.superRefine((data, ctx) => {
  if (data.unit === "box" && !data.boxType?.trim()) {
    ctx.addIssue({
      code: "custom",
      path: ["boxType"],
      message: "Required",
    });
  }
});

export const productDefaultValues = {
  name: '',
  type: 'goods',
  category: '',
  brand: '',
  manufacturer: '',
  images: [],
  unit: 'box',
  boxType: '',
  sku: '',
  reorderPoint: 0,
  description: '',
  currency: 'INR',
  sellingPrice: '',
  costPrice: '',
  returnable: true,
  length: '',
  width: '',
  height: '',
  dimensionUnit: 'cm',
  weight: '',
  weightUnit: 'kg',
};
