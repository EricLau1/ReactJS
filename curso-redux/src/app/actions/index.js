import { 
    CUSTOMER_LIST,
    CUSTOMER_CREATE,
    CUSTOMER_UPDATE,
    CUSTOMER_DESTROY,
    CUSTOMER_SORT,
    CUSTOMER_SEARCH,
    CUSTOMER_PREPARE
} from './types';

import customers from '../data';

import { CustomerService } from '../services';

export const listCustomers = () => ({ type: CUSTOMER_LIST, customers });

export const createCustomer = (customer) => ({ type: CUSTOMER_CREATE, customer: CustomerService.create(customer) });

export const updateCustomer = (id, customer) => ({ type: CUSTOMER_UPDATE, customer: { id, ...customer, updatedAt: new Date().getTime() } });

export const removeCustomer = (id) => ({ type: CUSTOMER_DESTROY, id });

export const sortCustomers = (event) => ({ type: CUSTOMER_SORT, orderBy: event.target.value });

export const searchCustomers = (event) => ({ type: CUSTOMER_SEARCH, searchBy: event.target.value });

export const prepareUpdate = (customer) => ({ type: CUSTOMER_PREPARE, customer });