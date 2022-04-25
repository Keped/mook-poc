import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Participant extends Model {
  @Column
  sessionId: string;
  @Column
  timeJoined: Date;
}
