import ShipCrewPostsRepository from "./ShipCrewPostsRepository";
import LoginRepository from "./LoginRepository";
import ShipsRepository from "./ShipsRepository";

const repositories = {
  scPosts: ShipCrewPostsRepository,
  login: LoginRepository,
  ships: ShipsRepository

};

export const RepositoryFactory = {
  get: name => repositories[name]
};
