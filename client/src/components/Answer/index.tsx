import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { QuestionFeedbackT } from '../../types'

type Props = {
  question: QuestionFeedbackT
  index: number
}

const Answer = ({ question, index }: Props) => {
  return (
    <Box width="100%" mt={2}>
      <Typography variant="subtitle2" mb={1} style={{ color: '#999' }}>
        Question {index}
      </Typography>
      <Typography className="primary-text" variant="h5" mb={1}>
        {question.title}
      </Typography>
      <Typography
        variant="body1"
        style={{ maxWidth: 500, color: '#666' }}
        display="inline-flex"
      >
        {question.description}
      </Typography>
      <Typography variant="subtitle1" style={{ textAlign: 'right' }} mt={2}>
        Your answer:{' '}
        <p style={{ color: question.userChoice.isCorrect ? 'green' : 'red' }}>
          {question.userChoice.text}
        </p>
      </Typography>
    </Box>
  )
}

export default Answer
