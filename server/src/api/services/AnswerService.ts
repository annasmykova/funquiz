import {AppDataSource} from "../../db/data-source";
import {AnswerMap, UserAnswer} from "../../db/entities/UserAnswer";
import QuestionService from "./QuestionService";

class AnswerService {
  repository = AppDataSource.getRepository(UserAnswer)

  async validateAnswers(answerMap: AnswerMap) {
    let isValid = true
    const questions = await QuestionService.getQuestions()

    questions.forEach(question => {
      if (!answerMap[question.id]) {
        isValid = false
        return
      }
      const option = question.options.find(({ value }) => value === answerMap[question.id])
      if (!option) {
        isValid = false
        return
      }
    })

    return isValid
  }
  
  async getScore(answerMap: AnswerMap) {
    let score = 0
    const questions = await QuestionService.getQuestions()

    questions.forEach(question => {
      const option = question.options.find(({ value }) => value === answerMap[question.id])
      if (option.isCorrect) {
        score++
      }
    })
    return score/questions.length
  }

  async addUserAnswer (answer: Partial<UserAnswer>) {
    return this.repository.save(answer)
  }

  async getByUser(user) {
    return this.repository.findBy({ user })
  }
}

export default new AnswerService()
