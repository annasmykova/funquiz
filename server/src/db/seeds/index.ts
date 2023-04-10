import {AppDataSource} from "../data-source";
import {Question} from "../entities/Question";
const questions = require('./question.json')

const setSeeds = () => {
  AppDataSource.initialize()
    .then(() => {
      const questionsRepository = AppDataSource.getRepository(Question)
      questions.forEach(async (question: Partial<Question>) => {
        await questionsRepository.insert(question)
      })
    })
    .catch(error => console.log(error))
}

setSeeds()
