import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Recording extends Model {
  @Column
  sessionId: string;

  @Column
  participantId: string;

  @Column
  startedAt: Date;

  @Column
  endedAt: Date;
}
