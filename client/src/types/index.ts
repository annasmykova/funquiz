export type QuestionT = {
  id: number
  title: string
  imgSrc: string
  options: {
    text: string
    value: string
  }[]
}

export type QuestionFeedbackT = {
  id: number
  title: string
  description: string
  userChoice: {
    text: string
    value: string
    isCorrect: boolean
  }
}

export type FeedbackT = {
  id: number
  questions: Array<QuestionFeedbackT>
  score: number
}
