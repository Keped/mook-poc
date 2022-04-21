import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Song extends Model {
  @Column
  songName: string;

  @Column
  startAt: Date;

  @Column
  endAt: Date;

  @Column({ defaultValue: false })
  inProgress: boolean;
}
