import {CircularProgress, Grid, Paper} from "@mui/material";
import Button from "@mui/material/Button";
import React, {useMemo, useState} from "react";
import Question from "../../components/Question";
import QuestionProgress from "../../components/Question/QuestionProgress/QuestionProgress";
import useAxios from "../../hooks/useAxios";
import Page from "../../layout/page";
import {QuestionT} from "../../types";
import '../home/index.scss'

const Quiz = () => {
  const [fields, setFields] = useState<{ [key: string]: string }>({})
  const [questionIndex, setQuestionIndex] = useState<number>(0)
  const {data, loading} = useAxios<{ questions: QuestionT[] }>('/questions')

  const currentQuestion = useMemo<QuestionT>(() => data?.questions[questionIndex], [questionIndex, data?.questions])
  const handleChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields({
      ...fields,
      [key]: e.currentTarget.value
    })
  }

  const next = () => {
    setQuestionIndex(questionIndex + 1)
  }

  const previous = () => {
    setQuestionIndex(questionIndex - 1)
  }

  return (<Page>
    <div className="home">
      <Grid container spacing={2} justifyContent="center">
        <Grid item lg={6} md={8} xs={12}>
      <Paper style={{width: '100%'}}>
        {
          !currentQuestion
            ? <CircularProgress/>
            : <>
              <QuestionProgress questions={data?.questions} questionIndex={questionIndex}/>
              <Question
                question={currentQuestion}
                onChange={handleChange(currentQuestion.id.toString())}
                value={fields[currentQuestion.id]}
              />
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Button
                    type="button"
                    variant="text"
                    disabled={!questionIndex}
                    onClick={previous}
                  >
                    Previous
                  </Button>
                </Grid>
                <Grid item xs={6}/>
                <Grid item xs={3} display="flex">
                  <Button
                    type="button"
                    variant="contained"
                    color="success"
                    disabled={!fields[currentQuestion.id]}
                    onClick={next}
                    style={{marginLeft: 'auto'}}
                  >
                    Next
                  </Button>
                </Grid>
              </Grid>
            </>
        }

      </Paper>
        </Grid>
      </Grid>
    </div>
  </Page>)
}

export default Quiz
