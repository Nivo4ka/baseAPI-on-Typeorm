import { AppDataSource } from "./dataSource";
import { User } from "./entities/User";

export const useAppDataSource = AppDataSource.getRepository(User);
