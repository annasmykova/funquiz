import { Grid } from '@mui/material'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import React from 'react'
import { QuestionT } from '../../types'
import './index.scss'

type Props = {
  question: QuestionT
  value?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Question = ({ question, value, onChange }: Props) => {
  return (
    <div className="question">
      <Typography variant="h4">{question?.title}</Typography>
      <div className="question__img">
        <img src={question?.imgSrc} alt="question img" />
      </div>
      <fieldset className="question__fieldset">
        <Grid container spacing={2}>
          {question['options'].map((option) => (
            <Grid item xs={6}>
              <label
                className={`question__label  ${
                  value === option.value ? 'selected' : ''
                }`}
              >
                {option.text}
                <input
                  className="question__input"
                  type="radio"
                  value={option.value}
                  onChange={onChange}
                  checked={option.value.toString() === value?.toString()}
                />
              </label>
            </Grid>
          ))}
        </Grid>
      </fieldset>
    </div>
  )
}

export default Question
