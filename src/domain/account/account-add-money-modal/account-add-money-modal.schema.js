/**
 * External dependencies
 */
import * as Y from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const productFormSchema = yupResolver(
  Y.object().shape({
      amount: Y.number()
        .required('The amount field is required.')
        .typeError('The amount field must be a number.'),
  })
);

export default productFormSchema