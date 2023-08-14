import * as yup from 'yup';

export const shirtDesignValidationSchema = yup.object().shape({
  design_name: yup.string().required(),
  image_type: yup.string().required(),
  user_id: yup.string().nullable(),
});
