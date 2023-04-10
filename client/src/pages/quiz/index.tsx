import {CircularProgress, Grid, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import useAxios from "../../hooks/useAxios";
import Page from "../../layout/page";
import '../home/index.scss'

type Question = {
  id: number,
  title: string,
  imgSrc: string,
  options: {
    text: string,
    value: string
  }[]
}

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState<Question>()
  const {data, loading} = useAxios('/questions')

  useEffect(() => {
    setCurrentQuestion(data?.questions[0])
  }, [data?.questions])

  return (<Page>
    <div className="home">
      <Paper>
        {
          !currentQuestion
            ? <CircularProgress/>
            : <>
              <Typography variant="h3">{currentQuestion?.title}</Typography>
              <img src={currentQuestion?.imgSrc} alt="" width={300} height={200}/>
              <Grid container spacing={2}>
                {
                  currentQuestion.options.map(option => (
                    <Grid item xs={6}>
                      <p>{option.text}</p>
                    </Grid>
                  ))
                }
              </Grid>
            </>
        }

      </Paper>
    </div>
  </Page>)
}

export default Quiz
