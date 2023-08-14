import axios from 'axios';
import queryString from 'query-string';
import { ShirtDesignInterface, ShirtDesignGetQueryInterface } from 'interfaces/shirt-design';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getShirtDesigns = async (
  query?: ShirtDesignGetQueryInterface,
): Promise<PaginatedInterface<ShirtDesignInterface>> => {
  const response = await axios.get('/api/shirt-designs', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createShirtDesign = async (shirtDesign: ShirtDesignInterface) => {
  const response = await axios.post('/api/shirt-designs', shirtDesign);
  return response.data;
};

export const updateShirtDesignById = async (id: string, shirtDesign: ShirtDesignInterface) => {
  const response = await axios.put(`/api/shirt-designs/${id}`, shirtDesign);
  return response.data;
};

export const getShirtDesignById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/shirt-designs/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteShirtDesignById = async (id: string) => {
  const response = await axios.delete(`/api/shirt-designs/${id}`);
  return response.data;
};
