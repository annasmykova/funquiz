import {AppDataSource} from "../../db/data-source";
import {Question} from "../../db/entities/Question";
import {getQuestionsDTO} from "../dto/QuestionDTO";

class QuestionService {
  repository = AppDataSource.getRepository(Question)

  async getQuestions() {
    const questions = await this.repository.find()
    return getQuestionsDTO(questions)
  }
}

export default new QuestionService()
