import ShipCrewPostsRepository from "./ShipCrewPostsRepository";
import LoginRepository from "./LoginRepository";

const repositories = {
  scPosts: ShipCrewPostsRepository,
  login: LoginRepository

};

export const RepositoryFactory = {
  get: name => repositories[name]
};
