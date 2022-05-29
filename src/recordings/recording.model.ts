import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Recording extends Model {
  @Column
  sessionId: string;

  @Column
  participantId: string;

  @Column
  requestedStartTime: Date;

  @Column
  offset: number;

  @Column
  fileUrl: string;
}
