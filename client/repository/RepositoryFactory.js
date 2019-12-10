import ShipCrewPostsRepository from "./ShipCrewPostsRepository";
import LoginRepository from "./LoginRepository";
import ShipsRepository from "./ShipsRepository";
import LocationsRepository from "./LocationsRepository";

const repositories = {
  scPosts: ShipCrewPostsRepository,
  login: LoginRepository,
  ships: ShipsRepository,
  locations: LocationsRepository,

};

export const RepositoryFactory = {
  get: name => repositories[name]
};
