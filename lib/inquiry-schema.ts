import { z } from "zod";
import { getCountries, isValidPhoneNumber } from "libphonenumber-js/min";
const countryCodes = new Set<string>(getCountries());
export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(100).regex(/^[^\u0000-\u001f\u007f]+$/u, "Please remove line breaks or special control characters."),
  country: z.string().refine(value => countryCodes.has(value), "Please select your country."),
  phone: z.string().trim().max(25).refine(value => /^\+[1-9]\d{6,14}$/.test(value) && isValidPhoneNumber(value), "Please enter a valid international phone number."),
  email: z.string().trim().email("Please enter a valid email address.").max(254),
  message: z.string().trim().min(20, "Please tell us a little more (at least 20 characters).").max(5000, "Please keep your message within 5,000 characters.").refine(value => !/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u.test(value), "Please remove special control characters."),
  website: z.string().max(0),
  requestId: z.string().uuid(),
}).strict();
