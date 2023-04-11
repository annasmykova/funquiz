import React, {useMemo, useState} from "react";
import {CircularProgress, Grid, Paper, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {NavLink} from "react-router-dom";
import Question from "../../components/Question";
import QuestionProgress from "../../components/Question/QuestionProgress/QuestionProgress";
import api from "../../config/axiosInterceptor";
import useAxios from "../../hooks/useAxios";
import Page from "../../layout/page";
import {QuestionT} from "../../types";
import '../home/index.scss'

const Quiz = () => {
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState(false)
  const [fields, setFields] = useState<{ [key: string]: string }>({})
  const [questionIndex, setQuestionIndex] = useState<number>(0)
  const {data, loading, error} = useAxios<{ questions: QuestionT[] }>('/questions')

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

  const handleSubmit = async () => {
    setSubmitLoading(true)
    try {
      await api.request({
        url: '/answers',
        method: 'post',
        data: {answers: fields}
      });
      setIsFinished(true)
    } catch (error) {
      console.error(error);
    }
    setSubmitLoading(false);
  }

  if (data?.message) {
    return (<Page>
        <div className="home">
          <Grid container spacing={2} justifyContent="center">
            <Grid item lg={6} md={8} xs={12}>
              <Paper style={{width: '100%'}}>
                <Typography variant="h3">{data?.message}</Typography>
                <NavLink className="primary-btn" to="/feedback">See Feedback</NavLink>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Page>
    )
  }

  return (<Page>
    <div className="home">
      <Grid container spacing={2} justifyContent="center">
        <Grid item lg={6} md={8} xs={12}>
          {
            isFinished
              ? <Paper style={{width: '100%'}}>
                <Typography variant="h3">Thank you for taking the Quiz!</Typography>
                <NavLink className="primary-btn" to="/feedback">See Full Feedback</NavLink>
              </Paper>
              : <Paper style={{width: '100%'}}>
                {
                  loading
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
                            type={questionIndex === data?.questions.length - 1 ? 'submit' : 'button'}
                            variant="contained"
                            color="success"
                            disabled={!fields[currentQuestion.id] || submitLoading}
                            onClick={questionIndex === data?.questions.length - 1 ? handleSubmit : next}
                            style={{marginLeft: 'auto'}}
                          >
                            {questionIndex === data?.questions.length - 1 ? 'Submit' : 'Next'}
                          </Button>
                        </Grid>
                      </Grid>
                    </>
                }

              </Paper>
          }

        </Grid>
      </Grid>
    </div>
  </Page>)
}

export default Quiz
