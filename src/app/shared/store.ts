import { User } from './user';
import { Repo } from './repos';

export interface AppStore {
  repos: Repo[];
  user: User;
}