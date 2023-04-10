import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

export type QuestionOption = {
  text: string,
  value: string,
  isCorrect: boolean
}

@Entity()
export class Question {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  description: string

  @Column('jsonb')
  options: QuestionOption[]

  @Column()
  imgSrc: string
}
