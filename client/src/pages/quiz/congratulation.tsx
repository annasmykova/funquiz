import {Paper, Typography} from "@mui/material";
import React, {useMemo} from "react";
import {NavLink} from "react-router-dom";

type Props = {
  score: number
}

const Congratulation = ({ score }: Props) => {
  const scoreFormatted = useMemo(() => score * 100 + '%', [score])

  return (
    <Paper style={{width: '100%'}}>
      <Typography variant="h3">Thank you for taking the Quiz! Your score is {scoreFormatted}.</Typography>
      <NavLink className="primary-btn" to="/feedback">See Full Feedback</NavLink>
    </Paper>
  )
}

export default Congratulation
