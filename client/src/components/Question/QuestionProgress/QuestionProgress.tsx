import { Step, StepLabel, Stepper } from '@mui/material'
import { QuestionT } from '../../../types'
import './index.scss'

type Props = {
  questions: QuestionT[]
  questionIndex: number
}

const QuestionProgress = ({ questionIndex, questions }: Props) => {
  return (
    <Stepper
      className="question-progress"
      alternativeLabel
      activeStep={questionIndex}
    >
      {questions.map((question) => (
        <Step key={question.id}>
          <StepLabel />
        </Step>
      ))}
    </Stepper>
  )
}

export default QuestionProgress
