import { Paper, Grid, Divider, List, ListItem } from '@mui/material'
import Typography from '@mui/material/Typography'
import Answer from '../../components/Answer'
import useAxios from '../../hooks/useAxios'
import Page from '../../layout/page'
import Wrapper from '../../layout/wrapper'
import { FeedbackT, QuestionFeedbackT } from '../../types'

const Feedback = () => {
  const { data, loading, error } = useAxios<{ feedback: FeedbackT }>(
    '/answers/feedback',
  )
  console.log(data)

  return (
    <Page>
      <Wrapper>
        <Paper>
          <Typography variant="h3" mb={2}>
            Your score is {data?.feedback?.score * 100 + '%'}!
          </Typography>
          {/*<Grid container>*/}
          <List>
            {data?.feedback?.questions?.map(
              (question: QuestionFeedbackT, index: number) => (
                <>
                  <ListItem key={question.id}>
                    <Answer question={question} index={index + 1} />
                  </ListItem>
                  <Divider />
                </>
              ),
            )}
          </List>
          {/*</Grid>*/}
        </Paper>
      </Wrapper>
    </Page>
  )
}

export default Feedback
