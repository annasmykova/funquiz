import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export type QuestionOption = {
  text: string;
  value: string;
  isCorrect: boolean;
};

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ type: "jsonb", nullable: false })
  options: QuestionOption[];

  @Column({ nullable: false })
  imgSrc: string;
}
