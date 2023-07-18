import { ID } from '.';

export interface ICRUDModelCreator<T> {
  create(data: Partial<T>): Promise<T>,
}

export interface ICRUDModelReader<T> {
  findAll(): Promise<T[]>,
  findById(id: ID): Promise<T | null>,
}

export interface ICRUDModelInProgress<T> {
  findInProgress(inProgress: boolean): Promise<T[]>,
}

export interface ICRUDModelEmail<T> extends ICRUDModelReader<T> {
  findByEmail(email: string): Promise<T | null>,
}

export interface ICRUDModelUpdater<T> {
  finish(id: ID): Promise<T | null>,
  update(id: ID, homeTeamGoals: ID, awayTeamGoals: ID): Promise<T | null>,
}

export interface ICRUDModelDeleter {
  delete(id: ID): Promise<number>,
}

export interface ICRUDModel<T>
  extends ICRUDModelCreator<T>, ICRUDModelReader<T>,
  ICRUDModelInProgress<T>, ICRUDModelUpdater<T> { }
