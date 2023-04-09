import "reflect-metadata"
import { DataSource } from "typeorm"
const config = require('../ormconfig')

export const AppDataSource = new DataSource(config)
