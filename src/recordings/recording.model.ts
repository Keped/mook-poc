import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Recording extends Model {
  @Column
  sessionId: string;

  @Column
  playerId: string;

  @Column
  participantId: string;

  @Column
  requestedStartTime: Date;

  @Column
  offset: number;
}
