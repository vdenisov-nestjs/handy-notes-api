import {
  Entity,

  PrimaryGeneratedColumn,
  Column,

  OneToMany,
  ManyToMany,

  BeforeInsert,
  AfterLoad,
} from 'typeorm';

import * as bcrypt from 'bcryptjs';

import { NoteEntity } from '../note/note.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  // AUTH credetials {
  @Column({ type: 'text', unique: true })
  email: string;

  @Column('text')
  password: string;
  // } AUTH credetials

  // PROFILE info {
  @Column({ type: 'text', nullable: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  phone: string;

  @Column({ type: 'text', nullable: true })
  birthdate: Date;
  // } PROFILE info

  // relationships {
  @OneToMany(type => NoteEntity, personalNotes => personalNotes.author)
  personalNotes: NoteEntity[];

  @ManyToMany(type => NoteEntity, favoriteNotes => favoriteNotes.likes)
  favoriteNotes: NoteEntity[];
  // } relationships

  // hooks {
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
  // } hooks

  // methods {
  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }
  // } methods
}
