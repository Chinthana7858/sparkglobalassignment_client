const BASE_URL = 'https://sparkglobalassignmentserver-production-db41.up.railway.app';

export const API = {
  GET_PRODUCTS: `${BASE_URL}/products`,
  GET_PRODUCT_BY_ID: (id: string) => `${BASE_URL}/products/${id}`,
  ADD_PRODUCT:`${BASE_URL}/products`,
  DELETE_PRODUCT_BY_ID: (id: string) => `${BASE_URL}/products/delete/${id}`,
  UPDATE_PRODUCT_BY_ID:(id: string) => `${BASE_URL}/products/update/${id}`,
};
