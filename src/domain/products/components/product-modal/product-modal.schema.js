/**
 * External dependencies
 */
import * as Y from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const productFormSchema = yupResolver(
  Y.object().shape({
      name: Y.string()
        .required('The name field is required.'),
      price: Y.number()
        .positive('The price field must be a positive number.')
        .required('The price field is required.')
        .typeError('The price field must be a number.'),
  })
);

export default productFormSchema