import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";

export type AnswerMap = {
  [key: string]: string;
};

@Entity()
export class UserAnswer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((_type) => User, {
    nullable: false,
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ type: "jsonb", nullable: false })
  answers: AnswerMap;

  @Column({ type: "float", nullable: false })
  score: number;
}
