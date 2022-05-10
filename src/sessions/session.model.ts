import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Session extends Model {
  @Column
  name: string;
  @Column
  sessionToken: string;
  @Column
  recordingStartTime?: Date;
  @Column
  recordingEndTime?: Date;
}
