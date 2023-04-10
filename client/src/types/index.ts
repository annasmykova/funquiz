export type QuestionT = {
  id: number,
  title: string,
  imgSrc: string,
  options: {
    text: string,
    value: string
  }[]
}
