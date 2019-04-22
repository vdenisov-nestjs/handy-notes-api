import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { TagEntity } from '../tag/tag.entity';

@Entity('note')
export class NoteEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  title: string;

  @Column('text')
  text: string;

  // relationships {
  @ManyToOne(type => UserEntity, author => author.notes)
  author: UserEntity;

  @ManyToMany(type => TagEntity, tags => tags.notes)
  tags: TagEntity[];
  // } relationships
}
