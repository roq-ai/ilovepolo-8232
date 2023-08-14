import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ShirtDesignInterface {
  id?: string;
  design_name: string;
  image_type: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface ShirtDesignGetQueryInterface extends GetQueryInterface {
  id?: string;
  design_name?: string;
  image_type?: string;
  user_id?: string;
}
